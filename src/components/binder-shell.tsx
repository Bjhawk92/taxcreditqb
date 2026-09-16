import { Children, type ReactNode } from "react";
import { BinderRings } from "@/components/binder-rings";
import { BinderTabs } from "@/components/binder-tabs";
import { PageTurn } from "@/components/page-turn";

export function BinderShell({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const header = items[0];
  const rest = items.slice(1);

  return (
    <div className="min-h-screen bg-desk lg:px-8 lg:py-5">
      <div className="relative mx-auto max-w-[92rem]">
        <div className="relative bg-paper shadow-[0_12px_40px_rgb(0_0_0_/_0.35)] lg:mr-24">
          <BinderRings />
          <div className="relative lg:pl-16">
            {header}
            <PageTurn>{rest}</PageTurn>
          </div>
        </div>
        <BinderTabs />
      </div>
    </div>
  );
}
