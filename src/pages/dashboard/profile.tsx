import {
  currentUser,
  getProjectsForBuilder,
  getContributionsForBuilder,
  mockAchievements,
  getProjectById,
  statusTextColors
} from "@/data/mock";
import { GitBranch, X as XIcon, Globe, Link2, Pencil } from "lucide-react";

const SKILL_LEVEL_COLORS = {
  LEARNING: "#555",
  PROFICIENT: "#89AACC",
  EXPERT: "#3ACA7A"
};

const SKILL_LEVEL_ORDER = { EXPERT: 0, PROFICIENT: 1, LEARNING: 2 };

export function ProfilePage() {
  const projects = getProjectsForBuilder(currentUser.id);
  const contributions = getContributionsForBuilder(currentUser.id);
  const achievements = mockAchievements.filter((a) =>
    currentUser.achievementIds.includes(a.id)
  );
  const sortedSkills = [...currentUser.skills].sort(
    (a, b) => SKILL_LEVEL_ORDER[a.level] - SKILL_LEVEL_ORDER[b.level]
  );

  return (
    <div className="space-y-8">
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
                  <Twitter className="h-3.5 w-3.5" /> @{currentUser.social.twitter}
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Projects", value: projects.length },
          { label: "Contributions", value: contributions.length },
          { label: "Achievements", value: achievements.length },
          { label: "Member Since", value: currentUser.joinedAt }
        ].map((s) => (
          <div key={s.label} className="px-4 py-4 rounded-xl bg-[#141414] border border-[#1F1F1F]">
            <p className="text-xl font-semibold">{s.value}</p>
            <p className="text-[9px] font-mono text-[#555] mt-1 tracking-wider">{s.label.toUpperCase()}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Projects + Contributions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Projects */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">PROJECTS</h2>
            {projects.length > 0 ? (
              <div className="space-y-3">
                {projects.map((project) => {
                  const color = statusTextColors[project.status] || "#999";
                  return (
                    <div key={project.id} className="p-4 rounded-xl bg-[#141414] border border-[#1F1F1F] flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <span className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded border"
                          style={{ color, borderColor: `${color}40`, background: `${color}10` }}>
                          {project.status}
                        </span>
                        <p className="text-sm font-medium mt-2">{project.title}</p>
                        <p className="text-xs text-[#555] mt-0.5">{project.tagline}</p>
                      </div>
                      <div className="flex flex-wrap gap-1 shrink-0">
                        {project.techStack.slice(0, 2).map((t) => (
                          <span key={t} className="text-[9px] font-mono text-[#555] border border-[#1F1F1F] rounded px-1.5 py-0.5">{t}</span>
                        ))}
                      </div>
                    </div>
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
                {contributions.map((c, i) => {
                  const project = getProjectById(c.projectId);
                  return (
                    <div key={c.id} className={`p-4 ${i < contributions.length - 1 ? "border-b border-[#1F1F1F]" : ""}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[8px] font-mono text-[#555] border border-[#1F1F1F] rounded px-1.5 py-0.5">{c.type}</span>
                        <span className="text-[9px] font-mono text-[#444]">{c.date}</span>
                      </div>
                      <p className="text-sm font-medium text-[#ccc]">{c.title}</p>
                      <p className="text-xs text-[#555] mt-0.5">
                        {project?.title}
                      </p>
                    </div>
                  );
                })}
              </div>
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
            <div className="bg-[#141414] border border-[#1F1F1F] rounded-xl overflow-hidden">
              {sortedSkills.map((skill, i) => {
                const color = SKILL_LEVEL_COLORS[skill.level];
                return (
                  <div key={skill.name} className={`px-4 py-3 flex items-center justify-between ${i < sortedSkills.length - 1 ? "border-b border-[#1F1F1F]" : ""}`}>
                    <span className="text-sm text-[#ccc]">{skill.name}</span>
                    <span className="text-[9px] font-mono" style={{ color }}>{skill.level}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Achievements */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">ACHIEVEMENTS</h2>
            {achievements.length > 0 ? (
              <div className="space-y-2">
                {achievements.map((ach) => (
                  <div key={ach.id}
                    className="flex items-start gap-3 px-4 py-3 rounded-xl bg-[#141414] border border-[#1F1F1F]">
                    <span className="text-xl shrink-0">{ach.icon}</span>
                    <div>
                      <p className="text-xs font-medium text-[#ccc]">{ach.title}</p>
                      <p className="text-[10px] text-[#555] mt-0.5">{ach.description}</p>
                      <p className="text-[9px] font-mono text-[#444] mt-1">{ach.earnedAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#444]">No achievements yet.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
