import { r as reactExports, b as useNavigate, d as useStudentAuth, j as jsxRuntimeExports, G as GraduationCap, B as Button, L as Link, u as ue } from "./index-Djvn3v0p.js";
import { C as Card, a as CardContent } from "./card-BYxng7tC.js";
import { I as Input } from "./input-CE9166TT.js";
import { L as Label } from "./label-BYwFRBM8.js";
import { d as useStudentLogin } from "./useBackend-CWemGVNS.js";
import { m as motion } from "./proxy-BM4JqLts.js";
import { C as CircleAlert } from "./circle-alert-CDQ6zKhW.js";
import { E as EyeOff } from "./eye-off-BbGuHF6Q.js";
import { E as Eye } from "./eye-f5p77-IH.js";
import { L as LoaderCircle } from "./loader-circle-CQN-IIdU.js";
function StudentLoginPage() {
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const navigate = useNavigate();
  const loginMutation = useStudentLogin();
  const { setStudent } = useStudentAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }
    try {
      const result = await loginMutation.mutateAsync({
        username: username.trim(),
        password
      });
      if (result) {
        setStudent({
          studentId: result.id,
          username: result.username,
          name: result.name,
          isAuthenticated: true
        });
        ue.success(`Welcome back, ${result.name}!`);
        navigate({ to: "/student/dashboard" });
      } else {
        setError(
          "Invalid username or password. Please check your credentials and try again."
        );
      }
    } catch {
      setError("Login failed. Please try again later.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[80vh] bg-muted/30 flex items-center justify-center py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: "easeOut" },
      className: "w-full max-w-md",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { size: 28, className: "text-accent-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Student Portal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Sign in to your AR Computer Education account" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
          error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              className: "mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2",
              "data-ocid": "student-login-error",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleAlert,
                  {
                    size: 16,
                    className: "text-destructive shrink-0 mt-0.5"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "space-y-4",
              "data-ocid": "student-login-form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "username", children: "Username" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "username",
                      placeholder: "Enter your username",
                      value: username,
                      onChange: (e) => {
                        setUsername(e.target.value);
                        setError("");
                      },
                      className: "mt-1.5",
                      autoComplete: "username",
                      autoFocus: true,
                      "data-ocid": "student-username-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "studentPassword", children: "Password" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "studentPassword",
                        type: showPassword ? "text" : "password",
                        placeholder: "Enter your password",
                        value: password,
                        onChange: (e) => {
                          setPassword(e.target.value);
                          setError("");
                        },
                        autoComplete: "current-password",
                        "data-ocid": "student-password-input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "aria-label": showPassword ? "Hide password" : "Show password",
                        className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                        onClick: () => setShowPassword((v) => !v),
                        children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    size: "lg",
                    className: "w-full",
                    disabled: loginMutation.isPending,
                    "data-ocid": "student-login-submit",
                    children: loginMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin mr-2" }),
                      "Signing in..."
                    ] }) : "Sign In to Student Portal"
                  }
                )
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-center space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your username and password are provided by the institute." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Don't have an account?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/admission",
                className: "text-primary hover:underline font-medium",
                children: "Apply for admission"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/admin/login",
              className: "hover:text-foreground transition-colors",
              children: "Admin? Sign in here →"
            }
          ) })
        ] })
      ]
    }
  ) });
}
export {
  StudentLoginPage as default
};
