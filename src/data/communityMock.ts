import { mockBuilders, mockProjects, type Builder } from "./mock";
import { externalLinks, initData } from "./init";

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type PostCategory =
  | "ALL"
  | "BUILDER_UPDATE"
  | "QUESTION"
  | "PROJECT_UPDATE"
  | "ANNOUNCEMENT"
  | "GENERAL";

export type DiscussionCategory =
  | "Building"
  | "AI / ML"
  | "Web"
  | "Open Source"
  | "Projects"
  | "Learning"
  | "Career"
  | "INIT"
  | "General";

export type ReactionType = "like" | "fire" | "rocket" | "insightful";

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorCampus: string;
  authorAvatar: string;
  createdAt: string;
  content: string;
  category: PostCategory;
  projectId?: string;
  projectTitle?: string;
  reactions: Record<ReactionType, number>;
  userReactions: ReactionType[];
  commentsCount: number;
  isSaved: boolean;
  tags: string[];
}

export interface DiscussionComment {
  id: string;
  discussionId: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  authorCampus: string;
  createdAt: string;
  content: string;
  upvotes: number;
  userUpvoted: boolean;
  parentId?: string; // for nested replies
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  category: DiscussionCategory;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  authorCampus: string;
  createdAt: string;
  upvotes: number;
  userUpvoted: boolean;
  commentsCount: number;
  isSaved: boolean;
  tags: string[];
  projectId?: string;
  projectTitle?: string;
  isPinned?: boolean;
}

export type ConnectionStatus = "CONNECT" | "PENDING" | "CONNECTED";

export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  role: string;
  organization: string;
  expertise: string[];
  skills: string[];
  bio: string;
  projectInterests: string[];
  availability: string;
  status: "AVAILABLE" | "OFFICE_HOURS" | "BUSY";
  sessionsGiven: number;
}

export interface Announcement {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  priority: "FEATURED" | "NORMAL";
  date: string;
  author: string;
  authorRole: string;
  content: string;
  ctaLabel?: string;
  ctaLink?: string;
  reactions: { fire: number; rocket: number; heart: number };
  userReacted?: boolean;
  isSaved?: boolean;
}

export interface CommunityChannel {
  id: "whatsapp" | "discord";
  name: string;
  icon: "whatsapp" | "discord";
  description: string;
  membersCount: string;
  activeCount: string;
  joinUrl: string;
  ctaText: string;
  note: string;
}

export interface ChapterCommunity {
  id: string;
  name: string;
  code: string;
  campus: string;
  leadId: string;
  leadName: string;
  leadAvatar: string;
  leadRole: string;
  membersCount: number;
  projectsCount: number;
  events: Array<{
    title: string;
    date: string;
    type: "IN-PERSON" | "ONLINE" | "BUILD NIGHT";
  }>;
  recentActivity: string;
}

