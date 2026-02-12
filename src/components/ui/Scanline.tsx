import React from "react";
import { cn } from "@/lib/utils";

interface ScanlineProps {
    className?: string;
}

export const Scanline: React.FC<ScanlineProps> = ({ className }) => {
    return (
        <div className={cn("pointer-events-none absolute inset-0 z-50 overflow-hidden mix-blend-overlay opacity-20", className)}>
            <div className="absolute inset-0 animate-scanline bg-gradient-to-b from-transparent via-white/10 to-transparent"
                style={{ backgroundSize: '100% 4px' }} />
        </div>
    );
};
