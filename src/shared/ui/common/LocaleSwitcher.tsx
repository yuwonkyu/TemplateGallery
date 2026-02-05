import Link from "next/link";

import { cn } from "@utils/cn";
import type { Locale } from "@/i18n/config";

type LocaleSwitcherProps = {
  locale: Locale;
};

export const LocaleSwitcher = ({ locale }: LocaleSwitcherProps) => {
  // 현재 언어를 강조해서 보여주는 간단한 스위처
  return (
    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
      <Link
        href="/ko"
        className={cn(
          "rounded-full border px-3 py-1 transition",
          locale === "ko" ? "border-white/40 text-white" : "border-white/15",
        )}
        aria-current={locale === "ko" ? "page" : undefined}
      >
        KO
      </Link>
      <span className="text-white/20">/</span>
      <Link
        href="/en"
        className={cn(
          "rounded-full border px-3 py-1 transition",
          locale === "en" ? "border-white/40 text-white" : "border-white/15",
        )}
        aria-current={locale === "en" ? "page" : undefined}
      >
        EN
      </Link>
    </div>
  );
};
