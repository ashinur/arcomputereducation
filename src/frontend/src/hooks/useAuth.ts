import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdminSession, StudentSession } from "../types";

interface AuthStore {
  admin: AdminSession | null;
  student: StudentSession | null;
  setAdmin: (session: AdminSession | null) => void;
  setStudent: (session: StudentSession | null) => void;
  clearAdmin: () => void;
  clearStudent: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      admin: null,
      student: null,
      setAdmin: (session) => set({ admin: session }),
      setStudent: (session) => set({ student: session }),
      clearAdmin: () => set({ admin: null }),
      clearStudent: () => set({ student: null }),
    }),
    {
      name: "ar-computer-auth",
      partialize: (state) => ({
        admin: state.admin,
        student: state.student,
      }),
    },
  ),
);

export function useAdminAuth() {
  const { admin, setAdmin, clearAdmin } = useAuthStore();
  return {
    admin,
    isAdminAuthenticated: !!admin?.isAuthenticated,
    setAdmin,
    clearAdmin,
  };
}

/**
 * Convenience hook returning the admin credentials required by the backend
 * admin hooks, defaulting to empty strings when not authenticated.
 */
export function useAdminCredentials() {
  const { admin } = useAdminAuth();
  return {
    loginId: admin?.loginId ?? "",
    password: admin?.password ?? "",
  };
}

export function useStudentAuth() {
  const { student, setStudent, clearStudent } = useAuthStore();
  return {
    student,
    isStudentAuthenticated: !!student?.isAuthenticated,
    setStudent,
    clearStudent,
  };
}