// ─── MOCK POSTS ───────────────────────────────────────────────────────────────

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: "post-1",
    authorId: "b3",
    authorName: "David Kim",
    authorRole: "ML ENGINEER",
    authorCampus: "UC Berkeley",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    createdAt: "15m ago",
    category: "PROJECT_UPDATE",
    projectId: "p2",
    projectTitle: "CampusOS",
    content:
      "Just shipped the initial vector embeddings pipeline for CampusOS search indexing! We benchmarked Qdrant vs pgvector across 12 campus nodes and pgvector with HNSW indexing came out with 18ms latency at p95. Would love thoughts from anyone running low-memory embeddings on edge nodes.",
    reactions: { like: 14, fire: 8, rocket: 11, insightful: 6 },
    userReactions: ["rocket"],
    commentsCount: 7,
    isSaved: false,
    tags: ["pgvector", "embeddings", "performance", "search"],
  },
  {
    id: "post-2",
    authorId: "b2",
    authorName: "Sarah Chen",
    authorRole: "DESIGNER",
    authorCampus: "MIT",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    createdAt: "1h ago",
    category: "BUILDER_UPDATE",
    projectId: "p1",
    projectTitle: "AI Research Lab",
    content:
      "Explored a dark-glass interaction model for agent thought inspection. Instead of showing raw terminal logs, we render streaming AST tokens with restrained chromatic aberration on hover. Tested with 8 builders yesterday and the mental model clarity went way up.",
    reactions: { like: 22, fire: 19, rocket: 9, insightful: 15 },
    userReactions: ["like", "fire"],
    commentsCount: 12,
    isSaved: true,
    tags: ["UI/UX", "Design Systems", "Agentic UI"],
  },
  {
    id: "post-3",
    authorId: "b4",
    authorName: "Emily Wang",
    authorRole: "FRONTEND",
    authorCampus: "University of Waterloo",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    createdAt: "3h ago",
    category: "QUESTION",
    content:
      "Question for developers doing 3D viewport canvas transitions: how are you preventing GPU context loss when unmounting WebGL canvases in multi-route SPAs without creating a lingering 60FPS render loop? Looking at three-stdlib disposal patterns.",
    reactions: { like: 9, fire: 2, rocket: 5, insightful: 8 },
    userReactions: [],
    commentsCount: 9,
    isSaved: false,
    tags: ["Three.js", "WebGL", "React", "Optimization"],
  },
  {
    id: "post-4",
    authorId: "b5",
    authorName: "Marcus Lee",
    authorRole: "BACKEND",
    authorCampus: "Carnegie Mellon",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    createdAt: "5h ago",
    category: "BUILDER_UPDATE",
    projectId: "p4",
    projectTitle: "Build Week / 04",
    content:
      "Wrote a lightweight Raft consensus mock in Rust for our decentralized telemetry study. 450 lines of code, zero async runtimes, purely event-loop driven over TCP. Preparing an open architecture teardown for next week's INIT Labs session.",
    reactions: { like: 31, fire: 24, rocket: 16, insightful: 19 },
    userReactions: ["fire"],
    commentsCount: 14,
    isSaved: true,
    tags: ["Rust", "Distributed Systems", "Consensus"],
  },
  {
    id: "post-5",
    authorId: "b6",
    authorName: "Priya Sharma",
    authorRole: "FULLSTACK",
    authorCampus: "IIT Bombay",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    createdAt: "8h ago",
    category: "PROJECT_UPDATE",
    projectId: "p3",
    projectTitle: "Open Source Sprint",
    content:
      "Milestone reached: the Open Source Sprint repo has merged 40 pull requests in under 72 hours! Proud of everyone who submitted their very first upstream pull request this morning. The telemetry dashboard is live in Showcase.",
    reactions: { like: 45, fire: 38, rocket: 27, insightful: 12 },
    userReactions: ["rocket"],
    commentsCount: 16,
    isSaved: false,
    tags: ["Milestone", "OpenSource", "Sprint", "Showcase"],
  },
  {
    id: "post-6",
    authorId: "b8",
    authorName: "Maya Patel",
    authorRole: "RESEARCHER",
    authorCampus: "Georgia Tech",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    createdAt: "12h ago",
    category: "ANNOUNCEMENT",
    content:
      "INIT Bengaluru & Delhi chapters are co-hosting a weekend peer-review jam for hardware & physical computing builders. If you are experimenting with microcontrollers, robotics, or spatial interaction, submit your demo link!",
    reactions: { like: 18, fire: 11, rocket: 14, insightful: 7 },
    userReactions: [],
    commentsCount: 5,
    isSaved: false,
    tags: ["Chapters", "Robotics", "Hardware", "Jam"],
  },
];

// ─── MOCK DISCUSSIONS ─────────────────────────────────────────────────────────

