import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/config";
import { Container, Pill } from "@components/common";
import { EditorActions } from "@/shared/ui/editor/EditorActions";

// 에디터 콘텐츠를 동적으로 로드하여 초기 번들 크기 감소
const EditorContent = dynamic(
  () => import("./EditorContent").then((mod) => mod.EditorContent),
  {
    loading: () => (
      <div className="flex items-center justify-center h-96 text-white/50">
        에디터 로딩 중...
      </div>
    ),
  },
);

type PageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

const EditorPage = async ({ params }: PageProps) => {
  const { locale } = await params;
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
          <EditorActions
            resetLabel={common("actions.reset")}
            exportLabel={common("actions.export")}
          />
        </header>

        <EditorContent
          formSections={formSections}
          sectionsTitle={t("sectionsTitle")}
          sectionsDescription={t("sectionsDescription")}
        />
      </Container>
    </main>
  );
};

export default EditorPage;
