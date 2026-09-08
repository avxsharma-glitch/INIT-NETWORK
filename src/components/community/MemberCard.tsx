import { Link } from "wouter";
import { type Builder } from "@/data/mock";
import { useCommunityStore } from "@/store/CommunityStore";
import { UserCheck, Clock, UserPlus, FolderGit2, ExternalLink } from "lucide-react";

interface MemberCardProps {
  builder: Builder;
  currentProjectTitle?: string;
  currentProjectId?: string;
}

export function MemberCard({
  builder,
  currentProjectTitle = "CampusOS",
  currentProjectId = "p2",
}: MemberCardProps) {
  const { memberConnections, connectMember } = useCommunityStore();
  const status = memberConnections[builder.id] || "CONNECT";

  const renderConnectButton = () => {
    if (builder.isCurrentUser) {
      return (
        <span className="px-3 py-1.5 rounded-xl border border-[#242424] bg-[#161616] text-[11px] font-mono text-[#777]">
          YOU
        </span>
      );
    }

    if (status === "CONNECTED") {
      return (
        <button
          type="button"
          onClick={() => connectMember(builder.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium hover:bg-emerald-500/20 transition-all"
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>CONNECTED</span>
        </button>
      );
    }

    if (status === "PENDING") {
      return (
        <button
          type="button"
          onClick={() => connectMember(builder.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono font-medium hover:bg-amber-500/20 transition-all"
        >
          <Clock className="w-3.5 h-3.5 animate-pulse" />
          <span>PENDING</span>
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={() => connectMember(builder.id)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#89AACC]/40 bg-[#89AACC]/10 text-[#89AACC] text-xs font-mono font-medium hover:bg-[#89AACC] hover:text-[#0A0A0A] transition-all duration-200 active:scale-95"
      >
        <UserPlus className="w-3.5 h-3.5" />
        <span>CONNECT</span>
      </button>
    );
  };

  return (
    <div className="group relative rounded-2xl border border-[#1F1F1F] bg-[#141414]/90 p-5 backdrop-blur-md transition-all duration-300 hover:border-[#2A2A2A] hover:bg-[#161616] hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex flex-col justify-between">
      {/* Top Details */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href={`/app/builders/${builder.id}`} className="relative shrink-0">
              <img
                src={builder.avatar}
                alt={builder.name}
                className="w-12 h-12 rounded-full border border-[#2A2A2A] object-cover group-hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[#141414]" />
            </Link>

            <div>
              <Link
                href={`/app/builders/${builder.id}`}
                className="text-sm font-semibold text-[#F5F5F5] hover:text-[#89AACC] transition-colors line-clamp-1"
              >
                {builder.name}
              </Link>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#1C1C1C] text-[#888] border border-[#242424]">
                  {builder.role}
                </span>
                <span className="text-xs font-mono text-[#555]">
                  @{builder.social.github || builder.name.toLowerCase().replace(/\s+/g, "")}
                </span>
              </div>
            </div>
          </div>

          {/* Connect Action */}
          <div>{renderConnectButton()}</div>
        </div>

        {/* Campus badge */}
        <div className="mt-3 text-xs font-mono text-[#777] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC]/60" />
          <span>{builder.campus}</span>
        </div>

        {/* Bio */}
        <p className="mt-2.5 text-xs text-[#A3A3A3] line-clamp-2 leading-relaxed font-sans">
          {builder.bio}
        </p>

        {/* Current Build reference */}
        <div className="mt-3 pt-3 border-t border-[#1C1C1C]">
          <span className="text-[10px] font-mono uppercase text-[#555] block mb-1">
            CURRENT BUILD
          </span>
          <Link
            href={`/app/projects/${currentProjectId}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#89AACC] hover:underline"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span className="truncate">{currentProjectTitle}</span>
          </Link>
        </div>

        {/* Skills list */}
        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
          {builder.skills.slice(0, 4).map((sk) => (
            <span
              key={sk.name}
              className="text-[10px] font-mono text-[#888] bg-[#181818] px-2 py-0.5 rounded border border-[#222]"
            >
              {sk.name}
            </span>
          ))}
          {builder.skills.length > 4 && (
            <span className="text-[10px] font-mono text-[#555] px-1">
              +{builder.skills.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* View Full Profile link */}
      <div className="mt-4 pt-3 border-t border-[#1C1C1C] flex items-center justify-between">
        <span className="text-[10px] font-mono text-[#555]">
          Joined {builder.joinedAt}
        </span>
        <Link
          href={`/app/builders/${builder.id}`}
          className="text-xs font-mono text-[#878787] hover:text-[#F5F5F5] flex items-center gap-1 transition-colors"
        >
          <span>VIEW PROFILE</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
