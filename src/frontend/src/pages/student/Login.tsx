import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Eye, EyeOff, GraduationCap, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useStudentAuth } from "../../hooks/useAuth";
import { useStudentLogin } from "../../hooks/useBackend";

export default function StudentLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loginMutation = useStudentLogin();
  const { setStudent } = useStudentAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }

    try {
      const result = await loginMutation.mutateAsync({
        username: username.trim(),
        password,
      });
      if (result) {
        setStudent({
          studentId: result.id,
          username: result.username,
          name: result.name,
          isAuthenticated: true,
        });
        toast.success(`Welcome back, ${result.name}!`);
        navigate({ to: "/student/dashboard" });
      } else {
        setError(
          "Invalid username or password. Please check your credentials and try again.",
        );
      }
    } catch (err) {
      console.error("Student login request failed:", err);
      setError("Login failed. Please try again later.");
    }
  };

  return (
    <div className="min-h-[80vh] bg-muted/30 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4 shadow-elevated">
            <GraduationCap size={28} className="text-accent-foreground" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Student Portal
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Sign in to your AR Computer Education account
          </p>
        </div>

        <Card className="border-border shadow-elevated">
          <CardContent className="p-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2"
                data-ocid="student-login-error"
              >
                <AlertCircle
                  size={16}
                  className="text-destructive shrink-0 mt-0.5"
                />
                <p className="text-sm text-destructive">{error}</p>
              </motion.div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-ocid="student-login-form"
            >
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  className="mt-1.5"
                  autoComplete="username"
                  autoFocus
                  data-ocid="student-username-input"
                />
              </div>

              <div>
                <Label htmlFor="studentPassword">Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="studentPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    autoComplete="current-password"
                    data-ocid="student-password-input"
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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
                className="w-full"
                disabled={loginMutation.isPending}
                data-ocid="student-login-submit"
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Sign In to Student Portal"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-4 text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            Your username and password are provided by the institute.
          </p>
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/admission"
              className="text-primary hover:underline font-medium"
            >
              Apply for admission
            </Link>
          </p>
          <p className="text-xs text-muted-foreground">
            <Link
              to="/admin/login"
              className="hover:text-foreground transition-colors"
            >
              Admin? Sign in here →
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
