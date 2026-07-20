import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Bell,
  CalendarDays,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAdminAuth } from "../../hooks/useAuth";
import {
  useAdminDeleteNotice,
  useAdminPostNotice,
  useListNotices,
} from "../../hooks/useBackend";
import type { Notice, NoticeId } from "../../types";

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function ConfirmDeleteDialog({
  open,
  title,
  onConfirm,
  onCancel,
  isLoading,
}: {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card rounded-xl border border-border shadow-elevated p-6 max-w-sm w-full mx-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <Trash2 size={18} className="text-destructive" />
          </div>
          <h3 className="font-display font-semibold text-foreground">
            Delete Notice
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Are you sure you want to delete the notice{" "}
          <span className="font-semibold text-foreground">"{title}"</span>? This
          cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onConfirm}
            disabled={isLoading}
            data-ocid="confirm-delete-notice-btn"
          >
            {isLoading && <Loader2 size={14} className="animate-spin mr-2" />}
            Delete
          </Button>
          <Button variant="outline" className="flex-1" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminNoticesPage() {
  const { admin } = useAdminAuth();
  const loginId = admin?.loginId ?? "";
  const password = admin?.password ?? "";

  const { data: notices, isLoading } = useListNotices();
  const postMutation = useAdminPostNotice(loginId, password);
  const deleteMutation = useAdminDeleteNotice(loginId, password);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Notice | null>(null);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required.");
      return;
    }
    try {
      await postMutation.mutateAsync({
        title: title.trim(),
        content: content.trim(),
      });
      toast.success("Notice posted successfully!");
      setTitle("");
      setContent("");
      setOpen(false);
    } catch (err) {
      console.error("Failed to post notice:", err);
      toast.error("Failed to post notice. Please try again.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      const deleted = await deleteMutation.mutateAsync(
        deleteTarget.id as NoticeId,
      );
      if (!deleted) {
        toast.error("Notice could not be found. It may already be deleted.");
        setDeleteTarget(null);
        return;
      }
      toast.success("Notice deleted.");
      setDeleteTarget(null);
    } catch (err) {
      console.error("Failed to delete notice:", err);
      toast.error("Failed to delete notice.");
    }
  };

  return (
    <div>
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        title={deleteTarget?.title ?? ""}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleteMutation.isPending}
      />

      <section className="bg-card border-b border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                Notice Board
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Post and manage institute notices
              </p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  className="gap-2 bg-primary hover:bg-primary/90"
                  data-ocid="post-notice-btn"
                >
                  <Plus size={15} /> Post Notice
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="font-display">
                    Post New Notice
                  </DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handlePost}
                  className="space-y-4 mt-2"
                  data-ocid="post-notice-form"
                >
                  <div>
                    <Label htmlFor="ntitle">Title</Label>
                    <Input
                      id="ntitle"
                      placeholder="Notice title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1.5"
                      required
                      data-ocid="notice-title-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ncontent">Content</Label>
                    <Textarea
                      id="ncontent"
                      placeholder="Write the notice content here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={5}
                      className="mt-1.5 resize-none"
                      required
                      data-ocid="notice-content-input"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary/90"
                      disabled={postMutation.isPending}
                      data-ocid="notice-submit-btn"
                    >
                      {postMutation.isPending ? (
                        <>
                          <Loader2 size={14} className="animate-spin mr-2" />{" "}
                          Posting...
                        </>
                      ) : (
                        "Post Notice"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          {isLoading ? (
            <div className="space-y-4">
              {["sk1", "sk2", "sk3", "sk4"].map((k) => (
                <Skeleton key={k} className="h-24 rounded-xl" />
              ))}
            </div>
          ) : notices && notices.length > 0 ? (
            <div className="space-y-4">
              {notices.map((notice, i) => (
                <motion.div
                  key={notice.id.toString()}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card
                    className="border-border bg-card hover:shadow-subtle transition-smooth"
                    data-ocid={`notice-card-${notice.id}`}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Bell size={16} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-semibold text-foreground mb-1">
                                {notice.title}
                              </h3>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                                <CalendarDays size={11} />
                                <span>{formatDate(notice.postedAt)}</span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {notice.content}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                              onClick={() => setDeleteTarget(notice)}
                              data-ocid={`delete-notice-${notice.id}`}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
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
                Post your first notice to keep students informed.
              </p>
              <Button
                onClick={() => setOpen(true)}
                className="gap-2 bg-primary hover:bg-primary/90"
                data-ocid="empty-post-notice-btn"
              >
                <Plus size={15} /> Post First Notice
              </Button>
            </div>
          )}

          {notices && notices.length > 0 && (
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground p-3 bg-card rounded-lg border border-border">
              <AlertCircle size={13} />
              <span>
                Notices are visible to all students and visitors on the public
                notice board.
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