export const mockDiscussions: Discussion[] = [
  {
    id: "disc-1",
    title: "Best practices for architecting real-time collaboration with CRDTs in browser-first tools",
    content:
      "We've been prototyping collaborative node graphs for INIT Canvas. Yjs has fantastic ecosystem integration, but Automerge 2.0 with the Rust WASM core is yielding significantly faster compaction on large document histories. What tradeoffs have you experienced when scaling to 50+ concurrent editors?",
    category: "Building",
    authorId: "b1",
    authorName: "Alex Developer",
    authorRole: "FULLSTACK",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    authorCampus: "Stanford University",
    createdAt: "2h ago",
    upvotes: 28,
    userUpvoted: true,
    commentsCount: 8,
    isSaved: true,
    tags: ["CRDT", "Yjs", "Automerge", "Wasm"],
    projectId: "p1",
    projectTitle: "AI Research Lab",
    isPinned: true,
  },
  {
    id: "disc-2",
    title: "How are you evaluating LLM output reliably without relying exclusively on expensive LLM-as-a-judge?",
    content:
      "Automated evaluation is currently the biggest bottleneck in shipping reliable agentic workflows. We have tested heuristic unit tests, AST parsers for code output, and embedding similarity against golden sets. What custom benchmark suites have given you high-confidence signals before deployment?",
    category: "AI / ML",
    authorId: "b3",
    authorName: "David Kim",
    authorRole: "ML ENGINEER",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    authorCampus: "UC Berkeley",
    createdAt: "6h ago",
    upvotes: 41,
    userUpvoted: false,
    commentsCount: 15,
    isSaved: false,
    tags: ["Evals", "LLMs", "Agents", "Testing"],
    projectId: "p2",
    projectTitle: "CampusOS",
  },
  {
    id: "disc-3",
    title: "Designing ultra-dense developer UI: how to balance technical information density with modern typography",
    content:
      "Modern devtools (Linear, Raycast, Cursor, Supabase) prioritize high-density data tables, keyboard shortcuts, and minimal padding. When building INIT interfaces, how do we honor the Instrument Serif moments without compromising the fast, compact DM Mono telemetry readouts?",
    category: "Web",
    authorId: "b2",
    authorName: "Sarah Chen",
    authorRole: "DESIGNER",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    authorCampus: "MIT",
    createdAt: "1d ago",
    upvotes: 35,
    userUpvoted: true,
    commentsCount: 11,
    isSaved: true,
    tags: ["Typography", "Design", "DevTools", "UI"],
  },
  {
    id: "disc-4",
    title: "Open Source licensing choices for student research projects looking to transition into sustainable ventures",
    content:
      "When starting out on GitHub as an INIT project, AGPLv3 guarantees open-source commons protection, but Apache 2.0 / MIT enables faster adoption by enterprise pilots. If you're building a developer infrastructure tool, at what stage do you define your BSL / dual-license strategy?",
    category: "Open Source",
    authorId: "b5",
    authorName: "Marcus Lee",
    authorRole: "BACKEND",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    authorCampus: "Carnegie Mellon",
    createdAt: "2d ago",
    upvotes: 19,
    userUpvoted: false,
    commentsCount: 6,
    isSaved: false,
    tags: ["OpenSource", "Licensing", "Founders"],
  },
  {
    id: "disc-5",
    title: "What is your transition playbook from prototype code to clean monorepo architecture?",
    content:
      "During hackathons and Build Weeks, speed is everything. But when transitioning into a maintained project on INIT Platform, what tooling stack do you swear by for monorepo ergonomics? Currently weighing Turborepo + pnpm vs Bun workspaces.",
    category: "Projects",
    authorId: "b6",
    authorName: "Priya Sharma",
    authorRole: "FULLSTACK",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    authorCampus: "IIT Bombay",
    createdAt: "3d ago",
    upvotes: 24,
    userUpvoted: false,
    commentsCount: 9,
    isSaved: false,
    tags: ["Monorepo", "Turborepo", "Architecture"],
  },
  {
    id: "disc-6",
    title: "How to run an effective weekly builder sync for distributed student teams across timezones",
    content:
      "Our core team spans India, US East Coast, and Europe. Synchronous meetings are painful. We shifted to async Loom videos with written Notion summaries, plus a 25-minute Friday demo call. What rituals keep your campus builders engaged without meeting fatigue?",
    category: "INIT",
    authorId: "b7",
    authorName: "Lucas Silva",
    authorRole: "PM",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
    authorCampus: "University of Toronto",
    createdAt: "4d ago",
    upvotes: 32,
    userUpvoted: false,
    commentsCount: 14,
    isSaved: false,
    tags: ["Culture", "Rituals", "RemoteWork"],
  },
];

