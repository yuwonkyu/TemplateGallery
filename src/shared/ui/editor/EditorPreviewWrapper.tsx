"use client";

import { memo, useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useEditorStore } from "@/shared/stores/editorStore";

// URL 정규화 함수 - 컴포넌트 외부에서 한 번만 정의
const normalizeUrl = (url: string): string => {
  if (!url) return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

// 섹션 컴포넌트를 메모이제이션
const ProfileSection = memo(
  ({
    profile,
  }: {
    profile: {
      name: string;
      title: string;
      description: string;
      image?: string;
    };
  }) => (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-linear-to-br from-white/20 to-white/5 shrink-0 overflow-hidden">
          {profile.image ? (
            <img
              src={profile.image}
              alt={profile.name || "프로필"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white">
            {profile.name || "이름"}
          </h3>
          <p className="text-sm text-muted">{profile.title || "직책"}</p>
        </div>
      </div>
      {profile.description && (
        <p className="mt-4 text-sm text-white/70 leading-relaxed whitespace-pre-wrap break-word">
          {profile.description}
        </p>
      )}
    </div>
  ),
);
ProfileSection.displayName = "ProfileSection";

const HeroSection = memo(
  ({
    heroStatement,
  }: {
    heroStatement: { headline: string; subheadline: string };
  }) => {
    if (!heroStatement.headline && !heroStatement.subheadline) return null;
    return (
      <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-8">
        {heroStatement.headline && (
          <h2 className="text-3xl font-bold text-white leading-tight">
            {heroStatement.headline}
          </h2>
        )}
        {heroStatement.subheadline && (
          <p className="mt-4 text-base text-white/80 leading-relaxed">
            {heroStatement.subheadline}
          </p>
        )}
      </div>
    );
  },
);
HeroSection.displayName = "HeroSection";

const ProjectsSection = memo(({ projects }: { projects: any[] }) => {
  if (projects.length === 0) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">프로젝트</h3>
      <div className="space-y-4">
        {projects.map((project) => {
          // 유효한 링크만 필터링 (label과 url이 모두 있는 링크만)
          const validLinks = (project.links || []).filter(
            (link: any) => link.label?.trim() && link.url?.trim(),
          );

          return (
            <div
              key={project.id}
              className="pb-4 border-b border-white/10 last:border-b-0"
            >
              <h4 className="font-semibold text-white">
                {project.title || "프로젝트명"}
              </h4>
              {project.description && (
                <p className="mt-1 text-sm text-white/70 whitespace-pre-wrap break-word">
                  {project.description}
                </p>
              )}
              {(project.concept ||
                project.tools ||
                project.duration ||
                project.participation) && (
                <div className="mt-2 space-y-1 text-xs text-white/65">
                  {project.concept && <p>의도/컨셉: {project.concept}</p>}
                  {project.tools && <p>사용 툴: {project.tools}</p>}
                  {project.duration && <p>작업 기간: {project.duration}</p>}
                  {project.participation && (
                    <p>참여도: {project.participation}</p>
                  )}
                </div>
              )}
              {validLinks.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {validLinks.map((link: any, idx: number) => (
                    <a
                      key={idx}
                      href={normalizeUrl(link.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs text-blue-400 hover:text-blue-300 transition px-2 py-1 rounded border border-blue-400/30 hover:bg-blue-400/10"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
ProjectsSection.displayName = "ProjectsSection";

const GallerySection = memo(({ items }: { items: any[] }) => {
  if (items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">작품 갤러리</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-white/10 bg-black/20 overflow-hidden"
          >
            <div className="aspect-4/3 bg-white/5">
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.title || "작품 썸네일"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-xs text-white/35">
                  썸네일 없음
                </div>
              )}
            </div>
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-medium text-white">
                  {item.title || "작품 제목"}
                </h4>
                <span className="text-[11px] text-white/50 uppercase">
                  {item.mediaType}
                </span>
              </div>
              {item.summary && (
                <p className="text-xs text-white/70 whitespace-pre-wrap break-word">
                  {item.summary}
                </p>
              )}
              {item.mediaUrl && (
                <a
                  href={normalizeUrl(item.mediaUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs text-blue-400 hover:text-blue-300 transition"
                >
                  작품 보기
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
GallerySection.displayName = "GallerySection";

const AboutSection = memo(({ about }: { about: any }) => {
  if (!about.style && !about.interests && !about.bio) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">소개</h3>
      <div className="space-y-3 text-sm text-white/75">
        {about.style && (
          <p className="whitespace-pre-wrap break-word">
            <span className="text-white/55">작업 스타일: </span>
            {about.style}
          </p>
        )}
        {about.interests && (
          <p className="whitespace-pre-wrap break-word">
            <span className="text-white/55">관심 분야: </span>
            {about.interests}
          </p>
        )}
        {about.bio && (
          <p className="whitespace-pre-wrap break-word">
            <span className="text-white/55">간단 이력: </span>
            {about.bio}
          </p>
        )}
      </div>
    </div>
  );
});
AboutSection.displayName = "AboutSection";

const TimelineSection = memo(({ items }: { items: any[] }) => {
  if (items.length === 0) return null;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">경력/경험</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="pb-4 border-l-2 border-white/20 pl-5 last:pb-0"
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
  );
});
TimelineSection.displayName = "TimelineSection";

const ContactSection = memo(
  ({
    contact,
  }: {
    contact: { email: string; phone?: string; links: any[] };
  }) => {
    if (!contact.email && contact.links.length === 0) return null;
    return (
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
              {contact.links
                .filter((link: any) => link.label?.trim() && link.url?.trim())
                .map((link: any, idx: number) => (
                  <a
                    key={idx}
                    href={normalizeUrl(link.url)}
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
    );
  },
);
ContactSection.displayName = "ContactSection";

export const EditorPreviewWrapper = () => {
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const t = useTranslations("editor");
  const common = useTranslations("common");
  const { data } = useEditorStore();
  const {
    profile,
    heroStatement,
    featuredProjects,
    gallery,
    about,
    timeline,
    contact,
  } = data;

  // 비어있는지 체크 (useMemo로 최적화)
  const isEmpty = useMemo(
    () =>
      !profile.name &&
      !heroStatement.headline &&
      featuredProjects.projects.length === 0 &&
      gallery.items.length === 0 &&
      !about.bio &&
      !about.style &&
      !about.interests &&
      timeline.items.length === 0 &&
      !contact.email,
    [
      profile.name,
      heroStatement.headline,
      featuredProjects.projects.length,
      gallery.items.length,
      about.bio,
      about.style,
      about.interests,
      timeline.items.length,
      contact.email,
    ],
  );

  return (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">{t("previewTitle")}</h2>
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setViewport("desktop")}
            className={`rounded-full px-3 py-1 transition ${
              viewport === "desktop"
                ? "bg-white/15 border border-white/30 text-white"
                : "border border-white/10 text-muted hover:text-white hover:border-white/20"
            }`}
          >
            {common("preview.desktop")}
          </button>
          <button
            onClick={() => setViewport("mobile")}
            className={`rounded-full px-3 py-1 transition ${
              viewport === "mobile"
                ? "bg-white/15 border border-white/30 text-white"
                : "border border-white/10 text-muted hover:text-white hover:border-white/20"
            }`}
          >
            {common("preview.mobile")}
          </button>
        </div>
      </div>

      {/* 미리보기 콘텐츠 */}
      <div
        className={`flex-1 transition-all duration-300 flex overflow-y-auto ${
          viewport === "mobile" ? "justify-center items-start pt-4" : ""
        }`}
      >
        <div
          className={`${
            viewport === "mobile"
              ? "w-93.75 border border-white/10 rounded-lg bg-white/5 max-h-full"
              : "flex-1"
          }`}
        >
          <div className={viewport === "mobile" ? "p-4" : ""}>
            {isEmpty ? (
              <div className="text-center py-12">
                <p className="text-sm text-muted">
                  왼쪽에서 정보를 입력하면 미리보기가 표시됩니다.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <ProfileSection profile={profile} />
                <HeroSection heroStatement={heroStatement} />
                <ProjectsSection projects={featuredProjects.projects} />
                <GallerySection items={gallery.items} />
                <AboutSection about={about} />
                <TimelineSection items={timeline.items} />
                <ContactSection contact={contact} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
