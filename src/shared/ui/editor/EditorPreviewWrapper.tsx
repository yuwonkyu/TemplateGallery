"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { EditorPreview } from "./EditorPreview";

export const EditorPreviewWrapper = () => {
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const t = useTranslations("editor");
  const common = useTranslations("common");

  return (
    <div className="flex flex-col h-full">
      {/* 헤더: 미리보기 제목과 뷰포트 전환 버튼 */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">{t("previewTitle")}</h2>
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setViewport("desktop")}
            className={`rounded-full px-3 py-1 transition ${
              viewport === "desktop"
                ? "bg-white/15 border border-white/30 text-white"
                : "border border-white/10 text-muted hover:text-white hover:border-white/20"
            }`}
          >
            {common("preview.desktop")}
          </button>
          <button
            onClick={() => setViewport("mobile")}
            className={`rounded-full px-3 py-1 transition ${
              viewport === "mobile"
                ? "bg-white/15 border border-white/30 text-white"
                : "border border-white/10 text-muted hover:text-white hover:border-white/20"
            }`}
          >
            {common("preview.mobile")}
          </button>
        </div>
      </div>

      {/* 미리보기 콘텐츠 (뷰포트에 따라 다른 너비) */}
      <div
        className={`flex-1 transition-all duration-300 overflow-hidden flex ${
          viewport === "mobile" ? "justify-center items-start pt-4" : ""
        }`}
      >
        <div
          className={`${
            viewport === "mobile"
              ? "w-93.75 border border-white/10 rounded-lg bg-white/5 overflow-y-auto"
              : "flex-1 overflow-y-auto"
          }`}
        >
          <div className={viewport === "mobile" ? "p-4" : ""}>
            <EditorPreview />
          </div>
        </div>
      </div>
    </div>
  );
};
