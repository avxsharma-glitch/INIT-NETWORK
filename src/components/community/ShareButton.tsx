import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ShareButtonProps {
  url?: string;
  title?: string;
  className?: string;
}

export function ShareButton({ url, title, className = "" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = url || window.location.href;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      title={copied ? "Link Copied!" : "Share Link"}
      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#1F1F1F] bg-[#141414]/60 text-xs font-mono text-[#878787] hover:text-[#F5F5F5] hover:border-[#2A2A2A] hover:bg-[#1A1A1A] transition-all duration-200 active:scale-95 ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400">COPIED</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5" />
          <span>SHARE</span>
        </>
      )}
    </button>
  );
}
