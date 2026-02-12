import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Lock } from "lucide-react";

interface BriefingCardProps {
    title: string;
    missionData: string;
    classification?: string;
    className?: string;
    locked?: boolean;
}

export const BriefingCard: React.FC<BriefingCardProps> = ({ title, missionData, classification = "TOP SECRET", className, locked = false }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;
        setDisplayedText(""); // Reset on prop change

        if (locked) {
            setDisplayedText("CLASSIFIED DATA // ENCRYPTION ENABLED");
            return;
        }

        const timer = setInterval(() => {
            setDisplayedText((prev) => prev + missionData.charAt(index));
            index++;
            if (index >= missionData.length) clearInterval(timer);
        }, 30);

        return () => clearInterval(timer);
    }, [missionData, locked]);

    return (
        <Card className={cn("relative overflow-hidden border-2 border-primary/50 bg-black/40 backdrop-blur-md group hover:border-primary/80 transition-colors", className)}>
            {/* Scanline overlay specific to card */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundSize: '100% 3px' }} />

            {locked && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-2 border-2 border-red-500/50 bg-black/80 p-4 text-red-500">
                        <Lock className="h-6 w-6 animate-pulse" />
                        <span className="font-heading text-sm font-bold uppercase tracking-widest">Access Denied</span>
                        <span className="text-[10px] font-mono">Sign in to decrypt</span>
                    </div>
                </div>
            )}

            <div className="absolute top-0 right-0 p-2 opacity-70">
                <div className={cn(
                    "border-2 p-1 text-[10px] font-bold uppercase tracking-widest -rotate-12",
                    locked ? "border-red-600 text-red-600 bg-red-950/20" : "border-red-800 text-red-800 bg-red-950/20"
                )}>
                    {classification}
                </div>
            </div>

            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 font-heading uppercase tracking-wider text-primary text-lg">
                    <span className={cn("h-2 w-2 rounded-sm", locked ? "bg-red-500 animate-pulse" : "bg-green-500")} />
                    {title}
                </CardTitle>
                <div className="h-[1px] w-full bg-gradient-to-r from-primary/50 to-transparent" />
            </CardHeader>

            <CardContent>
                <div className={cn("font-mono text-xs leading-relaxed h-20", locked ? "text-red-500/70 blur-[2px]" : "text-green-400/90")}>
                    {displayedText}
                    {!locked && <span className="animate-pulse inline-block w-2 h-4 bg-green-500/50 align-middle ml-1"></span>}
                </div>
            </CardContent>

            <CardFooter className="pt-0 text-[10px] text-muted-foreground/40 font-mono flex justify-between uppercase">
                <span>Auth: {locked ? "RESTRICTED" : "GRANTED"}</span>
                <span>V.2.0.4</span>
            </CardFooter>
        </Card>
    );
};
