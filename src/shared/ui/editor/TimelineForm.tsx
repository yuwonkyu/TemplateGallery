import { useEditorStore } from "@/shared/stores/editorStore";
import { Button } from "@/shared/ui/common";

export const TimelineForm = () => {
  const { data, updateTimeline } = useEditorStore();
  const items = data.timeline.items;

  const handleAddItem = () => {
    const newItem = {
      id: Date.now().toString(),
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      tags: [],
    };
    updateTimeline({
      items: [...items, newItem],
    });
  };

  const handleUpdateItem = (id: string, field: string, value: string) => {
    const maxLengths: Record<string, number> = {
      title: 30,
      description: 300,
    };
    const maxLength = maxLengths[field] || 999999;
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value.slice(0, maxLength) } : item,
    );
    updateTimeline({ items: updatedItems });
  };

  const handleDeleteItem = (id: string) => {
    updateTimeline({
      items: items.filter((item) => item.id !== id),
    });
  };

  return (
    <div className="space-y-5">
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-muted mb-4">
            아직 타임라인을 추가하지 않았습니다.
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
                제목{" "}
                <span className="text-white/50">({item.title.length}/30)</span>
              </label>
              <input
                type="text"
                value={item.title}
                onChange={(e) =>
                  handleUpdateItem(item.id, "title", e.target.value)
                }
                maxLength={30}
                placeholder="제목 (예: 회사명, 프로젝트명)"
                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                설명{" "}
                <span className="text-white/50">
                  ({item.description.length}/300)
                </span>
              </label>
              <textarea
                value={item.description}
                onChange={(e) =>
                  handleUpdateItem(item.id, "description", e.target.value)
                }
                maxLength={300}
                placeholder="설명"
                rows={2}
                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  시작
                </label>
                <input
                  type="text"
                  value={item.startDate}
                  onChange={(e) =>
                    handleUpdateItem(item.id, "startDate", e.target.value)
                  }
                  placeholder="2023.01"
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  종료
                </label>
                <input
                  type="text"
                  value={item.endDate || ""}
                  onChange={(e) =>
                    handleUpdateItem(item.id, "endDate", e.target.value)
                  }
                  placeholder="현재 또는 2024.12"
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-white/10">
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="text-xs text-red-400 hover:text-red-300 transition"
              >
                삭제
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
        + 항목 추가
      </Button>
    </div>
  );
};
