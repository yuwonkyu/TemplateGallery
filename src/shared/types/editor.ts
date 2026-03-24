// 에디터 섹션 타입 정의

export type SectionType =
  | "profile"
  | "heroStatement"
  | "featuredProjects"
  | "gallery"
  | "about"
  | "timeline"
  | "contact";

// 프로필 섹션
export interface ProfileSection {
  name: string;
  title: string;
  description: string;
  image?: string;
}

// 히어로 문장 섹션
export interface HeroStatementSection {
  headline: string;
  subheadline: string;
}

// 프로젝트
export interface Project {
  id: string;
  title: string;
  description: string;
  concept: string;
  tools: string;
  duration: string;
  participation: string;
  tags: string[];
  links: {
    label: string;
    url: string;
  }[];
  image?: string;
}

// 갤러리 작품
export interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  mediaType: "image" | "video" | "link";
  mediaUrl: string;
  thumbnail: string;
  tags: string[];
}

// 대표 프로젝트 섹션
export interface FeaturedProjectsSection {
  projects: Project[];
}

// 작품 갤러리 섹션
export interface GallerySection {
  items: GalleryItem[];
}

// 타임라인 항목
export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  tags: string[];
}

// 타임라인 섹션
export interface TimelineSection {
  items: TimelineItem[];
}

// 소개(About) 섹션
export interface AboutSection {
  style: string;
  interests: string;
  bio: string;
}

// 연락처 섹션
export interface ContactSection {
  email: string;
  phone?: string;
  links: {
    label: string;
    url: string;
  }[];
}

// 전체 에디터 데이터
export interface EditorData {
  profile: ProfileSection;
  heroStatement: HeroStatementSection;
  featuredProjects: FeaturedProjectsSection;
  gallery: GallerySection;
  about: AboutSection;
  timeline: TimelineSection;
  contact: ContactSection;
}

// 로컬스토리지 저장용
export interface EditorState {
  data: EditorData;
  selectedSection: SectionType;
  lastSaved: number;
}
