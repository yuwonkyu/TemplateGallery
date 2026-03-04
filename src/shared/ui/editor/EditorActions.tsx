"use client";

import { useState } from "react";
import Link from "next/link";
import { useEditorStore } from "@/shared/stores/editorStore";
import {
  generatePortfolioHTML,
  downloadFile,
  downloadPDF,
} from "@/shared/lib/export";
import { Button } from "@/shared/ui/common";

interface EditorActionsProps {
  resetLabel: string;
  locale?: string;
}

export const EditorActions = ({
  resetLabel,
  locale = "ko",
}: EditorActionsProps) => {
  const { data, resetData } = useEditorStore();
  const [isExporting, setIsExporting] = useState(false);

  const handleReset = () => {
    if (confirm("모든 입력 데이터가 초기화됩니다. 계속하시겠습니까?")) {
      resetData();
    }
  };

  const handleExportHTML = () => {
    const html = generatePortfolioHTML(data);
    const filename = `${data.profile.name || "portfolio"}-portfolio.html`;
    downloadFile(html, filename);
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await downloadPDF(data);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Link
        href={`/${locale}/guide`}
        className="text-sm text-muted transition-colors hover:text-white"
      >
        📖 배포 가이드
      </Link>
      <div className="flex gap-3">
        <Button variant="outline" size="sm" onClick={handleReset}>
          {resetLabel}
        </Button>
        <Button size="sm" onClick={handleExportHTML} disabled={isExporting}>
          HTML 내보내기
        </Button>
        <Button size="sm" onClick={handleExportPDF} disabled={isExporting}>
          {isExporting ? "PDF 생성 중..." : "PDF 내보내기"}
        </Button>
      </div>
    </div>
  );
};
