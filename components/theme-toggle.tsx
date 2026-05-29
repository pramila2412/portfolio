"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="relative inline-flex items-center justify-center rounded-full p-2 text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Toggle theme">
        <Sun className="h-5 w-5 opacity-0" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className="relative inline-flex items-center justify-center rounded-full p-2 text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-5 w-5 transition-all text-white hover:text-accent-blue" />
      ) : (
        <Moon className="h-5 w-5 transition-all text-black hover:text-accent-purple" />
      )}
    </button>
  );
}
