"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useEditorStore } from "@/shared/stores/editorStore";
import {
  generatePortfolioHTML,
  downloadFile,
  downloadPDF,
} from "@/shared/lib/export";
import { Button } from "@/shared/ui/common";

interface EditorActionsProps {
  resetLabel: string;
}

export const EditorActions = ({ resetLabel }: EditorActionsProps) => {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "dev-basic";
  const {
    data,
    resetData,
    setTemplate,
    currentTemplateId,
    exportData,
    importData,
    clearAllLocalData,
  } = useEditorStore();
  const [isExporting, setIsExporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTemplate(templateId);
  }, [templateId, setTemplate]);

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

  const handleExportBackup = () => {
    const backup = exportData();
    const filename = `${currentTemplateId}-backup.json`;
    const blob = new Blob([backup], { type: "application/json;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleImportBackup = () => {
    fileInputRef.current?.click();
  };

  const handleBackupFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const result = importData(text);
      alert(result.message);
    } catch {
      alert("백업 파일을 읽는 중 오류가 발생했습니다.");
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleClearAllLocalData = () => {
    if (
      confirm(
        "이 브라우저의 모든 템플릿 저장 데이터를 삭제합니다. 계속하시겠습니까?",
      )
    ) {
      clearAllLocalData();
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        onChange={handleBackupFileChange}
        className="hidden"
      />
      <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
        이 브라우저에만 저장됩니다. 현재 템플릿 저장소: {currentTemplateId}
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="sm" onClick={handleReset}>
          {resetLabel}
        </Button>
        <Button variant="outline" size="sm" onClick={handleExportBackup}>
          JSON 백업
        </Button>
        <Button variant="outline" size="sm" onClick={handleImportBackup}>
          JSON 복원
        </Button>
        <Button variant="outline" size="sm" onClick={handleClearAllLocalData}>
          전체 로컬 삭제
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
