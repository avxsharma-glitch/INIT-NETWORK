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
  { id: "ach1", title: "First Ship", description: "Shipped your first project to BETA", icon: "🚀", earnedAt: "2024-09-01" },
  { id: "ach2", title: "Connector", description: "Collaborated with 5+ builders", icon: "🔗", earnedAt: "2024-10-15" },
  { id: "ach3", title: "Chapter Founder", description: "Founded an INIT chapter", icon: "🏛️", earnedAt: "2024-11-01" },
  { id: "ach4", title: "Open Source", description: "Contributed to an open source project via INIT", icon: "🌐", earnedAt: "2024-12-01" },
  { id: "ach5", title: "Hackathon Winner", description: "Won a hackathon hosted through INIT", icon: "🏆", earnedAt: "2024-08-20" },
  { id: "ach6", title: "Mentor", description: "Mentored 3+ INIT members on a project", icon: "🎓", earnedAt: "2024-11-10" },
  { id: "ach7", title: "Idea Machine", description: "Submitted 5+ project ideas to the network", icon: "💡", earnedAt: "2024-09-25" },
  { id: "ach8", title: "Shipped to Production", description: "Deployed a project used by real users", icon: "⚡", earnedAt: "2024-10-05" },
];

export const mockBuilders: Builder[] = [
  {
    id: "b1",
    name: "Alex Developer",
    role: "FULLSTACK",
    campus: "Stanford University",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    bio: "Building systems that help builders build. Interested in developer tooling, distributed systems, and community infrastructure. Previously interned at Stripe and Vercel.",
    skills: [
      { name: "React", level: "EXPERT" },
      { name: "TypeScript", level: "EXPERT" },
      { name: "Node.js", level: "PROFICIENT" },
      { name: "Python", level: "PROFICIENT" },
      { name: "PostgreSQL", level: "LEARNING" },
    ],
    projectIds: ["p1", "p2"],
    contributionIds: ["c1", "c3"],
    achievementIds: ["ach1", "ach2", "ach8"],
    social: { github: "alexdev", twitter: "alexdev_", portfolio: "alexdev.io" },
    joinedAt: "2024-08-15",
    isCurrentUser: true,
  },
  {
    id: "b2",
    name: "Sarah Chen",
    role: "DESIGNER",
    campus: "MIT",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "UX/product designer. I care about the space between function and beauty. Making complex things feel simple. Previously at Figma's design team.",
    skills: [
      { name: "Figma", level: "EXPERT" },
      { name: "User Research", level: "EXPERT" },
      { name: "React", level: "LEARNING" },
      { name: "Motion Design", level: "PROFICIENT" },
    ],
    projectIds: ["p1", "p3"],
    contributionIds: ["c2", "c9"],
    achievementIds: ["ach2", "ach6"],
    social: { twitter: "sarahchendesign", portfolio: "sarahchen.design" },
    joinedAt: "2024-09-01",
  },
  {
    id: "b3",
    name: "David Kim",
    role: "ML ENGINEER",
    campus: "UC Berkeley",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    bio: "ML Engineer focused on applied AI. Working on agents, RAG systems, and making models useful in the real world. Research background in NLP.",
    skills: [
      { name: "Python", level: "EXPERT" },
      { name: "PyTorch", level: "EXPERT" },
      { name: "LangChain", level: "PROFICIENT" },
      { name: "TypeScript", level: "LEARNING" },
    ],
    projectIds: ["p2", "p4"],
    contributionIds: ["c3", "c4"],
    achievementIds: ["ach1", "ach4", "ach5"],
    social: { github: "davidkim-ml", linkedin: "davidkim" },
    joinedAt: "2024-07-20",
  },
  {
    id: "b4",
    name: "Emily Wang",
    role: "FRONTEND",
    campus: "University of Waterloo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    bio: "Frontend engineer obsessed with animations, performance, and pixel-perfect design. Making the web feel alive. Three.js enthusiast and GSAP power user.",
    skills: [
      { name: "React", level: "EXPERT" },
      { name: "Three.js", level: "PROFICIENT" },
      { name: "GSAP", level: "PROFICIENT" },
      { name: "CSS/Animation", level: "EXPERT" },
    ],
    projectIds: ["p3", "p8"],
    contributionIds: ["c5", "c11"],
    achievementIds: ["ach2", "ach8"],
    social: { github: "emilywang", twitter: "emilywang_dev" },
    joinedAt: "2024-10-01",
  },
  {
    id: "b5",
    name: "Marcus Lee",
    role: "BACKEND",
    campus: "Carnegie Mellon",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    bio: "Systems and backend engineer. Distributed systems, databases, and high-throughput APIs are my playground. Rust evangelist.",
    skills: [
      { name: "Go", level: "EXPERT" },
      { name: "Rust", level: "PROFICIENT" },
      { name: "PostgreSQL", level: "EXPERT" },
      { name: "Kubernetes", level: "PROFICIENT" },
    ],
    projectIds: ["p4", "p7"],
    contributionIds: ["c6"],
    achievementIds: ["ach3", "ach4"],
    social: { github: "marcuslee-sys" },
    joinedAt: "2024-08-01",
  },
  {
    id: "b6",
    name: "Priya Sharma",
    role: "PM",
    campus: "IIT Delhi",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    bio: "Product thinker and builder. I find the overlap between user needs and technical feasibility and make things happen. CS + MBA background.",
    skills: [
      { name: "Product Strategy", level: "EXPERT" },
      { name: "Data Analysis", level: "PROFICIENT" },
      { name: "SQL", level: "PROFICIENT" },
      { name: "Figma", level: "LEARNING" },
    ],
    projectIds: ["p1", "p5"],
    contributionIds: ["c7"],
    achievementIds: ["ach2", "ach3", "ach7"],
    social: { linkedin: "priyasharma", twitter: "priya_builds" },
    joinedAt: "2024-09-15",
  },
  {
    id: "b7",
    name: "Jordan Rivers",
    role: "DEVOPS",
    campus: "Georgia Tech",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    bio: "DevOps engineer and infrastructure nerd. Kubernetes, Terraform, and CI/CD pipelines that actually work. Making deployments boring (in the best way).",
    skills: [
      { name: "Kubernetes", level: "EXPERT" },
      { name: "Terraform", level: "EXPERT" },
      { name: "Docker", level: "EXPERT" },
      { name: "Python", level: "PROFICIENT" },
      { name: "Go", level: "LEARNING" },
    ],
    projectIds: ["p1", "p6"],
    contributionIds: ["c8"],
    achievementIds: ["ach1", "ach4"],
    social: { github: "jordanrivers", linkedin: "jordan-rivers" },
    joinedAt: "2024-09-20",
  },
  {
    id: "b8",
    name: "Aisha Okonkwo",
    role: "RESEARCHER",
    campus: "Oxford University",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    bio: "CS researcher working at the intersection of AI safety and human-computer interaction. Building tools that help humans understand AI systems better.",
    skills: [
      { name: "Python", level: "EXPERT" },
      { name: "Research Methods", level: "EXPERT" },
      { name: "Data Visualization", level: "PROFICIENT" },
      { name: "React", level: "LEARNING" },
    ],
    projectIds: ["p9", "p10"],
    contributionIds: ["c10"],
    achievementIds: ["ach5", "ach7"],
    social: { twitter: "aishaokonkwo", portfolio: "aisha.research" },
    joinedAt: "2024-10-10",
  },
  {
    id: "b9",
    name: "Liam Torres",
    role: "MOBILE",
    campus: "UT Austin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
    bio: "Mobile-first engineer who lives on iOS and React Native. I believe every app should work at 60fps. Accessibility advocate.",
    skills: [
      { name: "React Native", level: "EXPERT" },
      { name: "Swift", level: "PROFICIENT" },
      { name: "TypeScript", level: "PROFICIENT" },
      { name: "Figma", level: "LEARNING" },
    ],
    projectIds: ["p8", "p11"],
    contributionIds: ["c12"],
    achievementIds: ["ach1", "ach8"],
    social: { github: "liamtorres", twitter: "liambuilds" },
    joinedAt: "2024-10-20",
  },
  {
    id: "b10",
    name: "Nina Kowalski",
    role: "DATA",
    campus: "Warsaw University of Technology",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nina",
    bio: "Data engineer and analyst. I turn messy data into clear insights. Passionate about open data, data journalism, and civic tech.",
    skills: [
      { name: "Python", level: "EXPERT" },
      { name: "dbt", level: "EXPERT" },
      { name: "SQL", level: "EXPERT" },
      { name: "Spark", level: "PROFICIENT" },
      { name: "React", level: "LEARNING" },
    ],
    projectIds: ["p10", "p12"],
    contributionIds: ["c14"],
    achievementIds: ["ach4", "ach7"],
    social: { github: "ninakowalski", linkedin: "nina-kowalski" },
    joinedAt: "2024-11-01",
  },
  {
    id: "b11",
    name: "Kwame Asante",
    role: "FULLSTACK",
    campus: "University of Ghana",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kwame",
    bio: "Full-stack engineer building solutions for African markets. Focused on offline-first design, mobile-first experiences, and low-bandwidth optimization.",
    skills: [
      { name: "Next.js", level: "EXPERT" },
      { name: "TypeScript", level: "EXPERT" },
      { name: "Supabase", level: "PROFICIENT" },
      { name: "React Native", level: "PROFICIENT" },
    ],
    projectIds: ["p11", "p12"],
    contributionIds: ["c13"],
    achievementIds: ["ach2", "ach3", "ach5"],
    social: { github: "kwameasante", twitter: "kwamebuilds", portfolio: "kwame.dev" },
    joinedAt: "2024-08-28",
  },
  {
    id: "b12",
    name: "Sophie Müller",
    role: "DESIGNER",
    campus: "TU Berlin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    bio: "Systems designer who thinks in components, constraints, and design tokens. I design for scale — from atoms to full product experiences.",
    skills: [
      { name: "Figma", level: "EXPERT" },
      { name: "Design Systems", level: "EXPERT" },
      { name: "Framer", level: "PROFICIENT" },
      { name: "CSS", level: "PROFICIENT" },
    ],
    projectIds: ["p6", "p9"],
    contributionIds: ["c9"],
    achievementIds: ["ach6", "ach8"],
    social: { portfolio: "sophiemuller.design", linkedin: "sophiemuller" },
    joinedAt: "2024-09-05",
  },
  {
    id: "b13",
    name: "Ravi Patel",
    role: "BACKEND",
    campus: "IIT Bombay",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi",
    bio: "Backend engineer specializing in scalable payment systems and financial APIs. Previously built infra handling 10M+ transactions/day at a fintech.",
    skills: [
      { name: "Java", level: "EXPERT" },
      { name: "Spring Boot", level: "EXPERT" },
      { name: "Kafka", level: "PROFICIENT" },
      { name: "MySQL", level: "EXPERT" },
      { name: "Redis", level: "PROFICIENT" },
    ],
    projectIds: ["p7"],
    contributionIds: [],
    achievementIds: ["ach1"],
    social: { github: "ravipatel-backend", linkedin: "ravi-patel" },
    joinedAt: "2024-12-01",
  },
  {
    id: "b14",
    name: "Chloe Beaumont",
    role: "FRONTEND",
    campus: "Polytechnique Montreal",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe",
    bio: "Frontend engineer with a love for data visualization and interactive storytelling. D3.js, Observable, and making charts people actually want to look at.",
    skills: [
      { name: "D3.js", level: "EXPERT" },
      { name: "React", level: "EXPERT" },
      { name: "Observable", level: "PROFICIENT" },
      { name: "Python", level: "LEARNING" },
    ],
    projectIds: ["p12"],
    contributionIds: ["c14"],
    achievementIds: ["ach2", "ach8"],
    social: { github: "chloebeaumont", twitter: "chloeviz" },
    joinedAt: "2024-11-10",
  },
  {
    id: "b15",
    name: "Omar Farouk",
    role: "ML ENGINEER",
    campus: "American University Cairo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
    bio: "Applied ML engineer with a focus on computer vision and edge deployment. Building models that run on-device, not just in the cloud.",
    skills: [
      { name: "Python", level: "EXPERT" },
      { name: "TensorFlow Lite", level: "EXPERT" },
      { name: "OpenCV", level: "EXPERT" },
      { name: "Rust", level: "LEARNING" },
    ],
    projectIds: ["p9"],
    contributionIds: ["c10"],
    achievementIds: ["ach1", "ach5", "ach7"],
    social: { github: "omarfarouk-cv", linkedin: "omar-farouk" },
    joinedAt: "2024-10-15",
  },
];

