import { Link } from "wouter";
import { type Discussion } from "@/data/communityMock";
import { useCommunityStore } from "@/store/CommunityStore";
import { CommentThread } from "./CommentThread";
import { ShareButton } from "./ShareButton";
import {
  X,
  ThumbsUp,
  Bookmark,
  FolderGit2,
  Pin,
} from "lucide-react";

interface DiscussionDetailModalProps {
  discussion: Discussion | null;
  onClose: () => void;
}

export function DiscussionDetailModal({
  discussion,
  onClose,
}: DiscussionDetailModalProps) {
  const { toggleUpvoteDiscussion, toggleSaveDiscussion } = useCommunityStore();

  if (!discussion) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-[#262626] bg-[#121212] text-[#F5F5F5] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F1F1F] bg-[#161616]/90 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full border border-[#89AACC]/30 bg-[#89AACC]/10 text-[#89AACC]">
              {discussion.category}
            </span>
            {discussion.isPinned && (
              <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                <Pin className="w-3 h-3" />
                PINNED
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#222] bg-[#181818] text-[#878787] hover:text-[#F5F5F5] hover:border-[#333] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Discussion Title & Metadata */}
          <div>
            <h2 className="text-xl font-bold text-[#F5F5F5] leading-snug tracking-tight">
              {discussion.title}
            </h2>

            {/* Author bar */}
            <div className="mt-3 flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-[#1C1C1C]">
              <div className="flex items-center gap-2.5">
                <Link href={`/app/builders/${discussion.authorId}`}>
                  <img
                    src={discussion.authorAvatar}
                    alt={discussion.authorName}
                    className="w-8 h-8 rounded-full border border-[#2A2A2A] object-cover"
                  />
                </Link>
                <div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/app/builders/${discussion.authorId}`}
                      className="text-xs font-semibold text-[#F5F5F5] hover:text-[#89AACC]"
                    >
                      {discussion.authorName}
                    </Link>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#1C1C1C] text-[#888] border border-[#262626]">
                      {discussion.authorRole}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-[#555]">
                    {discussion.authorCampus} • {discussion.createdAt}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleUpvoteDiscussion(discussion.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                    discussion.userUpvoted
                      ? "border-[#89AACC]/40 bg-[#89AACC]/10 text-[#89AACC]"
                      : "border-[#222] bg-[#181818] text-[#878787] hover:text-[#FFF]"
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{discussion.upvotes} UPVOTES</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleSaveDiscussion(discussion.id)}
                  className={`p-2 rounded-xl border text-xs transition-all ${
                    discussion.isSaved
                      ? "border-[#89AACC]/40 bg-[#89AACC]/10 text-[#89AACC]"
                      : "border-[#222] bg-[#181818] text-[#878787] hover:text-[#FFF]"
                  }`}
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      discussion.isSaved ? "fill-current" : ""
                    }`}
                  />
                </button>

                <ShareButton />
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="text-sm text-[#DDD] leading-relaxed font-sans whitespace-pre-line space-y-4">
            {discussion.content}
          </div>

          {/* Linked Project */}
          {discussion.projectId && discussion.projectTitle && (
            <div className="p-3.5 rounded-xl border border-[#222] bg-[#161616] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FolderGit2 className="w-4 h-4 text-[#89AACC]" />
                <span className="text-xs font-mono text-[#CCC]">
                  Referenced Project: <strong>{discussion.projectTitle}</strong>
                </span>
              </div>
              <Link
                href={`/app/projects/${discussion.projectId}`}
                className="text-xs font-mono text-[#89AACC] hover:underline"
              >
                OPEN PROJECT →
              </Link>
            </div>
          )}

          {/* Tags */}
          {discussion.tags && discussion.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {discussion.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-[#777] bg-[#181818] px-2.5 py-1 rounded-md border border-[#222]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Discussion Responses */}
          <div className="pt-4 border-t border-[#1F1F1F]">
            <h3 className="text-xs font-mono text-[#888] uppercase tracking-wider mb-4">
              Responses & Insights ({discussion.commentsCount})
            </h3>
            <CommentThread discussionId={discussion.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
