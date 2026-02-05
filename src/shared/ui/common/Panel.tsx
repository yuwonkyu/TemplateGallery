import type { HTMLAttributes } from "react";

import { cn } from "@utils/cn";

type PanelProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "strong";
};

export const Panel = ({
  variant = "default",
  className,
  ...props
}: PanelProps) => {
  // 공통 카드 패널 스타일
  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        variant === "strong" ? "panel-strong" : "panel",
        className,
      )}
      {...props}
    />
  );
};
