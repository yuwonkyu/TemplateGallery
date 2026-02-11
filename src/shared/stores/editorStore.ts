import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  EditorData,
  EditorState,
  SectionType,
  ProfileSection,
  HeroStatementSection,
  FeaturedProjectsSection,
  TimelineSection,
  ContactSection,
} from "@/shared/types/editor";

// 기본값
const defaultData: EditorData = {
  profile: {
    name: "",
    title: "",
    description: "",
  },
  heroStatement: {
    headline: "",
    subheadline: "",
  },
  featuredProjects: {
    projects: [],
  },
  timeline: {
    items: [],
  },
  contact: {
    email: "",
    phone: "",
    links: [],
  },
};

interface EditorStore extends EditorState {
  // 데이터 업데이트
  updateData: (data: Partial<EditorData>) => void;
  updateProfile: (profile: Partial<ProfileSection>) => void;
  updateHeroStatement: (hero: Partial<HeroStatementSection>) => void;
  updateFeaturedProjects: (projects: Partial<FeaturedProjectsSection>) => void;
  updateTimeline: (timeline: Partial<TimelineSection>) => void;
  updateContact: (contact: Partial<ContactSection>) => void;

  // 섹션 선택
  setSelectedSection: (section: SectionType) => void;

  // 초기화
  resetData: () => void;

  // 로컬스토리지 로드
  loadData: () => void;
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      data: defaultData,
      selectedSection: "profile",
      lastSaved: Date.now(),

      updateData: (newData) =>
        set((state) => ({
          data: { ...state.data, ...newData },
          lastSaved: Date.now(),
        })),

      updateProfile: (profile) =>
        set((state) => ({
          data: {
            ...state.data,
            profile: { ...state.data.profile, ...profile },
          },
          lastSaved: Date.now(),
        })),

      updateHeroStatement: (hero) =>
        set((state) => ({
          data: {
            ...state.data,
            heroStatement: { ...state.data.heroStatement, ...hero },
          },
          lastSaved: Date.now(),
        })),

      updateFeaturedProjects: (projects) =>
        set((state) => ({
          data: {
            ...state.data,
            featuredProjects: {
              ...state.data.featuredProjects,
              ...projects,
            },
          },
          lastSaved: Date.now(),
        })),

      updateTimeline: (timeline) =>
        set((state) => ({
          data: {
            ...state.data,
            timeline: {
              ...state.data.timeline,
              ...timeline,
            },
          },
          lastSaved: Date.now(),
        })),

      updateContact: (contact) =>
        set((state) => ({
          data: {
            ...state.data,
            contact: { ...state.data.contact, ...contact },
          },
          lastSaved: Date.now(),
        })),

      setSelectedSection: (section) => set({ selectedSection: section }),

      resetData: () =>
        set({
          data: defaultData,
          selectedSection: "profile",
          lastSaved: Date.now(),
        }),

      loadData: () => {
        // Zustand persist 미들웨어가 자동으로 로드함
        // 필요시 추가 로직 구현
      },
    }),
    {
      name: "editor-storage", // 로컬스토리지 키
    },
  ),
);
