import { useState } from "react";
import { mockProjects, getBuilderById, type Team } from "@/data/mock";
import { useAppStore } from "@/store/AppStore";
import { Modal } from "@/components/platform/Modal";
import { Link, useParams } from "wouter";
import { ArrowLeft, Check } from "lucide-react";

// ─── APPLY FOR ROLE MODAL ─────────────────────────────────────────────────────

interface ApplyModalProps {
  open: boolean;
  team: Team;
  role: string;
  onClose: () => void;
}

function ApplyForRoleModal({ open, team, role, onClose }: ApplyModalProps) {
  const { applyForRole } = useAppStore();
  const [message, setMessage] = useState("");

  const handleApply = () => {
    applyForRole(team.id, team.projectId, role, message);
    onClose();
    setMessage("");
  };

  return (
    <Modal open={open} onClose={onClose} title={`Apply — ${role}`}>
      <div className="space-y-5">
        <div className="px-4 py-3 rounded-xl bg-[#141414] border border-[#1F1F1F]">
          <p className="text-[10px] font-mono text-[#555] mb-0.5">TEAM</p>
          <p className="text-sm font-medium">{team.name}</p>
        </div>
        <div>
          <label className="text-[10px] font-mono text-[#878787] block mb-1.5 tracking-widest">
            WHY ARE YOU A GOOD FIT?
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Briefly describe your relevant experience and what you can bring to this project..."
            rows={4}
            className="w-full px-3 py-2.5 bg-[#141414] border border-[#1F1F1F] rounded-xl text-sm text-[#F5F5F5] placeholder:text-[#444] focus:outline-none focus:border-[#89AACC]/50 transition-colors resize-none"
          />
        </div>
        <p className="text-[10px] font-mono text-[#444]">
          Your profile and skills will be shared with the team.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#1F1F1F] text-sm text-[#555] hover:text-[#878787] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#89AACC]/10 border border-[#89AACC]/30 text-sm text-[#89AACC] font-medium hover:bg-[#89AACC]/20 transition-colors"
          >
            Submit Application
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── TEAM DETAIL ──────────────────────────────────────────────────────────────

function TeamDetail({ team }: { team: Team }) {
  const { state, hasAppliedForRole, getApplication } = useAppStore();
  // Always use live store data for project (in case status changed)
  const project = state.projects.find((p) => p.id === team.projectId);
  const members = team.memberIds.map(getBuilderById).filter(Boolean);
  const existingApplication = getApplication(team.id);

  const [applyRole, setApplyRole] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <Link
        href="/app/teams"
        className="flex items-center gap-2 text-xs font-mono text-[#555] hover:text-[#878787] transition-colors w-fit"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> ALL TEAMS
      </Link>

      <div className="p-6 rounded-2xl bg-[#141414] border border-[#1F1F1F]">
        <h1 className="text-2xl font-semibold">{team.name}</h1>
        <p className="text-sm text-[#878787] mt-2">{team.description}</p>
        {project && (
          <Link href={`/app/projects/${project.id}`}>
            <p className="text-xs font-mono text-[#89AACC] mt-3 hover:underline cursor-pointer">
              PROJECT: {project.title} →
            </p>
          </Link>
        )}
        {existingApplication && (
          <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#89AACC]/5 border border-[#89AACC]/20 w-fit">
            <Check className="h-3.5 w-3.5 text-[#89AACC]" />
            <span className="text-xs font-mono text-[#89AACC]">
              Application submitted for "{existingApplication.role}" on {existingApplication.appliedAt}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Members */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">MEMBERS</h2>
            <div className="space-y-3">
              {members.map((builder) =>
                builder ? (
                  <Link key={builder.id} href={`/app/builders/${builder.id}`}>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-[#141414] border border-[#1F1F1F] hover:border-[#2A2A2A] transition-colors cursor-pointer group">
                      <img
                        src={builder.avatar}
                        alt={builder.name}
                        className="w-10 h-10 rounded-full border border-[#2A2A2A] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium group-hover:text-[#89AACC] transition-colors">
                          {builder.name}
                        </p>
                        <p className="text-xs font-mono text-[#555]">{builder.role}</p>
                        <p className="text-xs text-[#444]">{builder.campus}</p>
                      </div>
                      <div className="flex flex-wrap gap-1 justify-end">
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
                ) : null
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Open Roles */}
          {team.openRoles.length > 0 && (
            <section>
              <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">OPEN ROLES</h2>
              <div className="space-y-2">
                {team.openRoles.map((role) => {
                  const applied = hasAppliedForRole(team.id, role);
                  return (
                    <div
                      key={role}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#141414] border border-[#1F1F1F] hover:border-[#2A2A2A] transition-colors"
                    >
                      <span className="text-sm text-[#ccc]">{role}</span>
                      {applied ? (
                        <span className="flex items-center gap-1 text-[9px] font-mono text-[#3ACA7A]">
                          <Check className="h-3 w-3" /> APPLIED
                        </span>
                      ) : (
                        <button
                          onClick={() => setApplyRole(role)}
                          className="text-[9px] font-mono text-[#89AACC] border border-[#89AACC]/30 bg-[#89AACC]/5 rounded px-2 py-0.5 hover:bg-[#89AACC]/15 transition-colors"
                        >
                          APPLY
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Stats */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">TEAM INFO</h2>
            <div className="bg-[#141414] border border-[#1F1F1F] rounded-xl overflow-hidden">
              {[
                { label: "Members", value: team.memberIds.length },
                { label: "Open Roles", value: team.openRoles.length },
                { label: "Founded", value: team.createdAt },
              ].map((d, i) => (
                <div
                  key={d.label}
                  className={`px-4 py-3 flex justify-between ${i < 2 ? "border-b border-[#1F1F1F]" : ""}`}
                >
                  <span className="text-xs text-[#555]">{d.label}</span>
                  <span className="text-xs text-[#ccc] font-medium">{String(d.value)}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {applyRole && (
        <ApplyForRoleModal
          open={!!applyRole}
          team={team}
          role={applyRole}
          onClose={() => setApplyRole(null)}
        />
      )}
    </div>
  );
}

// ─── TEAMS LISTING ────────────────────────────────────────────────────────────

export function TeamsPage() {
  const { state } = useAppStore();
  const [query, setQuery] = useState("");

  const filtered = state.teams.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase()) ||
      t.openRoles.some((r) => r.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Teams</h1>
        <p className="text-sm text-[#555] mt-1">
          Find teams to join and projects to contribute to.
        </p>
      </div>

      <input
        type="text"
        placeholder="Search teams or open roles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#1F1F1F] text-sm text-[#F5F5F5] placeholder:text-[#444] focus:outline-none focus:border-[#89AACC]/50 transition-colors"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((team) => {
          const project = state.projects.find((p) => p.id === team.projectId);
          return (
            <Link key={team.id} href={`/app/teams/${team.id}`}>
              <div className="p-5 rounded-xl bg-[#141414] border border-[#1F1F1F] hover:border-[#2A2A2A] transition-colors cursor-pointer group h-full flex flex-col">
                <h3 className="text-sm font-medium group-hover:text-[#89AACC] transition-colors">
                  {team.name}
                </h3>
                <p className="text-xs text-[#555] mt-2 flex-1 line-clamp-2">{team.description}</p>
                {project && (
                  <p className="text-[9px] font-mono text-[#444] mt-3">
                    PROJECT: {project.title}
                  </p>
                )}
                {team.openRoles.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#1F1F1F]">
                    <p className="text-[9px] font-mono text-[#555] mb-2">
                      {team.openRoles.length} OPEN ROLE{team.openRoles.length !== 1 ? "S" : ""}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {team.openRoles.map((r) => (
                        <span
                          key={r}
                          className="text-[9px] font-mono text-[#89AACC] border border-[#89AACC]/20 bg-[#89AACC]/5 rounded px-1.5 py-0.5"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex -space-x-1.5">
                    {team.memberIds.slice(0, 3).map((mid) => {
                      const b = getBuilderById(mid);
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
                  <span className="text-[9px] font-mono text-[#444]">
                    {team.memberIds.length} MEMBERS
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-3 text-sm text-[#444] text-center py-12">No teams found.</p>
        )}
      </div>
    </div>
  );
}

export function TeamDetailPage() {
  const params = useParams<{ id: string }>();
  const { state } = useAppStore();
  const team = state.teams.find((t) => t.id === params.id);
  if (!team) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-[#444] font-mono text-sm gap-4">
        <p>Team not found.</p>
        <Link href="/app/teams" className="text-[#89AACC] text-xs hover:underline">
          ← Back to teams
        </Link>
      </div>
    );
  }
  return <TeamDetail team={team} />;
}
