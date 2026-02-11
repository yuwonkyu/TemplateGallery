import { useEditorStore } from "@/shared/stores/editorStore";
import { Button } from "@/shared/ui/common";

export const FeaturedProjectsForm = () => {
  const { data, updateFeaturedProjects } = useEditorStore();
  const projects = data.featuredProjects.projects;

  const handleAddProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "",
      description: "",
      tags: [],
      link: "",
    };
    updateFeaturedProjects({
      projects: [...projects, newProject],
    });
  };

  const handleUpdateProject = (id: string, field: string, value: string) => {
    const updatedProjects = projects.map((p) =>
      p.id === id ? { ...p, [field]: value } : p,
    );
    updateFeaturedProjects({ projects: updatedProjects });
  };

  const handleDeleteProject = (id: string) => {
    updateFeaturedProjects({
      projects: projects.filter((p) => p.id !== id),
    });
  };

  return (
    <div className="space-y-5">
      {projects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-muted mb-4">
            아직 프로젝트를 추가하지 않았습니다.
          </p>
        </div>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3"
          >
            <input
              type="text"
              value={project.title}
              onChange={(e) =>
                handleUpdateProject(project.id, "title", e.target.value)
              }
              placeholder="프로젝트 제목"
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
            />

            <textarea
              value={project.description}
              onChange={(e) =>
                handleUpdateProject(project.id, "description", e.target.value)
              }
              placeholder="프로젝트 설명"
              rows={2}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
            />

            <input
              type="text"
              value={project.link || ""}
              onChange={(e) =>
                handleUpdateProject(project.id, "link", e.target.value)
              }
              placeholder="링크 (선택사항)"
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
            />

            <div className="flex justify-end">
              <button
                onClick={() => handleDeleteProject(project.id)}
                className="text-xs text-red-400 hover:text-red-300 transition"
              >
                삭제
              </button>
            </div>
          </div>
        ))
      )}

      <Button
        onClick={handleAddProject}
        variant="outline"
        size="sm"
        className="w-full"
      >
        + 프로젝트 추가
      </Button>
    </div>
  );
};
