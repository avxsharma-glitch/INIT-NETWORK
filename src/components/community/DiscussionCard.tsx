import { Link } from "wouter";
import { type Discussion } from "@/data/communityMock";
import { useCommunityStore } from "@/store/CommunityStore";
import {
  ThumbsUp,
  MessageSquare,
  Bookmark,
  Pin,
  FolderGit2,
} from "lucide-react";

interface DiscussionCardProps {
  discussion: Discussion;
  onSelect: (discussion: Discussion) => void;
}

export function DiscussionCard({ discussion, onSelect }: DiscussionCardProps) {
  const { toggleUpvoteDiscussion, toggleSaveDiscussion } = useCommunityStore();

  return (
    <div
      onClick={() => onSelect(discussion)}
      className="group relative cursor-pointer rounded-2xl border border-[#1F1F1F] bg-[#141414]/90 p-5 backdrop-blur-md transition-all duration-300 hover:border-[#2A2A2A] hover:bg-[#161616] hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
    >
      {/* Category + Pin Bar */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full border border-[#89AACC]/30 bg-[#89AACC]/10 text-[#89AACC]">
            {discussion.category}
          </span>
          {discussion.isPinned && (
            <span className="flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
              <Pin className="w-3 h-3" />
              PINNED
            </span>
          )}
        </div>

        <span className="text-xs font-mono text-[#555]">{discussion.createdAt}</span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-[#F5F5F5] group-hover:text-[#89AACC] transition-colors line-clamp-2 leading-snug">
        {discussion.title}
      </h3>

      {/* Snippet */}
      <p className="mt-2 text-xs text-[#878787] line-clamp-2 leading-relaxed">
        {discussion.content}
      </p>

      {/* Project Ref Pill if any */}
      {discussion.projectId && discussion.projectTitle && (
        <div className="mt-2.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#89AACC] bg-[#181818] px-2 py-0.5 rounded border border-[#222]">
            <FolderGit2 className="w-3 h-3" />
            {discussion.projectTitle}
          </span>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-[#1C1C1C] flex items-center justify-between gap-2 flex-wrap">
        {/* Author */}
        <div className="flex items-center gap-2">
          <img
            src={discussion.authorAvatar}
            alt={discussion.authorName}
            className="w-6 h-6 rounded-full border border-[#262626] object-cover"
          />
          <span className="text-xs font-medium text-[#BBB]">
            {discussion.authorName}
          </span>
          <span className="text-[10px] font-mono text-[#555]">
            • {discussion.authorCampus}
          </span>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center gap-2">
          {/* Upvotes */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleUpvoteDiscussion(discussion.id);
            }}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-mono transition-all ${
              discussion.userUpvoted
                ? "border-[#89AACC]/40 bg-[#89AACC]/10 text-[#89AACC]"
                : "border-[#1F1F1F] bg-[#141414] text-[#878787] hover:text-[#FFF] hover:border-[#2A2A2A]"
            }`}
          >
            <ThumbsUp className="w-3 h-3" />
            <span>{discussion.upvotes}</span>
          </button>

          {/* Comments count */}
          <div className="flex items-center gap-1 text-xs font-mono text-[#777] px-2 py-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{discussion.commentsCount}</span>
          </div>

          {/* Save Bookmark */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveDiscussion(discussion.id);
            }}
            className={`p-1.5 rounded-lg border text-xs transition-all ${
              discussion.isSaved
                ? "border-[#89AACC]/40 bg-[#89AACC]/10 text-[#89AACC]"
                : "border-[#1F1F1F] bg-[#141414] text-[#878787] hover:text-[#FFF] hover:border-[#2A2A2A]"
            }`}
          >
            <Bookmark
              className={`w-3 h-3 ${discussion.isSaved ? "fill-current" : ""}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