export const mockProjects: Project[] = [
  {
    id: "p1",
    title: "INIT Platform",
    tagline: "The builder network infrastructure",
    description: "The core platform infrastructure for the INIT network. The authenticated workspace where builders discover each other, form teams, and ship together. Designed to be the operating system for student builders.",
    status: "BUILDING",
    tags: ["Platform", "Open Source", "Community"],
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Kubernetes"],
    members: [
      { builderId: "b1", role: "Lead Engineer", joinedAt: "2024-08-15" },
      { builderId: "b2", role: "Lead Designer", joinedAt: "2024-09-01" },
      { builderId: "b6", role: "Product Manager", joinedAt: "2024-09-15" },
      { builderId: "b7", role: "DevOps Engineer", joinedAt: "2024-09-20" },
    ],
    ownerId: "b1",
    repoUrl: "github.com/init-network/platform",
    coverColor: "#1A2535",
    createdAt: "2024-08-15",
    updatedAt: "2024-12-01",
    teamId: "t1",
  },
  {
    id: "p2",
    title: "Campus AI Assistant",
    tagline: "AI agent for campus navigation",
    description: "An open-source AI agent that helps students navigate campus resources, deadlines, clubs, and opportunities. Powered by RAG over institutional data with a conversational interface.",
    status: "BETA",
    tags: ["AI/ML", "Open Source", "Student Tools"],
    techStack: ["Python", "LangChain", "FastAPI", "React", "Pinecone"],
    members: [
      { builderId: "b1", role: "Frontend", joinedAt: "2024-10-01" },
      { builderId: "b3", role: "ML Lead", joinedAt: "2024-10-01" },
    ],
    ownerId: "b3",
    repoUrl: "github.com/davidkim-ml/campus-ai",
    demoUrl: "campus-ai.vercel.app",
    coverColor: "#1A2030",
    createdAt: "2024-10-01",
    updatedAt: "2024-12-10",
    teamId: "t2",
  },
  {
    id: "p3",
    title: "Motif UI",
    tagline: "Design system for student builders",
    description: "A minimal, accessible component library and design system built specifically for student projects. Prioritizes clarity, speed, and beauty. Ships with a Figma kit, React components, and Storybook docs.",
    status: "SHIPPED",
    tags: ["Design System", "Open Source", "Frontend"],
    techStack: ["React", "TypeScript", "Storybook", "Figma", "CSS Variables"],
    members: [
      { builderId: "b2", role: "Design Lead", joinedAt: "2024-07-01" },
      { builderId: "b4", role: "Engineering Lead", joinedAt: "2024-07-01" },
    ],
    ownerId: "b2",
    repoUrl: "github.com/motif-ui/core",
    demoUrl: "motif.design",
    coverColor: "#1F1A2A",
    createdAt: "2024-07-01",
    updatedAt: "2024-11-15",
  },
  {
    id: "p4",
    title: "Synapse",
    tagline: "High-performance study group tool",
    description: "A lightweight, real-time collaboration platform for study groups. Built for low-latency, designed for focus. Features live cursors, shared whiteboards, and AI session summaries.",
    status: "BUILDING",
    tags: ["Collaboration", "Real-time", "EdTech"],
    techStack: ["Go", "Rust", "WebSockets", "React", "CRDTs"],
    members: [
      { builderId: "b3", role: "AI Integration", joinedAt: "2024-11-01" },
      { builderId: "b5", role: "Systems Lead", joinedAt: "2024-11-01" },
    ],
    ownerId: "b5",
    coverColor: "#1A2020",
    createdAt: "2024-11-01",
    updatedAt: "2024-12-05",
    teamId: "t3",
  },
  {
    id: "p5",
    title: "GrantFinder",
    tagline: "Discover funding for student projects",
    description: "An aggregator and semantic matching engine that helps student builders find relevant grants, fellowships, and funding opportunities. Ingests 200+ sources and matches based on project context.",
    status: "IDEA",
    tags: ["Student Tools", "Funding", "Data"],
    techStack: ["Python", "React", "Vector DB", "OpenAI"],
    members: [{ builderId: "b6", role: "Founder", joinedAt: "2024-12-01" }],
    ownerId: "b6",
    coverColor: "#251A1A",
    createdAt: "2024-12-01",
    updatedAt: "2024-12-01",
  },
  {
    id: "p6",
    title: "Forge",
    tagline: "Portfolio builder for student devs",
    description: "A drag-and-drop portfolio builder designed for developers. Auto-pulls from GitHub activity, projects, and contributions. Generates beautiful, performant static sites in minutes.",
    status: "VALIDATING",
    tags: ["Dev Tools", "Portfolio", "No-code"],
    techStack: ["Next.js", "TypeScript", "Vercel", "GitHub API"],
    members: [
      { builderId: "b7", role: "Infrastructure", joinedAt: "2024-11-15" },
      { builderId: "b12", role: "Design Lead", joinedAt: "2024-11-20" },
    ],
    ownerId: "b12",
    coverColor: "#201A1A",
    createdAt: "2024-11-15",
    updatedAt: "2024-12-02",
    teamId: "t4",
  },
  {
    id: "p7",
    title: "PayKit",
    tagline: "Open-source payments SDK for startups",
    description: "A developer-first payments SDK that abstracts Stripe, Razorpay, and Paystack behind a single, clean API. Handles multi-currency, webhooks, and retries out of the box.",
    status: "MAINTAINED",
    tags: ["Open Source", "Fintech", "SDK"],
    techStack: ["TypeScript", "Java", "Stripe", "Razorpay"],
    members: [
      { builderId: "b5", role: "Core Maintainer", joinedAt: "2024-06-01" },
      { builderId: "b13", role: "Java SDK", joinedAt: "2024-09-01" },
    ],
    ownerId: "b5",
    repoUrl: "github.com/paykit/sdk",
    demoUrl: "paykit.dev",
    coverColor: "#1A2515",
    createdAt: "2024-06-01",
    updatedAt: "2024-12-08",
  },
  {
    id: "p8",
    title: "Beacon",
    tagline: "Campus safety and alerts app",
    description: "A mobile-first campus safety app that enables anonymous incident reporting, live campus alerts, and a community-driven safe-walk feature. Built with student privacy at the core.",
    status: "BETA",
    tags: ["Mobile", "Safety", "Community"],
    techStack: ["React Native", "Node.js", "WebSockets", "PostgreSQL"],
    members: [
      { builderId: "b4", role: "Frontend Lead", joinedAt: "2024-10-15" },
      { builderId: "b9", role: "Mobile Lead", joinedAt: "2024-10-15" },
    ],
    ownerId: "b9",
    coverColor: "#251F10",
    createdAt: "2024-10-15",
    updatedAt: "2024-12-07",
    teamId: "t5",
  },
  {
    id: "p9",
    title: "Lumen",
    tagline: "AI interpretability dashboard",
    description: "A visualization dashboard that makes AI model internals understandable. Highlights attention patterns, feature importance, and decision pathways. Aimed at non-expert researchers and students.",
    status: "BUILDING",
    tags: ["AI Safety", "Research Tools", "Visualization"],
    techStack: ["Python", "React", "D3.js", "FastAPI", "TensorFlow"],
    members: [
      { builderId: "b8", role: "Research Lead", joinedAt: "2024-11-01" },
      { builderId: "b12", role: "UI Design", joinedAt: "2024-11-10" },
      { builderId: "b15", role: "ML Engineer", joinedAt: "2024-11-05" },
    ],
    ownerId: "b8",
    coverColor: "#1A1A30",
    createdAt: "2024-11-01",
    updatedAt: "2024-12-09",
    teamId: "t6",
  },
  {
    id: "p10",
    title: "PulseBoard",
    tagline: "Real-time student sentiment analytics",
    description: "An analytics platform that tracks anonymized sentiment signals from student communities — Discord, forums, surveys — and surfaces actionable insights for university administrators and student leaders.",
    status: "VALIDATING",
    tags: ["Data", "EdTech", "Analytics"],
    techStack: ["Python", "dbt", "Spark", "React", "Postgres"],
    members: [
      { builderId: "b8", role: "Research Design", joinedAt: "2024-12-01" },
      { builderId: "b10", role: "Data Lead", joinedAt: "2024-12-01" },
    ],
    ownerId: "b10",
    coverColor: "#1F1A28",
    createdAt: "2024-12-01",
    updatedAt: "2024-12-10",
  },
  {
    id: "p11",
    title: "Lokal",
    tagline: "Offline-first community marketplace",
    description: "A PWA marketplace for communities with unreliable internet. Works fully offline with background sync. Designed for student housing communities, campus buy-sell groups, and local markets.",
    status: "SHIPPED",
    tags: ["Offline-first", "PWA", "Community"],
    techStack: ["Next.js", "Supabase", "Service Workers", "React Native"],
    members: [
      { builderId: "b9", role: "Mobile", joinedAt: "2024-09-01" },
      { builderId: "b11", role: "Lead Engineer", joinedAt: "2024-09-01" },
    ],
    ownerId: "b11",
    repoUrl: "github.com/kwameasante/lokal",
    demoUrl: "lokal.community",
    coverColor: "#1A2218",
    createdAt: "2024-09-01",
    updatedAt: "2024-11-20",
  },
  {
    id: "p12",
    title: "DataLit",
    tagline: "Interactive data literacy curriculum",
    description: "An open-source, interactive curriculum for teaching data literacy to non-CS students. Features browser-based notebooks, visual exercises, and real-world datasets from African and Asian economies.",
    status: "BUILDING",
    tags: ["Education", "Open Source", "Data"],
    techStack: ["React", "D3.js", "Python", "Observable", "dbt"],
    members: [
      { builderId: "b10", role: "Data Curriculum", joinedAt: "2024-11-15" },
      { builderId: "b11", role: "Engineering", joinedAt: "2024-11-15" },
      { builderId: "b14", role: "Visualization Lead", joinedAt: "2024-11-20" },
    ],
    ownerId: "b10",
    repoUrl: "github.com/datalit/curriculum",
    coverColor: "#1A2030",
    createdAt: "2024-11-15",
    updatedAt: "2024-12-10",
    teamId: "t6",
  },
];

