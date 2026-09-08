import { Link } from "wouter";
import { type Announcement } from "@/data/communityMock";
import { useCommunityStore } from "@/store/CommunityStore";
import { ShareButton } from "./ShareButton";
import { Flame, Rocket, Heart, Bookmark, Pin, ArrowRight } from "lucide-react";

interface AnnouncementCardProps {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const { toggleReactionAnnouncement, toggleSaveAnnouncement } = useCommunityStore();

  const isFeatured = announcement.priority === "FEATURED";

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 backdrop-blur-md ${
        isFeatured
          ? "border-[#89AACC]/40 bg-gradient-to-b from-[#18202A]/80 via-[#141414]/90 to-[#121212] shadow-[0_0_40px_rgba(137,170,204,0.08)]"
          : "border-[#222] bg-[#141414]/90 hover:border-[#2C2C2C]"
      }`}
    >
      {/* Liquid glass light accent line for featured */}
      {isFeatured && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#89AACC] to-transparent opacity-80" />
      )}

      {/* Top badges */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${
              isFeatured
                ? "border-[#89AACC]/50 bg-[#89AACC]/15 text-[#89AACC] font-bold"
                : "border-[#333] bg-[#1A1A1A] text-[#888]"
            }`}
          >
            {announcement.badge}
          </span>
          {isFeatured && (
            <span className="flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
              <Pin className="w-3 h-3" />
              OFFICIAL
            </span>
          )}
        </div>

        <span className="text-xs font-mono text-[#777]">{announcement.date}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-bold text-[#F5F5F5] tracking-tight group-hover:text-[#89AACC] transition-colors">
        {announcement.title}
      </h3>

      {/* Tagline with subtle editorial moment */}
      <p className="mt-1 text-xs md:text-sm text-[#89AACC] font-medium italic serif-italic">
        "{announcement.tagline}"
      </p>

      {/* Content */}
      <p className="mt-3 text-xs md:text-sm text-[#CCC] leading-relaxed font-sans">
        {announcement.content}
      </p>

      {/* Author & CTA */}
      <div className="mt-5 pt-4 border-t border-[#1F1F1F] flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#AAA]">
            {announcement.author}
          </span>
          <span className="text-[10px] font-mono text-[#555]">
            [{announcement.authorRole}]
          </span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Reaction Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => toggleReactionAnnouncement(announcement.id, "fire")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#222] bg-[#181818] text-xs font-mono text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all active:scale-95"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{announcement.reactions.fire}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleReactionAnnouncement(announcement.id, "rocket")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#222] bg-[#181818] text-xs font-mono text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all active:scale-95"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>{announcement.reactions.rocket}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleReactionAnnouncement(announcement.id, "heart")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#222] bg-[#181818] text-xs font-mono text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all active:scale-95"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>{announcement.reactions.heart}</span>
            </button>
          </div>

          {/* Bookmark */}
          <button
            type="button"
            onClick={() => toggleSaveAnnouncement(announcement.id)}
            className={`p-1.5 rounded-lg border text-xs transition-all ${
              announcement.isSaved
                ? "border-[#89AACC]/40 bg-[#89AACC]/10 text-[#89AACC]"
                : "border-[#222] bg-[#181818] text-[#888] hover:text-[#FFF]"
            }`}
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${
                announcement.isSaved ? "fill-current" : ""
              }`}
            />
          </button>

          <ShareButton />

          {/* Optional CTA */}
          {announcement.ctaLabel && announcement.ctaLink && (
            <a
              href={announcement.ctaLink}
              className="px-3.5 py-1.5 rounded-xl bg-[#89AACC] text-[#0A0A0A] font-mono text-xs font-semibold hover:bg-[#789BBF] transition-all flex items-center gap-1.5"
            >
              <span>{announcement.ctaLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
