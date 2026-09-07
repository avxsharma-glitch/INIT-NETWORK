export const mockIdentity = {
  name: "Alex Developer",
  role: "AI / FULLSTACK",
  membership: "INIT MEMBER",
  campus: "Stanford University",
  avatar: "https://i.pravatar.cc/150?u=alex",
  skills: ["React", "TypeScript", "Node.js", "Python"]
};

export const mockBuilds = [
  {
    id: "b1",
    title: "INIT Dashboard Shell",
    description: "Building the core authenticated experience for the INIT network.",
    status: "BUILDING",
    contributors: 3,
    visual: "visual-1",
    tags: ["React", "Vite", "Tailwind"]
  },
  {
    id: "b2",
    title: "Campus AI Assistant",
    description: "An open source agent to help students navigate campus resources.",
    status: "IDEA",
    contributors: 1,
    visual: "visual-2",
    tags: ["AI/ML", "Python"]
  }
];

export const mockBuilders = [
  {
    id: "u1",
    name: "Sarah Chen",
    role: "UX DESIGNER",
    campus: "MIT",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: "u2",
    name: "David Kim",
    role: "ML ENGINEER",
    campus: "Berkeley",
    avatar: "https://i.pravatar.cc/150?u=david"
  },
  {
    id: "u3",
    name: "Emily Wang",
    role: "FRONTEND",
    campus: "Waterloo",
    avatar: "https://i.pravatar.cc/150?u=emily"
  }
];

export const mockEvents = [
  {
    id: "e1",
    title: "Fall Build Night",
    date: "OCT 14",
    type: "BUILD NIGHT",
    detail: "Stanford Chapter"
  },
  {
    id: "e2",
    title: "AI Hackathon",
    date: "OCT 28",
    type: "HACKATHON",
    detail: "Global Virtual"
  }
];

export const mockActivity = [
  {
    id: "a1",
    message: "David Kim shipped Campus AI Assistant to BETA.",
    time: "2 hours ago"
  },
  {
    id: "a2",
    message: "Waterloo chapter just launched.",
    time: "5 hours ago"
  },
  {
    id: "a3",
    message: "Sarah Chen joined your project.",
    time: "1 day ago"
  }
];

export const mockOpportunities = [
  {
    id: "o1",
    title: "INIT Core Team",
    organization: "INIT Network",
    type: "ROLE",
    description: "Help build the next generation of builder networks."
  },
  {
    id: "o2",
    title: "Winter Fellowship",
    organization: "OpenAI",
    type: "FELLOWSHIP",
    description: "A 12-week fellowship for students building with AI."
  }
];
