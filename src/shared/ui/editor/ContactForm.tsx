import { useEditorStore } from "@/shared/stores/editorStore";
import { Button } from "@/shared/ui/common";

export const ContactForm = () => {
  const { data, updateContact } = useEditorStore();
  const contact = data.contact;

  const handleChangeContact = (field: string, value: string) => {
    updateContact({ [field]: value } as any);
  };

  const handleAddLink = () => {
    const newLink = { label: "", url: "" };
    updateContact({
      links: [...contact.links, newLink],
    });
  };

  const handleUpdateLink = (index: number, field: string, value: string) => {
    const updatedLinks = contact.links.map((link, i) =>
      i === index ? { ...link, [field]: value } : link,
    );
    updateContact({ links: updatedLinks });
  };

  const handleDeleteLink = (index: number) => {
    updateContact({
      links: contact.links.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-white/90">
          이메일
        </label>
        <input
          type="email"
          value={contact.email}
          onChange={(e) => handleChangeContact("email", e.target.value)}
          placeholder="이메일 주소"
          className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90">
          전화 (선택사항)
        </label>
        <input
          type="tel"
          value={contact.phone || ""}
          onChange={(e) => handleChangeContact("phone", e.target.value)}
          placeholder="전화번호"
          className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90 mb-3">
          소셜/웹 링크
        </label>
        <div className="space-y-3">
          {contact.links.map((link, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={link.label}
                onChange={(e) =>
                  handleUpdateLink(index, "label", e.target.value)
                }
                placeholder="라벨 (예: GitHub)"
                className="flex-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
              />
              <input
                type="url"
                value={link.url}
                onChange={(e) => handleUpdateLink(index, "url", e.target.value)}
                placeholder="URL"
                className="flex-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
              />
              <button
                onClick={() => handleDeleteLink(index)}
                className="text-xs text-red-400 hover:text-red-300 transition px-2"
              >
                삭제
              </button>
            </div>
          ))}

          <Button
            onClick={handleAddLink}
            variant="outline"
            size="sm"
            className="w-full"
          >
            + 링크 추가
          </Button>
        </div>
      </div>
    </div>
  );
};
