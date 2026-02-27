"use client";

import { Suspense, lazy } from "react";
import { useEditorStore } from "@/shared/stores/editorStore";
import type { SectionType } from "@/shared/types/editor";

// 동적 로드: 페이지 성능 개선
const ProfileForm = lazy(() =>
  import("./ProfileForm").then((mod) => ({
    default: mod.ProfileForm,
  })),
);
const HeroStatementForm = lazy(() =>
  import("./HeroStatementForm").then((mod) => ({
    default: mod.HeroStatementForm,
  })),
);
const FeaturedProjectsForm = lazy(() =>
  import("./FeaturedProjectsForm").then((mod) => ({
    default: mod.FeaturedProjectsForm,
  })),
);
const TimelineForm = lazy(() =>
  import("./TimelineForm").then((mod) => ({
    default: mod.TimelineForm,
  })),
);
const ContactForm = lazy(() =>
  import("./ContactForm").then((mod) => ({
    default: mod.ContactForm,
  })),
);

const sectionComponents: Record<SectionType, React.ComponentType> = {
  profile: ProfileForm,
  heroStatement: HeroStatementForm,
  featuredProjects: FeaturedProjectsForm,
  timeline: TimelineForm,
  contact: ContactForm,
};

const sectionIds: SectionType[] = [
  "profile",
  "heroStatement",
  "featuredProjects",
  "timeline",
  "contact",
];

interface EditorSectionTabsProps {
  sectionNames: string[];
}

export const EditorSectionTabs = ({ sectionNames }: EditorSectionTabsProps) => {
  const { selectedSection, setSelectedSection } = useEditorStore();

  return (
    <div className="mt-6">
      {/* 탭 네비게이션 */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {sectionNames.map((name, index) => {
          const sectionId = sectionIds[index];
          const isActive = selectedSection === sectionId;

          return (
            <button
              key={sectionId}
              onClick={() => setSelectedSection(sectionId)}
              className={`text-sm font-medium px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-white/15 text-white border border-white/30"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* 탭 콘텐츠 */}
      <div className="mt-6">
        <Suspense fallback={<div className="text-white/50">로딩 중...</div>}>
          {(() => {
            const Component = sectionComponents[selectedSection];
            return <Component />;
          })()}
        </Suspense>
      </div>
    </div>
  );
};
