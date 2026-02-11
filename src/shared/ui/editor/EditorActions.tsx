"use client";

import { useEditorStore } from "@/shared/stores/editorStore";
import { generatePortfolioHTML, downloadFile } from "@/shared/lib/export";
import { Button } from "@/shared/ui/common";

interface EditorActionsProps {
  resetLabel: string;
  exportLabel: string;
}

export const EditorActions = ({
  resetLabel,
  exportLabel,
}: EditorActionsProps) => {
  const { data, resetData } = useEditorStore();

  const handleReset = () => {
    if (confirm("모든 입력 데이터가 초기화됩니다. 계속하시겠습니까?")) {
      resetData();
    }
  };

  const handleExport = () => {
    const html = generatePortfolioHTML(data);
    const filename = `${data.profile.name || "portfolio"}-portfolio.html`;
    downloadFile(html, filename);
  };

  return (
    <div className="flex gap-3">
      <Button variant="outline" size="sm" onClick={handleReset}>
        {resetLabel}
      </Button>
      <Button size="sm" onClick={handleExport}>
        {exportLabel}
      </Button>
    </div>
  );
};
