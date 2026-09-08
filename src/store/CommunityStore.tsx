import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  mockCommunityPosts,
  mockDiscussions,
  mockDiscussionComments,
  mockMentors,
  mockAnnouncements,
  mockCommunityChannels,
  mockCommunityChapters,
  type CommunityPost,
  type Discussion,
  type DiscussionComment,
  type Mentor,
  type Announcement,
  type CommunityChannel,
  type ChapterCommunity,
  type ReactionType,
  type ConnectionStatus,
} from "@/data/communityMock";
import { currentUser } from "@/data/mock";

// ─── CONTEXT INTERFACE ─────────────────────────────────────────────────────────

export interface CommunityStoreContextType {
  posts: CommunityPost[];
  discussions: Discussion[];
  comments: DiscussionComment[];
  mentors: Mentor[];
  announcements: Announcement[];
  channels: CommunityChannel[];
  chapters: ChapterCommunity[];
  memberConnections: Record<string, ConnectionStatus>;
  mentorshipRequests: Record<
    string,
    { topic: string; note: string; requestedAt: string; status: "SENT" }
  >;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedSort: "recent" | "top" | "active";
  setSelectedSort: (s: "recent" | "top" | "active") => void;

  // Actions
  createPost: (
    newPost: Omit<
      CommunityPost,
      | "id"
      | "createdAt"
      | "reactions"
      | "userReactions"
      | "commentsCount"
      | "isSaved"
      | "authorId"
      | "authorName"
      | "authorRole"
      | "authorAvatar"
      | "authorCampus"
    >
  ) => void;
  createDiscussion: (
    newDisc: Omit<
      Discussion,
      | "id"
      | "createdAt"
      | "upvotes"
      | "userUpvoted"
      | "commentsCount"
      | "isSaved"
      | "authorId"
      | "authorName"
      | "authorRole"
      | "authorAvatar"
      | "authorCampus"
    >
  ) => void;
  addComment: (discussionId: string, content: string, parentId?: string) => void;
  toggleReaction: (postId: string, type: ReactionType) => void;
  toggleSavePost: (postId: string) => void;
  toggleUpvoteDiscussion: (discussionId: string) => void;
  toggleSaveDiscussion: (discussionId: string) => void;
  toggleUpvoteComment: (commentId: string) => void;
  toggleReactionAnnouncement: (
    announcementId: string,
    type: "fire" | "rocket" | "heart"
  ) => void;
  toggleSaveAnnouncement: (announcementId: string) => void;
  connectMember: (builderId: string) => void;
  requestMentorship: (mentorId: string, topic: string, note: string) => void;
}

const CommunityStoreContext = createContext<CommunityStoreContextType | null>(
  null
);

// ─── PROVIDER COMPONENT ───────────────────────────────────────────────────────

