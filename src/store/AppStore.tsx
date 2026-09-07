/**
 * INIT Platform — App State Store
 *
 * This is the central frontend state layer for Platform V1.
 * All mutations go through this store so they can be trivially
 * replaced with API calls (React Query / tRPC / fetch) later.
 *
 * Each action has a comment marking where the API call will go.
 */

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
} from "react";
import {
  mockBuilders,
  mockProjects,
  mockTeams,
  mockContributions,
  mockAchievements,
  currentUser,
  type Builder,
  type Project,
  type Team,
  type Contribution,
  type ProjectStatus,
} from "@/data/mock";

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface TeamApplication {
  id: string;
  teamId: string;
  projectId: string;
  role: string;
  builderId: string;
  status: "PENDING" | "APPROVED" | "DECLINED";
  appliedAt: string;
  message?: string;
}

export interface Notification {
  id: string;
  type: "CONNECTION" | "APPLICATION" | "PROJECT_UPDATE" | "TEAM_JOIN";
  message: string;
  timestamp: string;
  read: boolean;
}

export interface AppState {
  projects: Project[];
  teams: Team[];
  builders: Builder[];
  contributions: Contribution[];
  /** IDs of builders the current user is connected with */
  connections: Set<string>;
  /** IDs of projects the current user has requested to join */
  pendingProjectJoins: Set<string>;
  /** Team role applications */
  applications: TeamApplication[];
  notifications: Notification[];
  /** Tracks locally created/modified projects so state is consistent */
  localProjectUpdates: Record<string, Partial<Project>>;
}

type AppAction =
  | { type: "CONNECT_BUILDER"; builderId: string }
  | { type: "DISCONNECT_BUILDER"; builderId: string }
  | { type: "CREATE_PROJECT"; project: Project }
  | {
      type: "ADVANCE_PROJECT_STATUS";
      projectId: string;
      nextStatus: ProjectStatus;
    }
  | { type: "APPLY_FOR_ROLE"; application: TeamApplication }
  | { type: "REQUEST_JOIN_PROJECT"; projectId: string }
  | { type: "MARK_NOTIFICATION_READ"; notificationId: string }
  | { type: "ADD_NOTIFICATION"; notification: Notification };

// ─── INITIAL STATE ────────────────────────────────────────────────────────────

const initialState: AppState = {
  projects: mockProjects,
  teams: mockTeams,
  builders: mockBuilders,
  contributions: mockContributions,
  connections: new Set<string>(),
  pendingProjectJoins: new Set<string>(),
  applications: [],
  notifications: [],
  localProjectUpdates: {},
};

// ─── REDUCER ─────────────────────────────────────────────────────────────────

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "CONNECT_BUILDER": {
      // TODO API: POST /api/connections { targetBuilderId }
      const next = new Set(state.connections);
      next.add(action.builderId);
      return { ...state, connections: next };
    }

    case "DISCONNECT_BUILDER": {
      // TODO API: DELETE /api/connections/:builderId
      const next = new Set(state.connections);
      next.delete(action.builderId);
      return { ...state, connections: next };
    }

    case "CREATE_PROJECT": {
      // TODO API: POST /api/projects { ...project }
      return {
        ...state,
        projects: [action.project, ...state.projects],
      };
    }

    case "ADVANCE_PROJECT_STATUS": {
      // TODO API: PATCH /api/projects/:id { status: nextStatus }
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.projectId
            ? { ...p, status: action.nextStatus, updatedAt: new Date().toISOString().split("T")[0] }
            : p
        ),
        localProjectUpdates: {
          ...state.localProjectUpdates,
          [action.projectId]: { status: action.nextStatus },
        },
      };
    }

    case "APPLY_FOR_ROLE": {
      // TODO API: POST /api/teams/:teamId/applications { role, message }
      return {
        ...state,
        applications: [...state.applications, action.application],
        notifications: [
          {
            id: `n-${Date.now()}`,
            type: "APPLICATION",
            message: `Your application for "${action.application.role}" has been submitted.`,
            timestamp: new Date().toISOString(),
            read: false,
          },
          ...state.notifications,
        ],
      };
    }

    case "REQUEST_JOIN_PROJECT": {
      // TODO API: POST /api/projects/:id/join-request
      const next = new Set(state.pendingProjectJoins);
      next.add(action.projectId);
      return { ...state, pendingProjectJoins: next };
    }

    case "MARK_NOTIFICATION_READ": {
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.notificationId ? { ...n, read: true } : n
        ),
      };
    }

    case "ADD_NOTIFICATION": {
      return {
        ...state,
        notifications: [action.notification, ...state.notifications],
      };
    }

    default:
      return state;
  }
}

// ─── CONTEXT ─────────────────────────────────────────────────────────────────

interface AppContextValue {
  state: AppState;

  // Builder flows
  connectBuilder: (builderId: string) => void;
  disconnectBuilder: (builderId: string) => void;
  isConnected: (builderId: string) => boolean;

