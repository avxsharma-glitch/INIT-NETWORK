// ─── ENUMS ───────────────────────────────────────────────────────────────────

export type ProjectStatus =
  | "IDEA"
  | "VALIDATING"
  | "BUILDING"
  | "BETA"
  | "SHIPPED"
  | "MAINTAINED";

export type RoleType =
  | "FRONTEND"
  | "BACKEND"
  | "FULLSTACK"
  | "ML ENGINEER"
  | "DESIGNER"
  | "PM"
  | "DEVOPS"
  | "MOBILE"
  | "DATA"
  | "RESEARCHER";

export type ContributionType = "CODE" | "DESIGN" | "DOCS" | "REVIEW" | "IDEA";

// ─── CORE TYPES ──────────────────────────────────────────────────────────────

export interface Skill {
  name: string;
  level: "LEARNING" | "PROFICIENT" | "EXPERT";
}

export interface SocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
  portfolio?: string;
}

export interface Builder {
  id: string;
  name: string;
  role: RoleType;
  campus: string;
  avatar: string;
  bio: string;
  skills: Skill[];
  projectIds: string[];
  contributionIds: string[];
  achievementIds: string[];
  social: SocialLinks;
  joinedAt: string;
  isCurrentUser?: boolean;
}

export interface ProjectMember {
  builderId: string;
  role: string;
  joinedAt: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  techStack: string[];
  members: ProjectMember[];
  ownerId: string;
  repoUrl?: string;
  demoUrl?: string;
  coverColor: string;
  createdAt: string;
  updatedAt: string;
  teamId?: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  projectId: string;
  memberIds: string[];
  openRoles: string[];
  createdAt: string;
}

export interface Contribution {
  id: string;
  builderId: string;
  projectId: string;
  type: ContributionType;
  title: string;
  description: string;
  date: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
}

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

export const mockAchievements: Achievement[] = [
  {
    id: "ach1",
    title: "First Ship",
    description: "Shipped your first project to BETA",
    icon: "🚀",
    earnedAt: "2024-09-01"
  },
  {
    id: "ach2",
    title: "Connector",
    description: "Collaborated with 5+ builders",
    icon: "🔗",
    earnedAt: "2024-10-15"
  },
  {
    id: "ach3",
    title: "Chapter Founder",
    description: "Founded an INIT chapter",
    icon: "🏛️",
    earnedAt: "2024-11-01"
  },
  {
    id: "ach4",
    title: "Open Source",
    description: "Contributed to an open source project via INIT",
    icon: "🌐",
    earnedAt: "2024-12-01"
  }
];

export const mockBuilders: Builder[] = [
  {
    id: "b1",
    name: "Alex Developer",
    role: "FULLSTACK",
    campus: "Stanford University",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    bio: "Building systems that help builders build. Interested in developer tooling, distributed systems, and community infrastructure.",
    skills: [
      { name: "React", level: "EXPERT" },
      { name: "TypeScript", level: "EXPERT" },
      { name: "Node.js", level: "PROFICIENT" },
      { name: "Python", level: "PROFICIENT" },
      { name: "PostgreSQL", level: "LEARNING" }
    ],
    projectIds: ["p1", "p2"],
    contributionIds: ["c1", "c3"],
    achievementIds: ["ach1", "ach2"],
    social: {
      github: "alexdev",
      twitter: "alexdev_",
      portfolio: "alexdev.io"
    },
    joinedAt: "2024-08-15",
    isCurrentUser: true
  },
  {
    id: "b2",
    name: "Sarah Chen",
    role: "DESIGNER",
    campus: "MIT",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "UX/product designer. I care about the space between function and beauty. Making complex things feel simple.",
    skills: [
      { name: "Figma", level: "EXPERT" },
      { name: "User Research", level: "EXPERT" },
      { name: "React", level: "LEARNING" },
      { name: "Motion Design", level: "PROFICIENT" }
    ],
    projectIds: ["p1", "p3"],
    contributionIds: ["c2"],
    achievementIds: ["ach2"],
    social: {
      twitter: "sarahchendesign",
      portfolio: "sarahchen.design"
    },
    joinedAt: "2024-09-01"
  },
  {
    id: "b3",
    name: "David Kim",
    role: "ML ENGINEER",
    campus: "UC Berkeley",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    bio: "ML Engineer focused on applied AI. Working on agents, RAG systems, and making models useful in the real world.",
    skills: [
      { name: "Python", level: "EXPERT" },
      { name: "PyTorch", level: "EXPERT" },
      { name: "LangChain", level: "PROFICIENT" },
      { name: "TypeScript", level: "LEARNING" }
    ],
    projectIds: ["p2", "p4"],
    contributionIds: ["c3", "c4"],
    achievementIds: ["ach1", "ach4"],
    social: {
      github: "davidkim-ml",
      linkedin: "davidkim"
    },
    joinedAt: "2024-07-20"
  },
  {
    id: "b4",
    name: "Emily Wang",
    role: "FRONTEND",
    campus: "University of Waterloo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    bio: "Frontend engineer obsessed with animations, performance, and pixel-perfect design. Making the web feel alive.",
    skills: [
      { name: "React", level: "EXPERT" },
      { name: "Three.js", level: "PROFICIENT" },
      { name: "GSAP", level: "PROFICIENT" },
      { name: "CSS/Animation", level: "EXPERT" }
    ],
    projectIds: ["p3"],
    contributionIds: ["c5"],
    achievementIds: ["ach2"],
    social: {
      github: "emilywang",
      twitter: "emilywang_dev"
    },
    joinedAt: "2024-10-01"
  },
  {
    id: "b5",
    name: "Marcus Lee",
    role: "BACKEND",
    campus: "Carnegie Mellon",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    bio: "Systems and backend engineer. Distributed systems, databases, and high-throughput APIs are my playground.",
    skills: [
      { name: "Go", level: "EXPERT" },
      { name: "Rust", level: "PROFICIENT" },
      { name: "PostgreSQL", level: "EXPERT" },
      { name: "Kubernetes", level: "PROFICIENT" }
    ],
    projectIds: ["p4"],
    contributionIds: ["c6"],
    achievementIds: ["ach3"],
    social: {
      github: "marcuslee-sys"
    },
    joinedAt: "2024-08-01"
  },
  {
    id: "b6",
    name: "Priya Sharma",
    role: "PM",
    campus: "IIT Delhi",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    bio: "Product thinker and builder. I find the overlap between user needs and technical feasibility and make things happen.",
    skills: [
      { name: "Product Strategy", level: "EXPERT" },
      { name: "Data Analysis", level: "PROFICIENT" },
      { name: "SQL", level: "PROFICIENT" },
      { name: "Figma", level: "LEARNING" }
    ],
    projectIds: ["p1"],
    contributionIds: [],
    achievementIds: ["ach2", "ach3"],
    social: {
      linkedin: "priyasharma",
      twitter: "priya_builds"
    },
    joinedAt: "2024-09-15"
  }
];

