import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail } from "lucide-react";

const faqs = [
  { q: "How do I create an account?", a: "Click 'Join' or 'Enlist Now' on the home page and fill out the registration form with your details and preferred rank." },
  { q: "Is my data secure?", a: "All data is stored locally in your browser. No data is transmitted to external servers." },
  { q: "Can I change my rank later?", a: "Currently, rank is set during registration. Future updates will allow rank modifications through the profile page." },
  { q: "How does the theme switcher work?", a: "Click the theme icon in the navigation bar to cycle through Light, Dark, and Camo themes. Your preference is saved automatically." },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.message.trim()) e.message = "Message is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    toast({ title: "Message Received!", description: "We'll respond to your inquiry within 24 hours." });
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  };

  return (
    <main className="container py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-center font-heading text-4xl font-bold uppercase tracking-tight">Contact HQ</h1>
        <p className="mb-12 text-center text-muted-foreground">Have questions? Send us a message or check the FAQ below.</p>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="font-heading uppercase">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                  {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                </div>
                <Button type="submit" className="w-full font-heading uppercase tracking-wide">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardContent className="space-y-4 p-6">
                <h3 className="font-heading text-lg font-bold uppercase">Base Info</h3>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Fort Liberty, North Carolina, USA</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Phone className="mt-0.5 h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">+1 (910) 555-0199</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Mail className="mt-0.5 h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">contact@armyhq.mil</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="mb-6 text-center font-heading text-2xl font-bold uppercase">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="mx-auto max-w-2xl">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="font-heading text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </main>
  );
};

export default Contact;
