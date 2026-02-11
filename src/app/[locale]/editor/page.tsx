import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/config";
import { Button, Container, Panel, Pill } from "@components/common";
import {
  ProfileForm,
  HeroStatementForm,
  FeaturedProjectsForm,
  TimelineForm,
  ContactForm,
} from "@/shared/ui/editor";
import { EditorSectionTabs } from "@/shared/ui/editor/EditorSectionTabs";
import { EditorActions } from "@/shared/ui/editor/EditorActions";
import { EditorPreviewWrapper } from "@/shared/ui/editor/EditorPreviewWrapper";

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

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* 왼쪽: 편집 폼 */}
          <Panel className="rounded-3xl max-h-[calc(100vh-200px)] overflow-y-auto">
            <h2 className="text-lg font-semibold">{t("sectionsTitle")}</h2>
            <p className="mt-2 text-sm text-muted">
              {t("sectionsDescription")}
            </p>
            <EditorSectionTabs sectionNames={formSections} />
          </Panel>

          {/* 오른쪽: 실시간 미리보기 */}
          <Panel
            variant="strong"
            className="rounded-3xl max-h-[calc(100vh-200px)] overflow-hidden flex flex-col"
          >
            <EditorPreviewWrapper />
          </Panel>
        </section>
      </Container>
    </main>
  );
};

export default EditorPage;
