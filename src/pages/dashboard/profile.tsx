import {
  currentUser,
  mockAchievements,
  getProjectById,
  statusTextColors,
} from "@/data/mock";
import { useAppStore } from "@/store/AppStore";
import { GitBranch, X as XIcon, Globe, Pencil, Check } from "lucide-react";
import { PageTransition } from "@/components/ui/motion/PageTransition";
import { StaggerList, StaggerItem } from "@/components/ui/motion/StaggerList";
import { TiltCard } from "@/components/ui/motion/TiltCard";

const SKILL_LEVEL_COLORS = {
  LEARNING: "#555",
  PROFICIENT: "#89AACC",
  EXPERT: "#3ACA7A",
};

const SKILL_LEVEL_ORDER = { EXPERT: 0, PROFICIENT: 1, LEARNING: 2 };

export function ProfilePage() {
  const { state } = useAppStore();

  // Live data from store
  const projects = state.projects.filter((p: any) =>
    p.members.some((m: any) => m.builderId === currentUser.id)
  );
  const contributions = state.contributions.filter(
    (c: any) => c.builderId === currentUser.id
  );
  const achievements = mockAchievements.filter((a) =>
    currentUser.achievementIds.includes(a.id)
  );
  const connectionCount = (state.connections as Set<string>).size;

  const sortedSkills = [...currentUser.skills].sort(
    (a, b) => SKILL_LEVEL_ORDER[a.level] - SKILL_LEVEL_ORDER[b.level]
  );

  return (
    <PageTransition className="space-y-8">
      {/* Profile Header */}
      <div className="p-6 rounded-2xl bg-[#141414] border border-[#1F1F1F] relative">
        <button className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1F1F1F] text-xs text-[#555] hover:text-[#F5F5F5] hover:border-[#2A2A2A] transition-colors">
          <Pencil className="h-3 w-3" /> Edit
        </button>
        <div className="flex flex-wrap gap-5 items-start">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-20 h-20 rounded-full border border-[#2A2A2A]"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-semibold">{currentUser.name}</h1>
              <span className="text-[9px] font-mono text-[#89AACC] border border-[#89AACC]/30 bg-[#89AACC]/5 rounded px-2 py-0.5">
                INIT MEMBER
              </span>
            </div>
            <p className="text-xs font-mono text-[#555] mt-1">
              {currentUser.role} · {currentUser.campus}
            </p>
            <p className="text-sm text-[#878787] mt-3 leading-relaxed max-w-lg">
              {currentUser.bio}
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              {currentUser.social.github && (
                <a href={`https://github.com/${currentUser.social.github}`} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#555] hover:text-[#F5F5F5] transition-colors">
                  <GitBranch className="h-3.5 w-3.5" /> {currentUser.social.github}
                </a>
              )}
              {currentUser.social.twitter && (
                <a href={`https://twitter.com/${currentUser.social.twitter}`} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#555] hover:text-[#F5F5F5] transition-colors">
                  <XIcon className="h-3.5 w-3.5" /> @{currentUser.social.twitter}
                </a>
              )}
              {currentUser.social.portfolio && (
                <a href={`https://${currentUser.social.portfolio}`} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#555] hover:text-[#F5F5F5] transition-colors">
                  <Globe className="h-3.5 w-3.5" /> {currentUser.social.portfolio}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <StaggerList className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Projects", value: projects.length },
          { label: "Contributions", value: contributions.length },
          { label: "Connections", value: connectionCount },
          { label: "Member Since", value: currentUser.joinedAt },
        ].map((s) => (
          <StaggerItem key={s.label}>
            <TiltCard className="px-4 py-4 rounded-xl bg-[#141414] border border-[#1F1F1F]">
              <p className="text-xl font-semibold">{s.value}</p>
              <p className="text-[9px] font-mono text-[#555] mt-1 tracking-wider">
                {String(s.label).toUpperCase()}
              </p>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerList>

      {/* Applications */}
      {state.applications.length > 0 && (
        <section>
          <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">APPLICATIONS</h2>
          <StaggerList className="bg-[#141414] border border-[#1F1F1F] rounded-xl overflow-hidden">
            {state.applications.map((app: any, i: number) => {
              const team = state.teams.find((t: any) => t.id === app.teamId);
              return (
                <StaggerItem key={app.id}>
                  <div className={`px-4 py-3 flex items-center justify-between ${i < state.applications.length - 1 ? "border-b border-[#1F1F1F]" : ""}`}>
                    <div>
                      <p className="text-sm font-medium text-[#ccc]">{app.role}</p>
                      <p className="text-xs text-[#555] mt-0.5">{team?.name || "Unknown team"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-[#444]">{app.appliedAt}</span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                        app.status === "PENDING"
                          ? "text-[#C9A830] border-[#C9A830]/30 bg-[#C9A830]/5"
                          : app.status === "APPROVED"
                          ? "text-[#3ACA7A] border-[#3ACA7A]/30 bg-[#3ACA7A]/5"
                          : "text-[#888] border-[#888]/30 bg-[#888]/5"
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerList>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Projects + Contributions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Projects */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">PROJECTS</h2>
            {projects.length > 0 ? (
              <StaggerList className="space-y-3">
                {projects.map((project: any) => {
                  const color = statusTextColors[project.status] || "#999";
                  return (
                    <StaggerItem key={project.id}>
                      <TiltCard className="p-4 rounded-xl bg-[#141414] border border-[#1F1F1F] flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <span className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded border"
                            style={{ color, borderColor: `${color}40`, background: `${color}10` }}>
                            {project.status}
                          </span>
                          <p className="text-sm font-medium mt-2">{project.title}</p>
                          <p className="text-xs text-[#555] mt-0.5">{project.tagline}</p>
                        </div>
                        <div className="flex flex-wrap gap-1 shrink-0">
                          {project.techStack.slice(0, 2).map((t: string) => (
                            <span key={t} className="text-[9px] font-mono text-[#555] border border-[#1F1F1F] rounded px-1.5 py-0.5">{t}</span>
                          ))}
                        </div>
                      </TiltCard>
                    </StaggerItem>
                  );
                })}
              </StaggerList>
            ) : (
              <p className="text-sm text-[#444]">No projects yet.</p>
            )}
          </section>

          {/* Contributions */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">CONTRIBUTIONS</h2>
            {contributions.length > 0 ? (
              <StaggerList className="bg-[#141414] border border-[#1F1F1F] rounded-xl overflow-hidden">
                {contributions.map((c: any, i: number) => {
                  const project = getProjectById(c.projectId);
                  return (
                    <StaggerItem key={c.id}>
                      <div className={`p-4 ${i < contributions.length - 1 ? "border-b border-[#1F1F1F]" : ""}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[8px] font-mono text-[#555] border border-[#1F1F1F] rounded px-1.5 py-0.5">{c.type}</span>
                          <span className="text-[9px] font-mono text-[#444]">{c.date}</span>
                        </div>
                        <p className="text-sm font-medium text-[#ccc]">{c.title}</p>
                        <p className="text-xs text-[#555] mt-0.5">{project?.title}</p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerList>
            ) : (
              <p className="text-sm text-[#444]">No contributions yet.</p>
            )}
          </section>
        </div>

        {/* Right: Skills + Achievements */}
        <div className="space-y-8">
          {/* Skills */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">SKILLS</h2>
            <StaggerList className="bg-[#141414] border border-[#1F1F1F] rounded-xl overflow-hidden">
              {sortedSkills.map((skill, i) => {
                const color = SKILL_LEVEL_COLORS[skill.level];
                return (
                  <StaggerItem key={skill.name}>
                    <div className={`px-4 py-3 flex items-center justify-between ${i < sortedSkills.length - 1 ? "border-b border-[#1F1F1F]" : ""}`}>
                      <span className="text-sm text-[#ccc]">{skill.name}</span>
                      <span className="text-[9px] font-mono" style={{ color }}>{skill.level}</span>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerList>
          </section>

          {/* Achievements */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">ACHIEVEMENTS</h2>
            {achievements.length > 0 ? (
              <StaggerList className="space-y-2">
                {achievements.map((ach) => (
                  <StaggerItem key={ach.id}>
                    <TiltCard className="flex items-start gap-3 px-4 py-3 rounded-xl bg-[#141414] border border-[#1F1F1F]">
                      <span className="text-xl shrink-0">{ach.icon}</span>
                      <div>
                        <p className="text-xs font-medium text-[#ccc]">{ach.title}</p>
                        <p className="text-[10px] text-[#555] mt-0.5">{ach.description}</p>
                        <p className="text-[9px] font-mono text-[#444] mt-1">{ach.earnedAt}</p>
                      </div>
                    </TiltCard>
                  </StaggerItem>
                ))}
              </StaggerList>
            ) : (
              <p className="text-sm text-[#444]">No achievements yet.</p>
            )}
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