  // Project flows
  createProject: (data: Omit<Project, "id" | "createdAt" | "updatedAt">) => Project;
  advanceProjectStatus: (projectId: string) => void;
  requestJoinProject: (projectId: string) => void;
  hasRequestedJoin: (projectId: string) => boolean;
  isProjectMember: (projectId: string) => boolean;
  isProjectOwner: (projectId: string) => boolean;

  // Team flows
  applyForRole: (teamId: string, projectId: string, role: string, message?: string) => void;
  hasAppliedForRole: (teamId: string, role: string) => boolean;
  getApplication: (teamId: string) => TeamApplication | undefined;

  // Notifications
  unreadCount: number;
  markRead: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const STATUS_PROGRESSION: Record<ProjectStatus, ProjectStatus | null> = {
  IDEA: "VALIDATING",
  VALIDATING: "BUILDING",
  BUILDING: "BETA",
  BETA: "SHIPPED",
  SHIPPED: "MAINTAINED",
  MAINTAINED: null,
};

let _idCounter = 1000;
function genId(prefix: string) {
  return `${prefix}-${++_idCounter}`;
}

// ─── PROVIDER ────────────────────────────────────────────────────────────────

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const connectBuilder = useCallback((builderId: string) => {
    dispatch({ type: "CONNECT_BUILDER", builderId });
  }, []);

  const disconnectBuilder = useCallback((builderId: string) => {
    dispatch({ type: "DISCONNECT_BUILDER", builderId });
  }, []);

  const isConnected = useCallback(
    (builderId: string) => state.connections.has(builderId),
    [state.connections]
  );

  const createProject = useCallback(
    (data: Omit<Project, "id" | "createdAt" | "updatedAt">): Project => {
      const project: Project = {
        ...data,
        id: genId("p"),
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        members: [
          { builderId: currentUser.id, role: "Founder", joinedAt: new Date().toISOString().split("T")[0] },
        ],
        ownerId: currentUser.id,
      };
      dispatch({ type: "CREATE_PROJECT", project });
      return project;
    },
    []
  );

  const advanceProjectStatus = useCallback(
    (projectId: string) => {
      const project = state.projects.find((p) => p.id === projectId);
      if (!project) return;
      const next = STATUS_PROGRESSION[project.status];
      if (!next) return;
      dispatch({ type: "ADVANCE_PROJECT_STATUS", projectId, nextStatus: next });
    },
    [state.projects]
  );

  const requestJoinProject = useCallback((projectId: string) => {
    dispatch({ type: "REQUEST_JOIN_PROJECT", projectId });
  }, []);

  const hasRequestedJoin = useCallback(
    (projectId: string) => state.pendingProjectJoins.has(projectId),
    [state.pendingProjectJoins]
  );

  const isProjectMember = useCallback(
    (projectId: string) => {
      const project = state.projects.find((p) => p.id === projectId);
      return !!project?.members.some((m) => m.builderId === currentUser.id);
    },
    [state.projects]
  );

  const isProjectOwner = useCallback(
    (projectId: string) => {
      const project = state.projects.find((p) => p.id === projectId);
      return project?.ownerId === currentUser.id;
    },
    [state.projects]
  );

  const applyForRole = useCallback(
    (teamId: string, projectId: string, role: string, message?: string) => {
      const application: TeamApplication = {
        id: genId("app"),
        teamId,
        projectId,
        role,
        builderId: currentUser.id,
        status: "PENDING",
        appliedAt: new Date().toISOString().split("T")[0],
        message,
      };
      dispatch({ type: "APPLY_FOR_ROLE", application });
    },
    []
  );

  const hasAppliedForRole = useCallback(
    (teamId: string, role: string) =>
      state.applications.some(
        (a) => a.teamId === teamId && a.role === role && a.builderId === currentUser.id
      ),
    [state.applications]
  );

  const getApplication = useCallback(
    (teamId: string) =>
      state.applications.find(
        (a) => a.teamId === teamId && a.builderId === currentUser.id
      ),
    [state.applications]
  );

  const unreadCount = state.notifications.filter((n) => !n.read).length;

  const markRead = useCallback((id: string) => {
    dispatch({ type: "MARK_NOTIFICATION_READ", notificationId: id });
  }, []);

  const value: AppContextValue = {
    state,
    connectBuilder,
    disconnectBuilder,
    isConnected,
    createProject,
    advanceProjectStatus,
    requestJoinProject,
    hasRequestedJoin,
    isProjectMember,
    isProjectOwner,
    applyForRole,
    hasAppliedForRole,
    getApplication,
    unreadCount,
    markRead,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ─── HOOK ─────────────────────────────────────────────────────────────────────

export function useAppStore(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppStore must be used inside AppStoreProvider");
  return ctx;
}

export { STATUS_PROGRESSION };
