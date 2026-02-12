import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Target, Users, Award, Clock, Star } from "lucide-react";

const team = [
  { name: "Gen. Marcus Stone", role: "Commanding Officer", desc: "25 years of distinguished service leading tactical operations worldwide." },
  { name: "Col. Sarah Chen", role: "Operations Lead", desc: "Specialist in strategic planning and multi-domain operations." },
  { name: "Maj. James Rivera", role: "Training Director", desc: "Expert in personnel development and combat readiness programs." },
  { name: "Capt. Aisha Patel", role: "Communications Officer", desc: "Cybersecurity specialist ensuring secure comms across all channels." },
];

const timeline = [
  { year: "2020", title: "Platform Founded", desc: "ArmyHQ was established to connect service members digitally." },
  { year: "2021", title: "Unit Network Launch", desc: "Expanded to support full unit networking and profile customization." },
  { year: "2023", title: "Global Reach", desc: "Serving thousands of active-duty and veteran personnel worldwide." },
  { year: "2025", title: "Next-Gen Platform", desc: "Rebuilt with modern tech for faster, more secure operations." },
];

const About = () => (
  <main>
    {/* Mission */}
    <section className="border-b">
      <div className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Shield className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h1 className="font-heading text-4xl font-bold uppercase tracking-tight">Our Mission</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            To provide a modern, secure platform that empowers service members to connect, build their professional profiles, and uphold the values of Duty, Honor, and Country in the digital age.
          </p>
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="container py-20">
      <h2 className="mb-12 text-center font-heading text-3xl font-bold uppercase tracking-tight">Command Staff</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m) => (
          <Card key={m.name} className="text-center transition-shadow hover:shadow-lg">
            <CardContent className="p-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold">{m.name}</h3>
              <p className="text-sm font-semibold text-accent">{m.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>

    {/* Timeline */}
    <section className="border-t bg-card">
      <div className="container py-20">
        <h2 className="mb-12 text-center font-heading text-3xl font-bold uppercase tracking-tight">Our History</h2>
        <div className="mx-auto max-w-2xl space-y-8">
          {timeline.map((t, i) => (
            <div key={t.year} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-heading text-sm font-bold">
                  {t.year.slice(2)}
                </div>
                {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-border mt-2" />}
              </div>
              <div className="pb-8">
                <h3 className="font-heading text-lg font-bold">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default About;
