"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "vibo_waitlist_position";

type WaitlistSpotValue = {
  userPosition: number | null;
  setUserPosition: (position: number | null) => void;
};

const WaitlistSpotContext = createContext<WaitlistSpotValue | null>(null);

function readStoredPosition(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const n = Number.parseInt(raw, 10);
    return Number.isFinite(n) && n > 0 ? n : null;
  } catch {
    return null;
  }
}

export function WaitlistSpotProvider({ children }: { children: React.ReactNode }) {
  const [userPosition, setUserPositionState] = useState<number | null>(null);

  useEffect(() => {
    const n = readStoredPosition();
    if (n != null) {
      // Rehydrate from sessionStorage after mount (not available during SSR).
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-time sync
      setUserPositionState(n);
    }
  }, []);

  const setUserPosition = useCallback((position: number | null) => {
    setUserPositionState(position);
    try {
      if (position != null && position > 0) {
        sessionStorage.setItem(STORAGE_KEY, String(position));
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ userPosition, setUserPosition }),
    [userPosition, setUserPosition]
  );

  return (
    <WaitlistSpotContext.Provider value={value}>
      {children}
    </WaitlistSpotContext.Provider>
  );
}

export function useWaitlistSpot() {
  const ctx = useContext(WaitlistSpotContext);
  if (!ctx) {
    return {
      userPosition: null as number | null,
      setUserPosition: () => {},
    };
  }
  return ctx;
}
