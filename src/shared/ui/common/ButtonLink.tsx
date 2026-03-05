import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@utils/cn";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md";
  className?: string;
};

const variants = {
  primary:
    "bg-(--accent) text-black shadow-lg shadow-orange-400/20 hover:-translate-y-0.5",
  outline: "border border-white/20 bg-white/5 text-white hover:border-white/40",
  ghost: "border border-white/15 bg-white/5 text-muted hover:border-white/30",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
};

export const ButtonLink = ({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: ButtonLinkProps) => {
  // 링크를 버튼처럼 보이게 하는 컴포넌트
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-semibold transition",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </Link>
  );
};
