import { useState } from "react";
import {
  getBuilderById,
  type Project,
  type ProjectStatus,
  statusTextColors,
} from "@/data/mock";
import { useAppStore, STATUS_PROGRESSION } from "@/store/AppStore";
import { Modal } from "@/components/platform/Modal";
import { Link, useParams, useLocation } from "wouter";
import { ArrowLeft, GitBranch, ExternalLink, Plus, ChevronRight, LogIn, Check } from "lucide-react";

// ─── STATUS HELPERS ───────────────────────────────────────────────────────────

const STATUS_ORDER: ProjectStatus[] = [
  "IDEA", "VALIDATING", "BUILDING", "BETA", "SHIPPED", "MAINTAINED",
];

function StatusBadge({ status }: { status: ProjectStatus }) {
  const color = statusTextColors[status] || "#999";
  return (
    <span className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded border"
      style={{ color, borderColor: `${color}40`, background: `${color}10` }}>
      {status}
    </span>
  );
}

// ─── CREATE PROJECT MODAL ─────────────────────────────────────────────────────

const COVER_COLORS = [
  "#1A2535", "#1A2030", "#1F1A2A", "#1A2020", "#251A1A",
  "#201A1A", "#1A2515", "#251F10", "#1A1A30", "#1F1A28",
];

const ROLE_OPTIONS = [
  "FRONTEND", "BACKEND", "FULLSTACK", "ML ENGINEER",
  "DESIGNER", "PM", "DEVOPS", "MOBILE", "DATA", "RESEARCHER",
];

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (projectId: string) => void;
}