export const mockTeams: Team[] = [
  {
    id: "t1",
    name: "INIT Core Team",
    description: "The team building the INIT platform infrastructure itself. Cross-functional: engineering, design, product, and DevOps.",
    projectId: "p1",
    memberIds: ["b1", "b2", "b6", "b7"],
    openRoles: ["Backend Engineer", "Security Engineer"],
    createdAt: "2024-08-15",
  },
  {
    id: "t2",
    name: "Campus AI Team",
    description: "Building an AI assistant that helps students navigate campus life. ML-heavy, with a React frontend.",
    projectId: "p2",
    memberIds: ["b1", "b3"],
    openRoles: ["Product Designer", "ML Ops Engineer"],
    createdAt: "2024-10-01",
  },
  {
    id: "t3",
    name: "Synapse Team",
    description: "Building a high-performance real-time collaboration tool for study groups. Focus on ultra-low latency.",
    projectId: "p4",
    memberIds: ["b3", "b5"],
    openRoles: ["Frontend Engineer", "Mobile Developer", "CRDT Specialist"],
    createdAt: "2024-11-01",
  },
  {
    id: "t4",
    name: "Forge Team",
    description: "Building a portfolio tool for developer students. Currently in validation — looking for early users and collaborators.",
    projectId: "p6",
    memberIds: ["b7", "b12"],
    openRoles: ["Frontend Engineer", "Growth / Marketing"],
    createdAt: "2024-11-15",
  },
  {
    id: "t5",
    name: "Beacon Team",
    description: "Mobile-first campus safety app. Prioritizes privacy, accessibility, and real-time alerts.",
    projectId: "p8",
    memberIds: ["b4", "b9"],
    openRoles: ["Backend Engineer", "Android Developer"],
    createdAt: "2024-10-15",
  },
  {
    id: "t6",
    name: "Lumen / DataLit Research Group",
    description: "A research-oriented team working on AI interpretability and data literacy tooling. Open to researchers and engineers alike.",
    projectId: "p9",
    memberIds: ["b8", "b10", "b11", "b12", "b14", "b15"],
    openRoles: ["ML Researcher", "Data Visualization Engineer"],
    createdAt: "2024-11-01",
  },
];

