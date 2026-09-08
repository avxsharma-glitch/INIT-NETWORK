import { useState } from "react";
import { Link } from "wouter";
import {
  type CommunityPost,
  type ReactionType,
} from "@/data/communityMock";
import { useCommunityStore } from "@/store/CommunityStore";
import { ReactionButton } from "./ReactionButton";
import { ShareButton } from "./ShareButton";
import {
  Bookmark,
  MessageSquare,
  FolderGit2,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react";

interface CommunityPostCardProps {
  post: CommunityPost;
}

const categoryLabels: Record<
  CommunityPost["category"],
  { label: string; color: string }
> = {
  ALL: { label: "GENERAL", color: "text-[#878787] border-[#2A2A2A] bg-[#1F1F1F]/40" },
  BUILDER_UPDATE: {
    label: "BUILDER UPDATE",
    color: "text-[#89AACC] border-[#89AACC]/30 bg-[#89AACC]/10",
  },
  QUESTION: {
    label: "QUESTION",
    color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  PROJECT_UPDATE: {
    label: "PROJECT SHIP",
    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
  ANNOUNCEMENT: {
    label: "ANNOUNCEMENT",
    color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  },
  GENERAL: {
    label: "NOTE",
    color: "text-[#878787] border-[#2A2A2A] bg-[#1F1F1F]/40",
  },
};

export function CommunityPostCard({ post }: CommunityPostCardProps) {
  const { toggleReaction, toggleSavePost } = useCommunityStore();
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [localComments, setLocalComments] = useState<
    Array<{ author: string; role: string; content: string; time: string }>
  >([
    {
      author: "Sarah Chen",
      role: "DESIGNER",
      content: "Super clean implementation! The latency reduction is significant.",
      time: "20m ago",
    },
  ]);

  const cat = categoryLabels[post.category] || categoryLabels.GENERAL;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setLocalComments((prev) => [
      ...prev,
      {
        author: "Alex Developer (You)",
        role: "FULLSTACK",
        content: commentInput.trim(),
        time: "Just now",
      },
    ]);
    setCommentInput("");
  };

  return (
    <article className="group relative rounded-2xl border border-[#1F1F1F] bg-[#141414]/90 p-5 backdrop-blur-md transition-all duration-300 hover:border-[#2A2A2A] hover:bg-[#161616] hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href={`/app/builders/${post.authorId}`}
            className="relative shrink-0 group/avatar"
          >
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="w-10 h-10 rounded-full border border-[#2A2A2A] object-cover transition-transform group-hover/avatar:scale-105"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#141414]" />
          </Link>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={`/app/builders/${post.authorId}`}
                className="text-sm font-semibold text-[#F5F5F5] hover:text-[#89AACC] transition-colors"
              >
                {post.authorName}
              </Link>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border border-[#2A2A2A] bg-[#181818] text-[#878787]">
                {post.authorRole}
              </span>
              <span className="text-xs text-[#555] font-mono">•</span>
              <span className="text-xs text-[#666] font-mono">{post.authorCampus}</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-mono text-[#555]">{post.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <span
          className={`text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full border shrink-0 ${cat.color}`}
        >
          {cat.label}
        </span>
      </div>

      {/* Content */}
      <div className="mt-3.5 text-sm text-[#D4D4D4] leading-relaxed font-sans whitespace-pre-line">
        {post.content}
      </div>

      {/* Linked Project Reference */}
      {post.projectId && post.projectTitle && (
        <div className="mt-3.5">
          <Link
            href={`/app/projects/${post.projectId}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#262626] bg-[#1A1A1A]/80 text-xs font-mono text-[#89AACC] hover:border-[#89AACC]/40 hover:bg-[#1E1E1E] transition-all group/proj"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[#89AACC] group-hover/proj:rotate-6 transition-transform" />
            <span>PROJECT // {post.projectTitle}</span>
            <span className="text-[#555] group-hover/proj:translate-x-0.5 transition-transform">
              →
            </span>
          </Link>
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono text-[#777] bg-[#181818] px-2 py-0.5 rounded border border-[#222]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions Bar */}
      <div className="mt-4 pt-3.5 border-t border-[#1F1F1F] flex items-center justify-between gap-2 flex-wrap">
        {/* Reactions */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(["like", "fire", "rocket", "insightful"] as ReactionType[]).map((type) => (
            <ReactionButton
              key={type}
              type={type}
              count={post.reactions[type] || 0}
              isActive={post.userReactions.includes(type)}
              onClick={() => toggleReaction(post.id, type)}
            />
          ))}
        </div>

        {/* Right tools */}
        <div className="flex items-center gap-2">
          {/* Comments Toggle */}
          <button
            type="button"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#1F1F1F] bg-[#141414]/60 text-xs font-mono text-[#878787] hover:text-[#F5F5F5] hover:border-[#2A2A2A] hover:bg-[#1A1A1A] transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{localComments.length + post.commentsCount}</span>
            {showComments ? (
              <ChevronUp className="w-3 h-3 text-[#555]" />
            ) : (
              <ChevronDown className="w-3 h-3 text-[#555]" />
            )}
          </button>

          {/* Bookmark */}
          <button
            type="button"
            onClick={() => toggleSavePost(post.id)}
            title={post.isSaved ? "Saved" : "Save post"}
            className={`p-1.5 rounded-lg border text-xs transition-all ${
              post.isSaved
                ? "border-[#89AACC]/40 bg-[#89AACC]/10 text-[#89AACC]"
                : "border-[#1F1F1F] bg-[#141414]/60 text-[#878787] hover:text-[#F5F5F5] hover:border-[#2A2A2A]"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${post.isSaved ? "fill-current" : ""}`} />
          </button>

          {/* Share */}
          <ShareButton title={post.authorName + "'s post"} />
        </div>
      </div>

      {/* Expandable Comments Drawer */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-[#1C1C1C] space-y-3">
          <p className="text-[11px] font-mono text-[#555] uppercase tracking-wider">
            Discussion Thread ({localComments.length + post.commentsCount})
          </p>

          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {localComments.map((c, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-[#181818] border border-[#222] text-xs text-[#CCC]"
              >
                <div className="flex items-center justify-between text-[11px] text-[#777] mb-1 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#F5F5F5] font-semibold">{c.author}</span>
                    <span className="text-[9px] px-1 py-0.2 rounded bg-[#202020] text-[#888]">
                      {c.role}
                    </span>
                  </div>
                  <span>{c.time}</span>
                </div>
                <p className="leading-normal text-[#DDD]">{c.content}</p>
              </div>
            ))}
          </div>

          {/* New Comment Input */}
          <form onSubmit={handleAddComment} className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Join the interaction / reply..."
              className="flex-1 bg-[#101010] border border-[#242424] rounded-xl px-3 py-2 text-xs text-[#F5F5F5] placeholder-[#555] focus:outline-none focus:border-[#89AACC] transition-colors"
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="px-3 py-2 rounded-xl bg-[#89AACC] text-[#0A0A0A] font-semibold text-xs disabled:opacity-40 hover:bg-[#789BBF] transition-all flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>REPLY</span>
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
