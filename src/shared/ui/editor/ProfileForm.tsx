import { useEditorStore } from "@/shared/stores/editorStore";
import { useRef } from "react";

export const ProfileForm = () => {
  const { data, updateProfile } = useEditorStore();
  const profile = data.profile;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: string, value: string) => {
    updateProfile({ [field]: value } as any);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 파일만 허용
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 파일 크기 제한 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("이미지 크기는 5MB 이하여야 합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      updateProfile({ image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    updateProfile({ image: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-white/90 mb-2">
          프로필 이미지
        </label>
        <div className="flex items-center gap-4">
          <div className="relative h-24 w-24 rounded-full bg-white/10 border-2 border-white/20 overflow-hidden shrink-0">
            {profile.image ? (
              <img
                src={profile.image}
                alt="프로필 이미지"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white/40 text-xs text-center px-2">
                이미지
              </div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="profile-image-upload"
            />
            <label
              htmlFor="profile-image-upload"
              className="inline-block cursor-pointer rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
            >
              이미지 선택
            </label>
            {profile.image && (
              <button
                onClick={handleRemoveImage}
                className="ml-2 inline-block rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 transition cursor-pointer"
              >
                제거
              </button>
            )}
            <p className="text-xs text-white/40">JPG, PNG, GIF (최대 5MB)</p>
          </div>
        </div>
      </div>

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
