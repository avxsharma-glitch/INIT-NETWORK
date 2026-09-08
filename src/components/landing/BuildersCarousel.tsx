import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export interface BuilderProfile {
  id: string;
  name: string;
  role: string;
  category: "FOUNDER" | "CORE" | "ENGINEER" | "DESIGNER" | "CHAPTER LEAD" | "MENTOR";
  campus: string;
  avatar: string;
  tagline: string;
  description: string;
  whoTheyAre: string;
  whatTheyBuild: string;
  whatTheyContribute: string;
  skills: string[];
  social: {
    github?: string;
    linkedin?: string;
  };
}

export const initBuilders: BuilderProfile[] = [
  {
    id: "builder-1",
    name: "Aryan Vishwakarma",
    role: "Founder & Systems Architect",
    category: "FOUNDER",
    campus: "Bengaluru, India",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AryanV&backgroundColor=12161c",
    tagline: "Instigating rooms where university builders ship real software.",
    description:
      "Working on decentralized state synchronizers, low-latency node networks, and compiler tooling. Believes the most ambitious software starts with students refusing to wait for permission.",
    whoTheyAre: "Founder & System Architect at INIT",
    whatTheyBuild: "INIT Core Protocol, CampusOS Architecture",
    whatTheyContribute: "Network Architecture, Build Weeks, Labs Mentorship",
    skills: ["Distributed Systems", "Rust", "Go", "Local-First", "Protocol Design"],
    social: {
      github: "https://github.com/avxsharma-glitch",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "builder-2",
    name: "Sarah Chen",
    role: "Core Product & Design Lead",
    category: "DESIGNER",
    campus: "MIT • Cambridge, MA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahC&backgroundColor=12161c",
    tagline: "Designing high-density developer interfaces with sculptural depth.",
    description:
      "Interface thinker shaping the visual grammar of INIT. Bridging technical density with restrained liquid-glass depth and surgical typography.",
    whoTheyAre: "Design Lead at INIT Network",
    whatTheyBuild: "INIT Fluid Glass UI System & Component Primitives",
    whatTheyContribute: "Design System, Micro-animations, Ergonomic UX",
    skills: ["Design Systems", "Figma", "Motion Physics", "CSS/Typography", "WebGL"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "builder-3",
    name: "David Kim",
    role: "AI / ML Research Engineer",
    category: "ENGINEER",
    campus: "UC Berkeley • Berkeley, CA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidK&backgroundColor=12161c",
    tagline: "Turning autonomous reasoning models into practical builder tools.",
    description:
      "Focused on synthetic evaluation loops, low-memory vector search on edge nodes, and verifiable agent pipelines across university research labs.",
    whoTheyAre: "AI / ML Domain Lead",
    whatTheyBuild: "CampusOS Vector Indexing & Eval Benchmarks",
    whatTheyContribute: "Open Source AI Repos, Eval Suites, Research Jams",
    skills: ["PyTorch", "LLM Evals", "pgvector", "DSPy", "CUDA Optimization"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "builder-4",
    name: "Emily Wang",
    role: "Frontend Architect & Creative Dev",
    category: "CORE",
    campus: "University of Waterloo • Ontario",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=EmilyW&backgroundColor=12161c",
    tagline: "Obsessed with 60fps interaction physics and tactile web moments.",
    description:
      "Pushing browser hardware acceleration to its limits. Crafts the spatial network visualizers and buttery smooth navigation transitions across INIT.",
    whoTheyAre: "Core Frontend Architect",
    whatTheyBuild: "Interactive Network Map & 3D Spatial Canvas",
    whatTheyContribute: "WebGL Shaders, GSAP Timelines, Performance Specs",
    skills: ["React", "Three.js", "GSAP", "WebGL", "TailwindCSS"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "builder-5",
    name: "Marcus Lee",
    role: "Delhi NCR Chapter Lead & Backend",
    category: "CHAPTER LEAD",
    campus: "Carnegie Mellon & Delhi NCR",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusL&backgroundColor=12161c",
    tagline: "Operating local rooms and building resilient telemetry systems.",
    description:
      "Leading 110+ campus builders in Delhi NCR while writing high-throughput Raft consensus mockups. Runs weekend hardware teardowns and systems reading cohorts.",
    whoTheyAre: "Chapter Lead (Delhi NCR)",
    whatTheyBuild: "Raft Telemetry Daemon & Campus Node Relays",
    whatTheyContribute: "In-Person Build Nights, Architecture Reviews, Code Jams",
    skills: ["Go", "Rust", "PostgreSQL", "Raft Consensus", "Hardware"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "builder-6",
    name: "Priya Sharma",
    role: "Bengaluru Chapter Lead & Fullstack",
    category: "CHAPTER LEAD",
    campus: "IIT Bombay & Bengaluru",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaS&backgroundColor=12161c",
    tagline: "Transforming ambitious student momentum into merged production pull requests.",
    description:
      "Organizing Koramangala builder meetups and driving the Open Source Sprint that shipped 40+ pull requests in 72 hours. Deeply committed to student builders.",
    whoTheyAre: "Chapter Lead (Bengaluru)",
    whatTheyBuild: "CampusOS Student Roster & Bounty Trackers",
    whatTheyContribute: "Weekly Koramangala Meetups, PR Triage, Mentorship",
    skills: ["TypeScript", "Node.js", "PostgreSQL", "Open Source", "Docker"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "builder-7",
    name: "Arjun Mehta",
    role: "Industry Mentor in Residence",
    category: "MENTOR",
    campus: "Ex-Stripe • Distributed Systems Lab",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunM&backgroundColor=12161c",
    tagline: "Giving practical feedback and shortcuts learned from production battles.",
    description:
      "Over 10 years engineering mission-critical payment rails and distributed databases. Volunteers weekly 1:1 architecture teardowns for INIT founders and teams.",
    whoTheyAre: "Staff Systems Mentor in Residence",
    whatTheyBuild: "Mission-Critical Distributed Rails",
    whatTheyContribute: "Weekly 1:1 Architecture Office Hours, Security Audits",
    skills: ["Distributed DBs", "High Throughput", "Fault Tolerance", "Cloud Infra"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
];

// ─── TILT CARD FOR CAROUSEL ───────────────────────────────────────────────────

function ActiveBuilderCard({
  builder,
  index,
  total,
}: {
  builder: BuilderProfile;
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 350, damping: 35 });
  const mouseYSpring = useSpring(y, { stiffness: 350, damping: 35 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
    setGlarePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full max-w-[460px] mx-auto rounded-3xl border border-[#242424] bg-gradient-to-b from-[#181818]/95 via-[#131313]/95 to-[#0E0E0E]/98 p-6 md:p-8 backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(137,170,204,0.12)] transition-all duration-300"
    >
      {/* Liquid-glass glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-500 z-30"
        style={{
          opacity: glarePosition.opacity,
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(137,170,204,0.16) 0%, transparent 65%)`,
        }}
      />

      {/* Top Bar with index and category */}
      <div className="flex items-center justify-between gap-3 border-b border-[#1F1F1F] pb-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono tracking-widest text-[#89AACC] bg-[#89AACC]/10 border border-[#89AACC]/30 px-2.5 py-0.5 rounded-full font-bold uppercase">
            {builder.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-mono text-[#666]">
            <MapPin className="w-3 h-3 text-[#555]" />
            <span className="truncate max-w-[170px]">{builder.campus}</span>
          </span>
        </div>

        <span className="text-xs font-mono text-[#555]">
          0{index + 1} // 0{total}
        </span>
      </div>

      {/* Profile Header */}
      <div className="mt-5 flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-2xl border border-[#2A2A2A] bg-[#161616] p-1 overflow-hidden shadow-inner">
            <img
              src={builder.avatar}
              alt={builder.name}
              className="w-full h-full rounded-xl object-cover"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-[#141414]" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold text-[#F5F5F5] tracking-tight truncate">
            {builder.name}
          </h3>
          <p className="text-xs font-mono text-[#89AACC] font-medium mt-0.5 truncate">
            {builder.role}
          </p>
          <p className="text-xs text-[#878787] mt-1 font-serif italic line-clamp-1">
            "{builder.tagline}"
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-xs md:text-[13px] text-[#CCC] leading-relaxed font-sans line-clamp-3">
        {builder.description}
      </p>

      {/* Builder Triad Matrix (WHO THEY ARE / WHAT THEY BUILD / WHAT THEY CONTRIBUTE) */}
      <div className="mt-5 space-y-2.5 rounded-2xl border border-[#1F1F1F] bg-[#101010]/80 p-4">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-3.5 h-3.5 text-[#89AACC] shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <span className="text-[9px] font-mono tracking-wider uppercase text-[#666] block">
              WHO THEY ARE
            </span>
            <p className="text-xs font-mono text-[#E0E0E0] truncate">
              {builder.whoTheyAre}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 border-t border-[#1A1A1A] pt-2">
          <Code2 className="w-3.5 h-3.5 text-[#89AACC] shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <span className="text-[9px] font-mono tracking-wider uppercase text-[#666] block">
              WHAT THEY BUILD
            </span>
            <p className="text-xs font-mono text-[#E0E0E0] truncate">
              {builder.whatTheyBuild}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 border-t border-[#1A1A1A] pt-2">
          <Layers className="w-3.5 h-3.5 text-[#89AACC] shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <span className="text-[9px] font-mono tracking-wider uppercase text-[#666] block">
              WHAT THEY CONTRIBUTE
            </span>
            <p className="text-xs font-mono text-[#E0E0E0] truncate">
              {builder.whatTheyContribute}
            </p>
          </div>
        </div>
      </div>

      {/* Skills / Interests */}
      <div className="mt-5">
        <span className="text-[10px] font-mono uppercase text-[#555] block mb-1.5">
          PRIMARY CAPABILITIES
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {builder.skills.map((skill) => (
            <span
              key={skill}
              className="text-[10px] font-mono text-[#888] bg-[#161616] px-2 py-0.5 rounded border border-[#222]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Socials */}
      <div className="mt-6 pt-4 border-t border-[#1F1F1F] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {builder.social.github && (
            <a
              href={builder.social.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${builder.name} GitHub`}
              className="p-2 rounded-xl border border-[#222] bg-[#161616] text-[#878787] hover:text-[#F5F5F5] hover:border-[#333] transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {builder.social.linkedin && (
            <a
              href={builder.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${builder.name} LinkedIn`}
              className="p-2 rounded-xl border border-[#222] bg-[#161616] text-[#878787] hover:text-[#F5F5F5] hover:border-[#333] transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        <a
          href={`/app/community?builder=${builder.id}`}
          className="text-xs font-mono text-[#89AACC] hover:text-[#B0CEEE] flex items-center gap-1 transition-colors"
        >
          <span>INTERACT ON COMMUNITY</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}

// ─── MAIN 3D HORIZONTAL CAROUSEL COMPONENT ────────────────────────────────────

export function BuildersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = initBuilders.length;
  const containerRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(() => {
    setCurrentIndex((curr) => (curr === 0 ? total - 1 : curr - 1));
  }, [total]);

  const next = useCallback(() => {
    setCurrentIndex((curr) => (curr === total - 1 ? 0 : curr + 1));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  const currentBuilder = initBuilders[currentIndex];
  const prevBuilder = initBuilders[(currentIndex - 1 + total) % total];
  const nextBuilder = initBuilders[(currentIndex + 1) % total];

  return (
    <section
      className="section team-section relative overflow-hidden"
      id="team"
      aria-labelledby="team-heading"
    >
      <div className="container-wide">
        {/* Section Heading */}
        <div className="team-section__heading flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-label">06 / THE TEAM</div>
            <h2
              className="section-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5] mt-2 leading-[1.08]"
              id="team-heading"
            >
              MEET THE<br />
              BUILDERS<br />
              <em className="serif-italic font-normal text-[#89AACC]">
                behind INIT.
              </em>
            </h2>
          </div>

          <div className="max-w-md space-y-3">
            <p className="section-intro-copy text-sm md:text-base text-[#878787] font-sans leading-relaxed">
              The people turning a shared instinct into a living network.
            </p>

            {/* Desktop Navigation Arrows */}
            <div className="hidden md:flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous builder"
                className="w-10 h-10 rounded-full border border-[#222] bg-[#141414] text-[#878787] hover:text-[#F5F5F5] hover:border-[#89AACC]/40 hover:bg-[#1A1A1A] transition-all flex items-center justify-center active:scale-90"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="text-xs font-mono text-[#666]">
                <span className="text-[#F5F5F5] font-bold">
                  0{currentIndex + 1}
                </span>{" "}
                / 0{total}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Next builder"
                className="w-10 h-10 rounded-full border border-[#222] bg-[#141414] text-[#878787] hover:text-[#F5F5F5] hover:border-[#89AACC]/40 hover:bg-[#1A1A1A] transition-all flex items-center justify-center active:scale-90"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ─── 3D CAROUSEL STAGE ────────────────────────────────────────────── */}
        <div
          ref={containerRef}
          style={{ perspective: "1200px" }}
          className="relative w-full py-6 select-none"
        >
          <div className="relative flex items-center justify-center min-h-[580px]">
            {/* Left Adjacent Card (Desktop Preview) */}
            <div
              onClick={prev}
              style={{
                transform: "translateX(-75%) translateZ(-160px) rotateY(20deg)",
                transformStyle: "preserve-3d",
              }}
              className="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[420px] rounded-3xl border border-[#1E1E1E] bg-[#101010]/80 p-6 opacity-35 hover:opacity-75 transition-all duration-500 cursor-pointer pointer-events-auto filter blur-[1px] hover:blur-0"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={prevBuilder.avatar}
                  alt={prevBuilder.name}
                  className="w-10 h-10 rounded-xl border border-[#262626]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#AAA]">
                    {prevBuilder.name}
                  </h4>
                  <p className="text-[10px] font-mono text-[#666]">
                    {prevBuilder.role}
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#666] line-clamp-2">
                {prevBuilder.tagline}
              </p>
              <span className="inline-block mt-3 text-[10px] font-mono text-[#89AACC]">
                ← CLICK TO PREVIEW
              </span>
            </div>

            {/* Central Active Card */}
            <div className="relative z-20 w-full px-2">
              <ActiveBuilderCard
                key={currentBuilder.id}
                builder={currentBuilder}
                index={currentIndex}
                total={total}
              />
            </div>

            {/* Right Adjacent Card (Desktop Preview) */}
            <div
              onClick={next}
              style={{
                transform: "translateX(75%) translateZ(-160px) rotateY(-20deg)",
                transformStyle: "preserve-3d",
              }}
              className="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[420px] rounded-3xl border border-[#1E1E1E] bg-[#101010]/80 p-6 opacity-35 hover:opacity-75 transition-all duration-500 cursor-pointer pointer-events-auto filter blur-[1px] hover:blur-0"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={nextBuilder.avatar}
                  alt={nextBuilder.name}
                  className="w-10 h-10 rounded-xl border border-[#262626]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#AAA]">
                    {nextBuilder.name}
                  </h4>
                  <p className="text-[10px] font-mono text-[#666]">
                    {nextBuilder.role}
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#666] line-clamp-2">
                {nextBuilder.tagline}
              </p>
              <span className="inline-block mt-3 text-[10px] font-mono text-[#89AACC]">
                CLICK TO PREVIEW →
              </span>
            </div>
          </div>

          {/* Navigation Controls on Mobile */}
          <div className="flex md:hidden items-center justify-between gap-4 mt-6 px-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous builder"
              className="flex-1 py-2.5 rounded-xl border border-[#222] bg-[#141414] text-xs font-mono text-[#878787] flex items-center justify-center gap-1 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREV</span>
            </button>

            <div className="text-xs font-mono text-[#777]">
              0{currentIndex + 1} / 0{total}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next builder"
              className="flex-1 py-2.5 rounded-xl border border-[#222] bg-[#141414] text-xs font-mono text-[#878787] flex items-center justify-center gap-1 active:scale-95"
            >
              <span>NEXT</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Carousel Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {initBuilders.map((b, i) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Jump to ${b.name}`}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === i
                    ? "w-8 h-1.5 bg-[#89AACC]"
                    : "w-2 h-1.5 bg-[#222] hover:bg-[#444]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
