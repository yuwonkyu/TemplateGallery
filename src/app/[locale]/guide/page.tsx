import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/config";
import { ButtonLink, Container, Panel } from "@components/common";

type PageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

const Page = async ({ params }: PageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guide" });

  const platforms = ["github", "vercel", "netlify"] as const;
  const tips = t.raw("tips.items") as string[];

  return (
    <main className="page-base">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-70" />
        <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-blue-300/20 blur-[120px]" />

        <Container className="relative flex flex-col gap-12 pb-24 pt-20">
          <header className="flex flex-col gap-6">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-base text-muted sm:text-lg">
              {t("description")}
            </p>
          </header>

          <Panel className="backdrop-blur">
            <h2 className="text-xl font-semibold">{t("intro.title")}</h2>
            <p className="mt-3 text-sm text-muted">{t("intro.description")}</p>
          </Panel>
        </Container>
      </div>

      <Container as="section" className="flex flex-col gap-8 pb-20">
        {platforms.map((platform) => {
          const steps = t.raw(`platforms.${platform}.steps`) as string[];
          return (
            <Panel key={platform} variant="strong" className="p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <span className="text-xl">
                    {platform === "github"
                      ? "📦"
                      : platform === "vercel"
                        ? "▲"
                        : "🌐"}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {t(`platforms.${platform}.title`)}
                  </h3>
                  <p className="text-sm text-muted">
                    {t(`platforms.${platform}.description`)}
                  </p>
                </div>
              </div>
              <ol className="mt-6 space-y-3 text-sm">
                {steps.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs text-muted">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </Panel>
          );
        })}

        <Panel className="p-8">
          <h3 className="text-xl font-semibold">{t("tips.title")}</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {tips.map((tip, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-amber-400">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="glow p-8 text-center">
          <h3 className="text-xl font-semibold">{t("cta.title")}</h3>
          <p className="mt-2 text-sm text-muted">{t("cta.description")}</p>
          <div className="mt-6">
            <ButtonLink href={`/${locale}/editor`}>
              {t("cta.button")}
            </ButtonLink>
          </div>
        </Panel>
      </Container>
    </main>
  );
};

export default Page;
