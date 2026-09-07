import { useState } from "react";
import {
  mockBuilders,
  getProjectsForBuilder,
  getContributionsForBuilder,
  type Builder,
  statusTextColors,
  currentUser,
} from "@/data/mock";
import { useAppStore } from "@/store/AppStore";
import { Link, useParams } from "wouter";
import { ArrowLeft, ExternalLink, GitBranch, X as XIcon, Globe, UserPlus, UserCheck } from "lucide-react";

const SKILL_LEVEL_COLORS = {
  LEARNING: "#555",
  PROFICIENT: "#89AACC",
  EXPERT: "#3ACA7A",
};

function ConnectButton({ builder }: { builder: Builder }) {
  const { isConnected, connectBuilder, disconnectBuilder } = useAppStore();
  const connected = isConnected(builder.id);
  if (builder.isCurrentUser) return null;

  return (
    <button
      onClick={() => connected ? disconnectBuilder(builder.id) : connectBuilder(builder.id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-medium transition-all ${
        connected
          ? "border-[#3ACA7A]/30 bg-[#3ACA7A]/5 text-[#3ACA7A] hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400"
          : "border-[#89AACC]/30 bg-[#89AACC]/5 text-[#89AACC] hover:border-[#89AACC] hover:bg-[#89AACC]/10"
      }`}
    >
      {connected ? (
        <><UserCheck className="h-3.5 w-3.5" /> Connected</>
      ) : (
        <><UserPlus className="h-3.5 w-3.5" /> Connect</>
      )}
    </button>
  );
}

function BuilderProfile({ builder }: { builder: Builder }) {
  const { state } = useAppStore();
  // Get live project data from store (includes newly created projects)
  const projects = state.projects.filter((p) =>
    p.members.some((m) => m.builderId === builder.id)
  );
  const contributions = getContributionsForBuilder(builder.id);
  const isCurrentUser = builder.id === currentUser.id;

  return (
    <div className="space-y-8">
      <Link href="/app/builders" className="flex items-center gap-2 text-xs font-mono text-[#555] hover:text-[#878787] transition-colors w-fit">
        <ArrowLeft className="h-3.5 w-3.5" /> ALL BUILDERS
      </Link>

      {/* Profile Header */}
      <div className="p-6 rounded-2xl bg-[#141414] border border-[#1F1F1F]">
        <div className="flex flex-wrap gap-6 items-start">
          <img src={builder.avatar} alt={builder.name}
            className="w-20 h-20 rounded-full border border-[#2A2A2A]" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h1 className="text-2xl font-semibold">{builder.name}</h1>
              {isCurrentUser && (
                <span className="text-[9px] font-mono text-[#89AACC] border border-[#89AACC]/30 bg-[#89AACC]/5 rounded px-2 py-0.5">
                  YOU
                </span>
              )}
            </div>
            <p className="text-xs font-mono text-[#555] mb-3">
              {builder.role} · {builder.campus}
            </p>
            <p className="text-sm text-[#878787] leading-relaxed max-w-xl mb-4">{builder.bio}</p>
            <div className="flex flex-wrap items-center gap-3">
              <ConnectButton builder={builder} />
              {builder.social.github && (
                <a href={`https://github.com/${builder.social.github}`} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#555] hover:text-[#F5F5F5] transition-colors">
                  <GitBranch className="h-3.5 w-3.5" /> {builder.social.github}
                </a>
              )}
              {builder.social.twitter && (
                <a href={`https://twitter.com/${builder.social.twitter}`} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#555] hover:text-[#F5F5F5] transition-colors">
                  <XIcon className="h-3.5 w-3.5" /> @{builder.social.twitter}
                </a>
              )}
              {builder.social.portfolio && (
                <a href={`https://${builder.social.portfolio}`} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#555] hover:text-[#F5F5F5] transition-colors">
                  <Globe className="h-3.5 w-3.5" /> {builder.social.portfolio}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Projects */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">PROJECTS</h2>
            {projects.length > 0 ? (
              <div className="space-y-3">
                {projects.map((project) => {
                  const color = statusTextColors[project.status] || "#999";
                  return (
                    <Link key={project.id} href={`/app/projects/${project.id}`}>
                      <div className="p-4 rounded-xl bg-[#141414] border border-[#1F1F1F] hover:border-[#2A2A2A] transition-colors cursor-pointer group">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded border"
                              style={{ color, borderColor: `${color}40`, background: `${color}10` }}>
                              {project.status}
                            </span>
                            <h3 className="text-sm font-medium mt-2 group-hover:text-[#89AACC] transition-colors">{project.title}</h3>
                            <p className="text-xs text-[#555] mt-0.5">{project.tagline}</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-[#333] group-hover:text-[#89AACC] transition-colors shrink-0" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-[#444]">No projects yet.</p>
            )}
          </section>

          {/* Contributions */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">CONTRIBUTIONS</h2>
            {contributions.length > 0 ? (
              <div className="bg-[#141414] border border-[#1F1F1F] rounded-xl overflow-hidden">
                {contributions.map((c, i) => (
                  <div key={c.id} className={`p-4 ${i < contributions.length - 1 ? "border-b border-[#1F1F1F]" : ""}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[8px] font-mono text-[#555] border border-[#1F1F1F] rounded px-1.5 py-0.5">{c.type}</span>
                      <span className="text-[9px] font-mono text-[#444]">{c.date}</span>
                    </div>
                    <p className="text-sm font-medium text-[#ccc]">{c.title}</p>
                    <p className="text-xs text-[#555] mt-0.5 line-clamp-2">{c.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#444]">No contributions yet.</p>
            )}
          </section>
        </div>

        <div className="space-y-8">
          {/* Skills */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">SKILLS</h2>
            <div className="bg-[#141414] border border-[#1F1F1F] rounded-xl overflow-hidden">
              {builder.skills.map((skill, i) => {
                const color = SKILL_LEVEL_COLORS[skill.level];
                return (
                  <div key={skill.name} className={`px-4 py-3 flex items-center justify-between ${i < builder.skills.length - 1 ? "border-b border-[#1F1F1F]" : ""}`}>
                    <span className="text-sm text-[#ccc]">{skill.name}</span>
                    <span className="text-[9px] font-mono" style={{ color }}>{skill.level}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Achievements */}
          {builder.achievementIds.length > 0 && (
            <section>
              <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">ACHIEVEMENTS</h2>
              <div className="space-y-2">
                {builder.achievementIds.map((aid) => {
                  const icons: Record<string, string> = { ach1: "🚀", ach2: "🔗", ach3: "🏛️", ach4: "🌐", ach5: "🏆", ach6: "🎓", ach7: "💡", ach8: "⚡" };
                  const labels: Record<string, string> = { ach1: "First Ship", ach2: "Connector", ach3: "Chapter Founder", ach4: "Open Source", ach5: "Hackathon Winner", ach6: "Mentor", ach7: "Idea Machine", ach8: "Shipped to Production" };
                  return (
                    <div key={aid} className="px-4 py-3 rounded-xl bg-[#141414] border border-[#1F1F1F] flex items-center gap-3">
                      <span className="text-lg shrink-0">{icons[aid] || "⭐"}</span>
                      <p className="text-xs font-medium text-[#ccc]">{labels[aid] || aid}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Stats */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">STATS</h2>
            <div className="bg-[#141414] border border-[#1F1F1F] rounded-xl overflow-hidden">
              {[
                { label: "Projects", value: projects.length },
                { label: "Contributions", value: contributions.length },
                { label: "Achievements", value: builder.achievementIds.length },
              ].map((s, i) => (
                <div key={s.label} className={`px-4 py-3 flex justify-between ${i < 2 ? "border-b border-[#1F1F1F]" : ""}`}>
                  <span className="text-xs text-[#555]">{s.label}</span>
                  <span className="text-sm font-semibold">{s.value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export function BuildersPage() {
  const { isConnected } = useAppStore();
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const roles = ["ALL", ...Array.from(new Set(mockBuilders.map((b) => b.role)))];
  const filtered = mockBuilders.filter((b) => {
    const matchQ =
      b.name.toLowerCase().includes(query.toLowerCase()) ||
      b.campus.toLowerCase().includes(query.toLowerCase()) ||
      b.skills.some((s) => s.name.toLowerCase().includes(query.toLowerCase()));
    const matchRole = roleFilter === "ALL" || b.role === roleFilter;
    return matchQ && matchRole;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Builders</h1>
        <p className="text-sm text-[#555] mt-1">
          {mockBuilders.length} builders across the INIT network.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search builders..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-4 pr-4 py-2.5 rounded-xl bg-[#141414] border border-[#1F1F1F] text-sm text-[#F5F5F5] placeholder:text-[#444] focus:outline-none focus:border-[#89AACC]/50 transition-colors"
          />
        </div>
        <div className="flex gap-1 p-1 bg-[#141414] border border-[#1F1F1F] rounded-xl overflow-x-auto">
          {roles.map((r) => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-mono whitespace-nowrap transition-colors ${
                roleFilter === r ? "bg-[#0A0A0A] text-[#F5F5F5] border border-[#2A2A2A]" : "text-[#555] hover:text-[#878787]"
              }`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((builder) => {
          const connected = isConnected(builder.id);
          return (
            <Link key={builder.id} href={`/app/builders/${builder.id}`}>
              <div className="p-4 rounded-xl bg-[#141414] border border-[#1F1F1F] hover:border-[#2A2A2A] transition-colors cursor-pointer group h-full">
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative shrink-0">
                    <img src={builder.avatar} alt={builder.name}
                      className="w-10 h-10 rounded-full border border-[#2A2A2A] group-hover:border-[#89AACC]/40 transition-colors" />
                    {connected && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#3ACA7A] rounded-full border-2 border-[#141414]" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium group-hover:text-[#89AACC] transition-colors truncate">{builder.name}</p>
                    <p className="text-[9px] font-mono text-[#555] mt-0.5">{builder.role}</p>
                    <p className="text-[9px] text-[#444] mt-0.5">{builder.campus}</p>
                  </div>
                </div>
                <p className="text-xs text-[#555] line-clamp-2 leading-relaxed mb-3">{builder.bio}</p>
                <div className="flex flex-wrap gap-1">
                  {builder.skills.slice(0, 3).map((s) => (
                    <span key={s.name} className="text-[9px] font-mono text-[#555] border border-[#1F1F1F] rounded px-1.5 py-0.5">{s.name}</span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-3 text-sm text-[#444] text-center py-12">No builders found.</p>
        )}
      </div>
    </div>
  );
}

export function BuilderDetailPage() {
  const params = useParams<{ id: string }>();
  const builder = mockBuilders.find((b) => b.id === params.id);
  if (!builder) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-[#444] font-mono text-sm gap-4">
        <p>Builder not found.</p>
        <Link href="/app/builders" className="text-[#89AACC] text-xs hover:underline">← Back to builders</Link>
      </div>
    );
  }
  return <BuilderProfile builder={builder} />;
}
