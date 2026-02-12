import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lock } from "lucide-react";

interface LogEntry {
    id: string;
    timestamp: string;
    message: string;
    status: "success" | "warning" | "error" | "info" | "encrypted";
}

const initialLogs: LogEntry[] = [
    { id: "1", timestamp: "0800", message: "SYSTEM_INIT: CORE_SERVICES_ONLINE", status: "info" },
    { id: "2", timestamp: "0801", message: "NET_SEC: ENCRYPTION_Key_ROTATION_COMPLETE", status: "success" },
    { id: "3", timestamp: "0815", message: "COMMS: INCOMING_TRANSMISSION_DETECTED", status: "warning" },
    { id: "4", timestamp: "0816", message: "DATA: PACKET_LOSS_0%", status: "success" },
];

const possibleMessages = [
    { msg: "SCANNING_SECTOR_7G...", status: "info" },
    { msg: "TARGET_ACQUISITION_LOCKED", status: "success" },
    { msg: "WARNING: UNAUTHORIZED_ACCESS_ATTEMPT", status: "error" },
    { msg: "PING: 12ms | JITTER: 2ms", status: "info" },
    { msg: "UPLINK_STABLE", status: "success" },
    { msg: "RETRIEVING_SATELLITE_IMAGERY...", status: "warning" },
    { msg: "ENCRYPTING_DATA_STREAM...", status: "info" },
];

interface MissionLogProps {
    className?: string;
    encrypted?: boolean;
}

export const MissionLog: React.FC<MissionLogProps> = ({ className, encrypted = false }) => {
    const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            let newLog: LogEntry;

            if (encrypted) {
                const randomHex = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')).join(' ');
                newLog = {
                    id: Date.now().toString(),
                    timestamp: "ERR",
                    message: `ENCRYPTED_BLOCK: [ ${randomHex} ]`,
                    status: "encrypted"
                }
            } else {
                const randomMsg = possibleMessages[Math.floor(Math.random() * possibleMessages.length)];
                newLog = {
                    id: Date.now().toString(),
                    timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/:/g, ''),
                    message: randomMsg.msg,
                    status: randomMsg.status as any,
                };
            }

            setLogs((prev) => {
                const newLogs = [...prev, newLog];
                if (newLogs.length > 20) newLogs.shift();
                return newLogs;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [encrypted]);

    useEffect(() => {
        if (scrollRef.current) {
            const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [logs]);

    return (
        <div className={cn("rounded-md border border-primary/30 bg-black/80 p-4 font-mono text-xs shadow-[0_0_10px_rgba(75,93,35,0.3)] backdrop-blur-md relative", className)}>
            {encrypted && (
                <div className="absolute top-2 right-2 z-10 animate-pulse text-red-500">
                    <Lock className="h-4 w-4" />
                </div>
            )}
            <div className="mb-2 flex items-center justify-between border-b border-primary/20 pb-2">
                <span className="font-bold uppercase tracking-wider text-primary">Mission Log // TERMINAL_01</span>
                <div className="flex items-center gap-2">
                    <span className={cn("h-1.5 w-1.5 animate-pulse rounded-full", encrypted ? "bg-red-500" : "bg-green-500")} />
                    <span className={cn("text-[10px]", encrypted ? "text-red-500" : "text-green-500")}>
                        {encrypted ? "NO SIGNAL" : "LIVE FEED"}
                    </span>
                </div>
            </div>
            <ScrollArea className="h-[200px]" ref={scrollRef}>
                <div className="space-y-1.5 font-mono">
                    {logs.map((log) => (
                        <div key={log.id} className="flex gap-3 border-b border-white/5 pb-1 last:border-0 hover:bg-white/5 transition-colors">
                            <span className="w-16 shrink-0 text-muted-foreground/70">[{log.timestamp}]</span>
                            <span className={cn(
                                "break-all",
                                log.status === "success" && "text-green-400/90",
                                log.status === "warning" && "text-yellow-400/90",
                                log.status === "error" && "text-red-400/90",
                                log.status === "info" && "text-blue-300/90",
                                log.status === "encrypted" && "text-red-700/60 blur-[1px]"
                            )}>
                                {">"} {log.message}
                            </span>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="mt-2 text-[10px] text-muted-foreground/50 border-t border-primary/10 pt-2 flex justify-between">
                <span>MEM_USAGE: {encrypted ? "ERR" : "34%"}</span>
                <span>Encryption: {encrypted ? "LOCKED" : "AES-256"}</span>
            </div>
        </div>
    );
};
