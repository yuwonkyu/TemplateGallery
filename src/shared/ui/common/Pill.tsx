import type { HTMLAttributes } from "react";

import { cn } from "@utils/cn";

type PillProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "muted" | "solid";
};

export const Pill = ({ tone = "muted", className, ...props }: PillProps) => {
  // 상단 라벨용 캡슐 UI
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em]",
        tone === "solid"
          ? "bg-(--accent) text-black"
          : "border border-white/10 bg-white/5 text-muted",
        className,
      )}
      {...props}
    />
  );
};
