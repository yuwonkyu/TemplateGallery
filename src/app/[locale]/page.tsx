import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/config";
import { ButtonLink, Container, Panel, Pill } from "@components/common";

type PageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

type Highlight = {
  title: string;
  description: string;
};

const Page = async ({ params }: PageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const common = await getTranslations({ locale, namespace: "common" });

  // 홈 상단 특징 카드 데이터
  const highlights = t.raw("highlights") as Highlight[];
  // 사용 흐름 안내 문구
  const steps = t.raw("steps") as string[];

  return (
    <main className="page-base">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-70" />
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-amber-300/20 blur-[120px]" />
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-teal-300/20 blur-[140px]" />

        <Container className="relative flex flex-col gap-12 pb-24 pt-20">
          <header className="flex flex-col gap-6">
            <Pill>{common("brand")}</Pill>
            <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="max-w-2xl text-base text-muted sm:text-lg">
              {t("hero.description")}
            </p>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href={`/${locale}/templates`}>
                {common("cta.explore")}
              </ButtonLink>
            </div>
          </header>

          <section className="grid gap-6 lg:grid-cols-3">
            {highlights.map((item) => (
              <Panel key={item.title} className="backdrop-blur fade-in">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-muted">{item.description}</p>
              </Panel>
            ))}
          </section>
        </Container>
      </div>

      <Container
        as="section"
        className="grid gap-10 pb-20 pt-6 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <Panel variant="strong" className="rounded-3xl p-8">
          <h2 className="text-2xl font-semibold">{t("how.title")}</h2>
          <p className="mt-3 text-sm text-muted">{t("how.description")}</p>
          <ol className="mt-6 space-y-4 text-sm">
            {steps.map((step, index) => (
              <li key={step} className="flex items-center gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs text-muted">
                  0{index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Panel>

        <div className="flex flex-col gap-6">
          <Panel>
            <h3 className="text-lg font-semibold">{t("focus.title")}</h3>
            <p className="mt-3 text-sm text-muted">{t("focus.description")}</p>
          </Panel>
          <Panel className="glow">
            <h3 className="text-lg font-semibold">{t("mvp.title")}</h3>
            <p className="mt-3 text-sm text-muted">{t("mvp.description")}</p>
          </Panel>
        </div>
      </Container>
    </main>
  );
};

export default Page;