export function CommunityStoreProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<CommunityPost[]>(mockCommunityPosts);
  const [discussions, setDiscussions] = useState<Discussion[]>(mockDiscussions);
  const [comments, setComments] =
    useState<DiscussionComment[]>(mockDiscussionComments);
  const [mentors] = useState<Mentor[]>(mockMentors);
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(mockAnnouncements);
  const [channels] = useState<CommunityChannel[]>(mockCommunityChannels);
  const [chapters] = useState<ChapterCommunity[]>(mockCommunityChapters);

  // Connection status map for builders
  const [memberConnections, setMemberConnections] = useState<
    Record<string, ConnectionStatus>
  >({
    b2: "CONNECTED",
    b3: "PENDING",
  });

  // Mentorship inquiries map
  const [mentorshipRequests, setMentorshipRequests] = useState<
    Record<
      string,
      { topic: string; note: string; requestedAt: string; status: "SENT" }
    >
  >({});

  // Global filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedSort, setSelectedSort] = useState<"recent" | "top" | "active">(
    "recent"
  );

  // ─── ACTIONS ────────────────────────────────────────────────────────────────

  const createPost = useCallback(
    (
      newPost: Omit<
        CommunityPost,
        | "id"
        | "createdAt"
        | "reactions"
        | "userReactions"
        | "commentsCount"
        | "isSaved"
        | "authorId"
        | "authorName"
        | "authorRole"
        | "authorAvatar"
        | "authorCampus"
      >
    ) => {
      const created: CommunityPost = {
        ...newPost,
        id: `post-${Date.now()}`,
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorRole: currentUser.role,
        authorAvatar: currentUser.avatar,
        authorCampus: currentUser.campus,
        createdAt: "Just now",
        reactions: { like: 1, fire: 0, rocket: 0, insightful: 0 },
        userReactions: ["like"],
        commentsCount: 0,
        isSaved: false,
      };
      setPosts((prev) => [created, ...prev]);
    },
    []
  );

  const createDiscussion = useCallback(
    (
      newDisc: Omit<
        Discussion,
        | "id"
        | "createdAt"
        | "upvotes"
        | "userUpvoted"
        | "commentsCount"
        | "isSaved"
        | "authorId"
        | "authorName"
        | "authorRole"
        | "authorAvatar"
        | "authorCampus"
      >
    ) => {
      const created: Discussion = {
        ...newDisc,
        id: `disc-${Date.now()}`,
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorRole: currentUser.role,
        authorAvatar: currentUser.avatar,
        authorCampus: currentUser.campus,
        createdAt: "Just now",
        upvotes: 1,
        userUpvoted: true,
        commentsCount: 0,
        isSaved: false,
      };
      setDiscussions((prev) => [created, ...prev]);
    },
    []
  );

  const addComment = useCallback(
    (discussionId: string, content: string, parentId?: string) => {
      const newComment: DiscussionComment = {
        id: `comm-${Date.now()}`,
        discussionId,
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorRole: currentUser.role,
        authorAvatar: currentUser.avatar,
        authorCampus: currentUser.campus,
        createdAt: "Just now",
        content,
        upvotes: 0,
        userUpvoted: false,
        parentId,
      };

      setComments((prev) => [...prev, newComment]);
      setDiscussions((prev) =>
        prev.map((d) =>
          d.id === discussionId
            ? { ...d, commentsCount: d.commentsCount + 1 }
            : d
        )
      );
    },
    []
  );

  const toggleReaction = useCallback((postId: string, type: ReactionType) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const hasReacted = post.userReactions.includes(type);
        const nextUserReactions = hasReacted
          ? post.userReactions.filter((r) => r !== type)
          : [...post.userReactions, type];
        const nextCount = Math.max(
          0,
          (post.reactions[type] || 0) + (hasReacted ? -1 : 1)
        );

        return {
          ...post,
          reactions: {
            ...post.reactions,
            [type]: nextCount,
          },
          userReactions: nextUserReactions,
        };
      })
    );
  }, []);

  const toggleSavePost = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isSaved: !p.isSaved } : p))
    );
  }, []);

  const toggleUpvoteDiscussion = useCallback((discussionId: string) => {
    setDiscussions((prev) =>
      prev.map((disc) => {
        if (disc.id !== discussionId) return disc;
        const nextUpvoted = !disc.userUpvoted;
        return {
          ...disc,
          userUpvoted: nextUpvoted,
          upvotes: disc.upvotes + (nextUpvoted ? 1 : -1),
        };
      })
    );
  }, []);

  const toggleSaveDiscussion = useCallback((discussionId: string) => {
    setDiscussions((prev) =>
      prev.map((d) =>
        d.id === discussionId ? { ...d, isSaved: !d.isSaved } : d
      )
    );
  }, []);

  const toggleUpvoteComment = useCallback((commentId: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== commentId) return c;
        const nextUpvoted = !c.userUpvoted;
        return {
          ...c,
          userUpvoted: nextUpvoted,
          upvotes: c.upvotes + (nextUpvoted ? 1 : -1),
        };
      })
    );
  }, []);

  const toggleReactionAnnouncement = useCallback(
    (announcementId: string, type: "fire" | "rocket" | "heart") => {
      setAnnouncements((prev) =>
        prev.map((ann) => {
          if (ann.id !== announcementId) return ann;
          const nextReacted = !ann.userReacted;
          return {
            ...ann,
            userReacted: nextReacted,
            reactions: {
              ...ann.reactions,
              [type]: ann.reactions[type] + (nextReacted ? 1 : -1),
            },
          };
        })
      );
    },
    []
  );

  const toggleSaveAnnouncement = useCallback((announcementId: string) => {
    setAnnouncements((prev) =>
      prev.map((ann) =>
        ann.id === announcementId ? { ...ann, isSaved: !ann.isSaved } : ann
      )
    );
  }, []);

  const connectMember = useCallback((builderId: string) => {
    setMemberConnections((prev) => {
      const current = prev[builderId] || "CONNECT";
      let nextStatus: ConnectionStatus = "PENDING";
      if (current === "CONNECT") nextStatus = "PENDING";
      else if (current === "PENDING") nextStatus = "CONNECTED";
      else nextStatus = "CONNECT";

      return {
        ...prev,
        [builderId]: nextStatus,
      };
    });
  }, []);

  const requestMentorship = useCallback(
    (mentorId: string, topic: string, note: string) => {
      setMentorshipRequests((prev) => ({
        ...prev,
        [mentorId]: {
          topic,
          note,
          requestedAt: "Just now",
          status: "SENT",
        },
      }));
    },
    []
  );

  return (
    <CommunityStoreContext.Provider
      value={{
        posts,
        discussions,
        comments,
        mentors,
        announcements,
        channels,
        chapters,
        memberConnections,
        mentorshipRequests,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedSort,
        setSelectedSort,
        createPost,
        createDiscussion,
        addComment,
        toggleReaction,
        toggleSavePost,
        toggleUpvoteDiscussion,
        toggleSaveDiscussion,
        toggleUpvoteComment,
        toggleReactionAnnouncement,
        toggleSaveAnnouncement,
        connectMember,
        requestMentorship,
      }}
    >
      {children}
    </CommunityStoreContext.Provider>
  );
}

export function useCommunityStore() {
  const context = useContext(CommunityStoreContext);
  if (!context) {
    throw new Error(
      "useCommunityStore must be used within a CommunityStoreProvider"
    );
  }
  return context;
}
