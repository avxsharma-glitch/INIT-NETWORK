import { useState, useMemo } from "react";
import { Link, useRoute } from "wouter";
import {
  CommunityStoreProvider,
  useCommunityStore,
} from "@/store/CommunityStore";
import { mockBuilders } from "@/data/mock";
import {
  type Discussion,
  type DiscussionCategory,
  type PostCategory,
} from "@/data/communityMock";
import { CommunityPostCard } from "@/components/community/CommunityPostCard";
import { DiscussionCard } from "@/components/community/DiscussionCard";
import { DiscussionDetailModal } from "@/components/community/DiscussionDetailModal";
import { MemberCard } from "@/components/community/MemberCard";
import { MentorCard } from "@/components/community/MentorCard";
import { AnnouncementCard } from "@/components/community/AnnouncementCard";
import { CommunityChannelCard } from "@/components/community/CommunityChannelCard";
import { ChapterCard } from "@/components/community/ChapterCard";
import { CreatePostModal } from "@/components/community/CreatePostModal";
import { CreateDiscussionModal } from "@/components/community/CreateDiscussionModal";
import { PageTransition } from "@/components/ui/motion/PageTransition";
import { StaggerList, StaggerItem } from "@/components/ui/motion/StaggerList";
import {
  Sparkles,
  MessageSquare,
  Users,
  GraduationCap,
  Landmark,
  Bell,
  Radio,
  Search,
  Plus,
  ArrowUpRight,
  TrendingUp,
  MessageSquarePlus,
  Filter,
} from "lucide-react";

// ─── TABS DEFINITION ──────────────────────────────────────────────────────────

type CommunityTab =
  | "feed"
  | "discussions"
  | "members"
  | "mentors"
  | "chapters"
  | "announcements"
  | "channels";

const tabs: Array<{ id: CommunityTab; label: string; icon: typeof Sparkles }> = [
  { id: "feed", label: "Community Feed", icon: Sparkles },
  { id: "discussions", label: "Discussions", icon: MessageSquare },
  { id: "members", label: "Members Directory", icon: Users },
  { id: "mentors", label: "Mentors", icon: GraduationCap },
  { id: "chapters", label: "Chapters", icon: Landmark },
  { id: "announcements", label: "Announcements", icon: Bell },
  { id: "channels", label: "Channels", icon: Radio },
];

