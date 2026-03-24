import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  EditorData,
  EditorState,
  SectionType,
  ProfileSection,
  HeroStatementSection,
  FeaturedProjectsSection,
  GallerySection,
  AboutSection,
  TimelineSection,
  ContactSection,
} from "@/shared/types/editor";

// 기본값
const defaultData: EditorData = {
  profile: {
    name: "",
    title: "",
    description: "",
    image: "",
  },
  heroStatement: {
    headline: "",
    subheadline: "",
  },
  featuredProjects: {
    projects: [],
  },
  gallery: {
    items: [],
  },
  about: {
    style: "",
    interests: "",
    bio: "",
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
  updateGallery: (gallery: Partial<GallerySection>) => void;
  updateAbout: (about: Partial<AboutSection>) => void;
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

      updateData: (newData: Partial<EditorData>) =>
        set((state: EditorStore) => ({
          data: { ...state.data, ...newData },
          lastSaved: Date.now(),
        })),

      updateProfile: (profile: Partial<ProfileSection>) =>
        set((state: EditorStore) => ({
          data: {
            ...state.data,
            profile: { ...state.data.profile, ...profile },
          },
          lastSaved: Date.now(),
        })),

      updateHeroStatement: (hero: Partial<HeroStatementSection>) =>
        set((state: EditorStore) => ({
          data: {
            ...state.data,
            heroStatement: { ...state.data.heroStatement, ...hero },
          },
          lastSaved: Date.now(),
        })),

      updateFeaturedProjects: (projects: Partial<FeaturedProjectsSection>) =>
        set((state: EditorStore) => ({
          data: {
            ...state.data,
            featuredProjects: {
              ...state.data.featuredProjects,
              ...projects,
            },
          },
          lastSaved: Date.now(),
        })),

      updateGallery: (gallery: Partial<GallerySection>) =>
        set((state: EditorStore) => ({
          data: {
            ...state.data,
            gallery: {
              ...state.data.gallery,
              ...gallery,
            },
          },
          lastSaved: Date.now(),
        })),

      updateAbout: (about: Partial<AboutSection>) =>
        set((state: EditorStore) => ({
          data: {
            ...state.data,
            about: { ...state.data.about, ...about },
          },
          lastSaved: Date.now(),
        })),

      updateTimeline: (timeline: Partial<TimelineSection>) =>
        set((state: EditorStore) => ({
          data: {
            ...state.data,
            timeline: {
              ...state.data.timeline,
              ...timeline,
            },
          },
          lastSaved: Date.now(),
        })),

      updateContact: (contact: Partial<ContactSection>) =>
        set((state: EditorStore) => ({
          data: {
            ...state.data,
            contact: { ...state.data.contact, ...contact },
          },
          lastSaved: Date.now(),
        })),

      setSelectedSection: (section: SectionType) =>
        set({ selectedSection: section }),

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
      merge: (persistedState: any, currentState: any) => {
        const persistedData = persistedState?.data || {};

        return {
          ...currentState,
          ...persistedState,
          data: {
            ...defaultData,
            ...persistedData,
            profile: {
              ...defaultData.profile,
              ...(persistedData.profile || {}),
            },
            heroStatement: {
              ...defaultData.heroStatement,
              ...(persistedData.heroStatement || {}),
            },
            featuredProjects: {
              ...defaultData.featuredProjects,
              ...(persistedData.featuredProjects || {}),
            },
            gallery: {
              ...defaultData.gallery,
              ...(persistedData.gallery || {}),
              items: persistedData.gallery?.items || [],
            },
            about: {
              ...defaultData.about,
              ...(persistedData.about || {}),
            },
            timeline: {
              ...defaultData.timeline,
              ...(persistedData.timeline || {}),
            },
            contact: {
              ...defaultData.contact,
              ...(persistedData.contact || {}),
              links: persistedData.contact?.links || [],
            },
          },
        };
      },
      // 저장된 데이터 마이그레이션
      migrate: (persistedState: any, _version: number) => {
        if (persistedState.data?.featuredProjects) {
          const projects = persistedState.data.featuredProjects.projects || [];
          // 기존 'link' 필드를 'links' 배열로 변환
          persistedState.data.featuredProjects.projects = projects.map(
            (project: any) => {
              const { link, ...rest } = project;
              return {
                ...rest,
                concept: project.concept || "",
                tools: project.tools || "",
                duration: project.duration || "",
                participation: project.participation || "",
                links:
                  project.links || (link ? [{ label: "링크", url: link }] : []),
              };
            },
          );
        }

        if (!persistedState.data?.gallery) {
          persistedState.data = {
            ...persistedState.data,
            gallery: { items: [] },
          };
        }

        if (!persistedState.data?.about) {
          persistedState.data = {
            ...persistedState.data,
            about: { style: "", interests: "", bio: "" },
          };
        }

        return persistedState;
      },
    },
  ),
);
