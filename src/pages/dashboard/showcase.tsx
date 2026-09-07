import { useState } from "react";
import { mockBuilders, getBuilderById, statusTextColors } from "@/data/mock";
import { useAppStore } from "@/store/AppStore";
import { Link } from "wouter";
import { ExternalLink, GitBranch, Star } from "lucide-react";

export function ShowcasePage() {
  const { state } = useAppStore();
  const [filter, setFilter] = useState<"ALL" | "SHIPPED" | "MAINTAINED">("ALL");

  const featured = state.projects.filter((p) =>
    p.status === "SHIPPED" || p.status === "MAINTAINED"
  );

  const activeBuild = state.projects.filter(
    (p) => p.status === "BUILDING" || p.status === "BETA"
  );

  const displayFeatured = featured.filter(
    (p) => filter === "ALL" || p.status === filter
  );

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-[#89AACC]" />
            <span className="text-xs font-mono text-[#89AACC] tracking-widest">SHOWCASE</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Builder Work</h1>
          <p className="text-sm text-[#555] mt-1">
            {featured.length} shipped project{featured.length !== 1 ? "s" : ""} across the INIT network.
          </p>
        </div>
        {/* Filter */}
        <div className="flex gap-1 p-1 bg-[#141414] border border-[#1F1F1F] rounded-xl">
          {(["ALL", "SHIPPED", "MAINTAINED"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-mono whitespace-nowrap transition-colors ${
                filter === f ? "bg-[#0A0A0A] text-[#F5F5F5] border border-[#2A2A2A]" : "text-[#555] hover:text-[#878787]"
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Shipped / Featured */}
      {displayFeatured.length > 0 ? (
        <section>
          <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-6">
            {filter === "ALL" ? "SHIPPED & MAINTAINED" : filter}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayFeatured.map((project) => {
              const owner = getBuilderById(project.ownerId);
              const color = statusTextColors[project.status] || "#3ACA7A";
              return (
                <div key={project.id} className="rounded-2xl border border-[#1F1F1F] overflow-hidden group">
                  {/* Cover */}
                  <div className="h-32 relative flex items-end p-5" style={{ background: project.coverColor }}>
                    <div className="absolute inset-0 opacity-20"
                      style={{ background: "linear-gradient(135deg, rgba(137,170,204,0.2), transparent)" }} />
                    <span className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded border relative z-10"
                      style={{ color, borderColor: `${color}40`, background: `${color}15` }}>
                      {project.status}
                    </span>
                  </div>

                  <div className="p-5 bg-[#141414]">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <Link href={`/app/projects/${project.id}`}>
                        <h3 className="text-lg font-medium hover:text-[#89AACC] transition-colors cursor-pointer">
                          {project.title}
                        </h3>
                      </Link>
                      <div className="flex gap-1.5 shrink-0">
                        {project.repoUrl && (
                          <a href={`https://${project.repoUrl}`} target="_blank" rel="noreferrer"
                            className="p-1.5 rounded-lg border border-[#1F1F1F] text-[#555] hover:text-[#F5F5F5] transition-colors">
                            <GitBranch className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a href={`https://${project.demoUrl}`} target="_blank" rel="noreferrer"
                            className="p-1.5 rounded-lg border border-[#89AACC]/30 text-[#89AACC] hover:border-[#89AACC] transition-colors">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-[#555] mb-4">{project.tagline}</p>

                    {/* Team */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex -space-x-1.5">
                        {project.members.slice(0, 4).map((m) => {
                          const b = getBuilderById(m.builderId);
                          return b ? (
                            <img key={b.id} src={b.avatar} alt={b.name}
                              className="w-6 h-6 rounded-full border border-[#141414]" />
                          ) : null;
                        })}
                      </div>
                      {owner && (
                        <span className="text-xs text-[#555]">
                          by {owner.name}
                          {project.members.length > 1 ? ` + ${project.members.length - 1} more` : ""}
                        </span>
                      )}
                    </div>

                    {/* Tech */}
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 4).map((t) => (
                        <span key={t} className="text-[9px] font-mono text-[#555] border border-[#1F1F1F] rounded px-1.5 py-0.5">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <div className="text-center py-16 text-[#444] font-mono text-sm">
          No {filter !== "ALL" ? filter.toLowerCase() : "shipped"} projects yet.
        </div>
      )}

      {/* Active Builds */}
      {activeBuild.length > 0 && filter === "ALL" && (
        <section>
          <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-6">ACTIVE BUILDS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeBuild.map((project) => {
              const color = statusTextColors[project.status] || "#999";
              return (
                <Link key={project.id} href={`/app/projects/${project.id}`}>
                  <div className="p-4 rounded-xl bg-[#141414] border border-[#1F1F1F] hover:border-[#2A2A2A] transition-colors cursor-pointer group h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded border"
                        style={{ color, borderColor: `${color}40`, background: `${color}10` }}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium group-hover:text-[#89AACC] transition-colors">{project.title}</h3>
                    <p className="text-xs text-[#555] mt-1 flex-1">{project.tagline}</p>
                    <div className="flex -space-x-1.5 mt-3">
                      {project.members.slice(0, 3).map((m) => {
                        const b = getBuilderById(m.builderId);
                        return b ? (
                          <img key={b.id} src={b.avatar} alt={b.name}
                            className="w-5 h-5 rounded-full border border-[#141414]" />
                        ) : null;
                      })}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Builder Highlights */}
      {filter === "ALL" && (
        <section>
          <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-6">FEATURED BUILDERS</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {mockBuilders.map((builder) => (
              <Link key={builder.id} href={`/app/builders/${builder.id}`}>
                <div className="p-4 rounded-xl bg-[#141414] border border-[#1F1F1F] hover:border-[#2A2A2A] transition-colors cursor-pointer group text-center">
                  <img src={builder.avatar} alt={builder.name}
                    className="w-12 h-12 rounded-full mx-auto mb-2 border border-[#2A2A2A] group-hover:border-[#89AACC]/40 transition-colors" />
                  <p className="text-xs font-medium group-hover:text-[#89AACC] transition-colors truncate">{builder.name}</p>
                  <p className="text-[8px] font-mono text-[#444] mt-0.5">{builder.role}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
