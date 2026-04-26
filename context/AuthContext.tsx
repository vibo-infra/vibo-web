"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  loginClient,
  logoutClient,
  refreshClient,
  registerClient,
  type AuthSession,
} from "@/lib/api/services/appApi";

const STORAGE_KEY = "vibo.web.auth";

type AuthContextValue = {
  session: AuthSession | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (body: {
    email: string;
    password: string;
    defaultCity: string;
    firstName?: string;
  }) => Promise<void>;
  refreshSession: () => Promise<AuthSession>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

function storeSession(session: AuthSession | null) {
  if (typeof window === "undefined") return;
  if (session) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => readStoredSession());
  const loading = false;

  const saveSession = useCallback((next: AuthSession) => {
    setSession(next);
    storeSession(next);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      saveSession(await loginClient(email, password));
    },
    [saveSession]
  );

  const register = useCallback(
    async (body: {
      email: string;
      password: string;
      defaultCity: string;
      firstName?: string;
    }) => {
      saveSession(await registerClient(body));
    },
    [saveSession]
  );

  const refreshSession = useCallback(async () => {
    const current = readStoredSession();
    if (!current?.refreshToken) {
      setSession(null);
      storeSession(null);
      throw new Error("NO_REFRESH_TOKEN");
    }
    try {
      const next = await refreshClient(current.refreshToken);
      saveSession(next);
      return next;
    } catch (err) {
      setSession(null);
      storeSession(null);
      throw err;
    }
  }, [saveSession]);

  const logout = useCallback(async () => {
    const token = session?.accessToken;
    setSession(null);
    storeSession(null);
    if (token) {
      await logoutClient(token).catch(() => undefined);
    }
  }, [session?.accessToken]);

  const value = useMemo(
    () => ({ session, loading, login, register, refreshSession, logout }),
    [session, loading, login, register, refreshSession, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