export const mockContributions: Contribution[] = [
  { id: "c1", builderId: "b1", projectId: "p1", type: "CODE", title: "Built the dashboard shell", description: "Implemented the full authenticated app shell with sidebar, routing, and responsive navigation.", date: "2024-12-05" },
  { id: "c2", builderId: "b2", projectId: "p1", type: "DESIGN", title: "INIT Design System v1", description: "Created the complete design system documentation and component specs for the INIT platform.", date: "2024-11-20" },
  { id: "c3", builderId: "b3", projectId: "p2", type: "CODE", title: "RAG pipeline for campus data", description: "Built the ingestion pipeline and retrieval system for institutional data sources using Pinecone.", date: "2024-11-15" },
  { id: "c4", builderId: "b3", projectId: "p4", type: "CODE", title: "AI summarization module", description: "Integrated AI-powered session summaries into the Synapse collaboration tool using GPT-4.", date: "2024-12-01" },
  { id: "c5", builderId: "b4", projectId: "p3", type: "CODE", title: "Animation system", description: "Built the core animation primitives for the Motif UI design system using CSS custom properties.", date: "2024-10-30" },
  { id: "c6", builderId: "b5", projectId: "p4", type: "CODE", title: "WebSocket server implementation", description: "High-performance Go-based WebSocket server with <10ms round-trip latency under 10k concurrent connections.", date: "2024-12-03" },
  { id: "c7", builderId: "b6", projectId: "p1", type: "DOCS", title: "Platform PRD v1", description: "Wrote the complete Product Requirements Document for the INIT Platform V1 scope.", date: "2024-11-01" },
  { id: "c8", builderId: "b7", projectId: "p1", type: "CODE", title: "CI/CD pipeline setup", description: "Set up GitHub Actions-based CI/CD pipeline with Kubernetes deployment and zero-downtime rolling updates.", date: "2024-10-10" },
  { id: "c9", builderId: "b2", projectId: "p3", type: "DESIGN", title: "Figma component library", description: "Published the full Figma component library for Motif UI with 80+ components and design tokens.", date: "2024-09-15" },
  { id: "c10", builderId: "b15", projectId: "p9", type: "CODE", title: "On-device inference module", description: "Implemented TFLite-based on-device inference for the Lumen attention visualization pipeline.", date: "2024-12-08" },
  { id: "c11", builderId: "b4", projectId: "p8", type: "CODE", title: "Map and alert UI", description: "Built the real-time campus map with live incident markers and push notification integration.", date: "2024-11-28" },
  { id: "c12", builderId: "b9", projectId: "p8", type: "CODE", title: "iOS safe-walk feature", description: "Implemented the safe-walk request and tracking flow on iOS using background location updates.", date: "2024-12-04" },
  { id: "c13", builderId: "b11", projectId: "p11", type: "CODE", title: "Offline sync engine", description: "Built the service worker-based background sync engine for Lokal's offline-first architecture.", date: "2024-11-05" },
  { id: "c14", builderId: "b14", projectId: "p12", type: "CODE", title: "Interactive chart notebooks", description: "Created the browser-based interactive notebook system with live D3.js chart exercises.", date: "2024-12-09" },
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
  MAINTAINED: "#3A2A5A",
};

export const statusTextColors: Record<ProjectStatus, string> = {
  IDEA: "#999",
  VALIDATING: "#C9A830",
  BUILDING: "#4A9ACA",
  BETA: "#7ABA3A",
  SHIPPED: "#3ACA7A",
  MAINTAINED: "#9A6ACA",
};
