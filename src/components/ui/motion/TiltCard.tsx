import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TiltCard({ children, className = "", ...props }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const bgX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const bgY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
  const background = useMotionTemplate`radial-gradient(circle at ${bgX}% ${bgY}%, rgba(137, 170, 204, 0.15) 0%, transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setHovered(true);
  };

  if (isMobile) {
    return (
      <div 
        ref={ref} 
        className={`relative overflow-hidden transition-all duration-300 ease-out active:scale-[0.98] ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative transition-all duration-500 ease-out z-10 ${className}`}
      {...props}
    >
      <div
        style={{
          transform: hovered ? "translateZ(12px)" : "translateZ(0px)",
          transition: "transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
        className="w-full h-full relative z-20"
      >
        {children}
      </div>
      
      {/* Liquid glass / glow layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 rounded-inherit"
        style={{
          opacity: hovered ? 1 : 0,
          background,
          borderRadius: "inherit"
        }}
      />
      
      {/* Subtle border reflection */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 border border-white/0 rounded-inherit"
        style={{
          opacity: hovered ? 1 : 0,
          borderColor: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0)",
          boxShadow: hovered ? "0 10px 40px -10px rgba(0,0,0,0.5), inset 0 0 20px rgba(137,170,204,0.05)" : "none",
          borderRadius: "inherit"
        }}
      />
    </motion.div>
  );
}
