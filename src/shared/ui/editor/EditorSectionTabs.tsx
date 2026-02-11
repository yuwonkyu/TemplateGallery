"use client";

import { useEditorStore } from "@/shared/stores/editorStore";
import {
  ProfileForm,
  HeroStatementForm,
  FeaturedProjectsForm,
  TimelineForm,
  ContactForm,
} from "@/shared/ui/editor";
import type { SectionType } from "@/shared/types/editor";

const sectionComponents: Record<SectionType, React.ReactNode> = {
  profile: <ProfileForm />,
  heroStatement: <HeroStatementForm />,
  featuredProjects: <FeaturedProjectsForm />,
  timeline: <TimelineForm />,
  contact: <ContactForm />,
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
      <div className="mt-6">{sectionComponents[selectedSection]}</div>
    </div>
  );
};
