import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Admission", href: "/admission" },
  { label: "Track Status", href: "/admission/status" },
  { label: "Contact Us", href: "/contact" },
];

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center font-display font-bold text-lg">
                AR
              </div>
              <div>
                <div className="font-display font-bold text-lg leading-tight">
                  AR Computer
                </div>
                <div className="text-sm text-primary-foreground/70">
                  Education
                </div>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/75 leading-relaxed">
              Empowering students with digital skills and professional computer
              education since our founding.
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/25 flex items-center justify-center transition-smooth"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-semibold text-base mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-sm text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-display font-semibold text-base mb-4">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                <p className="text-sm text-primary-foreground/75">
                  Kodaldhowa Ward no 2, Fakiragram, Kokrajhar, Assam — 783345
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-accent" />
                <a
                  href="tel:+916002880939"
                  className="text-sm text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                >
                  +91 6002880939
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-accent" />
                <a
                  href="mailto:arcomputer.education0@gmail.com"
                  className="text-sm text-primary-foreground/75 hover:text-primary-foreground transition-colors break-all"
                >
                  arcomputer.education0@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-primary-foreground/60">
          <span>© {year} AR Computer Education. All Rights Reserved.</span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-foreground/90 transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
