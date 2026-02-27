import { useEditorStore } from "@/shared/stores/editorStore";
import { Button } from "@/shared/ui/common";

export const ContactForm = () => {
  const { data, updateContact } = useEditorStore();
  const contact = data.contact;

  const handleChangeContact = (field: string, value: string) => {
    const maxLengths: Record<string, number> = {
      email: 100,
      phone: 20,
    };
    const maxLength = maxLengths[field] || 999999;
    updateContact({ [field]: value.slice(0, maxLength) } as any);
  };

  const handleAddLink = () => {
    const newLink = { label: "", url: "" };
    updateContact({
      links: [...contact.links, newLink],
    });
  };

  const handleUpdateLink = (index: number, field: string, value: string) => {
    const maxLengths: Record<string, number> = {
      label: 20,
      url: 200,
    };
    const maxLength = maxLengths[field] || 999999;
    const updatedLinks = contact.links.map((link, i) =>
      i === index ? { ...link, [field]: value.slice(0, maxLength) } : link,
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
          이메일{" "}
          <span className="text-xs text-white/50">
            ({contact.email.length}/100)
          </span>
        </label>
        <input
          type="email"
          value={contact.email}
          onChange={(e) => handleChangeContact("email", e.target.value)}
          maxLength={100}
          placeholder="이메일 주소"
          className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90">
          전화 (선택사항){" "}
          <span className="text-xs text-white/50">
            ({(contact.phone || "").length}/20)
          </span>
        </label>
        <input
          type="tel"
          value={contact.phone || ""}
          onChange={(e) => handleChangeContact("phone", e.target.value)}
          maxLength={20}
          placeholder="전화번호 (예: 010-0000-0000)"
          className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90 mb-3">
          소셜/웹 링크
        </label>
        <div className="space-y-3">
          {contact.links.length === 0 ? (
            <p className="text-xs text-white/40">
              아직 링크를 추가하지 않았습니다.
            </p>
          ) : (
            contact.links.map((link, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) =>
                      handleUpdateLink(index, "label", e.target.value)
                    }
                    maxLength={20}
                    placeholder="라벨 (예: GitHub)"
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
                  />
                  <p className="text-xs text-white/40 mt-1">
                    {link.label.length}/20
                  </p>
                </div>
                <div className="flex-1">
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) =>
                      handleUpdateLink(index, "url", e.target.value)
                    }
                    maxLength={200}
                    placeholder="https://example.com"
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
                  />
                  <p className="text-xs text-white/40 mt-1">
                    {link.url.length}/200
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteLink(index)}
                  className="text-xs text-red-400 hover:text-red-300 transition px-2 py-2"
                >
                  ✕
                </button>
              </div>
            ))
          )}

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