// ─── MOCK COMMENTS ───────────────────────────────────────────────────────────

export const mockDiscussionComments: DiscussionComment[] = [
  {
    id: "comm-1",
    discussionId: "disc-1",
    authorId: "b5",
    authorName: "Marcus Lee",
    authorRole: "BACKEND",
    authorCampus: "Carnegie Mellon",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    createdAt: "1h ago",
    content:
      "We tested Automerge 2.0 with wasm-pack in our distributed telemetry testbed. The binary size footprint is approximately 1.2MB gzipped, which is slightly heavier than Yjs, but the document history compression was ~3.4x more compact. If your nodes have intermittent offline sync, Automerge's sync protocol is notably cleaner.",
    upvotes: 12,
    userUpvoted: true,
  },
  {
    id: "comm-2",
    discussionId: "disc-1",
    authorId: "b4",
    authorName: "Emily Wang",
    authorRole: "FRONTEND",
    authorCampus: "University of Waterloo",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    createdAt: "45m ago",
    content:
      "From a React reactivity standpoint, Yjs has `y-indexeddb` and seamless bindings with Zustand. If you go the Automerge route, you'll likely need a custom `useSyncExternalStore` adapter to prevent rerenders of non-mutated graph nodes.",
    upvotes: 7,
    userUpvoted: false,
    parentId: "comm-1",
  },
  {
    id: "comm-3",
    discussionId: "disc-2",
    authorId: "b8",
    authorName: "Maya Patel",
    authorRole: "RESEARCHER",
    authorCampus: "Georgia Tech",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    createdAt: "4h ago",
    content:
      "We built a deterministic rule validator using tree-sitter queries over the generated code. It catches syntax errors, missing null guards, and unwanted dependency imports in 4 milliseconds without touching an external API. Highly recommend hybrid deterministic checks before LLM grading.",
    upvotes: 18,
    userUpvoted: true,
  },
  {
    id: "comm-4",
    discussionId: "disc-3",
    authorId: "b1",
    authorName: "Alex Developer",
    authorRole: "FULLSTACK",
    authorCampus: "Stanford University",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    createdAt: "20h ago",
    content:
      "The key is using Instrument Serif strictly for titles, category highlights, and editorial moments, while numbers, hashes, timestamps, and commit tags strictly stay DM Mono. That contrast creates the signature INIT aesthetic: deeply technical yet refined.",
    upvotes: 14,
    userUpvoted: false,
  },
];

// ─── MOCK MENTORS ─────────────────────────────────────────────────────────────

