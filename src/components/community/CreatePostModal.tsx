import { useState } from "react";
import { useCommunityStore } from "@/store/CommunityStore";
import { mockProjects } from "@/data/mock";
import { type PostCategory } from "@/data/communityMock";
import { X, Send, FolderGit2, Tag } from "lucide-react";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const { createPost } = useCommunityStore();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<PostCategory>("BUILDER_UPDATE");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [tagsInput, setTagsInput] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const project = mockProjects.find((p) => p.id === selectedProjectId);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim().replace(/^#/, ""))
      .filter(Boolean);

    createPost({
      content: content.trim(),
      category,
      projectId: project ? project.id : undefined,
      projectTitle: project ? project.title : undefined,
      tags: tags.length > 0 ? tags : ["Build", "INIT"],
    });

    setContent("");
    setSelectedProjectId("");
    setTagsInput("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[#262626] bg-[#121212] text-[#F5F5F5] shadow-2xl overflow-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1F1F1F]">
          <div>
            <h3 className="text-base font-bold text-[#F5F5F5]">
              Publish Community Transmission
            </h3>
            <p className="text-[11px] font-mono text-[#878787]">
              Share an update, technical milestone, or question across the INIT network.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#222] bg-[#181818] text-[#878787] hover:text-[#F5F5F5]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Category selection */}
          <div>
            <label className="text-[11px] font-mono text-[#888] block mb-1.5 uppercase">
              Update Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "BUILDER_UPDATE", label: "Builder Update" },
                { id: "PROJECT_UPDATE", label: "Project Milestone" },
                { id: "QUESTION", label: "Technical Question" },
                { id: "GENERAL", label: "Note / General" },
              ].map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setCategory(c.id as PostCategory)}
                  className={`py-2 px-3 rounded-xl border text-xs font-mono transition-all text-left ${
                    category === c.id
                      ? "border-[#89AACC] bg-[#89AACC]/10 text-[#89AACC] font-semibold"
                      : "border-[#222] bg-[#161616] text-[#777] hover:text-[#CCC]"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="text-[11px] font-mono text-[#888] block mb-1.5 uppercase">
              Message Content
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What have you discovered, benchmarked, or shipped today?"
              className="w-full bg-[#161616] border border-[#262626] rounded-xl p-3 text-xs text-[#F5F5F5] placeholder-[#555] focus:outline-none focus:border-[#89AACC] resize-none"
            />
          </div>

          {/* Project Reference */}
          <div>
            <label className="text-[11px] font-mono text-[#888] block mb-1.5 uppercase flex items-center gap-1.5">
              <FolderGit2 className="w-3.5 h-3.5 text-[#89AACC]" />
              <span>Link Associated Project (Optional)</span>
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#89AACC]"
            >
              <option value="">No linked project</option>
              {mockProjects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.status})
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="text-[11px] font-mono text-[#888] block mb-1.5 uppercase flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#89AACC]" />
              <span>Tags (comma-separated)</span>
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. pgvector, threejs, optimization"
              className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3 py-2 text-xs text-[#F5F5F5] placeholder-[#555] focus:outline-none focus:border-[#89AACC]"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-[#777] hover:text-[#CCC]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!content.trim()}
              className="px-4 py-2 rounded-xl bg-[#89AACC] text-[#0A0A0A] font-semibold text-xs disabled:opacity-40 hover:bg-[#789BBF] transition-all flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>POST TO NETWORK</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
