import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
  /** When true, removes header/footer for auth pages or full-bleed layouts */
  bare?: boolean;
}

export function Layout({ children, bare = false }: LayoutProps) {
  if (bare) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {children}
        <Toaster richColors position="top-right" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}

/** Admin layout with sidebar-ready structure */
interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 bg-muted/30">
        {title && (
          <div className="bg-card border-b border-border">
            <div className="container mx-auto px-4 py-4">
              <h1 className="font-display font-bold text-xl text-foreground">
                {title}
              </h1>
            </div>
          </div>
        )}
        <div className="container mx-auto px-4 py-6">{children}</div>
      </div>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
