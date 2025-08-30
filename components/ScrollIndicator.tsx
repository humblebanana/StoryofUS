"use client";

import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  targetId?: string;
  className?: string;
}

export default function ScrollIndicator({ 
  targetId = "main-content", 
  className = "" 
}: ScrollIndicatorProps) {
  const scrollToContent = () => {
    const target = document.getElementById(targetId);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToContent}
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce ${className}`}
      aria-label="Scroll to content"
    >
      <ChevronDown className="h-8 w-8" />
    </button>
  );
}