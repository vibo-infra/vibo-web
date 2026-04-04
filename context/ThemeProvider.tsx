"use client";

import React, { createContext, useCallback, useContext, type ReactNode } from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";

type ThemeContextType = {
  theme: string | undefined;
  toggleTheme: () => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  mounted: false,
});

function ThemeContextProvider({ children }: { children: ReactNode }) {
  const { setTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    document.documentElement.classList.add("theme-transitioning");
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 400);
    });
  }, [resolvedTheme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </NextThemesProvider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
