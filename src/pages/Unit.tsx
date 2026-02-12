import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Crosshair, HeartPulse, Radio, Map, Users, Target, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const Unit = () => {
    // Mock Roster Data
    const roster = [
        { id: "A-01", name: "Sgt. 'Viper' K.", role: "Squad Leader", status: "ACTIVE", hp: 92, specialization: "Tactics" },
        { id: "A-02", name: "Cpl. 'Ghost' R.", role: "Sniper", status: "ACTIVE", hp: 100, specialization: "Long Range" },
        { id: "A-03", name: "Pvt. 'Tank' M.", role: "Heavy Weapons", status: "INJURED", hp: 45, specialization: "Demolitions" },
        { id: "A-04", name: "Spec. 'Doc' H.", role: "Medic", status: "MIA", hp: 0, specialization: "Trauma" },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACTIVE": return "text-green-500 border-green-900 bg-green-950/20";
            case "INJURED": return "text-yellow-500 border-yellow-900 bg-yellow-950/20";
            case "MIA": return "text-red-500 border-red-900 bg-red-950/20 animate-pulse";
            default: return "text-muted-foreground";
        }
    };

    return (
        <main className="container py-8 md:py-12 space-y-8 relative min-h-screen">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none -z-10" />

            {/* Header */}
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 border-b-4 border-primary/20 pb-6">
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-primary/10 border-2 border-primary flex items-center justify-center">
                        <Shield className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-heading font-black uppercase tracking-tighter text-primary drop-shadow-[0_0_10px_rgba(255,174,0,0.5)]">
                            Alpha Squadron
                        </h1>
                        <p className="font-mono text-sm text-muted-foreground tracking-[0.3em]">UNIT_ID: 1st_RECON_BN</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-black/40 border border-primary/20 px-4 py-2">
                        <div className="text-[10px] font-mono text-muted-foreground">STR</div>
                        <div className="font-heading text-xl text-primary">85%</div>
                    </div>
                    <div className="bg-black/40 border border-primary/20 px-4 py-2">
                        <div className="text-[10px] font-mono text-muted-foreground">INT</div>
                        <div className="font-heading text-xl text-primary">92%</div>
                    </div>
                    <div className="bg-black/40 border border-primary/20 px-4 py-2">
                        <div className="text-[10px] font-mono text-muted-foreground">SUP</div>
                        <div className="font-heading text-xl text-red-500 animate-pulse">LOW</div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Roster Column */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-t-4 border-t-primary">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 bg-black/20">
                            <CardTitle className="font-heading uppercase tracking-wider flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" /> Active Duty Roster
                            </CardTitle>
                            <span className="text-xs font-mono text-muted-foreground bg-black/40 px-2 py-1 border border-primary/10 rounded-sm">
                                PERS_COUNT: {roster.length}
                            </span>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ul className="divide-y divide-primary/10">
                                {roster.map((soldier) => (
                                    <li key={soldier.id} className="p-4 hover:bg-white/5 transition-colors group relative overflow-hidden">
                                        {/* Hover Effect */}
                                        <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 pointer-events-none" />

                                        <div className="flex items-center justify-between relative z-10">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 flex items-center justify-center bg-black/60 border border-primary/20 text-xs font-mono text-muted-foreground group-hover:border-primary group-hover:text-primary transition-colors">
                                                    {soldier.id}
                                                </div>
                                                <div>
                                                    <h3 className="font-heading font-bold text-lg leading-none">{soldier.name}</h3>
                                                    <p className="text-xs font-mono text-muted-foreground mt-1 flex items-center gap-2">
                                                        <span>{soldier.role}</span>
                                                        <span className="text-primary/50">|</span>
                                                        <span className="text-primary/80 uppercase">{soldier.specialization}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <span className={cn("text-[10px] font-bold px-2 py-0.5 border uppercase tracking-wide", getStatusColor(soldier.status))}>
                                                    {soldier.status}
                                                </span>
                                                {/* Health Bar */}
                                                <div className="w-24 h-1.5 bg-black/60 border border-white/10 mt-1 relative overflow-hidden">
                                                    <div
                                                        className={cn("h-full transition-all duration-500", soldier.hp < 40 ? "bg-red-500" : "bg-primary")}
                                                        style={{ width: `${soldier.hp}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Mission Brief */}
                    <Card>
                        <CardHeader className="bg-black/20">
                            <CardTitle className="font-heading uppercase tracking-wider flex items-center gap-2 text-sm text-muted-foreground">
                                <Target className="h-4 w-4" /> Current Objectives
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <Activity className="h-5 w-5 text-green-500 animate-pulse" />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold uppercase text-primary mb-1">Secure Sector 7G</h4>
                                    <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                                        Intel suggests increased activity in the northern perimeter. Recon unit required to establish observation post and report movement patterns. Heavy resistance expected near the supply depot.
                                    </p>
                                    <div className="mt-3 flex gap-2">
                                        <Button variant="tactical" size="sm" className="text-[10px] h-6 px-3">Review Intel</Button>
                                        <Button variant="outline" size="sm" className="text-[10px] h-6 px-3">Abort Mission</Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column (Tactical Map & Gear) */}
                <div className="space-y-6">
                    {/* Tactical Map */}
                    <Card className="h-[300px] relative overflow-hidden group bg-black">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black opacity-50" />

                        {/* Map Grid Animation */}
                        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(34,197,94,0.1)_25%,rgba(34,197,94,0.1)_26%,transparent_27%,transparent_74%,rgba(34,197,94,0.1)_75%,rgba(34,197,94,0.1)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(34,197,94,0.1)_25%,rgba(34,197,94,0.1)_26%,transparent_27%,transparent_74%,rgba(34,197,94,0.1)_75%,rgba(34,197,94,0.1)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />

                        {/* Radar Sweep */}
                        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(0,255,0,0.1)_360deg)] animate-[spin_4s_linear_infinite] opacity-30 rounded-full scale-150" />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <Map className="h-12 w-12 text-primary/30 mx-auto mb-2" />
                                <div className="font-heading uppercase text-primary/50 tracking-widest text-xs">Tactical View</div>
                                <div className="font-mono text-[10px] text-red-500 animate-pulse mt-1">LIVE_FEED OFF</div>
                            </div>
                        </div>

                        {/* Coordinates */}
                        <div className="absolute top-2 left-2 font-mono text-[10px] text-primary/60">
                            LAT: 34.55.21
                            <br />
                            LNG: 11.22.88
                        </div>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                        <CardHeader className="bg-black/20 pb-2">
                            <CardTitle className="font-heading uppercase tracking-wider text-xs">Unit Resources</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 pt-4">
                            {[
                                { label: "Ammunition", val: 75, color: "bg-primary" },
                                { label: "Fuel Reserves", val: 40, color: "bg-yellow-500" },
                                { label: "Med Supplies", val: 20, color: "bg-red-500" },
                            ].map((stat, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-mono uppercase text-muted-foreground">
                                        <span>{stat.label}</span>
                                        <span>{stat.val}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-black/60 border border-white/5">
                                        <div className={cn("h-full transition-all duration-1000", stat.color)} style={{ width: `${stat.val}%` }} />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
};

export default Unit;
