import { useState } from "react";
import { type Mentor } from "@/data/communityMock";
import { useCommunityStore } from "@/store/CommunityStore";
import { MentorRequestModal } from "./MentorRequestModal";
import { Check, Sparkles, Calendar, ArrowUpRight } from "lucide-react";

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  const { mentorshipRequests } = useCommunityStore();
  const [modalOpen, setModalOpen] = useState(false);

  const request = mentorshipRequests[mentor.id];

  const statusColors = {
    AVAILABLE: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    OFFICE_HOURS: "text-[#89AACC] bg-[#89AACC]/10 border-[#89AACC]/20",
    BUSY: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  };

  return (
    <>
      <div className="group relative rounded-2xl border border-[#1F1F1F] bg-[#141414]/90 p-5 backdrop-blur-md transition-all duration-300 hover:border-[#2A2A2A] hover:bg-[#161616] hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-12 h-12 rounded-full border border-[#2A2A2A] object-cover"
              />
              <div>
                <h3 className="text-sm font-semibold text-[#F5F5F5] group-hover:text-[#89AACC] transition-colors">
                  {mentor.name}
                </h3>
                <p className="text-xs text-[#878787] font-medium">{mentor.role}</p>
                <p className="text-[10px] font-mono text-[#555]">
                  {mentor.organization}
                </p>
              </div>
            </div>

            {/* Status Pill */}
            <span
              className={`text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full border shrink-0 ${
                statusColors[mentor.status]
              }`}
            >
              {mentor.status.replace("_", " ")}
            </span>
          </div>

          {/* Bio */}
          <p className="mt-3.5 text-xs text-[#A3A3A3] leading-relaxed font-sans line-clamp-3">
            {mentor.bio}
          </p>

          {/* Expertise Chips */}
          <div className="mt-3.5">
            <span className="text-[10px] font-mono uppercase text-[#555] block mb-1.5">
              DOMAIN EXPERTISE
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {mentor.expertise.map((exp) => (
                <span
                  key={exp}
                  className="text-[10px] font-mono text-[#89AACC] bg-[#171A1E] px-2 py-0.5 rounded border border-[#222830]"
                >
                  {exp}
                </span>
              ))}
            </div>
          </div>

          {/* Project Interests */}
          <div className="mt-3">
            <span className="text-[10px] font-mono uppercase text-[#555] block mb-1">
              INTERESTS
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {mentor.projectInterests.map((interest) => (
                <span
                  key={interest}
                  className="text-[10px] font-mono text-[#777] bg-[#181818] px-2 py-0.5 rounded border border-[#222]"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer / Availability & CTA */}
        <div className="mt-5 pt-3.5 border-t border-[#1C1C1C] flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#777]">
            <Calendar className="w-3.5 h-3.5 text-[#555]" />
            <span className="line-clamp-1">{mentor.availability}</span>
          </div>

          {request ? (
            <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
              <Check className="w-3.5 h-3.5" />
              <span>REQUEST SENT</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#89AACC]/40 bg-[#89AACC]/10 text-[#89AACC] text-xs font-mono font-medium hover:bg-[#89AACC] hover:text-[#0A0A0A] transition-all duration-200 active:scale-95"
            >
              <span>REQUEST 1:1</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {modalOpen && (
        <MentorRequestModal mentor={mentor} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
