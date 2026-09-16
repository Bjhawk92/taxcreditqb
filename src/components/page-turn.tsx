import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageTurn({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="page-turn-stage">
      <div key={pathname} className="page-turn-leaf">
        {children}
      </div>
      <div key={`${pathname}-flip`} className="page-turn-flip" aria-hidden="true" />
    </div>
  );
}
