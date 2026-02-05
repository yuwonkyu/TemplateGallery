import type { HTMLAttributes } from "react";

import { cn } from "@utils/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "header" | "main";
};

export const Container = ({
  as: Component = "div",
  className,
  ...props
}: ContainerProps) => {
  // 페이지 폭과 패딩을 통일하는 래퍼
  return (
    <Component
      className={cn("mx-auto w-full max-w-6xl px-6", className)}
      {...props}
    />
  );
};
