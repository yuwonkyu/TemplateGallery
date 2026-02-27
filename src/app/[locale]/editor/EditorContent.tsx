"use client";

import { Panel } from "@components/common";
import { EditorSectionTabs } from "@/shared/ui/editor/EditorSectionTabs";
import { EditorPreviewWrapper } from "@/shared/ui/editor/EditorPreviewWrapper";

type EditorContentProps = {
  formSections: string[];
  sectionsTitle: string;
  sectionsDescription: string;
};

export const EditorContent = ({
  formSections,
  sectionsTitle,
  sectionsDescription,
}: EditorContentProps) => {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      {/* 왼쪽: 편집 폼 */}
      <Panel className="rounded-3xl max-h-[calc(100vh-200px)] overflow-y-auto">
        <h2 className="text-lg font-semibold">{sectionsTitle}</h2>
        <p className="mt-2 text-sm text-muted">{sectionsDescription}</p>
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
  );
};
