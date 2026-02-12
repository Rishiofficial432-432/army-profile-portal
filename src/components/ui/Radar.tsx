import React from "react";
import { cn } from "@/lib/utils";

interface RadarProps {
    className?: string;
}

export const Radar: React.FC<RadarProps> = ({ className }) => {
    return (
        <div className={cn("relative flex h-64 w-64 items-center justify-center rounded-full border-2 border-primary/30 bg-black/20", className)}>
            {/* Grid rings */}
            <div className="absolute inset-4 rounded-full border border-primary/20" />
            <div className="absolute inset-12 rounded-full border border-primary/20" />
            <div className="absolute inset-20 rounded-full border border-primary/20" />

            {/* Crosshairs */}
            <div className="absolute h-full w-[1px] bg-primary/20" />
            <div className="absolute h-[1px] w-full bg-primary/20" />

            {/* Sweep */}
            <div className="absolute inset-0 animate-spin-slow rounded-full bg-gradient-to-tr from-transparent via-primary/10 to-transparent shadow-[0_0_20px_rgba(75,93,35,0.2)]"
                style={{ clipPath: 'polygon(50% 50%, 0 0, 100% 0)' }} />

            {/* Blips */}
            <div className="absolute top-1/4 right-1/4 h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
            <div className="absolute bottom-1/3 left-1/3 h-1.5 w-1.5 animate-pulse delay-75 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.8)]" />
        </div>
    );
};
