import { r as reactExports, b as useNavigate, g as useAdminAuth, j as jsxRuntimeExports, S as ShieldCheck, B as Button, L as Link, u as ue } from "./index-Djvn3v0p.js";
import { C as Card, a as CardContent } from "./card-BYxng7tC.js";
import { I as Input } from "./input-CE9166TT.js";
import { L as Label } from "./label-BYwFRBM8.js";
import { k as useAdminLogin } from "./useBackend-CWemGVNS.js";
import { m as motion } from "./proxy-BM4JqLts.js";
import { C as CircleAlert } from "./circle-alert-CDQ6zKhW.js";
import { E as EyeOff } from "./eye-off-BbGuHF6Q.js";
import { E as Eye } from "./eye-f5p77-IH.js";
import { L as LoaderCircle } from "./loader-circle-CQN-IIdU.js";
function AdminLoginPage() {
  const [loginId, setLoginId] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const navigate = useNavigate();
  const loginMutation = useAdminLogin();
  const { setAdmin } = useAdminAuth();
  const handleSubmit = async (e) => {
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
        ue.success("Welcome, Administrator!");
        navigate({ to: "/admin/dashboard" });
      } else {
        setError(
          "Invalid login credentials. Please check your login ID and password."
        );
      }
    } catch {
      setError("Login failed. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[80vh] bg-muted/30 flex items-center justify-center py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      className: "w-full max-w-md",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 28, className: "text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Admin Login" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Sign in to manage AR Computer Education" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
          error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CircleAlert,
              {
                size: 16,
                className: "text-destructive shrink-0 mt-0.5"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "space-y-4",
              "data-ocid": "admin-login-form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "loginId", children: "Login ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "loginId",
                      placeholder: "e.g. arcomputereducation.com",
                      value: loginId,
                      onChange: (e) => {
                        setLoginId(e.target.value);
                        setError("");
                      },
                      className: "mt-1.5",
                      autoComplete: "username",
                      "data-ocid": "admin-loginid-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "adminPassword", children: "Password" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "adminPassword",
                        type: showPassword ? "text" : "password",
                        placeholder: "Enter admin password",
                        value: password,
                        onChange: (e) => {
                          setPassword(e.target.value);
                          setError("");
                        },
                        autoComplete: "current-password",
                        "data-ocid": "admin-password-input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
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
                    className: "w-full bg-primary hover:bg-primary/90",
                    disabled: loginMutation.isPending,
                    "data-ocid": "admin-login-submit",
                    children: loginMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin mr-2" }),
                      " Signing in..."
                    ] }) : "Sign In as Admin"
                  }
                )
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/student/login",
            className: "hover:text-foreground transition-colors",
            children: "← Back to student login"
          }
        ) })
      ]
    }
  ) });
}
export {
  AdminLoginPage as default
};
