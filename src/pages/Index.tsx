import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Target, Users, Activity, Lock, Database, Search, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { LaserFlow } from "@/components/ui/LaserFlow";

const MissionLog = ({ encrypted }: { encrypted?: boolean }) => {
  const logs = [
    { time: "0800", event: "SYSTEM_INIT", status: "OK" },
    { time: "0805", event: "NET_SECURE", status: "VERIFIED" },
    { time: "0815", event: "SAT_UPLINK", status: "ESTABLISHED" },
    { time: "0830", event: "USER_AUTH", status: "PENDING" },
  ];

  return (
    <div className="h-48 w-full overflow-hidden rounded-sm border border-primary/20 bg-black/40 p-4 font-mono text-xs">
      <div className="mb-2 flex items-center justify-between border-b border-primary/20 pb-2 text-primary/50">
        <span>MISSION_LOG_V.1.0</span>
        <span className={encrypted ? "text-red-500 animate-pulse" : "text-green-500"}>
          {encrypted ? "NO_SIGNAL" : "LIVE_FEED"}
        </span>
      </div>
      <div className="space-y-1">
        {encrypted ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="flex justify-between text-muted-foreground/30 animate-pulse">
              <span>{Math.floor(Math.random() * 2400).toString().padStart(4, '0')}</span>
              <span>ENCRYPTED_DATA_PACKET_{i}....[LOCKED]</span>
              <span>ERR_403</span>
            </div>
          ))
        ) : (
          logs.map((log, i) => (
            <div key={i} className="flex justify-between text-muted-foreground">
              <span className="text-primary/70">[{log.time}]</span>
              <span>{log.event}</span>
              <span className="text-primary">{log.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Radar = () => (
  <div className="relative h-32 w-32 rounded-full border-2 border-primary/30 bg-black/20">
    <div className="absolute inset-0 animate-[spin_4s_linear_infinite] border-r-2 border-primary/50 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-full" />
    <div className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-primary shadow-[0_0_10px_#E6C25B]" />
    <div className="absolute left-1/4 top-1/4 h-1 w-1 rounded-full bg-red-500 animate-pulse" />
  </div>
);

const BriefingCard = ({ title, status, classification, children, locked }: { title: string; status: string; classification: string; children: React.ReactNode, locked?: boolean }) => (
  <Card className="group relative overflow-hidden border-primary/20 bg-black/40 backdrop-blur-sm transition-all hover:border-primary/50">
    <div className="absolute -right-12 -top-12 h-24 w-24 rotate-45 bg-primary/5 transition-all group-hover:bg-primary/10" />
    <CardHeader className="border-b border-primary/10 pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="font-heading text-lg tracking-wider text-primary">{title}</CardTitle>
        <div className={`rounded-sm px-2 py-0.5 text-[10px] font-bold ${locked ? 'bg-red-900/20 text-red-500 border border-red-900/50' : 'bg-primary/10 text-primary border border-primary/20'}`}>
          {status}
        </div>
      </div>
      <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
        Classification: {classification}
      </p>
    </CardHeader>
    <CardContent className="pt-4 relative">
      {locked && (
        <div className="absolute inset-0 backdrop-blur-md flex items-center justify-center z-10 bg-black/20">
          <div className="border-2 border-red-500/50 p-4 rounded-sm rotate-[-12deg] bg-black/80">
            <h3 className="font-heading text-2xl text-red-500 font-bold tracking-widest uppercase border-4 border-red-500/50 p-2 text-center">
              Classified<br />Access Denied
            </h3>
          </div>
        </div>
      )}
      <div className={locked ? "blur-sm opacity-50 select-none" : ""}>
        {children}
      </div>
    </CardContent>
  </Card>
);

const TacGrid = () => (
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e1a_1px,transparent_1px),linear-gradient(to_bottom,#22c55e1a_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
);

const Scanline = () => (
  <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat opacity-20" />
);

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Scanline />

      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden pt-16">
        <TacGrid />

        {/* LaserFlow Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
          <LaserFlow
            color="#E6C25B"
            flowSpeed={0.2}
            wispSpeed={10}
            fogIntensity={0.6}
          />
        </div>

        <div className="container relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column: Text & CTA */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="font-mono tracking-wider text-xs">SECURE_CONNECTION_ESTABLISHED</span>
            </div>

            <h1 className="font-heading text-5xl font-bold uppercase leading-none tracking-tighter sm:text-7xl lg:text-8xl text-shadow-glow">
              Army<br />
              <span className="text-secondary-foreground text-stroke-primary">Profile</span><br />
              Portal
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-muted-foreground lg:mx-0 font-mono leading-relaxed">
              // WELCOME_SOLDIER <br />
              Advanced personnel management and tactical operations center. Secure your data. Track your progress.
              {isAuthenticated && <span className="block mt-2 text-primary">Status: CLEARANCE_LEVEL_3_GRANTED</span>}
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              {isAuthenticated ? (
                <>
                  <Link to="/profile">
                    <Button size="lg" variant="tactical" className="h-14 px-8 text-lg">
                      <Target className="mr-2 h-5 w-5" /> Access Dossier
                    </Button>
                  </Link>
                  <Link to="/units">
                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg hover:bg-primary/20 hover:text-primary border-primary/50">
                      <Users className="mr-2 h-5 w-5" /> Unit Ops
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" variant="tactical" className="h-14 px-8 text-lg group">
                      Initialize Profile <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/signin">
                    <Button size="lg" variant="ghost" className="h-14 px-8 text-lg hover:bg-primary/10">
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Tactical Display */}
          <div className="relative mx-auto w-full max-w-lg lg:mx-0">
            {/* Decorative HUD Elements */}
            <div className="absolute -left-8 top-1/2 h-24 w-1 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden lg:block"></div>
            <div className="absolute -right-8 top-1/3 h-32 w-1 bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden lg:block"></div>

            <div className="grid gap-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <MissionLog encrypted={!isAuthenticated} />
                </div>
                <div className="flex items-center justify-center">
                  <Radar />
                </div>
              </div>

              <BriefingCard title="Active Operation" status={isAuthenticated ? "IN_PROGRESS" : "CLASSIFIED"} classification={isAuthenticated ? "SECRET" : "TOP_SECRET"} locked={!isAuthenticated}>
                {isAuthenticated ? (
                  <div className="space-y-2 text-sm text-muted-foreground font-mono">
                    <p className="flex justify-between"><span className="text-primary">OBJ:</span> <span>RECON_SECTOR_7</span></p>
                    <p className="flex justify-between"><span className="text-primary">E.T.A:</span> <span>0600_HOURS</span></p>
                    <p className="flex justify-between"><span className="text-primary">INTEL:</span> <span>GATHERING...</span></p>
                    <div className="mt-2 h-1 w-full bg-black/40 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-2/3 animate-pulse"></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm text-muted-foreground font-mono blur-sm opacity-50">
                    <p>OBJ: **********</p>
                    <p>LOC: **********</p>
                    <p>INTEL: **********</p>
                  </div>
                )}
              </BriefingCard>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-primary/50">
          <ChevronRight className="h-8 w-8 rotate-90" />
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="container py-24">
        <div className="mb-12 text-center">
          <span className="text-xs font-mono text-primary/60 tracking-[0.3em] uppercase mb-2 block">System Capabilities</span>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-wider md:text-4xl text-foreground">
            Tactical <span className="text-primary">Features</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: Shield, title: "Secure Database", desc: "Military-grade encryption for all personnel records." },
            { icon: Target, title: "Mission Tracking", desc: "Real-time updates on squadron objectives and status." },
            { icon: Database, title: "Archive Access", desc: "Complete history of service records and commendations." },
          ].map((feature, i) => (
            <Card key={i} className="bg-black/40 border-primary/20 hover:border-primary/60 transition-colors group">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="font-heading uppercase tracking-wide">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
