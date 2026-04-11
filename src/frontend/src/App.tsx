import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { Navigate } from "./components/Navigate";
import { useAdminAuth, useStudentAuth } from "./hooks/useAuth";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/Home"));
const CoursesPage = lazy(() => import("./pages/Courses"));
const AdmissionPage = lazy(() => import("./pages/Admission"));
const AdmissionStatusPage = lazy(() => import("./pages/AdmissionStatus"));
const ContactPage = lazy(() => import("./pages/Contact"));
const NoticesPage = lazy(() => import("./pages/Notices"));

const StudentLoginPage = lazy(() => import("./pages/student/Login"));
const StudentDashboardPage = lazy(() => import("./pages/student/Dashboard"));

const AdminLoginPage = lazy(() => import("./pages/admin/Login"));
const AdminDashboardPage = lazy(() => import("./pages/admin/Dashboard"));
const AdminStudentsPage = lazy(() => import("./pages/admin/Students"));
const AdminApplicationsPage = lazy(() => import("./pages/admin/Applications"));
const AdminCertificatesPage = lazy(() => import("./pages/admin/Certificates"));
const AdminNoticesPage = lazy(() => import("./pages/admin/Notices"));
const AdminLeavePage = lazy(() => import("./pages/admin/Leave"));

function PageSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

function StudentGuard() {
  const { isStudentAuthenticated } = useStudentAuth();
  if (!isStudentAuthenticated) return <Navigate to="/student/login" />;
  return (
    <PageSuspense>
      <Outlet />
    </PageSuspense>
  );
}

function AdminGuard() {
  const { isAdminAuthenticated } = useAdminAuth();
  if (!isAdminAuthenticated) return <Navigate to="/admin/login" />;
  return (
    <PageSuspense>
      <Outlet />
    </PageSuspense>
  );
}

// /admin redirect — goes to dashboard if authenticated, login otherwise
function AdminRedirect() {
  const { isAdminAuthenticated } = useAdminAuth();
  return (
    <Navigate to={isAdminAuthenticated ? "/admin/dashboard" : "/admin/login"} />
  );
}

// Root route with Layout wrapper
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <PageSuspense>
        <Outlet />
      </PageSuspense>
    </Layout>
  ),
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <HomePage />,
});
const coursesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/courses",
  component: () => <CoursesPage />,
});
const admissionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admission",
  component: () => <AdmissionPage />,
});
const admissionStatusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admission/status",
  component: () => <AdmissionStatusPage />,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => <ContactPage />,
});
const noticesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notices",
  component: () => <NoticesPage />,
});

// Auth-guarded parent routes
const studentProtectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "student-protected",
  component: StudentGuard,
});
const adminProtectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin-protected",
  component: AdminGuard,
});

// Student routes
const studentLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/login",
  component: () => <StudentLoginPage />,
});
const studentDashboardRoute = createRoute({
  getParentRoute: () => studentProtectedRoute,
  path: "/student/dashboard",
  component: () => <StudentDashboardPage />,
});

// Admin routes
const adminIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminRedirect,
});
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: () => <AdminLoginPage />,
});
const adminDashboardRoute = createRoute({
  getParentRoute: () => adminProtectedRoute,
  path: "/admin/dashboard",
  component: () => <AdminDashboardPage />,
});
const adminStudentsRoute = createRoute({
  getParentRoute: () => adminProtectedRoute,
  path: "/admin/students",
  component: () => <AdminStudentsPage />,
});
const adminApplicationsRoute = createRoute({
  getParentRoute: () => adminProtectedRoute,
  path: "/admin/applications",
  component: () => <AdminApplicationsPage />,
});
const adminCertificatesRoute = createRoute({
  getParentRoute: () => adminProtectedRoute,
  path: "/admin/certificates",
  component: () => <AdminCertificatesPage />,
});
const adminNoticesRoute = createRoute({
  getParentRoute: () => adminProtectedRoute,
  path: "/admin/notices",
  component: () => <AdminNoticesPage />,
});
const adminLeaveRoute = createRoute({
  getParentRoute: () => adminProtectedRoute,
  path: "/admin/leave",
  component: () => <AdminLeavePage />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  coursesRoute,
  admissionRoute,
  admissionStatusRoute,
  contactRoute,
  noticesRoute,
  studentLoginRoute,
  studentProtectedRoute.addChildren([studentDashboardRoute]),
  adminIndexRoute,
  adminLoginRoute,
  adminProtectedRoute.addChildren([
    adminDashboardRoute,
    adminStudentsRoute,
    adminApplicationsRoute,
    adminCertificatesRoute,
    adminNoticesRoute,
    adminLeaveRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
