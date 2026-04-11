import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

interface NavigateProps {
  to: string;
}

/** Programmatic redirect component — renders nothing, navigates on mount. */
export function Navigate({ to }: NavigateProps) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to });
  }, [navigate, to]);
  return null;
}
