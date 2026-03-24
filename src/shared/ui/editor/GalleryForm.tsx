import { useEditorStore } from "@/shared/stores/editorStore";
import { Button } from "@/shared/ui/common";

export const GalleryForm = () => {
  const { data, updateGallery } = useEditorStore();
  const items = data.gallery.items;

  const handleAddItem = () => {
    const newItem = {
      id: Date.now().toString(),
      title: "",
      summary: "",
      mediaType: "image" as const,
      mediaUrl: "",
      thumbnail: "",
      tags: [],
    };

    updateGallery({ items: [...items, newItem] });
  };

  const handleUpdateItem = (id: string, field: string, value: string) => {
    const maxLengths: Record<string, number> = {
      title: 50,
      summary: 300,
      mediaUrl: 300,
      thumbnail: 300,
    };
    const maxLength = maxLengths[field] || 999999;

    updateGallery({
      items: items.map((item) =>
        item.id === id ? { ...item, [field]: value.slice(0, maxLength) } : item,
      ),
    });
  };

  const handleUpdateMediaType = (
    id: string,
    value: "image" | "video" | "link",
  ) => {
    updateGallery({
      items: items.map((item) =>
        item.id === id ? { ...item, mediaType: value } : item,
      ),
    });
  };

  const handleDeleteItem = (id: string) => {
    updateGallery({
      items: items.filter((item) => item.id !== id),
    });
  };

  return (
    <div className="space-y-5">
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-muted mb-4">
            아직 갤러리 작품을 추가하지 않았습니다.
          </p>
        </div>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3"
          >
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                작품 제목{" "}
                <span className="text-white/50">({item.title.length}/50)</span>
              </label>
              <input
                type="text"
                value={item.title}
                onChange={(e) =>
                  handleUpdateItem(item.id, "title", e.target.value)
                }
                maxLength={50}
                placeholder="작품 제목"
                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                미디어 타입
              </label>
              <select
                value={item.mediaType}
                onChange={(e) =>
                  handleUpdateMediaType(
                    item.id,
                    e.target.value as "image" | "video" | "link",
                  )
                }
                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-white/40 focus:bg-white/10"
              >
                <option value="image" className="bg-slate-900">
                  이미지
                </option>
                <option value="video" className="bg-slate-900">
                  영상
                </option>
                <option value="link" className="bg-slate-900">
                  링크
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                미디어 URL{" "}
                <span className="text-white/50">
                  ({item.mediaUrl.length}/300)
                </span>
              </label>
              <input
                type="url"
                value={item.mediaUrl}
                onChange={(e) =>
                  handleUpdateItem(item.id, "mediaUrl", e.target.value)
                }
                maxLength={300}
                placeholder="https://example.com/work"
                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                썸네일 URL{" "}
                <span className="text-white/50">
                  ({item.thumbnail.length}/300)
                </span>
              </label>
              <input
                type="url"
                value={item.thumbnail}
                onChange={(e) =>
                  handleUpdateItem(item.id, "thumbnail", e.target.value)
                }
                maxLength={300}
                placeholder="https://example.com/thumb.jpg"
                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                한줄 설명{" "}
                <span className="text-white/50">
                  ({item.summary.length}/300)
                </span>
              </label>
              <textarea
                value={item.summary}
                onChange={(e) =>
                  handleUpdateItem(item.id, "summary", e.target.value)
                }
                maxLength={300}
                placeholder="작품 핵심 설명"
                rows={2}
                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10 resize-none"
              />
            </div>

            <div className="flex justify-end pt-2 border-t border-white/10">
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="text-xs text-red-400 hover:text-red-300 transition cursor-pointer"
              >
                작품 삭제
              </button>
            </div>
          </div>
        ))
      )}

      <Button
        onClick={handleAddItem}
        variant="outline"
        size="sm"
        className="w-full"
      >
        + 갤러리 작품 추가
      </Button>
    </div>
  );
};