export const mockMentors: Mentor[] = [
  {
    id: "m1",
    name: "Arjun Mehta",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunM",
    role: "Staff Infrastructure Engineer",
    organization: "Distributed Systems Lab / Ex-Stripe",
    expertise: ["Distributed Systems", "Database Internals", "Go / Rust", "Cloud Architecture"],
    skills: ["PostgreSQL", "Raft", "Kubernetes", "gRPC"],
    bio: "10+ years designing high-throughput payment rails and distributed consensus engines. Passionate about helping university builders transition prototypes into production-grade systems.",
    projectInterests: ["Decentralized infrastructure", "Local-first data", "Edge compute"],
    availability: "Available for 1:1 Architecture Reviews",
    status: "AVAILABLE",
    sessionsGiven: 42,
  },
  {
    id: "m2",
    name: "Elena Rostova",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ElenaR",
    role: "Principal AI Research Scientist",
    organization: "Autonomous Agents Institute",
    expertise: ["Agent Architectures", "Reasoning Models", "Evals & Benchmarks", "PyTorch"],
    skills: ["RLHF", "DSPy", "Model Distillation", "CUDA"],
    bio: "Leading research on verifiable autonomous agents and synthetic data flywheels. Mentors INIT founders on evaluation rigour and applied research formulation.",
    projectInterests: ["Code synthesis", "Scientific discovery agents", "Multi-modal UI"],
    availability: "Office Hours every Thursday 6 PM IST",
    status: "OFFICE_HOURS",
    sessionsGiven: 68,
  },
  {
    id: "m3",
    name: "Karan Singhania",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=KaranS",
    role: "Design Partner & Angel Investor",
    organization: "FirstPrinciples Studio",
    expertise: ["Product Strategy", "Interaction Design", "Storytelling", "Go-To-Market"],
    skills: ["Figma", "Design Systems", "Prototyping", "Pitch Strategy"],
    bio: "Helped scale 4 developer-tool companies from zero to Series B. Focuses on design ergonomics, landing page narrative, and building sticky developer loops.",
    projectInterests: ["Developer experience", "Creative coding", "Command-bar interfaces"],
    availability: "Reviewing pitch decks & UI teasers",
    status: "AVAILABLE",
    sessionsGiven: 51,
  },
  {
    id: "m4",
    name: "Dr. Rachel Thorne",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RachelT",
    role: "Head of Open Source Security",
    organization: "Commons Defense Project",
    expertise: ["Application Security", "Cryptographic Protocols", "Supply Chain Sec"],
    skills: ["Rust", "Zero Knowledge", "Formal Verification", "Wasm"],
    bio: "Auditor and security researcher specializing in open-source dependencies, cryptographic primitives, and secure sandboxing.",
    projectInterests: ["Privacy-preserving tools", "Hardware security keys", "Decentralized auth"],
    availability: "Next slots open next Monday",
    status: "BUSY",
    sessionsGiven: 39,
  },
];

// ─── MOCK ANNOUNCEMENTS ───────────────────────────────────────────────────────

export const mockAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "INIT Build Night / 05 — The Ship Constraint",
    tagline: "48 hours. One constraint: Put working software on the internet.",
    badge: "FLAGSHIP EVENT",
    priority: "FEATURED",
    date: "SEPTEMBER 18, 2026",
    author: "Aryan Vishwakarma",
    authorRole: "INIT CORE",
    content:
      "The next global INIT Build Night is happening in-person across our Bengaluru, Delhi, Mumbai, and Stanford campus chapters, alongside a 24-hour global virtual war-room on Discord. Teams will build and ship live applications to the INIT Showcase, reviewed by guest mentors from Stripe, Vercel, and Figma.",
    ctaLabel: "RSVP on Chapter Hub",
    ctaLink: "#chapters",
    reactions: { fire: 84, rocket: 63, heart: 49 },
    userReacted: true,
    isSaved: true,
  },
  {
    id: "ann-2",
    title: "INIT Fellowship & Micro-Grant Program: Cohort 02 Open",
    tagline: "Up to $2,500 non-dilutive grants for student teams building open protocols.",
    badge: "GRANTS & FUNDING",
    priority: "FEATURED",
    date: "SEPTEMBER 12, 2026",
    author: "INIT Fellowship Board",
    authorRole: "GOVERNANCE",
    content:
      "Applications are officially open for Cohort 02. We fund audacious software prototypes, developer primitives, and research explorations that are built open-source. Recipients gain direct 1:1 mentorship from industry partners and zero-fee cloud credits via AWS and Vercel.",
    ctaLabel: "View Application Details",
    ctaLink: "/app/showcase",
    reactions: { fire: 58, rocket: 92, heart: 37 },
    userReacted: false,
    isSaved: false,
  },
  {
    id: "ann-3",
    title: "New Open Source Bounties Released on INIT Network",
    tagline: "12 funded issues across CampusOS and AI Research Lab.",
    badge: "BOUNTIES",
    priority: "NORMAL",
    date: "SEPTEMBER 05, 2026",
    author: "CampusOS Core",
    authorRole: "MAINTAINERS",
    content:
      "We have curated 12 'good first issue' and 'deep architecture' bounties on the INIT GitHub repository. Whether you want to implement Rust bindings, improve our GSAP micro-animations, or optimize vector retrieval, head to the Projects tab to contribute.",
    ctaLabel: "Explore Bounties",
    ctaLink: "/app/projects",
    reactions: { fire: 42, rocket: 39, heart: 28 },
    userReacted: false,
    isSaved: false,
  },
];

