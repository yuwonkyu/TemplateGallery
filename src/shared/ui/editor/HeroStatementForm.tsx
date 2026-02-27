import { useEditorStore } from "@/shared/stores/editorStore";

export const HeroStatementForm = () => {
  const { data, updateHeroStatement } = useEditorStore();
  const heroStatement = data.heroStatement;

  const handleChange = (field: string, value: string) => {
    updateHeroStatement({ [field]: value } as any);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-white/90">
          메인 헤드라인{" "}
          <span className="text-xs text-white/50">
            ({heroStatement.headline.length}/100)
          </span>
        </label>
        <input
          type="text"
          value={heroStatement.headline}
          onChange={(e) =>
            handleChange("headline", e.target.value.slice(0, 100))
          }
          maxLength={100}
          placeholder="예: 혁신적인 디자인으로 사용자 경험을 변화시키다"
          className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
        />
        <p className="mt-1 text-xs text-white/40">최대 100글자</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90">
          서브 헤드라인{" "}
          <span className="text-xs text-white/50">
            ({heroStatement.subheadline.length}/300)
          </span>
        </label>
        <textarea
          value={heroStatement.subheadline}
          onChange={(e) =>
            handleChange("subheadline", e.target.value.slice(0, 300))
          }
          maxLength={300}
          placeholder="예: 5년간 20개 이상의 프로젝트를 성공적으로 완료했으며, 사용자 중심의 설계 철학을 바탕으로 제품을 만들고 있습니다."
          rows={3}
          className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10 resize-none"
        />
        <p className="mt-1 text-xs text-white/40">최대 300글자</p>
      </div>
    </div>
  );
};
