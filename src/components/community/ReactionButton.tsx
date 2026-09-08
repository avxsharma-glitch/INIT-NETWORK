import { useState } from "react";
import { type ReactionType } from "@/data/communityMock";
import { ThumbsUp, Flame, Rocket, Sparkles } from "lucide-react";

interface ReactionButtonProps {
  type: ReactionType;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

const reactionIcons: Record<
  ReactionType,
  { label: string; icon: typeof ThumbsUp; activeColor: string }
> = {
  like: {
    label: "Like",
    icon: ThumbsUp,
    activeColor: "text-[#89AACC] border-[#89AACC]/40 bg-[#89AACC]/10",
  },
  fire: {
    label: "Fire",
    icon: Flame,
    activeColor: "text-amber-400 border-amber-500/40 bg-amber-500/10",
  },
  rocket: {
    label: "Ship",
    icon: Rocket,
    activeColor: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
  },
  insightful: {
    label: "Insight",
    icon: Sparkles,
    activeColor: "text-indigo-400 border-indigo-500/40 bg-indigo-500/10",
  },
};

export function ReactionButton({
  type,
  count,
  isActive,
  onClick,
}: ReactionButtonProps) {
  const [bouncing, setBouncing] = useState(false);
  const info = reactionIcons[type];
  const Icon = info.icon;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBouncing(true);
    onClick();
    setTimeout(() => setBouncing(false), 300);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`${info.label} (${count})`}
      className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all duration-200 active:scale-95 ${
        isActive
          ? info.activeColor
          : "border-[#1F1F1F] bg-[#141414]/60 text-[#878787] hover:border-[#2A2A2A] hover:text-[#F5F5F5] hover:bg-[#1A1A1A]"
      }`}
    >
      <Icon
        className={`w-3.5 h-3.5 transition-transform duration-200 ${
          bouncing ? "scale-125" : "scale-100"
        } ${isActive ? "" : "group-hover:scale-110"}`}
      />
      <span>{count}</span>
    </button>
  );
}
