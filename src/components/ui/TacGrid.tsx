import React from "react";
import { cn } from "@/lib/utils";

interface TacGridProps {
  className?: string;
}

export const TacGrid: React.FC<TacGridProps> = ({ className }) => {
  return (
    <div className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}>
      <div 
        className="absolute inset-0 opacity-10"
        style={{
            backgroundImage: `linear-gradient(to right, #4a5d23 1px, transparent 1px),
                              linear-gradient(to bottom, #4a5d23 1px, transparent 1px)`,
            backgroundSize: `40px 40px`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
    </div>
  );
};
