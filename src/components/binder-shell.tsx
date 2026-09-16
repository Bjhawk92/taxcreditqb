import type { ReactNode } from "react";
import { BinderRings } from "@/components/binder-rings";
import { BinderTabs } from "@/components/binder-tabs";

export function BinderShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-desk lg:px-8 lg:py-5">
      <div className="relative mx-auto max-w-[92rem]">
        <div className="relative overflow-hidden bg-paper shadow-[0_12px_40px_rgb(0_0_0_/_0.35)] lg:mr-10">
          <BinderRings />
          <div className="relative lg:pl-14">{children}</div>
        </div>
        <BinderTabs />
      </div>
    </div>
  );
}
