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
          메인 헤드라인
        </label>
        <input
          type="text"
          value={heroStatement.headline}
          onChange={(e) => handleChange("headline", e.target.value)}
          placeholder="당신의 주요 메시지를 입력하세요"
          className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90">
          서브 헤드라인
        </label>
        <textarea
          value={heroStatement.subheadline}
          onChange={(e) => handleChange("subheadline", e.target.value)}
          placeholder="헤드라인을 보조할 추가 설명을 입력하세요"
          rows={3}
          className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
        />
      </div>
    </div>
  );
};