function CommunityContent() {
  const [, params] = useRoute("/app/community/:tab?");
  const initialTab = (params?.tab as CommunityTab) || "feed";
  const [activeTab, setActiveTab] = useState<CommunityTab>(
    tabs.some((t) => t.id === initialTab) ? initialTab : "feed"
  );

  const {
    posts,
    discussions,
    mentors,
    announcements,
    channels,
    chapters,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedSort,
    setSelectedSort,
  } = useCommunityStore();

  // Modals state
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [createDiscussionOpen, setCreateDiscussionOpen] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(
    null
  );

  // Members filter states
  const [selectedSkill, setSelectedSkill] = useState<string>("ALL");
  const [selectedCampus, setSelectedCampus] = useState<string>("ALL");

  // Unique skills and campuses for filters
  const allSkills = useMemo(() => {
    const s = new Set<string>();
    mockBuilders.forEach((b) => b.skills.forEach((sk) => s.add(sk.name)));
    return ["ALL", ...Array.from(s).sort()];
  }, []);

  const allCampuses = useMemo(() => {
    const c = new Set<string>();
    mockBuilders.forEach((b) => c.add(b.campus));
    return ["ALL", ...Array.from(c).sort()];
  }, []);

  // Filtered Posts
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchSearch =
        !searchQuery ||
        p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory =
        selectedCategory === "ALL" || p.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  // Filtered Discussions
  const filteredDiscussions = useMemo(() => {
    return discussions.filter((d) => {
      const matchSearch =
        !searchQuery ||
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory =
        selectedCategory === "ALL" || d.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [discussions, searchQuery, selectedCategory]);

  // Filtered Members
  const filteredMembers = useMemo(() => {
    return mockBuilders.filter((b) => {
      const matchSearch =
        !searchQuery ||
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.role.toLowerCase().includes(searchQuery.toLowerCase());

      const matchSkill =
        selectedSkill === "ALL" ||
        b.skills.some((s) => s.name === selectedSkill);

      const matchCampus =
        selectedCampus === "ALL" || b.campus === selectedCampus;

      return matchSearch && matchSkill && matchCampus;
    });
  }, [searchQuery, selectedSkill, selectedCampus]);

  // Filtered Mentors
  const filteredMentors = useMemo(() => {
    return mentors.filter((m) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.bio.toLowerCase().includes(q) ||
        m.organization.toLowerCase().includes(q) ||
        m.expertise.some((e) => e.toLowerCase().includes(q))
      );
    });
  }, [mentors, searchQuery]);

  return (
    <PageTransition className="space-y-6">
      {/* ─── HEADER ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-[#1F1F1F] bg-gradient-to-b from-[#161616] to-[#0E0E0E] p-6 md:p-8 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#89AACC] uppercase font-bold">
                INIT ECOSYSTEM // DOMAIN: 002
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-[#666]">
                LIVE INTERACTION LAYER
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#F5F5F5]">
              Community
            </h1>

            <p className="text-xs md:text-sm text-[#878787] leading-relaxed font-sans">
              Discover people across campuses, engage in technical discussions, collaborate on
              ambitious builds, and connect with industry mentors.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => setCreatePostOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#89AACC] text-[#0A0A0A] font-semibold text-xs hover:bg-[#789BBF] transition-all duration-200 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(137,170,204,0.2)]"
            >
              <Plus className="w-4 h-4" />
              <span>CREATE POST</span>
            </button>

            <button
              type="button"
              onClick={() => setCreateDiscussionOpen(true)}
              className="px-4 py-2 rounded-xl border border-[#2A2A2A] bg-[#161616] text-[#F5F5F5] font-semibold text-xs hover:border-[#89AACC]/50 hover:bg-[#1A1A1A] transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#89AACC]" />
              <span>START DISCUSSION</span>
            </button>
          </div>
        </div>

        {/* Search and Navigation Bar */}
        <div className="mt-8 pt-6 border-t border-[#1C1C1C] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Tabs bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedCategory("ALL");
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? "bg-[#1F1F1F] text-[#F5F5F5] border border-[#2D2D2D] shadow-sm"
                      : "text-[#777] hover:text-[#CCC] hover:bg-[#141414]"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive ? "text-[#89AACC]" : "text-[#555]"
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeTab}...`}
              className="w-full bg-[#101010] border border-[#222] rounded-xl pl-9 pr-4 py-1.5 text-xs text-[#F5F5F5] placeholder-[#555] focus:outline-none focus:border-[#89AACC] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT GRID ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Center Feed Stream (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-6">
          {/* TAB 1: FEED (HOME) */}
          {activeTab === "feed" && (
            <div className="space-y-4">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
                {[
                  { id: "ALL", label: "All Activity" },
                  { id: "BUILDER_UPDATE", label: "Builder Updates" },
                  { id: "PROJECT_UPDATE", label: "Project Ships" },
                  { id: "QUESTION", label: "Questions" },
                  { id: "ANNOUNCEMENT", label: "Announcements" },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3 py-1 rounded-lg border transition-all whitespace-nowrap ${
                      selectedCategory === c.id
                        ? "border-[#89AACC]/40 bg-[#89AACC]/10 text-[#89AACC]"
                        : "border-[#1F1F1F] bg-[#141414] text-[#777] hover:text-[#DDD]"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Feed posts */}
              {filteredPosts.length === 0 ? (
                <div className="p-12 text-center rounded-2xl border border-dashed border-[#222] bg-[#121212]">
                  <p className="text-xs font-mono text-[#666]">
                    No transmissions found matching your filter criteria.
                  </p>
                </div>
              ) : (
                <StaggerList className="space-y-4">
                  {filteredPosts.map((post) => (
                    <StaggerItem key={post.id}>
                      <CommunityPostCard post={post} />
                    </StaggerItem>
                  ))}
                </StaggerList>
              )}
            </div>
          )}

          {/* TAB 2: DISCUSSIONS */}
          {activeTab === "discussions" && (
            <div className="space-y-4">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
                {[
                  "ALL",
                  "Building",
                  "AI / ML",
                  "Web",
                  "Open Source",
                  "Projects",
                  "Learning",
                  "Career",
                  "INIT",
                ].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg border transition-all whitespace-nowrap ${
                      selectedCategory === cat
                        ? "border-[#89AACC]/40 bg-[#89AACC]/10 text-[#89AACC]"
                        : "border-[#1F1F1F] bg-[#141414] text-[#777] hover:text-[#DDD]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Discussions list */}
              {filteredDiscussions.length === 0 ? (
                <div className="p-12 text-center rounded-2xl border border-dashed border-[#222] bg-[#121212]">
                  <p className="text-xs font-mono text-[#666]">
                    No discussions found in this category.
                  </p>
                </div>
              ) : (
                <StaggerList className="space-y-4">
                  {filteredDiscussions.map((disc) => (
                    <StaggerItem key={disc.id}>
                      <DiscussionCard
                        discussion={disc}
                        onSelect={(d) => setSelectedDiscussion(d)}
                      />
                    </StaggerItem>
                  ))}
                </StaggerList>
              )}
            </div>
          )}

          {/* TAB 3: MEMBERS */}
          {activeTab === "members" && (
            <div className="space-y-4">
              {/* Members filters bar */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[#1F1F1F] bg-[#141414] flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-[#89AACC]" />
                  <span className="text-xs font-mono text-[#878787]">FILTER BY:</span>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {/* Skill filter */}
                  <select
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="bg-[#181818] border border-[#282828] rounded-lg px-2.5 py-1 text-xs font-mono text-[#DDD] focus:outline-none focus:border-[#89AACC]"
                  >
                    <option value="ALL">All Skills</option>
                    {allSkills
                      .filter((s) => s !== "ALL")
                      .map((sk) => (
                        <option key={sk} value={sk}>
                          {sk}
                        </option>
                      ))}
                  </select>

                  {/* Campus filter */}
                  <select
                    value={selectedCampus}
                    onChange={(e) => setSelectedCampus(e.target.value)}
                    className="bg-[#181818] border border-[#282828] rounded-lg px-2.5 py-1 text-xs font-mono text-[#DDD] focus:outline-none focus:border-[#89AACC]"
                  >
                    <option value="ALL">All Campuses</option>
                    {allCampuses
                      .filter((c) => c !== "ALL")
                      .map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Members Grid */}
              {filteredMembers.length === 0 ? (
                <div className="p-12 text-center rounded-2xl border border-dashed border-[#222] bg-[#121212]">
                  <p className="text-xs font-mono text-[#666]">
                    No builders matching the selected skill and campus criteria.
                  </p>
                </div>
              ) : (
                <StaggerList className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredMembers.map((builder) => (
                    <StaggerItem key={builder.id}>
                      <MemberCard builder={builder} />
                    </StaggerItem>
                  ))}
                </StaggerList>
              )}
            </div>
          )}

          {/* TAB 4: MENTORS */}
          {activeTab === "mentors" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-[#202020] bg-[#141414]/60">
                <h2 className="text-sm font-semibold text-[#F5F5F5]">
                  Industry Mentorship & Architecture Review
                </h2>
                <p className="text-xs text-[#878787] mt-1 font-sans">
                  Practitioners and domain leads dedicating hours to university builders.
                  Request 1:1 reviews for system design, evaluations, or project direction.
                </p>
              </div>

              <StaggerList className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMentors.map((mentor) => (
                  <StaggerItem key={mentor.id}>
                    <MentorCard mentor={mentor} />
                  </StaggerItem>
                ))}
              </StaggerList>
            </div>
          )}

          {/* TAB 5: CHAPTERS */}
          {activeTab === "chapters" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-[#202020] bg-[#141414]/60 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-[#F5F5F5]">
                    INIT Campus Chapters
                  </h2>
                  <p className="text-xs text-[#878787] mt-1 font-sans">
                    Local rooms for ambitious builders to meet, build, and ship in public.
                  </p>
                </div>
                <a
                  href="https://example.com/init-chapter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl border border-[#89AACC]/40 bg-[#89AACC]/10 text-xs font-mono text-[#89AACC] hover:bg-[#89AACC] hover:text-[#0A0A0A] transition-all"
                >
                  START A CHAPTER →
                </a>
              </div>

              <StaggerList className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapters.map((chap) => (
                  <StaggerItem key={chap.id}>
                    <ChapterCard chapter={chap} />
                  </StaggerItem>
                ))}
              </StaggerList>
            </div>
          )}

          {/* TAB 6: ANNOUNCEMENTS */}
          {activeTab === "announcements" && (
            <div className="space-y-4">
              <StaggerList className="space-y-4">
                {announcements.map((ann) => (
                  <StaggerItem key={ann.id}>
                    <AnnouncementCard announcement={ann} />
                  </StaggerItem>
                ))}
              </StaggerList>
            </div>
          )}

          {/* TAB 7: CHANNELS */}
          {activeTab === "channels" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-[#202020] bg-[#141414]/60">
                <h2 className="text-sm font-semibold text-[#F5F5F5]">
                  External Communication Channels
                </h2>
                <p className="text-xs text-[#878787] mt-1 font-sans">
                  Join our official WhatsApp broadcasts for quick local campus alerts, or enter
                  the 24/7 Discord War Room for live voice pairing and code review stages.
                </p>
              </div>

              <StaggerList className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {channels.map((chan) => (
                  <StaggerItem key={chan.id}>
                    <CommunityChannelCard channel={chan} />
                  </StaggerItem>
                ))}
              </StaggerList>
            </div>
          )}
        </div>

        {/* ─── RIGHT CONTEXTUAL RAIL (4 cols on lg) ─────────────────────────── */}
        <aside className="lg:col-span-4 space-y-5">
          {/* Community Channels Card */}
          <div className="rounded-2xl border border-[#1F1F1F] bg-[#141414]/90 p-4 backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E1E1E]">
              <span className="text-[10px] font-mono tracking-wider text-[#89AACC] uppercase font-bold">
                COMMUNITY CHANNELS
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                ACTIVE
              </span>
            </div>

            <div className="space-y-3 mt-3">
              {channels.map((ch) => (
                <div
                  key={ch.id}
                  className="p-3 rounded-xl border border-[#222] bg-[#181818]/60 flex items-center justify-between gap-3"
                >
                  <div>
                    <h3 className="text-xs font-semibold text-[#F5F5F5]">
                      {ch.name}
                    </h3>
                    <p className="text-[10px] font-mono text-[#777] mt-0.5">
                      {ch.activeCount}
                    </p>
                  </div>
                  <a
                    href={ch.joinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-[#2A2A2A] bg-[#1E1E1E] text-[#89AACC] hover:bg-[#89AACC] hover:text-[#0A0A0A] transition-all"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Announcement Spotlight */}
          {announcements[0] && (
            <div className="rounded-2xl border border-[#89AACC]/30 bg-gradient-to-br from-[#89AACC]/10 to-[#141414] p-4">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#89AACC] mb-2 uppercase font-bold">
                <Bell className="w-3 h-3" />
                <span>FEATURED EVENT</span>
              </div>
              <h3 className="text-sm font-bold text-[#F5F5F5] leading-snug">
                {announcements[0].title}
              </h3>
              <p className="text-xs text-[#999] mt-1.5 line-clamp-2">
                {announcements[0].content}
              </p>
              <button
                type="button"
                onClick={() => setActiveTab("announcements")}
                className="mt-3 text-xs font-mono text-[#89AACC] hover:underline flex items-center gap-1"
              >
                <span>READ TRANSMISSION</span>
                <span>→</span>
              </button>
            </div>
          )}

          {/* Trending Discussions */}
          <div className="rounded-2xl border border-[#1F1F1F] bg-[#141414]/90 p-4 backdrop-blur-md">
            <div className="flex items-center gap-1.5 pb-3 border-b border-[#1E1E1E] text-[10px] font-mono tracking-wider text-[#89AACC] uppercase font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>TRENDING DISCUSSIONS</span>
            </div>

            <div className="space-y-3 mt-3">
              {discussions.slice(0, 3).map((d) => (
                <div
                  key={d.id}
                  onClick={() => setSelectedDiscussion(d)}
                  className="group/item cursor-pointer p-2 rounded-lg hover:bg-[#1A1A1A] transition-colors"
                >
                  <span className="text-[9px] font-mono text-[#89AACC] uppercase block mb-0.5">
                    {d.category}
                  </span>
                  <h4 className="text-xs font-medium text-[#D4D4D4] group-hover/item:text-[#89AACC] transition-colors line-clamp-2 leading-snug">
                    {d.title}
                  </h4>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-[#555] mt-1">
                    <span>{d.upvotes} upvotes</span>
                    <span>•</span>
                    <span>{d.commentsCount} replies</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setActiveTab("discussions")}
              className="w-full mt-3 pt-2.5 border-t border-[#1C1C1C] text-center text-xs font-mono text-[#878787] hover:text-[#F5F5F5] block transition-colors"
            >
              VIEW ALL DISCUSSIONS →
            </button>
          </div>

          {/* Mentor Spotlight */}
          <div className="rounded-2xl border border-[#1F1F1F] bg-[#141414]/90 p-4 backdrop-blur-md">
            <span className="text-[10px] font-mono tracking-wider text-[#89AACC] uppercase font-bold block mb-2">
              MENTOR IN RESIDENCE
            </span>
            <div className="flex items-center gap-3">
              <img
                src={mentors[0].avatar}
                alt={mentors[0].name}
                className="w-10 h-10 rounded-full border border-[#2A2A2A] object-cover"
              />
              <div>
                <h3 className="text-xs font-semibold text-[#F5F5F5]">
                  {mentors[0].name}
                </h3>
                <p className="text-[10px] font-mono text-[#888]">
                  {mentors[0].role}
                </p>
                <p className="text-[9px] font-mono text-[#555]">
                  {mentors[0].organization}
                </p>
              </div>
            </div>
            <p className="mt-2.5 text-xs text-[#878787] line-clamp-2">
              "{mentors[0].bio}"
            </p>
            <button
              type="button"
              onClick={() => setActiveTab("mentors")}
              className="mt-3 text-xs font-mono text-[#89AACC] hover:underline flex items-center gap-1"
            >
              <span>REQUEST 1:1 INTERACTION</span>
              <span>→</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Modals */}
      <CreatePostModal
        isOpen={createPostOpen}
        onClose={() => setCreatePostOpen(false)}
      />

      <CreateDiscussionModal
        isOpen={createDiscussionOpen}
        onClose={() => setCreateDiscussionOpen(false)}
      />

      <DiscussionDetailModal
        discussion={selectedDiscussion}
        onClose={() => setSelectedDiscussion(null)}
      />
    </PageTransition>
  );
}

export function CommunityPage() {
  return (
    <CommunityStoreProvider>
      <CommunityContent />
    </CommunityStoreProvider>
  );
}

export default CommunityPage;
