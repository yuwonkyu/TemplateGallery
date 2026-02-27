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
      links: [],
    };
    updateFeaturedProjects({
      projects: [...projects, newProject],
    });
  };

  const handleUpdateProject = (id: string, field: string, value: any) => {
    const updatedProjects = projects.map((p) =>
      p.id === id ? { ...p, [field]: value } : p,
    );
    updateFeaturedProjects({ projects: updatedProjects });
  };

  const handleAddLink = (projectId: string) => {
    const updatedProjects = projects.map((p) =>
      p.id === projectId
        ? { ...p, links: [...(p.links || []), { label: "", url: "" }] }
        : p,
    );
    updateFeaturedProjects({ projects: updatedProjects });
  };

  const handleUpdateLink = (
    projectId: string,
    linkIndex: number,
    field: string,
    value: string,
  ) => {
    const updatedProjects = projects.map((p) => {
      if (p.id === projectId) {
        const updatedLinks = p.links.map((link, i) =>
          i === linkIndex ? { ...link, [field]: value } : link,
        );
        return { ...p, links: updatedLinks };
      }
      return p;
    });
    updateFeaturedProjects({ projects: updatedProjects });
  };

  const handleDeleteLink = (projectId: string, linkIndex: number) => {
    const updatedProjects = projects.map((p) => {
      if (p.id === projectId) {
        return { ...p, links: p.links.filter((_, i) => i !== linkIndex) };
      }
      return p;
    });
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
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                프로젝트 제목{" "}
                <span className="text-white/50">
                  ({project.title.length}/50)
                </span>
              </label>
              <input
                type="text"
                value={project.title}
                onChange={(e) =>
                  handleUpdateProject(
                    project.id,
                    "title",
                    e.target.value.slice(0, 50),
                  )
                }
                maxLength={50}
                placeholder="프로젝트 제목"
                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                프로젝트 설명{" "}
                <span className="text-white/50">
                  ({project.description.length}/300)
                </span>
              </label>
              <textarea
                value={project.description}
                onChange={(e) =>
                  handleUpdateProject(
                    project.id,
                    "description",
                    e.target.value.slice(0, 300),
                  )
                }
                maxLength={300}
                placeholder="프로젝트 설명"
                rows={2}
                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10 resize-none"
              />
            </div>

            {/* 링크 섹션 */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="block text-xs font-semibold text-white/70">
                프로젝트 링크
              </label>
              {(project.links || []).length === 0 ? (
                <p className="text-xs text-white/40">
                  아직 링크를 추가하지 않았습니다.
                </p>
              ) : (
                (project.links || []).map((link, linkIndex) => (
                  <div key={linkIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) =>
                        handleUpdateLink(
                          project.id,
                          linkIndex,
                          "label",
                          e.target.value.slice(0, 20),
                        )
                      }
                      maxLength={20}
                      placeholder="링크 이름 (예: GitHub)"
                      className="flex-1 rounded-lg border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) =>
                        handleUpdateLink(
                          project.id,
                          linkIndex,
                          "url",
                          e.target.value.slice(0, 200),
                        )
                      }
                      maxLength={200}
                      placeholder="https://example.com"
                      className="flex-1 rounded-lg border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs text-white placeholder-white/40 outline-none transition focus:border-white/40 focus:bg-white/10"
                    />
                    <button
                      onClick={() => handleDeleteLink(project.id, linkIndex)}
                      className="text-xs text-red-400 hover:text-red-300 transition px-1.5"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
              <button
                onClick={() => handleAddLink(project.id)}
                className="w-full text-xs text-blue-400 hover:text-blue-300 transition py-1 rounded-lg border border-blue-400/30 hover:bg-blue-400/10"
              >
                + 링크 추가
              </button>
            </div>

            <div className="flex justify-end pt-2 border-t border-white/10">
              <button
                onClick={() => handleDeleteProject(project.id)}
                className="text-xs text-red-400 hover:text-red-300 transition"
              >
                프로젝트 삭제
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
