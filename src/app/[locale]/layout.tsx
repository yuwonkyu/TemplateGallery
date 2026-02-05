import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { locales, type Locale } from "@/i18n/config";
import { Container, LocaleSwitcher } from "@components/common";

type LocaleLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  // 정적 렌더링에서 로케일을 고정
  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Container as="header" className="flex items-center justify-between py-6">
        <Link
          href={`/${locale}`}
          className="text-xs uppercase tracking-[0.24em] text-muted"
        >
          Portfolio Template Builder
        </Link>
        <LocaleSwitcher locale={locale} />
      </Container>
      {children}
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
