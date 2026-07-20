import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { Bell, CalendarDays, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { useListNotices } from "../hooks/useBackend";
import { formatTimestamp } from "../lib/format";

export default function NoticesPage() {
  const { data: notices, isLoading } = useListNotices();

  return (
    <div>
      <section className="bg-card border-b border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display font-bold text-4xl text-foreground mb-3">
              Notice Board
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Stay updated with the latest announcements, events, and
              information from AR Computer Education.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {isLoading ? (
            <div className="space-y-4">
              {["sk1", "sk2", "sk3", "sk4"].map((k) => (
                <Card key={k} className="border-border">
                  <CardContent className="p-5">
                    <Skeleton className="h-5 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-1/3 mb-3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5 mt-1" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : notices && notices.length > 0 ? (
            <div className="space-y-4">
              {notices.map((notice, i) => (
                <motion.div
                  key={notice.id.toString()}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Card
                    className="border-border hover:shadow-subtle transition-smooth"
                    data-ocid={`notice-card-${notice.id}`}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Bell size={16} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                            {notice.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                            <CalendarDays size={11} />
                            <span>{formatTimestamp(notice.postedAt)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {notice.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Bell
                size={48}
                className="mx-auto text-muted-foreground/30 mb-4"
              />
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                No Notices Yet
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Check back soon for updates from AR Computer Education.
              </p>
              <Link to="/admission">
                <Button
                  variant="outline"
                  className="gap-2"
                  data-ocid="notices-apply-cta"
                >
                  <GraduationCap size={16} /> Apply for Admission
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
