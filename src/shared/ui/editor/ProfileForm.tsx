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
          이름{" "}
          <span className="text-xs text-white/50">
            ({profile.name.length}/10)
          </span>
        </label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => handleChange("name", e.target.value.slice(0, 10))}
          maxLength={10}
          placeholder="이름을 입력하세요"
          className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
        />
        <p className="mt-1 text-xs text-white/40">최대 10글자</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90">
          직책/역할{" "}
          <span className="text-xs text-white/50">
            ({profile.title.length}/20)
          </span>
        </label>
        <input
          type="text"
          value={profile.title}
          onChange={(e) => handleChange("title", e.target.value.slice(0, 20))}
          maxLength={20}
          placeholder="예: 프로덕트 디자이너"
          className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
        />
        <p className="mt-1 text-xs text-white/40">최대 20글자</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90">
          소개{" "}
          <span className="text-xs text-white/50">
            ({profile.description.length}/1000)
          </span>
        </label>
        <textarea
          value={profile.description}
          onChange={(e) =>
            handleChange("description", e.target.value.slice(0, 1000))
          }
          maxLength={1000}
          placeholder="무엇을 만들고 어떤 사람을 돕는지 소개하세요"
          rows={4}
          className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10 resize-none"
        />
        <p className="mt-1 text-xs text-white/40">최대 1000글자</p>
      </div>
    </div>
  );
};
