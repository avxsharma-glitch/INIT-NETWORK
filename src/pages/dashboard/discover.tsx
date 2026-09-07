import { useState } from "react";
import { mockBuilders, mockProjects, mockTeams, type Builder, type Project, type Team } from "@/data/mock";
import { Link } from "wouter";
import { Search, Users, FolderOpen, UserPlus, ArrowRight } from "lucide-react";

type Tab = "builders" | "projects" | "teams";

function BuilderCard({ builder }: { builder: Builder }) {
  return (
    <Link href={`/app/builders/${builder.id}`}>
      <div className="p-4 rounded-xl bg-[#141414] border border-[#1F1F1F] hover:border-[#2A2A2A] transition-colors cursor-pointer group">
        <div className="flex items-start gap-3">
          <img
            src={builder.avatar}
            alt={builder.name}
            className="w-10 h-10 rounded-full border border-[#2A2A2A] group-hover:border-[#89AACC]/40 transition-colors shrink-0"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium group-hover:text-[#89AACC] transition-colors truncate">
              {builder.name}
            </p>
            <p className="text-[9px] font-mono text-[#555] mt-0.5">{builder.role}</p>
            <p className="text-[10px] text-[#444] mt-0.5">{builder.campus}</p>
          </div>
        </div>
        <p className="text-xs text-[#555] mt-3 line-clamp-2 leading-relaxed">{builder.bio}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {builder.skills.slice(0, 3).map((s) => (
            <span
              key={s.name}
              className="text-[9px] font-mono text-[#555] border border-[#1F1F1F] rounded px-1.5 py-0.5"
            >
              {s.name}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[9px] font-mono text-[#444]">
            {builder.projectIds.length} PROJECT{builder.projectIds.length !== 1 ? "S" : ""}
          </span>
          <ArrowRight className="h-3.5 w-3.5 text-[#333] group-hover:text-[#89AACC] transition-colors" />
        </div>
      </div>
    </Link>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const statusColors: Record<string, string> = {
    IDEA: "#999", VALIDATING: "#C9A830", BUILDING: "#4A9ACA",
    BETA: "#7ABA3A", SHIPPED: "#3ACA7A", MAINTAINED: "#9A6ACA"
  };
  const color = statusColors[project.status] || "#999";
  return (
    <Link href={`/app/projects/${project.id}`}>
      <div className="p-4 rounded-xl bg-[#141414] border border-[#1F1F1F] hover:border-[#2A2A2A] transition-colors cursor-pointer group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded border"
            style={{ color, borderColor: `${color}40`, background: `${color}10` }}
          >
            {project.status}
          </span>
          <ArrowRight className="h-3.5 w-3.5 text-[#333] group-hover:text-[#89AACC] transition-colors" />
        </div>
        <h3 className="text-sm font-medium group-hover:text-[#89AACC] transition-colors">{project.title}</h3>
        <p className="text-[10px] text-[#555] mt-1">{project.tagline}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {project.techStack.slice(0, 3).map((t) => (
            <span key={t} className="text-[9px] font-mono text-[#555] border border-[#1F1F1F] rounded px-1.5 py-0.5">{t}</span>
          ))}
        </div>
        <p className="text-[9px] font-mono text-[#444] mt-3">{project.members.length} MEMBER{project.members.length !== 1 ? "S" : ""}</p>
      </div>
    </Link>
  );
}

function TeamCard({ team }: { team: Team }) {
  const project = mockProjects.find((p) => p.id === team.projectId);
  return (
    <Link href={`/app/teams/${team.id}`}>
      <div className="p-4 rounded-xl bg-[#141414] border border-[#1F1F1F] hover:border-[#2A2A2A] transition-colors cursor-pointer group">
        <h3 className="text-sm font-medium group-hover:text-[#89AACC] transition-colors">{team.name}</h3>
        <p className="text-[10px] text-[#555] mt-1">{team.description}</p>
        {project && (
          <p className="text-[9px] font-mono text-[#444] mt-3">PROJECT: {project.title}</p>
        )}
        {team.openRoles.length > 0 && (
          <div className="mt-3">
            <p className="text-[9px] font-mono text-[#555] mb-1.5">OPEN ROLES</p>
            <div className="flex flex-wrap gap-1">
              {team.openRoles.map((r) => (
                <span key={r} className="text-[9px] font-mono text-[#89AACC] border border-[#89AACC]/20 bg-[#89AACC]/5 rounded px-1.5 py-0.5">
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}
        <p className="text-[9px] font-mono text-[#444] mt-3">{team.memberIds.length} MEMBER{team.memberIds.length !== 1 ? "S" : ""}</p>
      </div>
    </Link>
  );
}

const tabConfig: { key: Tab; label: string; icon: typeof Users }[] = [
  { key: "builders", label: "Builders", icon: Users },
  { key: "projects", label: "Projects", icon: FolderOpen },
  { key: "teams", label: "Teams", icon: UserPlus },
];

export function DiscoverPage() {
  const [tab, setTab] = useState<Tab>("builders");
  const [query, setQuery] = useState("");

  const filteredBuilders = mockBuilders.filter(
    (b) =>
      !b.isCurrentUser &&
      (b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.role.toLowerCase().includes(query.toLowerCase()) ||
        b.campus.toLowerCase().includes(query.toLowerCase()) ||
        b.skills.some((s) => s.name.toLowerCase().includes(query.toLowerCase())))
  );

  const filteredProjects = mockProjects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tagline.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
      p.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredTeams = mockTeams.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase()) ||
      t.openRoles.some((r) => r.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Discover</h1>
        <p className="text-sm text-[#555] mt-1">
          Find builders, projects, and teams across the INIT network.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555]" />
        <input
          type="text"
          placeholder="Search builders, projects, skills, tech..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#141414] border border-[#1F1F1F] text-sm text-[#F5F5F5] placeholder:text-[#444] focus:outline-none focus:border-[#89AACC]/50 transition-colors"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-[#141414] border border-[#1F1F1F] rounded-xl w-fit">
        {tabConfig.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
              tab === key
                ? "bg-[#0A0A0A] text-[#F5F5F5] border border-[#2A2A2A]"
                : "text-[#555] hover:text-[#878787]"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div>
        {tab === "builders" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBuilders.length > 0 ? (
              filteredBuilders.map((b) => <BuilderCard key={b.id} builder={b} />)
            ) : (
              <p className="col-span-3 text-sm text-[#444] text-center py-12">No builders found.</p>
            )}
          </div>
        )}
        {tab === "projects" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p) => <ProjectCard key={p.id} project={p} />)
            ) : (
              <p className="col-span-3 text-sm text-[#444] text-center py-12">No projects found.</p>
            )}
          </div>
        )}
        {tab === "teams" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeams.length > 0 ? (
              filteredTeams.map((t) => <TeamCard key={t.id} team={t} />)
            ) : (
              <p className="col-span-3 text-sm text-[#444] text-center py-12">No teams found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
