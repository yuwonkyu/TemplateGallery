"use client";

import { useEditorStore } from "@/shared/stores/editorStore";

export const EditorPreview = () => {
  const { data } = useEditorStore();
  const { profile, heroStatement, featuredProjects, timeline, contact } = data;

  return (
    <div className="space-y-8">
      {/* 프로필 섹션 */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-linear-to-br from-white/20 to-white/5 shrink-0" />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white">
              {profile.name || "이름"}
            </h3>
            <p className="text-sm text-muted">{profile.title || "직책"}</p>
          </div>
        </div>
        {profile.description && (
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            {profile.description}
          </p>
        )}
      </div>

      {/* 히어로 섹션 */}
      {(heroStatement.headline || heroStatement.subheadline) && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          {heroStatement.headline && (
            <h2 className="text-2xl font-bold text-white">
              {heroStatement.headline}
            </h2>
          )}
          {heroStatement.subheadline && (
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              {heroStatement.subheadline}
            </p>
          )}
        </div>
      )}

      {/* 프로젝트 섹션 */}
      {featuredProjects.projects.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">프로젝트</h3>
          <div className="space-y-4">
            {featuredProjects.projects.map((project) => (
              <div
                key={project.id}
                className="pb-4 border-b border-white/10 last:border-b-0"
              >
                <h4 className="font-semibold text-white">
                  {project.title || "프로젝트명"}
                </h4>
                {project.description && (
                  <p className="mt-1 text-sm text-white/70">
                    {project.description}
                  </p>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-blue-400 hover:text-blue-300"
                  >
                    링크 보기
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 타임라인 섹션 */}
      {timeline.items.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">경력/경험</h3>
          <div className="space-y-4">
            {timeline.items.map((item) => (
              <div
                key={item.id}
                className="pb-4 border-l-2 border-white/20 pl-4 last:pb-0"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">
                      {item.title || "제목"}
                    </h4>
                    {item.description && (
                      <p className="mt-1 text-sm text-white/70">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-muted whitespace-nowrap">
                    {item.startDate} {item.endDate ? `~ ${item.endDate}` : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 연락처 섹션 */}
      {(contact.email || contact.links.length > 0) && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">연락처</h3>
          <div className="space-y-2">
            {contact.email && (
              <p className="text-sm">
                <span className="text-white/60">이메일: </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {contact.email}
                </a>
              </p>
            )}
            {contact.phone && (
              <p className="text-sm">
                <span className="text-white/60">전화: </span>
                <span className="text-white">{contact.phone}</span>
              </p>
            )}
            {contact.links.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-2">
                {contact.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1 rounded-full border border-white/20 text-xs text-blue-400 hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 비어있을 때 */}
      {!profile.name &&
        !heroStatement.headline &&
        featuredProjects.projects.length === 0 &&
        timeline.items.length === 0 &&
        !contact.email && (
          <div className="text-center py-12">
            <p className="text-sm text-muted">
              왼쪽에서 정보를 입력하면 미리보기가 표시됩니다.
            </p>
          </div>
        )}
    </div>
  );
};