export const mockProjects: Project[] = [
  {
    id: "p1",
    title: "INIT Platform",
    tagline: "The builder network infrastructure",
    description:
      "The core platform infrastructure for the INIT network. The authenticated workspace where builders discover each other, form teams, and ship together.",
    status: "BUILDING",
    tags: ["Platform", "Open Source", "Community"],
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    members: [
      { builderId: "b1", role: "Lead Engineer", joinedAt: "2024-08-15" },
      { builderId: "b2", role: "Lead Designer", joinedAt: "2024-09-01" },
      { builderId: "b6", role: "Product Manager", joinedAt: "2024-09-15" }
    ],
    ownerId: "b1",
    repoUrl: "github.com/init-network/platform",
    coverColor: "#1A2535",
    createdAt: "2024-08-15",
    updatedAt: "2024-12-01",
    teamId: "t1"
  },
  {
    id: "p2",
    title: "Campus AI Assistant",
    tagline: "AI agent for campus navigation",
    description:
      "An open-source AI agent that helps students navigate campus resources, deadlines, clubs, and opportunities. Powered by RAG over institutional data.",
    status: "BETA",
    tags: ["AI/ML", "Open Source", "Student Tools"],
    techStack: ["Python", "LangChain", "FastAPI", "React"],
    members: [
      { builderId: "b1", role: "Frontend", joinedAt: "2024-10-01" },
      { builderId: "b3", role: "ML Lead", joinedAt: "2024-10-01" }
    ],
    ownerId: "b3",
    repoUrl: "github.com/davidkim-ml/campus-ai",
    demoUrl: "campus-ai.vercel.app",
    coverColor: "#1A2030",
    createdAt: "2024-10-01",
    updatedAt: "2024-12-10",
    teamId: "t2"
  },
  {
    id: "p3",
    title: "Motif UI",
    tagline: "Design system for student builders",
    description:
      "A minimal, accessible component library and design system built specifically for student projects. Prioritizes clarity, speed, and beauty.",
    status: "SHIPPED",
    tags: ["Design System", "Open Source", "Frontend"],
    techStack: ["React", "TypeScript", "Storybook", "Figma"],
    members: [
      { builderId: "b2", role: "Design Lead", joinedAt: "2024-07-01" },
      { builderId: "b4", role: "Engineering Lead", joinedAt: "2024-07-01" }
    ],
    ownerId: "b2",
    repoUrl: "github.com/motif-ui/core",
    demoUrl: "motif.design",
    coverColor: "#1F1A2A",
    createdAt: "2024-07-01",
    updatedAt: "2024-11-15"
  },
  {
    id: "p4",
    title: "Synapse",
    tagline: "High-performance study group tool",
    description:
      "A lightweight, real-time collaboration platform for study groups. Built for low-latency, designed for focus. No bloat.",
    status: "BUILDING",
    tags: ["Collaboration", "Real-time", "EdTech"],
    techStack: ["Go", "Rust", "WebSockets", "React"],
    members: [
      { builderId: "b3", role: "Backend AI", joinedAt: "2024-11-01" },
      { builderId: "b5", role: "Systems Lead", joinedAt: "2024-11-01" }
    ],
    ownerId: "b5",
    coverColor: "#1A2020",
    createdAt: "2024-11-01",
    updatedAt: "2024-12-05",
    teamId: "t3"
  },
  {
    id: "p5",
    title: "GrantFinder",
    tagline: "Discover funding for student projects",
    description:
      "An aggregator and matching engine that helps student builders find relevant grants, fellowships, and funding opportunities for their projects.",
    status: "IDEA",
    tags: ["Student Tools", "Funding", "Data"],
    techStack: ["Python", "React", "Vector DB"],
    members: [{ builderId: "b6", role: "Founder", joinedAt: "2024-12-01" }],
    ownerId: "b6",
    coverColor: "#251A1A",
    createdAt: "2024-12-01",
    updatedAt: "2024-12-01"
  }
];

