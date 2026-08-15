import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Barcode, LogOut, Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import { useAdminAuth, useStudentAuth } from "../hooks/useAuth";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Workflow", href: "/#workflow" },
  { label: "Setup Help", href: "/contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { pathname } = useRouterState({ select: (s) => s.location });
  const { admin, clearAdmin } = useAdminAuth();
  const { student, clearStudent } = useStudentAuth();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle"
      data-ocid="header-nav"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-subtle group-hover:shadow-elevated transition-smooth">
              <Barcode size={18} className="text-primary-foreground" />
            </div>
            <div className="leading-none">
              <div className="font-display font-bold text-foreground text-base">
                Mobile POS
              </div>
              <div className="text-xs text-muted-foreground tracking-wide">
                Excel to app
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          {!isMobile && (
            <nav className="flex items-center gap-1">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  to={href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive(href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  }`}
                  data-ocid={`nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          )}

          {/* Auth actions */}
          <div className="flex items-center gap-2">
            {admin?.isAuthenticated ? (
              <div className="flex items-center gap-2">
                {!isMobile && (
                  <Link to="/admin/dashboard">
                    <Button size="sm" variant="ghost" className="gap-1.5">
                      <ShieldCheck size={14} />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearAdmin}
                  className="gap-1.5 text-destructive hover:text-destructive"
                  data-ocid="admin-logout-btn"
                >
                  <LogOut size={14} />
                  {!isMobile && "Logout"}
                </Button>
              </div>
            ) : student?.isAuthenticated ? (
              <div className="flex items-center gap-2">
                {!isMobile && (
                  <Link to="/student/dashboard">
                    <Button size="sm" variant="ghost" className="gap-1.5">
                      <Barcode size={14} />
                      {student.name.split(" ")[0]}
                    </Button>
                  </Link>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearStudent}
                  className="gap-1.5 text-destructive hover:text-destructive"
                  data-ocid="student-logout-btn"
                >
                  <LogOut size={14} />
                  {!isMobile && "Logout"}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/student/login">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5"
                    data-ocid="student-login-btn"
                  >
                    <Barcode size={14} />
                    {!isMobile && "Team Login"}
                    {isMobile && "Login"}
                  </Button>
                </Link>
                {!isMobile && (
                  <>
                    <Link to="/admin/login">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1.5 text-muted-foreground hover:text-foreground"
                        data-ocid="admin-login-btn"
                      >
                        <ShieldCheck size={14} />
                        Admin
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button
                        size="sm"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground gap-1.5"
                        data-ocid="apply-now-btn"
                      >
                        Get Setup Guide
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            )}

            {/* Mobile menu toggle */}
            {isMobile && (
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                data-ocid="mobile-menu-toggle"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile nav */}
        {isMobile && menuOpen && (
          <nav
            className="py-3 border-t border-border animate-slide-down"
            data-ocid="mobile-nav"
          >
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors mb-0.5 ${
                  isActive(href)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-border space-y-2">
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                <Button
                  size="sm"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  data-ocid="mobile-apply-btn"
                >
                  Get setup guide
                </Button>
              </Link>
              {!admin?.isAuthenticated && !student?.isAuthenticated && (
                <Link to="/admin/login" onClick={() => setMenuOpen(false)}>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full gap-1.5 text-muted-foreground"
                    data-ocid="mobile-admin-login-btn"
                  >
                    <ShieldCheck size={14} />
                    Admin Login
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
