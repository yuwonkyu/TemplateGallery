import { useEditorStore } from "@/shared/stores/editorStore";

export const ProfileForm = () => {
  const { data, updateProfile } = useEditorStore();
  const profile = data.profile;

  const handleChange = (field: string, value: string) => {
    updateProfile({ [field]: value } as any);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-white/90">
          이름
        </label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="이름을 입력하세요"
          className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90">
          직책/역할
        </label>
        <input
          type="text"
          value={profile.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="예: 프로덕트 디자이너"
          className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90">
          소개
        </label>
        <textarea
          value={profile.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="무엇을 만들고 어떤 사람을 돕는지 소개하세요"
          rows={4}
          className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
        />
      </div>
    </div>
  );
};