function CreateProjectModal({ open, onClose, onCreated }: CreateProjectModalProps) {
  const { createProject } = useAppStore();
  const [form, setForm] = useState({
    title: "",
    tagline: "",
    description: "",
    status: "IDEA" as ProjectStatus,
    techStack: "",
    tags: "",
    coverColor: COVER_COLORS[0],
    openRoles: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const toggleRole = (role: string) =>
    setForm((f) => ({
      ...f,
      openRoles: f.openRoles.includes(role)
        ? f.openRoles.filter((r) => r !== role)
        : [...f.openRoles, role],
    }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.tagline.trim()) e.tagline = "Required";
    if (!form.description.trim()) e.description = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const project = createProject({
      title: form.title.trim(),
      tagline: form.tagline.trim(),
      description: form.description.trim(),
      status: form.status,
      techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      coverColor: form.coverColor,
      members: [],
      ownerId: "",
    });
    onCreated(project.id);
    onClose();
    setForm({
      title: "", tagline: "", description: "", status: "IDEA",
      techStack: "", tags: "", coverColor: COVER_COLORS[0], openRoles: [],
    });
    setErrors({});
  };

  return (
    <Modal open={open} onClose={onClose} title="Create Project" maxWidth="max-w-xl">
      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="text-[10px] font-mono text-[#878787] block mb-1.5 tracking-widest">PROJECT TITLE *</label>
          <input value={form.title} onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Campus Navigator"
            className={`w-full px-3 py-2.5 bg-[#141414] border rounded-xl text-sm text-[#F5F5F5] placeholder:text-[#444] focus:outline-none focus:border-[#89AACC]/50 transition-colors ${errors.title ? "border-red-500/50" : "border-[#1F1F1F]"}`} />
          {errors.title && <p className="text-[10px] text-red-400 mt-1">{errors.title}</p>}
        </div>

        {/* Tagline */}
        <div>
          <label className="text-[10px] font-mono text-[#878787] block mb-1.5 tracking-widest">TAGLINE *</label>
          <input value={form.tagline} onChange={(e) => set("tagline", e.target.value)}
            placeholder="One-line description"
            className={`w-full px-3 py-2.5 bg-[#141414] border rounded-xl text-sm text-[#F5F5F5] placeholder:text-[#444] focus:outline-none focus:border-[#89AACC]/50 transition-colors ${errors.tagline ? "border-red-500/50" : "border-[#1F1F1F]"}`} />
          {errors.tagline && <p className="text-[10px] text-red-400 mt-1">{errors.tagline}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="text-[10px] font-mono text-[#878787] block mb-1.5 tracking-widest">DESCRIPTION *</label>
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)}
            placeholder="What are you building and why?"
            rows={3}
            className={`w-full px-3 py-2.5 bg-[#141414] border rounded-xl text-sm text-[#F5F5F5] placeholder:text-[#444] focus:outline-none focus:border-[#89AACC]/50 transition-colors resize-none ${errors.description ? "border-red-500/50" : "border-[#1F1F1F]"}`} />
          {errors.description && <p className="text-[10px] text-red-400 mt-1">{errors.description}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="text-[10px] font-mono text-[#878787] block mb-1.5 tracking-widest">STARTING STATUS</label>
          <div className="flex gap-1 flex-wrap">
            {(["IDEA", "VALIDATING", "BUILDING"] as ProjectStatus[]).map((s) => {
              const color = statusTextColors[s];
              return (
                <button key={s} onClick={() => set("status", s)}
                  className={`text-[9px] font-mono px-3 py-1.5 rounded-lg border transition-all ${form.status === s ? "border-current" : "border-[#1F1F1F] text-[#444]"}`}
                  style={form.status === s ? { color, borderColor: `${color}50`, background: `${color}10` } : {}}>
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="text-[10px] font-mono text-[#878787] block mb-1.5 tracking-widest">TECH STACK</label>
          <input value={form.techStack} onChange={(e) => set("techStack", e.target.value)}
            placeholder="React, TypeScript, Python (comma-separated)"
            className="w-full px-3 py-2.5 bg-[#141414] border border-[#1F1F1F] rounded-xl text-sm text-[#F5F5F5] placeholder:text-[#444] focus:outline-none focus:border-[#89AACC]/50 transition-colors" />
        </div>

        {/* Tags */}
        <div>
          <label className="text-[10px] font-mono text-[#878787] block mb-1.5 tracking-widest">TAGS</label>
          <input value={form.tags} onChange={(e) => set("tags", e.target.value)}
            placeholder="AI/ML, Open Source, EdTech (comma-separated)"
            className="w-full px-3 py-2.5 bg-[#141414] border border-[#1F1F1F] rounded-xl text-sm text-[#F5F5F5] placeholder:text-[#444] focus:outline-none focus:border-[#89AACC]/50 transition-colors" />
        </div>

        {/* Roles Needed */}
        <div>
          <label className="text-[10px] font-mono text-[#878787] block mb-2 tracking-widest">ROLES NEEDED</label>
          <div className="flex flex-wrap gap-1.5">
            {ROLE_OPTIONS.map((r) => (
              <button key={r} onClick={() => toggleRole(r)}
                className={`text-[9px] font-mono px-2.5 py-1 rounded-lg border transition-all ${
                  form.openRoles.includes(r)
                    ? "border-[#89AACC]/40 bg-[#89AACC]/10 text-[#89AACC]"
                    : "border-[#1F1F1F] text-[#444] hover:text-[#878787]"
                }`}>
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Cover Color */}
        <div>
          <label className="text-[10px] font-mono text-[#878787] block mb-2 tracking-widest">COVER COLOR</label>
          <div className="flex gap-2 flex-wrap">
            {COVER_COLORS.map((c) => (
              <button key={c} onClick={() => set("coverColor", c)}
                className={`w-7 h-7 rounded-lg border-2 transition-all ${form.coverColor === c ? "border-[#89AACC] scale-110" : "border-transparent hover:border-[#555]"}`}
                style={{ background: c }} />
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="h-16 rounded-xl flex items-end px-4 pb-3 transition-all"
          style={{ background: form.coverColor }}>
          <StatusBadge status={form.status} />
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <button onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#1F1F1F] text-sm text-[#555] hover:text-[#878787] transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#89AACC]/10 border border-[#89AACC]/30 text-sm text-[#89AACC] font-medium hover:bg-[#89AACC]/20 transition-colors">
            Create Project
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── JOIN PROJECT MODAL ───────────────────────────────────────────────────────

interface JoinProjectModalProps {
  open: boolean;
  project: Project;
  onClose: () => void;
}

function JoinProjectModal({ open, project, onClose }: JoinProjectModalProps) {
  const { requestJoinProject } = useAppStore();
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const handleJoin = () => {
    requestJoinProject(project.id);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={`Request to Join — ${project.title}`}>
      <div className="space-y-5">
        <p className="text-xs text-[#555] leading-relaxed">
          Send a join request to the project team. They'll review your profile and get back to you.
        </p>
        <div>
          <label className="text-[10px] font-mono text-[#878787] block mb-1.5 tracking-widest">YOUR ROLE</label>
          <input value={role} onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Frontend Engineer, Designer..."
            className="w-full px-3 py-2.5 bg-[#141414] border border-[#1F1F1F] rounded-xl text-sm text-[#F5F5F5] placeholder:text-[#444] focus:outline-none focus:border-[#89AACC]/50 transition-colors" />
        </div>
        <div>
          <label className="text-[10px] font-mono text-[#878787] block mb-1.5 tracking-widest">WHY THIS PROJECT?</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell the team why you want to contribute..."
            rows={3}
            className="w-full px-3 py-2.5 bg-[#141414] border border-[#1F1F1F] rounded-xl text-sm text-[#F5F5F5] placeholder:text-[#444] focus:outline-none focus:border-[#89AACC]/50 transition-colors resize-none" />
        </div>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#1F1F1F] text-sm text-[#555] hover:text-[#878787] transition-colors">
            Cancel
          </button>
          <button onClick={handleJoin}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#89AACC]/10 border border-[#89AACC]/30 text-sm text-[#89AACC] font-medium hover:bg-[#89AACC]/20 transition-colors">
            Send Request
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── PROJECT DETAIL ───────────────────────────────────────────────────────────

function ProjectDetail({ projectId }: { projectId: string }) {
  const { state, advanceProjectStatus, isProjectOwner, isProjectMember, hasRequestedJoin } = useAppStore();
  const project = state.projects.find((p) => p.id === projectId);
  const [joinOpen, setJoinOpen] = useState(false);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-[#444] font-mono text-sm gap-4">
        <p>Project not found.</p>
        <Link href="/app/projects" className="text-[#89AACC] text-xs hover:underline">← Back to projects</Link>
      </div>
    );
  }

  const owner = getBuilderById(project.ownerId);
  const isOwner = isProjectOwner(project.id);
  const isMember = isProjectMember(project.id);
  const requested = hasRequestedJoin(project.id);
  const nextStatus = STATUS_PROGRESSION[project.status];
  const nextColor = nextStatus ? (statusTextColors[nextStatus] || "#999") : null;

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
          <div className="flex gap-2 shrink-0 flex-wrap">
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
            {/* Lifecycle advancement — owner only */}
            {isOwner && nextStatus && (
              <button onClick={() => advanceProjectStatus(project.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all"
                style={{ color: nextColor!, borderColor: `${nextColor}40`, background: `${nextColor}10` }}>
                <ChevronRight className="h-3.5 w-3.5" /> Advance to {nextStatus}
              </button>
            )}
            {/* Join request — non-members */}
            {!isMember && !isOwner && (
              requested ? (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#3ACA7A]/30 bg-[#3ACA7A]/5 text-xs text-[#3ACA7A]">
                  <Check className="h-3.5 w-3.5" /> Request Sent
                </span>
              ) : (
                <button onClick={() => setJoinOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#89AACC]/30 bg-[#89AACC]/5 text-xs text-[#89AACC] hover:bg-[#89AACC]/10 transition-colors">
                  <LogIn className="h-3.5 w-3.5" /> Request to Join
                </button>
              )
            )}
            {isMember && !isOwner && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#3ACA7A]/30 bg-[#3ACA7A]/5 text-xs text-[#3ACA7A]">
                <Check className="h-3.5 w-3.5" /> Member
              </span>
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

          {/* Lifecycle */}
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
                      isCurrent ? "border-current" : isPast ? "opacity-50" : "opacity-20"
                    }`}
                      style={{ color: isCurrent ? color : isPast ? color : "#444", borderColor: isCurrent ? `${color}60` : "#1F1F1F", background: isCurrent ? `${color}10` : "transparent" }}>
                      {s}
                    </div>
                    {i < STATUS_ORDER.length - 1 && (
                      <span className={`text-xs ${i < currentIdx ? "text-[#555]" : "text-[#333]"}`}>→</span>
                    )}
                  </div>
                );
              })}
            </div>
            {isOwner && nextStatus && (
              <p className="text-[10px] font-mono text-[#555] mt-3">
                You own this project. Use "Advance to {nextStatus}" to move it forward in the lifecycle.
              </p>
            )}
          </section>

          {/* Team */}
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
              {project.members.length === 0 && (
                <p className="text-sm text-[#444]">No team members yet.</p>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Tech Stack */}
          {project.techStack.length > 0 && (
            <section>
              <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">TECH STACK</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <span key={t} className="text-xs font-mono text-[#878787] border border-[#1F1F1F] rounded-lg px-3 py-1.5">{t}</span>
                ))}
              </div>
            </section>
          )}

          {/* Tags */}
          {project.tags.length > 0 && (
            <section>
              <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">TAGS</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="text-xs font-mono text-[#555] border border-[#1F1F1F] rounded-lg px-3 py-1.5">{t}</span>
                ))}
              </div>
            </section>
          )}

          {/* Meta */}
          <section>
            <h2 className="text-xs font-mono tracking-widest text-[#878787] mb-4">DETAILS</h2>
            <div className="bg-[#141414] border border-[#1F1F1F] rounded-xl overflow-hidden">
              {[
                { label: "Owner", value: owner?.name || "You" },
                { label: "Members", value: project.members.length },
                { label: "Created", value: project.createdAt },
                { label: "Updated", value: project.updatedAt },
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

      {project && <JoinProjectModal open={joinOpen} project={project} onClose={() => setJoinOpen(false)} />}
    </div>
  );
}

// ─── PROJECTS LISTING ─────────────────────────────────────────────────────────

export function ProjectsPage() {
  const { state } = useAppStore();
  const [, navigate] = useLocation();
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "ALL">("ALL");
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = state.projects.filter((p) => {
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
          <p className="text-sm text-[#555] mt-1">{state.projects.length} projects across the network.</p>
        </div>
        <button onClick={() => setCreateOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#89AACC]/30 bg-[#89AACC]/5 text-xs font-medium text-[#89AACC] hover:bg-[#89AACC]/10 transition-colors">
          <Plus className="h-3.5 w-3.5" /> Create Project
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <input type="text" placeholder="Search projects..."
          value={query} onChange={(e) => setQuery(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl bg-[#141414] border border-[#1F1F1F] text-sm text-[#F5F5F5] placeholder:text-[#444] focus:outline-none focus:border-[#89AACC]/50 transition-colors" />
        <div className="flex gap-1 p-1 bg-[#141414] border border-[#1F1F1F] rounded-xl overflow-x-auto">
          {(["ALL", ...STATUS_ORDER] as const).map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-mono whitespace-nowrap transition-colors ${
                statusFilter === s ? "bg-[#0A0A0A] text-[#F5F5F5] border border-[#2A2A2A]" : "text-[#555] hover:text-[#878787]"
              }`}>
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
        {filtered.length === 0 && (
          <p className="col-span-3 text-sm text-[#444] text-center py-12">No projects found.</p>
        )}
      </div>

      <CreateProjectModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={(id) => navigate(`/app/projects/${id}`)}
      />
    </div>
  );
}

export function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  return <ProjectDetail projectId={params.id} />;
}
