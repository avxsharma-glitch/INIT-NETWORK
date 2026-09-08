import { useState } from "react";
import { useCommunityStore } from "@/store/CommunityStore";
import { mockProjects } from "@/data/mock";
import { type DiscussionCategory } from "@/data/communityMock";
import { X, Send, FolderGit2, Tag, MessageSquareCode } from "lucide-react";

interface CreateDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories: DiscussionCategory[] = [
  "Building",
  "AI / ML",
  "Web",
  "Open Source",
  "Projects",
  "Learning",
  "Career",
  "INIT",
  "General",
];

export function CreateDiscussionModal({
  isOpen,
  onClose,
}: CreateDiscussionModalProps) {
  const { createDiscussion } = useCommunityStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<DiscussionCategory>("Building");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [tagsInput, setTagsInput] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const project = mockProjects.find((p) => p.id === selectedProjectId);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim().replace(/^#/, ""))
      .filter(Boolean);

    createDiscussion({
      title: title.trim(),
      content: content.trim(),
      category,
      projectId: project ? project.id : undefined,
      projectTitle: project ? project.title : undefined,
      tags: tags.length > 0 ? tags : ["INIT", category],
    });

    setTitle("");
    setContent("");
    setSelectedProjectId("");
    setTagsInput("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl rounded-2xl border border-[#262626] bg-[#121212] text-[#F5F5F5] shadow-2xl overflow-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1F1F1F]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#89AACC]/10 border border-[#89AACC]/30 flex items-center justify-center text-[#89AACC]">
              <MessageSquareCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F5F5F5]">
                Initiate Technical Discussion
              </h3>
              <p className="text-[11px] font-mono text-[#878787]">
                Open a thread for architecture tradeoffs, code teardowns, or RFCs.
              </p>
            </div>
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
          {/* Category Dropdown */}
          <div>
            <label className="text-[11px] font-mono text-[#888] block mb-1.5 uppercase">
              Topic Domain / Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as DiscussionCategory)}
              className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#89AACC]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="text-[11px] font-mono text-[#888] block mb-1.5 uppercase">
              Discussion Topic / Question (Concise & Specific)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Evaluating Automerge vs Yjs for large collaborative graphs"
              className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3 py-2 text-xs text-[#F5F5F5] placeholder-[#555] focus:outline-none focus:border-[#89AACC]"
            />
          </div>

          {/* Detailed Content */}
          <div>
            <label className="text-[11px] font-mono text-[#888] block mb-1.5 uppercase">
              Elaboration & Context
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share benchmarks, trade-offs, architecture context, or code snippets..."
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
              placeholder="e.g. CRDT, WASM, Performance"
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
              disabled={!title.trim() || !content.trim()}
              className="px-4 py-2 rounded-xl bg-[#89AACC] text-[#0A0A0A] font-semibold text-xs disabled:opacity-40 hover:bg-[#789BBF] transition-all flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>START DISCUSSION</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
