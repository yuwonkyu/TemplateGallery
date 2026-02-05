// 지원하는 언어 목록과 기본 로케일
export const locales = ["ko", "en"] as const;
export const defaultLocale = "ko";

export type Locale = (typeof locales)[number];
