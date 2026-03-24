import { useEditorStore } from "@/shared/stores/editorStore";

export const AboutForm = () => {
  const { data, updateAbout } = useEditorStore();
  const about = data.about;

  const handleChange = (
    field: "style" | "interests" | "bio",
    value: string,
  ) => {
    const maxLengths: Record<typeof field, number> = {
      style: 300,
      interests: 300,
      bio: 1000,
    };

    updateAbout({ [field]: value.slice(0, maxLengths[field]) } as any);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-white/90">
          작업 스타일{" "}
          <span className="text-xs text-white/50">
            ({about.style.length}/300)
          </span>
        </label>
        <textarea
          value={about.style}
          onChange={(e) => handleChange("style", e.target.value)}
          maxLength={300}
          placeholder="예: 미니멀한 구성과 강한 타이포 대비를 선호합니다"
          rows={3}
          className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90">
          관심 분야{" "}
          <span className="text-xs text-white/50">
            ({about.interests.length}/300)
          </span>
        </label>
        <textarea
          value={about.interests}
          onChange={(e) => handleChange("interests", e.target.value)}
          maxLength={300}
          placeholder="예: 게임 UI, 브랜딩, 모션 그래픽"
          rows={3}
          className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90">
          간단 이력{" "}
          <span className="text-xs text-white/50">
            ({about.bio.length}/1000)
          </span>
        </label>
        <textarea
          value={about.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          maxLength={1000}
          placeholder="예: 2021-현재 프리랜서 아티스트, 20+ 프로젝트 참여"
          rows={5}
          className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10 resize-none"
        />
      </div>
    </div>
  );
};