export const mockTeams: Team[] = [
  {
    id: "t1",
    name: "INIT Core Team",
    description:
      "The team building the INIT platform infrastructure itself.",
    projectId: "p1",
    memberIds: ["b1", "b2", "b6"],
    openRoles: ["DevOps Engineer", "Backend Engineer"],
    createdAt: "2024-08-15"
  },
  {
    id: "t2",
    name: "Campus AI Team",
    description: "Building the Campus AI Assistant.",
    projectId: "p2",
    memberIds: ["b1", "b3"],
    openRoles: ["Frontend Engineer", "Product Designer"],
    createdAt: "2024-10-01"
  },
  {
    id: "t3",
    name: "Synapse Team",
    description: "Building a high-performance real-time collaboration tool.",
    projectId: "p4",
    memberIds: ["b3", "b5"],
    openRoles: ["Frontend Engineer", "Mobile Developer"],
    createdAt: "2024-11-01"
  }
];

export const mockContributions: Contribution[] = [
  {
    id: "c1",
    builderId: "b1",
    projectId: "p1",
    type: "CODE",
    title: "Built the dashboard shell",
    description: "Implemented the full authenticated app shell with sidebar, routing, and responsive navigation.",
    date: "2024-12-05"
  },
  {
    id: "c2",
    builderId: "b2",
    projectId: "p1",
    type: "DESIGN",
    title: "INIT Design System v1",
    description: "Created the complete design system documentation and component specs for the INIT platform.",
    date: "2024-11-20"
  },
  {
    id: "c3",
    builderId: "b3",
    projectId: "p2",
    type: "CODE",
    title: "RAG pipeline for campus data",
    description: "Built the ingestion pipeline and retrieval system for institutional data sources.",
    date: "2024-11-15"
  },
  {
    id: "c4",
    builderId: "b3",
    projectId: "p4",
    type: "CODE",
    title: "AI summarization module",
    description: "Integrated AI-powered session summaries into the Synapse collaboration tool.",
    date: "2024-12-01"
  },
  {
    id: "c5",
    builderId: "b4",
    projectId: "p3",
    type: "CODE",
    title: "Animation system",
    description: "Built the core animation primitives for the Motif UI design system.",
    date: "2024-10-30"
  },
  {
    id: "c6",
    builderId: "b5",
    projectId: "p4",
    type: "CODE",
    title: "WebSocket server implementation",
    description: "High-performance Go-based WebSocket server with <10ms round-trip latency.",
    date: "2024-12-03"
  }
];

// ─── CONVENIENCE HELPERS ──────────────────────────────────────────────────────

export const currentUser = mockBuilders.find((b) => b.isCurrentUser) as Builder;

export function getBuilderById(id: string): Builder | undefined {
  return mockBuilders.find((b) => b.id === id);
}

export function getProjectById(id: string): Project | undefined {
  return mockProjects.find((p) => p.id === id);
}

export function getTeamById(id: string): Team | undefined {
  return mockTeams.find((t) => t.id === id);
}

export function getProjectsForBuilder(builderId: string): Project[] {
  return mockProjects.filter((p) =>
    p.members.some((m) => m.builderId === builderId)
  );
}

export function getContributionsForBuilder(builderId: string): Contribution[] {
  return mockContributions.filter((c) => c.builderId === builderId);
}

export const statusColors: Record<ProjectStatus, string> = {
  IDEA: "#555",
  VALIDATING: "#7A6A20",
  BUILDING: "#1A4A7A",
  BETA: "#3A4A1A",
  SHIPPED: "#1A5A3A",
  MAINTAINED: "#3A2A5A"
};

export const statusTextColors: Record<ProjectStatus, string> = {
  IDEA: "#999",
  VALIDATING: "#C9A830",
  BUILDING: "#4A9ACA",
  BETA: "#7ABA3A",
  SHIPPED: "#3ACA7A",
  MAINTAINED: "#9A6ACA"
};
