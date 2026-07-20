import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

export function ConfirmDeleteDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  isLoading = false,
  confirmLabel = "Delete",
  confirmOcid,
}: {
  open: boolean;
  title: string;
  description: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  confirmLabel?: string;
  confirmOcid?: string;
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
            {title}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">{description}</p>
        <div className="flex gap-3">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onConfirm}
            disabled={isLoading}
            data-ocid={confirmOcid}
          >
            {isLoading && <Loader2 size={14} className="animate-spin mr-2" />}
            {confirmLabel}
          </Button>
          <Button variant="outline" className="flex-1" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
