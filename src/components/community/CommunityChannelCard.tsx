import { type CommunityChannel } from "@/data/communityMock";
import { MessageSquare, Disc as DiscordIcon, ExternalLink, Users, Radio } from "lucide-react";

interface CommunityChannelCardProps {
  channel: CommunityChannel;
}

export function CommunityChannelCard({ channel }: CommunityChannelCardProps) {
  const isDiscord = channel.id === "discord";

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-5 backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${
        isDiscord
          ? "border-[#5865F2]/30 bg-gradient-to-br from-[#5865F2]/10 via-[#141414]/90 to-[#121212] hover:border-[#5865F2]/50 shadow-[0_0_30px_rgba(88,101,242,0.06)]"
          : "border-[#25D366]/30 bg-gradient-to-br from-[#25D366]/10 via-[#141414]/90 to-[#121212] hover:border-[#25D366]/50 shadow-[0_0_30px_rgba(37,211,102,0.06)]"
      }`}
    >
      <div>
        {/* Header with channel badge */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                isDiscord
                  ? "border-[#5865F2]/40 bg-[#5865F2]/20 text-[#5865F2]"
                  : "border-[#25D366]/40 bg-[#25D366]/20 text-[#25D366]"
              }`}
            >
              {isDiscord ? (
                <DiscordIcon className="w-5 h-5 animate-pulse" />
              ) : (
                <MessageSquare className="w-5 h-5" />
              )}
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#F5F5F5]">
                {channel.name}
              </h3>
              <p className="text-[10px] font-mono text-[#777]">{channel.note}</p>
            </div>
          </div>

          <span
            className={`flex items-center gap-1 text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
              isDiscord
                ? "border-[#5865F2]/40 bg-[#5865F2]/10 text-[#7289DA]"
                : "border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366]"
            }`}
          >
            <Radio className="w-2.5 h-2.5 animate-pulse" />
            LIVE
          </span>
        </div>

        {/* Description */}
        <p className="mt-3.5 text-xs text-[#BBB] leading-relaxed font-sans">
          {channel.description}
        </p>

        {/* Metrics readout */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-[#181818]/70 border border-[#222]">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#666]">
              <Users className="w-3 h-3 text-[#89AACC]" />
              <span>COMMUNITY</span>
            </div>
            <p className="text-xs font-bold font-mono text-[#F5F5F5] mt-0.5">
              {channel.membersCount}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-[#181818]/70 border border-[#222]">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#666]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>ACTIVE</span>
            </div>
            <p className="text-xs font-bold font-mono text-emerald-400 mt-0.5 truncate">
              {channel.activeCount}
            </p>
          </div>
        </div>
      </div>

      {/* Action link */}
      <div className="mt-5 pt-3.5 border-t border-[#1C1C1C]">
        <a
          href={channel.joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-2.5 px-4 rounded-xl font-mono text-xs font-semibold transition-all flex items-center justify-center gap-2 active:scale-98 ${
            isDiscord
              ? "bg-[#5865F2] text-[#FFF] hover:bg-[#4752C4]"
              : "bg-[#25D366] text-[#0A0A0A] hover:bg-[#20BA5A]"
          }`}
        >
          <span>{channel.ctaText}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
