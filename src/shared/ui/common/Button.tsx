import type { ButtonHTMLAttributes } from "react";

import { cn } from "@utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md";
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

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) => {
  // 버튼 UI를 한 곳에서 관리
  return (
    <button
      className={cn(
        "rounded-full font-semibold transition",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
};
