import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Menu, X, Shield, Sun, Moon, Trees } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, signOut, user } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const themeIcons = { light: Sun, dark: Moon, camo: Trees };
  const nextTheme = { light: "dark" as const, dark: "camo" as const, camo: "light" as const };
  const ThemeIcon = themeIcons[theme];

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-primary/20 bg-black/80 backdrop-blur-md supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2 group">
          <div className="relative flex h-8 w-8 items-center justify-center bg-primary/20 border border-primary/50 rounded-sm group-hover:bg-primary/40 transition-colors">
            <div className="absolute inset-0 bg-primary/20 blur-sm group-hover:blur-md transition-all"></div>
            <Shield className="h-5 w-5 text-primary relative z-10" />
          </div>
          <div className="flex flex-col">
            <span className="hidden font-heading font-bold uppercase tracking-widest sm:inline-block leading-none text-lg text-primary text-shadow-sm">
              Army Portal
            </span>
            <span className="text-[10px] text-muted-foreground tracking-[0.2em] font-mono leading-none">
              SECURE_NET_V.4.2
            </span>
          </div>
        </Link>
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {/* Nav Links as "Tabs" */}
          {["Dashboard", "Operations"].map((item) => (
            <Link key={item} to="#" className="relative px-3 py-1 text-muted-foreground hover:text-primary transition-colors font-heading tracking-wider uppercase group overflow-hidden">
              <span className="relative z-10">{item}</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              <span className="absolute inset-0 bg-primary/5 transform -skew-x-12 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Link>
          ))}
          <Link to="/units" className="relative px-3 py-1 text-muted-foreground hover:text-primary transition-colors font-heading tracking-wider uppercase group overflow-hidden">
            <span className="relative z-10">Units</span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            <span className="absolute inset-0 bg-primary/5 transform -skew-x-12 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </Link>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-primary/60 border-r border-primary/20 pr-4">
            <span>SYS: ONLINE</span>
            <span>NET: SECURE</span>
            <span className="animate-pulse text-green-500">●</span>
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono text-muted-foreground hidden md:inline-block">
                CMD: {user?.name}
              </span>
              <Button
                variant="tactical"
                size="sm"
                onClick={signOut}
                className="hover:bg-destructive/20 hover:text-destructive hover:border-destructive/50"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/signin">
                <Button variant="ghost" size="sm" className="font-heading uppercase tracking-wide hover:bg-primary/10 hover:text-primary">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="tactical" size="sm">
                  Join
                </Button>
              </Link>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(nextTheme[theme])}
            title={`Switch to ${nextTheme[theme]} theme`}
            className="ml-2"
          >
            <ThemeIcon className="h-4 w-4" />
          </Button>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setTheme(nextTheme[theme])}>
              <ThemeIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-card p-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>
                <Button variant={isActive(link.to) ? "default" : "ghost"} className="w-full justify-start font-heading uppercase tracking-wide">
                  {link.label}
                </Button>
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setMobileOpen(false)}>
                  <Button variant={isActive("/profile") ? "default" : "ghost"} className="w-full justify-start font-heading uppercase tracking-wide">
                    Profile
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => { signOut(); setMobileOpen(false); }} className="w-full justify-start font-heading uppercase tracking-wide">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start font-heading uppercase tracking-wide">Sign In</Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)}>
                  <Button variant="default" className="w-full justify-start font-heading uppercase tracking-wide">Join</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
