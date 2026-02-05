import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/config";
import { Button, ButtonLink, Container, Panel, Pill } from "@components/common";

type PageProps = {
  params: {
    locale: Locale;
  };
};

type TemplateItem = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
};

const TemplatesPage = async ({ params }: PageProps) => {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "templates" });
  const common = await getTranslations({ locale, namespace: "common" });

  // 템플릿 목록 더미 데이터
  const templates = t.raw("items") as TemplateItem[];
  // 필터 UI용 리스트
  const filters = common.raw("filters") as string[];

  return (
    <main className="page-base">
      <Container className="flex flex-col gap-10 pb-24 pt-16">
        <header className="flex flex-col gap-4">
          <Pill>{t("label")}</Pill>
          <h1 className="text-3xl font-semibold sm:text-4xl">{t("title")}</h1>
          <p className="max-w-2xl text-sm text-muted">{t("description")}</p>
        </header>

        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <Button key={filter} variant="ghost" size="sm" type="button">
              {filter}
            </Button>
          ))}
        </div>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Panel
              key={template.id}
              className="transition hover:-translate-y-1"
            >
              <div className="flex h-36 items-center justify-center rounded-xl bg-white/5 text-sm text-muted">
                {common("preview.label")}
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <h2 className="text-lg font-semibold">{template.title}</h2>
                <p className="text-sm text-muted">{template.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ButtonLink
                  href={`/${locale}/editor`}
                  size="sm"
                  className="mt-4 w-fit"
                >
                  {common("cta.openEditor")}
                </ButtonLink>
              </div>
            </Panel>
          ))}
        </section>
      </Container>
    </main>
  );
};

export default TemplatesPage;
