import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { AlertCircle, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAdminAuth } from "../../hooks/useAuth";
import { useAdminLogin } from "../../hooks/useBackend";

export default function AdminLoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loginMutation = useAdminLogin();
  const { setAdmin } = useAdminAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!loginId || !password) {
      setError("Please enter login ID and password.");
      return;
    }

    try {
      const isValid = await loginMutation.mutateAsync({ loginId, password });
      if (isValid) {
        setAdmin({ loginId, password, isAuthenticated: true });
        toast.success("Welcome, Administrator!");
        navigate({ to: "/admin/dashboard" });
      } else {
        setError(
          "Invalid login credentials. Please check your login ID and password.",
        );
      }
    } catch {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[80vh] bg-muted/30 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-elevated">
            <ShieldCheck size={28} className="text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Admin Login
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Sign in to manage AR Computer Education
          </p>
        </div>

        <Card className="border-border shadow-elevated">
          <CardContent className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
                <AlertCircle
                  size={16}
                  className="text-destructive shrink-0 mt-0.5"
                />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-ocid="admin-login-form"
            >
              <div>
                <Label htmlFor="loginId">Login ID</Label>
                <Input
                  id="loginId"
                  placeholder="e.g. arcomputereducation.com"
                  value={loginId}
                  onChange={(e) => {
                    setLoginId(e.target.value);
                    setError("");
                  }}
                  className="mt-1.5"
                  autoComplete="username"
                  data-ocid="admin-loginid-input"
                />
              </div>
              <div>
                <Label htmlFor="adminPassword">Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="adminPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    autoComplete="current-password"
                    data-ocid="admin-password-input"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loginMutation.isPending}
                data-ocid="admin-login-submit"
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" /> Signing
                    in...
                  </>
                ) : (
                  "Sign In as Admin"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">
          <Link
            to="/student/login"
            className="hover:text-foreground transition-colors"
          >
            ← Back to student login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
