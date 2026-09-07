import {
  currentUser,
  getProjectsForBuilder,
  getContributionsForBuilder,
  mockBuilders,
  mockContributions,
  statusTextColors,
  getProjectById,
  getBuilderById
} from "@/data/mock";
import { ArrowRight, Plus, Zap, Clock } from "lucide-react";
import { Link } from "wouter";

function StatusBadge({ status }: { status: string }) {
  const color = statusTextColors[status as keyof typeof statusTextColors] || "#999";
  return (
    <span
      className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded border"
      style={{ color, borderColor: `${color}40`, background: `${color}10` }}
    >
      {status}
    </span>
  );
}

export function DashboardOverview() {
  const myProjects = getProjectsForBuilder(currentUser.id);
  const myContributions = getContributionsForBuilder(currentUser.id);
  const suggestedBuilders = mockBuilders.filter(
    (b) => !b.isCurrentUser && !currentUser.projectIds.includes(b.id)
  ).slice(0, 3);

  const recentNetwork = mockContributions
    .filter((c) => c.builderId !== currentUser.id)
    .slice(0, 4);

  return (
    <div className="space-y-10">
      {/* Identity Header */}
      <section className="flex items-start justify-between gap-6 flex-wrap">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-14 h-14 rounded-full border border-[#2A2A2A]"
          />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back,{" "}
              <em className="font-serif not-italic" style={{ color: "#89AACC" }}>
                {currentUser.name.split(" ")[0]}
              </em>
            </h1>
            <p className="text-xs font-mono text-[#555] mt-1 tracking-widest">
              {currentUser.role} · {currentUser.campus}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/app/projects"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#1F1F1F] bg-[#141414] text-xs font-medium text-[#F5F5F5] hover:border-[#89AACC]/50 transition-colors"
          >
            <Plus className="h-3.5 w-3.5 text-[#89AACC]" />
            New Project
          </Link>
          <Link
            href="/app/discover"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#1F1F1F] bg-[#141414] text-xs font-medium text-[#878787] hover:text-[#F5F5F5] transition-colors"
          >
            Discover
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Active Builds", value: myProjects.length },
          { label: "Contributions", value: myContributions.length },
          { label: "Connections", value: 12 },
          { label: "Achievements", value: currentUser.achievementIds.length }
        ].map((stat) => (
          <div
            key={stat.label}
            className="px-5 py-4 rounded-xl bg-[#141414] border border-[#1F1F1F]"
          >
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className="text-[10px] font-mono text-[#555] mt-1 tracking-wider">
              {stat.label.toUpperCase()}
            </p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Projects + Builders */}
        <div className="lg:col-span-2 space-y-10">

          {/* Current Projects */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-mono tracking-widest text-[#878787]">
                CURRENT BUILDS
              </h2>
              <Link
                href="/app/projects"
                className="text-[10px] font-mono text-[#555] hover:text-[#878787] flex items-center gap-1 transition-colors"
              >
                ALL PROJECTS <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {myProjects.map((project) => (
                <Link key={project.id} href={`/app/projects/${project.id}`}>
                  <div className="p-5 rounded-xl bg-[#141414] border border-[#1F1F1F] hover:border-[#2A2A2A] transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <StatusBadge status={project.status} />
                        </div>
                        <h3 className="font-medium text-sm group-hover:text-[#89AACC] transition-colors truncate">
                          {project.title}
                        </h3>
                        <p className="text-xs text-[#555] mt-1 line-clamp-1">
                          {project.tagline}
                        </p>
                      </div>
                      <div className="flex -space-x-1.5 shrink-0">
                        {project.members.slice(0, 3).map((m) => {
                          const b = getBuilderById(m.builderId);
                          return b ? (
                            <img
                              key={b.id}
                              src={b.avatar}
                              alt={b.name}
                              className="w-6 h-6 rounded-full border border-[#141414]"
                            />
                          ) : null;
                        })}
                      </div>
                    </div>
                    <div className="flex gap-1.5 mt-4 flex-wrap">
                      {project.techStack.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-mono text-[#555] border border-[#1F1F1F] rounded px-1.5 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Suggested Builders */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-mono tracking-widest text-[#878787]">
                BUILDERS YOU MIGHT KNOW
              </h2>
              <Link
                href="/app/builders"
                className="text-[10px] font-mono text-[#555] hover:text-[#878787] flex items-center gap-1 transition-colors"
              >
                ALL BUILDERS <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {suggestedBuilders.map((builder) => (
                <Link key={builder.id} href={`/app/builders/${builder.id}`}>
                  <div className="p-4 rounded-xl bg-[#141414] border border-[#1F1F1F] hover:border-[#2A2A2A] transition-colors cursor-pointer group text-center">
                    <img
                      src={builder.avatar}
                      alt={builder.name}
                      className="w-12 h-12 rounded-full mx-auto mb-3 border border-[#2A2A2A] group-hover:border-[#89AACC]/40 transition-colors"
                    />
                    <p className="text-sm font-medium group-hover:text-[#89AACC] transition-colors">
                      {builder.name}
                    </p>
                    <p className="text-[9px] font-mono text-[#555] mt-0.5">
                      {builder.role}
                    </p>
                    <p className="text-[9px] text-[#444] mt-0.5">{builder.campus}</p>
                    <div className="flex flex-wrap gap-1 justify-center mt-3">
                      {builder.skills.slice(0, 2).map((s) => (
                        <span
                          key={s.name}
                          className="text-[8px] font-mono text-[#555] border border-[#1F1F1F] rounded px-1.5 py-0.5"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Activity Feed */}
        <div className="space-y-8">
          {/* Recent Contributions */}
          <section>
            <h2 className="text-sm font-mono tracking-widest text-[#878787] mb-5">
              NETWORK ACTIVITY
            </h2>
            <div className="bg-[#141414] border border-[#1F1F1F] rounded-xl overflow-hidden">
              {recentNetwork.map((c, i) => {
                const builder = getBuilderById(c.builderId);
                const project = getProjectById(c.projectId);
                return (
                  <div
                    key={c.id}
                    className={`p-4 flex gap-3 ${i < recentNetwork.length - 1 ? "border-b border-[#1F1F1F]" : ""}`}
                  >
                    {builder && (
                      <img
                        src={builder.avatar}
                        alt={builder.name}
                        className="w-7 h-7 rounded-full border border-[#2A2A2A] shrink-0 mt-0.5"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-xs text-[#ccc] leading-snug">
                        <span className="font-medium">{builder?.name}</span>{" "}
                        contributed to{" "}
                        <span className="text-[#89AACC]">{project?.title}</span>
                      </p>
                      <p className="text-[9px] text-[#555] font-mono mt-1">
                        {c.type} · {c.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="text-sm font-mono tracking-widest text-[#878787] mb-5">
              QUICK ACTIONS
            </h2>
            <div className="space-y-2">
              {[
                { label: "Start a new project", href: "/app/projects", icon: Zap },
                { label: "Find collaborators", href: "/app/discover", icon: Plus },
                { label: "Browse showcase", href: "/app/showcase", icon: ArrowRight }
              ].map((action) => (
                <Link key={action.label} href={action.href}>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#1F1F1F] bg-[#141414] hover:border-[#89AACC]/30 cursor-pointer group transition-colors">
                    <action.icon className="h-4 w-4 text-[#555] group-hover:text-[#89AACC] transition-colors" />
                    <span className="text-sm text-[#878787] group-hover:text-[#F5F5F5] transition-colors">
                      {action.label}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-[#333] ml-auto group-hover:text-[#555] transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* My Contributions */}
          <section>
            <h2 className="text-sm font-mono tracking-widest text-[#878787] mb-5">
              MY RECENT CONTRIBUTIONS
            </h2>
            <div className="bg-[#141414] border border-[#1F1F1F] rounded-xl overflow-hidden">
              {myContributions.slice(0, 3).map((c, i) => {
                const project = getProjectById(c.projectId);
                return (
                  <div
                    key={c.id}
                    className={`p-4 ${i < 2 ? "border-b border-[#1F1F1F]" : ""}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[8px] font-mono text-[#555] border border-[#1F1F1F] rounded px-1.5 py-0.5">
                        {c.type}
                      </span>
                      <span className="text-[9px] text-[#444] font-mono">
                        <Clock className="inline h-2.5 w-2.5 mr-1" />
                        {c.date}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#ccc] leading-snug">
                      {c.title}
                    </p>
                    <p className="text-[9px] text-[#555] mt-0.5">
                      {project?.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
