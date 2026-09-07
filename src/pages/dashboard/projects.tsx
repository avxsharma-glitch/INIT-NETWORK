import { useState } from "react";
import {
  mockProjects,
  mockBuilders,
  getBuilderById,
  type Project,
  statusTextColors,
  type ProjectStatus
} from "@/data/mock";
import { Link, useParams } from "wouter";
import { ArrowLeft, GitBranch, ExternalLink, Plus } from "lucide-react";

const STATUS_ORDER: ProjectStatus[] = [
  "IDEA", "VALIDATING", "BUILDING", "BETA", "SHIPPED", "MAINTAINED"
];

function StatusBadge({ status }: { status: ProjectStatus }) {
  const color = statusTextColors[status] || "#999";
  return (
    <span
      className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded border"
      style={{ color, borderColor: `${color}40`, background: `${color}10` }}
    >
      {status}
    </span>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  const owner = getBuilderById(project.ownerId);

  return (
    <div className="space-y-8">
      <Link href="/app/projects" className="flex items-center gap-2 text-xs font-mono text-[#555] hover:text-[#878787] transition-colors w-fit">
        <ArrowLeft className="h-3.5 w-3.5" /> ALL PROJECTS
      </Link>

      {/* Header */}
      <div className="p-6 rounded-2xl border border-[#1F1F1F]" style={{ background: project.coverColor }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <StatusBadge status={project.status} />
            <h1 className="text-3xl font-semibold mt-3">{project.title}</h1>
            <p className="text-sm text-[#878787] mt-1">{project.tagline}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            {project.repoUrl && (
              <a href={`https://${project.repoUrl}`} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A2A] bg-[#0A0A0A]/60 text-xs text-[#878787] hover:text-[#F5F5F5] transition-colors">
                <GitBranch className="h-3.5 w-3.5" /> Repo
              </a>
            )}
            {project.demoUrl && (
              <a href={`https://${project.demoUrl}`} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A2A] bg-[#0A0A0A]/60 text-xs text-[#89AACC] hover:text-[#F5F5F5] transition-colors">
                <ExternalLink className="h-3.5 w-3.5" /> Demo
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-3">ABOUT</h2>
            <p className="text-sm text-[#ccc] leading-relaxed">{project.description}</p>
          </section>

          {/* Lifecycle progress */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">LIFECYCLE</h2>
            <div className="flex items-center gap-2 flex-wrap">
              {STATUS_ORDER.map((s, i) => {
                const currentIdx = STATUS_ORDER.indexOf(project.status);
                const isCurrent = s === project.status;
                const isPast = i < currentIdx;
                const color = statusTextColors[s];
                return (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`px-3 py-1.5 rounded-lg border text-[9px] font-mono transition-all ${
                      isCurrent
                        ? "border-current"
                        : isPast
                        ? "opacity-40"
                        : "opacity-20"
                    }`}
                      style={{ color: isCurrent ? color : isPast ? color : "#444", borderColor: isCurrent ? `${color}60` : "#1F1F1F", background: isCurrent ? `${color}10` : "transparent" }}>
                      {s}
                    </div>
                    {i < STATUS_ORDER.length - 1 && (
                      <span className={`text-[#333] text-xs ${i < currentIdx ? "text-[#555]" : ""}`}>→</span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Team Members */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">TEAM</h2>
            <div className="space-y-3">
              {project.members.map((member) => {
                const builder = getBuilderById(member.builderId);
                return builder ? (
                  <Link key={member.builderId} href={`/app/builders/${builder.id}`}>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#141414] border border-[#1F1F1F] hover:border-[#2A2A2A] transition-colors cursor-pointer group">
                      <img src={builder.avatar} alt={builder.name}
                        className="w-8 h-8 rounded-full border border-[#2A2A2A] shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium group-hover:text-[#89AACC] transition-colors">{builder.name}</p>
                        <p className="text-[9px] font-mono text-[#555]">{member.role}</p>
                      </div>
                      <p className="text-[9px] font-mono text-[#444]">{builder.campus}</p>
                    </div>
                  </Link>
                ) : null;
              })}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Tech Stack */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">TECH STACK</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <span key={t} className="text-xs font-mono text-[#878787] border border-[#1F1F1F] rounded-lg px-3 py-1.5">{t}</span>
              ))}
            </div>
          </section>

          {/* Tags */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">TAGS</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="text-xs font-mono text-[#555] border border-[#1F1F1F] rounded-lg px-3 py-1.5">{t}</span>
              ))}
            </div>
          </section>

          {/* Meta */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">DETAILS</h2>
            <div className="bg-[#141414] border border-[#1F1F1F] rounded-xl overflow-hidden">
              {[
                { label: "Owner", value: owner?.name || "Unknown" },
                { label: "Members", value: project.members.length },
                { label: "Created", value: project.createdAt },
                { label: "Updated", value: project.updatedAt }
              ].map((d, i) => (
                <div key={d.label} className={`px-4 py-3 flex justify-between ${i < 3 ? "border-b border-[#1F1F1F]" : ""}`}>
                  <span className="text-xs text-[#555]">{d.label}</span>
                  <span className="text-xs text-[#ccc] font-medium">{String(d.value)}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export function ProjectsPage() {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "ALL">("ALL");
  const [query, setQuery] = useState("");

  const filtered = mockProjects.filter((p) => {
    const matchStatus = statusFilter === "ALL" || p.status === statusFilter;
    const matchQ =
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tagline.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return matchStatus && matchQ;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-[#555] mt-1">{mockProjects.length} projects across the network.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#1F1F1F] bg-[#141414] text-xs font-medium text-[#89AACC] hover:border-[#89AACC]/40 transition-colors">
          <Plus className="h-3.5 w-3.5" /> Create Project
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl bg-[#141414] border border-[#1F1F1F] text-sm text-[#F5F5F5] placeholder:text-[#444] focus:outline-none focus:border-[#89AACC]/50 transition-colors"
        />
        <div className="flex gap-1 p-1 bg-[#141414] border border-[#1F1F1F] rounded-xl overflow-x-auto">
          {(["ALL", ...STATUS_ORDER] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-mono whitespace-nowrap transition-colors ${
                statusFilter === s
                  ? "bg-[#0A0A0A] text-[#F5F5F5] border border-[#2A2A2A]"
                  : "text-[#555] hover:text-[#878787]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project) => {
          const color = statusTextColors[project.status] || "#999";
          return (
            <Link key={project.id} href={`/app/projects/${project.id}`}>
              <div className="rounded-xl border border-[#1F1F1F] hover:border-[#2A2A2A] transition-colors cursor-pointer group h-full flex flex-col overflow-hidden">
                <div className="h-24 flex items-end p-4" style={{ background: project.coverColor }}>
                  <span className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded border"
                    style={{ color, borderColor: `${color}40`, background: `${color}15` }}>
                    {project.status}
                  </span>
                </div>
                <div className="p-4 bg-[#141414] flex-1 flex flex-col">
                  <h3 className="text-sm font-medium group-hover:text-[#89AACC] transition-colors">{project.title}</h3>
                  <p className="text-xs text-[#555] mt-1">{project.tagline}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.techStack.slice(0, 3).map((t) => (
                      <span key={t} className="text-[9px] font-mono text-[#555] border border-[#1F1F1F] rounded px-1.5 py-0.5">{t}</span>
                    ))}
                  </div>
                  <div className="mt-auto pt-3 flex items-center justify-between border-t border-[#1F1F1F] mt-4">
                    <div className="flex -space-x-1.5">
                      {project.members.slice(0, 3).map((m) => {
                        const b = getBuilderById(m.builderId);
                        return b ? (
                          <img key={b.id} src={b.avatar} alt={b.name}
                            className="w-5 h-5 rounded-full border border-[#141414]" />
                        ) : null;
                      })}
                    </div>
                    <span className="text-[9px] font-mono text-[#444]">
                      {project.members.length} MEMBER{project.members.length !== 1 ? "S" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const project = mockProjects.find((p) => p.id === params.id);
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-[#444] font-mono text-sm gap-4">
        <p>Project not found.</p>
        <Link href="/app/projects" className="text-[#89AACC] text-xs hover:underline">← Back to projects</Link>
      </div>
    );
  }
  return <ProjectDetail project={project} />;
}
