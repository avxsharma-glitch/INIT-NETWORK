import { useState } from "react";
import { Link } from "wouter";
import { type DiscussionComment } from "@/data/communityMock";
import { useCommunityStore } from "@/store/CommunityStore";
import { ThumbsUp, CornerDownRight, Send } from "lucide-react";

interface CommentThreadProps {
  discussionId: string;
}

export function CommentThread({ discussionId }: CommentThreadProps) {
  const { comments, addComment, toggleUpvoteComment } = useCommunityStore();
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [replyText, setReplyText] = useState("");

  const discussionComments = comments.filter((c) => c.discussionId === discussionId);
  const rootComments = discussionComments.filter((c) => !c.parentId);

  const getReplies = (parentId: string) =>
    discussionComments.filter((c) => c.parentId === parentId);

  const handleRootSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    addComment(discussionId, newCommentText.trim());
    setNewCommentText("");
  };

  const handleReplySubmit = (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addComment(discussionId, replyText.trim(), parentId);
    setReplyText("");
    setReplyingToId(null);
  };

  return (
    <div className="space-y-4">
      {/* Root input composer */}
      <form onSubmit={handleRootSubmit} className="relative">
        <textarea
          rows={3}
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Share your perspective, technical benchmark, or question..."
          className="w-full bg-[#101010] border border-[#262626] rounded-xl p-3.5 text-xs text-[#F5F5F5] placeholder-[#555] focus:outline-none focus:border-[#89AACC] transition-all resize-none"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] font-mono text-[#555]">
            Markdown supported • Keep it builder-focused
          </span>
          <button
            type="submit"
            disabled={!newCommentText.trim()}
            className="px-4 py-1.5 rounded-lg bg-[#89AACC] text-[#0A0A0A] font-semibold text-xs disabled:opacity-40 hover:bg-[#789BBF] transition-all flex items-center gap-1.5"
          >
            <Send className="w-3 h-3" />
            <span>POST REPLY</span>
          </button>
        </div>
      </form>

      {/* Comment List */}
      <div className="space-y-3 pt-2">
        {rootComments.length === 0 ? (
          <div className="py-6 text-center text-xs font-mono text-[#666] border border-dashed border-[#222] rounded-xl">
            No responses yet. Be the first to start the discussion!
          </div>
        ) : (
          rootComments.map((comment) => {
            const replies = getReplies(comment.id);
            return (
              <div
                key={comment.id}
                className="rounded-xl border border-[#202020] bg-[#141414]/70 p-3.5 space-y-2.5 transition-all"
              >
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Link href={`/app/builders/${comment.authorId}`}>
                      <img
                        src={comment.authorAvatar}
                        alt={comment.authorName}
                        className="w-7 h-7 rounded-full border border-[#2A2A2A] object-cover"
                      />
                    </Link>
                    <div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/app/builders/${comment.authorId}`}
                          className="text-xs font-semibold text-[#F5F5F5] hover:text-[#89AACC] transition-colors"
                        >
                          {comment.authorName}
                        </Link>
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#1C1C1C] text-[#888] border border-[#282828]">
                          {comment.authorRole}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-[#555]">
                        {comment.authorCampus} • {comment.createdAt}
                      </p>
                    </div>
                  </div>

                  {/* Upvote */}
                  <button
                    type="button"
                    onClick={() => toggleUpvoteComment(comment.id)}
                    className={`flex items-center gap-1 px-2 py-1 rounded border text-[11px] font-mono transition-all ${
                      comment.userUpvoted
                        ? "border-[#89AACC]/40 bg-[#89AACC]/10 text-[#89AACC]"
                        : "border-[#222] bg-[#181818] text-[#777] hover:text-[#DDD]"
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{comment.upvotes}</span>
                  </button>
                </div>

                {/* Content */}
                <p className="text-xs text-[#CCC] leading-relaxed pl-9 font-sans">
                  {comment.content}
                </p>

                {/* Actions */}
                <div className="pl-9 flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setReplyingToId(replyingToId === comment.id ? null : comment.id)
                    }
                    className="text-[11px] font-mono text-[#777] hover:text-[#89AACC] flex items-center gap-1 transition-colors"
                  >
                    <CornerDownRight className="w-3 h-3" />
                    <span>Reply</span>
                  </button>
                </div>

                {/* Reply Form */}
                {replyingToId === comment.id && (
                  <form
                    onSubmit={(e) => handleReplySubmit(e, comment.id)}
                    className="pl-9 pt-2 space-y-2"
                  >
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Reply to ${comment.authorName}...`}
                      className="w-full bg-[#0E0E0E] border border-[#282828] rounded-lg px-3 py-1.5 text-xs text-[#F5F5F5] placeholder-[#555] focus:outline-none focus:border-[#89AACC]"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setReplyingToId(null)}
                        className="px-2.5 py-1 text-[11px] font-mono text-[#777] hover:text-[#CCC]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!replyText.trim()}
                        className="px-3 py-1 rounded bg-[#89AACC] text-[#0A0A0A] font-semibold text-[11px] disabled:opacity-40"
                      >
                        Reply
                      </button>
                    </div>
                  </form>
                )}

                {/* Nested replies */}
                {replies.length > 0 && (
                  <div className="pl-9 space-y-2 pt-2 border-l border-[#222] ml-4 mt-2">
                    {replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="p-2.5 rounded-lg bg-[#181818]/60 border border-[#222] text-xs"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-[#F5F5F5]">
                              {reply.authorName}
                            </span>
                            <span className="text-[9px] px-1 py-0.2 rounded bg-[#222] text-[#888]">
                              {reply.authorRole}
                            </span>
                          </div>
                          <span className="text-[#555]">{reply.createdAt}</span>
                        </div>
                        <p className="text-[#CCC] leading-relaxed">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