// ─── MOCK CHANNELS ────────────────────────────────────────────────────────────

export const mockCommunityChannels: CommunityChannel[] = [
  {
    id: "whatsapp",
    name: "INIT WhatsApp Community",
    icon: "whatsapp",
    description:
      "Direct chapter announcements, quick campus broadcast alerts, and local city meetup coordination rooms.",
    membersCount: "2,400+ builders",
    activeCount: "12 active campus rooms",
    joinUrl: externalLinks.join,
    ctaText: "Join WhatsApp Community",
    note: "Official campus announcement broadcast & regional rooms",
  },
  {
    id: "discord",
    name: "INIT Discord War Room",
    icon: "discord",
    description:
      "24/7 technical voice rooms, live pair programming channels, AI/ML paper reading sessions, and open project feedback.",
    membersCount: "4,850+ members",
    activeCount: "320 builders online now",
    joinUrl: externalLinks.discord,
    ctaText: "Enter Discord Server",
    note: "Voice stages, code review threads & virtual co-working",
  },
];

// ─── MOCK CHAPTERS ────────────────────────────────────────────────────────────

export const mockCommunityChapters: ChapterCommunity[] = [
  {
    id: "chap-blr",
    name: "INIT Bengaluru Chapter",
    code: "BLR / 001",
    campus: "PES University, RVCE, IIIT-B & IISc",
    leadId: "b6",
    leadName: "Priya Sharma",
    leadAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    leadRole: "Chapter Lead & Fullstack Builder",
    membersCount: 142,
    projectsCount: 18,
    events: [
      { title: "Koramangala Build Jam / 03", date: "Sep 20, 2026", type: "IN-PERSON" },
      { title: "Systems Architecture Sync", date: "Oct 02, 2026", type: "BUILD NIGHT" },
    ],
    recentActivity: "Shipped 4 collaborative PRs to CampusOS this week.",
  },
  {
    id: "chap-del",
    name: "INIT Delhi NCR Chapter",
    code: "DEL / 002",
    campus: "IIT Delhi, DTU, NSUT & IIITD",
    leadId: "b5",
    leadName: "Marcus Lee",
    leadAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    leadRole: "Chapter Lead & Backend Architect",
    membersCount: 118,
    projectsCount: 14,
    events: [
      { title: "Open Source Hack Sprint", date: "Sep 24, 2026", type: "IN-PERSON" },
      { title: "Rust & Distributed Systems Teardown", date: "Oct 08, 2026", type: "ONLINE" },
    ],
    recentActivity: "Hosted 28 builders for autonomous agent benchmarking.",
  },
  {
    id: "chap-bom",
    name: "INIT Mumbai Chapter",
    code: "BOM / 003",
    campus: "IIT Bombay, VJTI & SPIT",
    leadId: "b8",
    leadName: "Maya Patel",
    leadAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    leadRole: "Chapter Lead & AI Researcher",
    membersCount: 96,
    projectsCount: 11,
    events: [
      { title: "Powai Founders & Builders Circle", date: "Sep 22, 2026", type: "IN-PERSON" },
      { title: "Hardware / Robotics Demo Showcase", date: "Oct 14, 2026", type: "BUILD NIGHT" },
    ],
    recentActivity: "Launched the Mumbai Student Angel Demo roster.",
  },
  {
    id: "chap-stanford",
    name: "INIT Stanford Chapter",
    code: "STN / 004",
    campus: "Stanford University & Bay Area",
    leadId: "b1",
    leadName: "Alex Developer",
    leadAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    leadRole: "Chapter Lead & Core Contributor",
    membersCount: 165,
    projectsCount: 22,
    events: [
      { title: "Palo Alto Hacker House Demo Night", date: "Sep 19, 2026", type: "IN-PERSON" },
      { title: "Global INIT Office Hours", date: "Sep 28, 2026", type: "ONLINE" },
    ],
    recentActivity: "Coordinated cross-campus benchmark with MIT and Waterloo.",
  },
];
