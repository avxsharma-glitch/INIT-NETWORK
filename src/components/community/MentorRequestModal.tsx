import { useState } from "react";
import { type Mentor } from "@/data/communityMock";
import { useCommunityStore } from "@/store/CommunityStore";
import { X, Send, CheckCircle2 } from "lucide-react";

interface MentorRequestModalProps {
  mentor: Mentor | null;
  onClose: () => void;
}

export function MentorRequestModal({
  mentor,
  onClose,
}: MentorRequestModalProps) {
  const { requestMentorship } = useCommunityStore();
  const [topic, setTopic] = useState("Architecture & Systems Review");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!mentor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    requestMentorship(mentor.id, topic, note.trim());
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[#262626] bg-[#121212] text-[#F5F5F5] shadow-2xl overflow-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1F1F1F]">
          <div className="flex items-center gap-3">
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="w-10 h-10 rounded-full border border-[#2A2A2A] object-cover"
            />
            <div>
              <h3 className="text-sm font-semibold text-[#F5F5F5]">
                Request Interaction with {mentor.name}
              </h3>
              <p className="text-[11px] font-mono text-[#878787]">
                {mentor.role} • {mentor.organization}
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

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 animate-in zoom-in-95">
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            <h4 className="text-base font-semibold text-[#F5F5F5]">
              Mentorship Request Dispatched!
            </h4>
            <p className="text-xs text-[#878787] max-w-xs font-mono">
              {mentor.name} will receive your note and available time slots. Look
              out for an update in your profile notifications.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="text-[11px] font-mono text-[#888] block mb-1.5 uppercase">
                Interaction Focus / Topic
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#89AACC]"
              >
                <option value="Architecture & Systems Review">
                  Architecture & Systems Review
                </option>
                <option value="Applied AI / Evals Formulation">
                  Applied AI / Evals Formulation
                </option>
                <option value="Product Ergonomics & Design Feedback">
                  Product Ergonomics & Design Feedback
                </option>
                <option value="Open Source Commons & Licensing">
                  Open Source Commons & Licensing
                </option>
                <option value="Pitch Strategy & Startup Foundations">
                  Pitch Strategy & Startup Foundations
                </option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#888] block mb-1.5 uppercase">
                Context & Questions (What are you building?)
              </label>
              <textarea
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Briefly describe what you are building, the specific technical wall you hit, and repository/demo links if applicable..."
                className="w-full bg-[#161616] border border-[#262626] rounded-xl p-3 text-xs text-[#F5F5F5] placeholder-[#555] focus:outline-none focus:border-[#89AACC] resize-none"
              />
            </div>

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
                disabled={!note.trim()}
                className="px-4 py-2 rounded-xl bg-[#89AACC] text-[#0A0A0A] font-semibold text-xs disabled:opacity-40 hover:bg-[#789BBF] transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SUBMIT REQUEST</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
