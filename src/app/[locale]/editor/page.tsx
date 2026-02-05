import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/config";
import { Button, Container, Panel, Pill } from "@components/common";

type PageProps = {
  params: {
    locale: Locale;
  };
};

const EditorPage = async ({ params }: PageProps) => {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "editor" });
  const common = await getTranslations({ locale, namespace: "common" });

  // 에디터 왼쪽 섹션 목록
  const formSections = t.raw("sections") as string[];

  return (
    <main className="page-base">
      <Container className="flex flex-col gap-6 pb-16 pt-12">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Pill>{t("label")}</Pill>
            <h1 className="text-3xl font-semibold sm:text-4xl">{t("title")}</h1>
            <p className="mt-3 max-w-2xl text-sm text-muted">
              {t("description")}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" type="button">
              {common("actions.reset")}
            </Button>
            <Button size="sm" type="button">
              {common("actions.export")}
            </Button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Panel className="rounded-3xl">
            <h2 className="text-lg font-semibold">{t("sectionsTitle")}</h2>
            <p className="mt-2 text-sm text-muted">
              {t("sectionsDescription")}
            </p>
            <div className="mt-6 space-y-4">
              {formSections.map((section) => (
                <div
                  key={section}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{section}</span>
                    <span className="text-xs text-muted">Edit</span>
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-white/10" />
                </div>
              ))}
            </div>
          </Panel>

          <Panel variant="strong" className="rounded-3xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{t("previewTitle")}</h2>
              <div className="flex gap-2 text-xs text-muted">
                <span className="rounded-full border border-white/15 px-3 py-1">
                  {common("preview.desktop")}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1">
                  {common("preview.mobile")}
                </span>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold">{t("previewName")}</h3>
                <p className="mt-2 text-sm text-muted">
                  {t("previewHeadline")}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="grid gap-2">
                  <div className="h-3 w-1/2 rounded-full bg-white/15" />
                  <div className="h-3 w-2/3 rounded-full bg-white/10" />
                  <div className="h-3 w-1/3 rounded-full bg-white/10" />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="h-20 rounded-xl bg-white/10" />
                  <div className="h-20 rounded-xl bg-white/10" />
                  <div className="h-20 rounded-xl bg-white/10" />
                </div>
              </div>
            </div>
          </Panel>
        </section>
      </Container>
    </main>
  );
};

export default EditorPage;
