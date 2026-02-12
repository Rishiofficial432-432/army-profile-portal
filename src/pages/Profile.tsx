import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Sun, Moon, Trees, Linkedin, Instagram, Facebook, Twitter, Edit2, Save, X, Medal, Shield, Award, Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const rankBadgeColors: Record<string, string> = {
  Cadet: "bg-secondary text-secondary-foreground border-secondary-foreground/20",
  Soldier: "bg-primary/20 text-primary border-primary/50",
  Officer: "bg-accent/20 text-accent-foreground border-accent/50",
  Commander: "bg-primary text-primary-foreground border-primary",
};

// Mock data for service history
const serviceHistory = [
  { id: 1, date: "2024-05-12", mission: "Operation: Silent Echo", role: "Reconnaissance", status: "Completed" },
  { id: 2, date: "2024-03-15", mission: "Training: Highland Survival", role: "Trainee", status: "Passed" },
  { id: 3, date: "2024-01-10", mission: "Induction Ceremony", role: "Cadet", status: "Attended" },
];

const medals = [
  { id: 1, name: "Marksmanship Badge", icon: "🎯", color: "text-red-500" },
  { id: 2, name: "Physical Fitness Ribbon", icon: "💪", color: "text-yellow-500" },
  { id: 3, name: "Service Star", icon: "⭐", color: "text-blue-500" },
];

