// 에디터 섹션 타입 정의

export type SectionType =
  | "profile"
  | "heroStatement"
  | "featuredProjects"
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
  tags: string[];
  links: {
    label: string;
    url: string;
  }[];
  image?: string;
}

// 대표 프로젝트 섹션
export interface FeaturedProjectsSection {
  projects: Project[];
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
  timeline: TimelineSection;
  contact: ContactSection;
}

// 로컬스토리지 저장용
export interface EditorState {
  data: EditorData;
  selectedSection: SectionType;
  lastSaved: number;
}
