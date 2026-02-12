import React from "react";
import { Link } from "react-router-dom";
import { Shield, Radio, Activity, Lock } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-primary/20 bg-background pt-12 text-sm">
      <div className="container pb-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-heading text-lg font-bold uppercase tracking-tight">Army Profile Portal</span>
            </div>
            <p className="text-muted-foreground">
              Secure personnel management system. Unauthorized access is prohibited and punishable by military law.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-heading font-semibold uppercase tracking-wider text-primary">System Status</h3>
            <ul className="space-y-2 text-muted-foreground font-mono text-xs">
              <li className="flex items-center gap-2">
                <Radio className="h-3 w-3 text-green-500" />
                <span>COMMS: ONLINE</span>
              </li>
              <li className="flex items-center gap-2">
                <Activity className="h-3 w-3 text-green-500" />
                <span>DB_SYNC: ACTIVE</span>
              </li>
              <li className="flex items-center gap-2">
                <Lock className="h-3 w-3 text-yellow-500" />
                <span>SEC_LEVEL: ALPHA</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-heading font-semibold uppercase tracking-wider text-primary">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="#" className="hover:text-primary transition-colors">Mission Dashboard</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Personnel Directory</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Unit Logistics</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-heading font-semibold uppercase tracking-wider text-primary">Legal</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Code of Conduct</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-primary/10 bg-black/20 py-4">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row font-mono text-xs text-muted-foreground/50 uppercase">
          <p>© 2024 Army Profile Portal. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Server: US-EAST-MIL-01</span>
            <span>Ver: 4.2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