const Profile = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState(user?.bio || "");
  const [editingSocial, setEditingSocial] = useState(false);
  const [social, setSocial] = useState(user?.socialLinks || { linkedin: "", instagram: "", facebook: "", twitter: "" });

  if (!isAuthenticated || !user) return <Navigate to="/signin" replace />;

  const saveBio = () => {
    updateProfile({ bio });
    setEditingBio(false);
    toast({ title: "Bio Updated", description: "Your personnel record has been updated." });
  };

  const saveSocial = () => {
    updateProfile({ socialLinks: social });
    setEditingSocial(false);
    toast({ title: "Comms Updated", description: "Communication links updated securely." });
  };

  const handleThemeChange = (t: "light" | "dark" | "camo") => {
    setTheme(t);
    updateProfile({ theme: t });
  };

  const themes = [
    { key: "light" as const, label: "Light", icon: Sun },
    { key: "dark" as const, label: "Dark", icon: Moon },
    { key: "camo" as const, label: "Camo", icon: Trees },
  ];

  const socialPlatforms = [
    { key: "linkedin" as const, icon: Linkedin, label: "LinkedIn" },
    { key: "instagram" as const, icon: Instagram, label: "Instagram" },
    { key: "facebook" as const, icon: Facebook, label: "Facebook" },
    { key: "twitter" as const, icon: Twitter, label: "X (Twitter)" },
  ];

  return (
    <main className="container py-12 relative min-h-screen">
      {/* Secret Watermark */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center opacity-[0.03] z-0 -rotate-45">
        <span className="text-[15rem] font-heading font-black uppercase text-foreground">CONFIDENTIAL</span>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl space-y-8">

        {/* Header Record */}
        <div className="flex items-center justify-between border-b-2 border-primary/30 pb-4">
          <div>
            <h1 className="font-heading text-3xl font-bold uppercase tracking-widest text-primary">Personnel File // <span className="text-foreground">{user.name}</span></h1>
            <p className="text-xs font-mono text-muted-foreground mt-1 tracking-[0.2em]">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()} // SECURITY_LEVEL: 3</p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-xs font-mono text-primary/70">STATUS: ACTIVE_DUTY</div>
            <div className="text-xs font-mono text-muted-foreground">LAST_UPDATED: {new Date().toLocaleDateString().replace(/\//g, '.')}</div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-12">

          {/* LEFT COLUMN: IDENTITY */}
          <div className="md:col-span-4 space-y-6">
            <Card className="border-t-4 border-t-primary bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-mono text-lg uppercase text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" /> Identity
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center pb-8">
                <div className="relative h-40 w-40 mb-6 group">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20 group-hover:border-primary/50 transition-colors animate-pulse-slow"></div>
                  <div className="absolute inset-2 rounded-full border border-dashed border-primary/40 group-hover:rotate-180 transition-transform duration-[10s] linear"></div>
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-black/60 overflow-hidden relative">
                    {/* Scanline over pfp */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-scanline"></div>
                    <User className="h-20 w-20 text-primary/80" />
                  </div>
                  <div className="absolute bottom-0 right-4 bg-primary text-black text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    Verified
                  </div>
                </div>

                <div className="text-center w-full">
                  <div className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-1">Current Rank</div>
                  <div className={cn("inline-block border px-4 py-1 text-sm font-heading uppercase tracking-wider mb-4", rankBadgeColors[user.rank] || "bg-muted text-muted-foreground")}>
                    {user.rank}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-left w-full border-t border-primary/10 pt-4 mt-2">
                    <div className="text-muted-foreground">UNIT:</div>
                    <div className="text-right text-primary">ALPHA_CO_1st_BN</div>
                    <div className="text-muted-foreground">MOS:</div>
                    <div className="text-right text-primary">11B_INFANTRY</div>
                    <div className="text-muted-foreground">SVC_YEARS:</div>
                    <div className="text-right text-primary">02</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Theme Selector (Tactical Settings) */}
            <Card className="bg-black/40">
              <CardHeader>
                <CardTitle className="font-mono text-sm uppercase text-muted-foreground">Display_Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {themes.map((t) => (
                    <Button
                      key={t.key}
                      variant={theme === t.key ? "tactical" : "outline"}
                      size="sm"
                      className="flex flex-col gap-1 h-auto py-2 text-[10px]"
                      onClick={() => handleThemeChange(t.key)}
                    >
                      <t.icon className="h-3 w-3" />
                      {t.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: RECORDS */}
          <div className="md:col-span-8 space-y-6">

            {/* Bio Section */}
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-50"><FileText className="h-12 w-12 text-primary/10" /></div>
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div>
                  <CardTitle className="font-heading uppercase tracking-wider text-xl">Service Bio</CardTitle>
                  <p className="text-[10px] font-mono text-muted-foreground mt-1">PERSONAL_HISTORY_SUMMARY</p>
                </div>
                {!editingBio && (
                  <Button variant="ghost" size="sm" onClick={() => { setBio(user.bio); setEditingBio(true); }} className="text-xs h-8">
                    <Edit2 className="mr-1 h-3 w-3" /> EDIT_RECORD
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {editingBio ? (
                  <div className="space-y-3 bg-black/20 p-4 border border-primary/20 rounded-sm">
                    <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={5} placeholder="ENTER_SERVICE_HISTORY..." className="font-mono text-sm bg-black/60 border-primary/30 focus:border-primary" />
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline" onClick={() => setEditingBio(false)} className="h-7 text-xs"><X className="mr-1 h-3 w-3" /> ABORT</Button>
                      <Button size="sm" variant="tactical" onClick={saveBio} className="h-7 text-xs"><Save className="mr-1 h-3 w-3" /> UPDATE_RECORD</Button>
                    </div>
                  </div>
                ) : (
                  <div className="font-mono text-sm leading-relaxed text-muted-foreground p-4 border-l-2 border-primary/20 bg-primary/5 min-h-[100px]">
                    {user.bio ? (
                      <>
                        <span className="text-primary mr-2">{">"}</span>
                        {user.bio}
                        <span className="animate-pulse inline-block w-1.5 h-3 bg-primary ml-1 align-middle"></span>
                      </>
                    ) : (
                      <span className="text-muted-foreground/50 italic">NO DATA AVAILABLE. UPDATE REQUIRED.</span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Service History */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="font-heading uppercase tracking-wider text-xl flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" /> Service History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceHistory.map((item) => (
                    <div key={item.id} className="relative pl-6 border-l border-primary/20 pb-4 last:pb-0 last:border-0">
                      <div className="absolute top-1 left-[-4.5px] h-2 w-2 rounded-full bg-primary border-2 border-background"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                        <h4 className="font-heading uppercase tracking-wide text-sm font-semibold text-foreground">{item.mission}</h4>
                        <span className="font-mono text-[10px] text-muted-foreground">{item.date}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-muted-foreground font-mono">ROLE: {item.role}</span>
                        <span className={cn(
                          "text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm border",
                          item.status === "Completed" ? "border-green-800 text-green-500 bg-green-950/30" :
                            item.status === "Passed" ? "border-blue-800 text-blue-500 bg-blue-950/30" : "border-gray-700 text-gray-400 bg-gray-900/50"
                        )}>{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Awards & Medals */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="font-heading uppercase tracking-wider text-sm flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" /> Commendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {medals.map((medal) => (
                      <div key={medal.id} className="flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-2 rounded-sm" title={medal.name}>
                        <span className="text-lg">{medal.icon}</span>
                        <span className="text-xs font-heading uppercase leading-none">{medal.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social / Comms */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="font-heading uppercase tracking-wider text-sm">Secure Comms</CardTitle>
                  {!editingSocial && (
                    <Button variant="ghost" size="sm" onClick={() => { setSocial(user.socialLinks); setEditingSocial(true); }} className="h-6 text-[10px]">
                      <Edit2 className="mr-1 h-3 w-3" /> EDIT
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {editingSocial ? (
                    <div className="space-y-2">
                      {socialPlatforms.map((p) => (
                        <div key={p.key} className="flex items-center gap-2">
                          <p.icon className="h-3 w-3 text-muted-foreground" />
                          <Input
                            placeholder={`${p.label} LINK...`}
                            value={social[p.key]}
                            onChange={(e) => setSocial({ ...social, [p.key]: e.target.value })}
                            className="h-8 text-xs bg-black/40"
                          />
                        </div>
                      ))}
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="tactical" onClick={saveSocial} className="h-6 text-[10px] w-full">SAVE_LINKS</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {socialPlatforms.map((p) => {
                        const url = user.socialLinks[p.key];
                        return url ? (
                          <a key={p.key} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-sm border border-primary/20 bg-primary/5 px-2 py-2 text-xs text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:bg-primary/10">
                            <p.icon className="h-3 w-3" /> {p.label}
                          </a>
                        ) : null;
                      })}
                      {!Object.values(user.socialLinks).some(Boolean) && (
                        <p className="col-span-2 text-muted-foreground/50 text-xs italic text-center py-2">NO_LINKS_ESTABLISHED</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Profile;
