import { useState } from "react";
import { Link } from "wouter";
import { type ChapterCommunity } from "@/data/communityMock";
import { Users, FolderGit2, Calendar, MapPin, CheckCircle, Plus } from "lucide-react";

interface ChapterCardProps {
  chapter: ChapterCommunity;
}

export function ChapterCard({ chapter }: ChapterCardProps) {
  const [joined, setJoined] = useState(false);

  return (
    <div className="group relative rounded-2xl border border-[#1F1F1F] bg-[#141414]/90 p-5 backdrop-blur-md transition-all duration-300 hover:border-[#2A2A2A] hover:bg-[#161616] hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#89AACC] uppercase block mb-1">
              CHAPTER // {chapter.code}
            </span>
            <h3 className="text-base font-bold text-[#F5F5F5] group-hover:text-[#89AACC] transition-colors">
              {chapter.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#777] mt-1">
              <MapPin className="w-3 h-3 text-[#555]" />
              <span>{chapter.campus}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setJoined(!joined)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all duration-200 active:scale-95 flex items-center gap-1.5 ${
              joined
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-[#89AACC]/40 bg-[#89AACC]/10 text-[#89AACC] hover:bg-[#89AACC] hover:text-[#0A0A0A]"
            }`}
          >
            {joined ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                <span>JOINED</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>JOIN CHAPTER</span>
              </>
            )}
          </button>
        </div>

        {/* Lead profile */}
        <div className="mt-4 p-3 rounded-xl border border-[#202020] bg-[#171717]/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link href={`/app/builders/${chapter.leadId}`}>
              <img
                src={chapter.leadAvatar}
                alt={chapter.leadName}
                className="w-8 h-8 rounded-full border border-[#2A2A2A] object-cover"
              />
            </Link>
            <div>
              <Link
                href={`/app/builders/${chapter.leadId}`}
                className="text-xs font-semibold text-[#F5F5F5] hover:text-[#89AACC]"
              >
                {chapter.leadName}
              </Link>
              <p className="text-[10px] font-mono text-[#777]">{chapter.leadRole}</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#555] uppercase">LEAD</span>
        </div>

        {/* Counts Bar */}
        <div className="mt-3.5 grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl border border-[#202020] bg-[#181818]/60 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#89AACC]" />
            <div>
              <p className="text-xs font-bold text-[#F5F5F5] leading-none">
                {chapter.membersCount}
              </p>
              <p className="text-[10px] font-mono text-[#666] leading-none mt-1">
                Active Members
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl border border-[#202020] bg-[#181818]/60 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-[#89AACC]" />
            <div>
              <p className="text-xs font-bold text-[#F5F5F5] leading-none">
                {chapter.projectsCount}
              </p>
              <p className="text-[10px] font-mono text-[#666] leading-none mt-1">
                Shipped Builds
              </p>
            </div>
          </div>
        </div>

        {/* Recent Chapter Activity */}
        <div className="mt-3.5">
          <span className="text-[10px] font-mono uppercase text-[#555] block mb-1">
            RECENT TELEMETRY
          </span>
          <p className="text-xs text-[#AAA] font-mono bg-[#161616] p-2.5 rounded-lg border border-[#202020]">
            &gt; {chapter.recentActivity}
          </p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-4 pt-3.5 border-t border-[#1C1C1C]">
        <span className="text-[10px] font-mono uppercase text-[#555] block mb-2">
          UPCOMING SESSIONS
        </span>
        <div className="space-y-1.5">
          {chapter.events.map((ev, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-xs font-mono text-[#878787]"
            >
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-[#555]" />
                <span className="text-[#CCC] truncate max-w-[170px]">{ev.title}</span>
              </div>
              <span className="text-[10px] text-[#89AACC] px-1.5 py-0.2 rounded bg-[#1A1A1A] border border-[#252525]">
                {ev.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
