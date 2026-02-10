# Template Gallery

Next.js와 현대적인 웹 개발 스택으로 구성된 다국어 지원 템플릿 갤러리 프로젝트입니다.

## 프로젝트 개요

Template Gallery는 재사용 가능한 UI 컴포넌트와 안정적인 아키텍처를 제공하는 Next.js 기반 웹 애플리케이션입니다. 한국어(ko), 영어(en) 등 다국어를 지원하며, 사용자 친화적인 템플릿 편집 및 갤러리 기능을 제공합니다.

## 개발 과정 (초기 버전 v0.1.0)

### Phase 1: 프로젝트 초기화 및 기본 설정
- **Next.js 15** 프레임워크 선택
- **TypeScript** 타입 안정성 확보
- **Tailwind CSS 4.1** 스타일링 도입
- **pnpm** 패키지 매니저 설정
- Path aliases 구성 (TypeScript 경로 최적화)

### Phase 2: 국제화(i18n) 구현
- **next-intl** 라이브러리 도입 (v4.8.2)
- 다국어 메시지 파일 구성 (src/messages/en.json, ko.json)
- 미들웨어를 통한 locale 자동 감지 (src/middleware.ts)
- 언어 전환 UI 컴포넌트 구현 (LocaleSwitcher.tsx)

### Phase 3: 아키텍처 설계
- **FSD (Feature-Sliced Design)** 패턴 적용
- 프로젝트 폴더 구조 정리 (src/ 중심 구조)
- 공유 리소스(shared) 모듈화
- UI 컴포넌트 조직화 (shared/ui/common/)

### Phase 4: 상태 관리 및 유틸리티
- **Zustand** v5.0.11 상태 관리 라이브러리 통합
- **Zod** v3.25.76 데이터 검증 스키마 설정
- 공통 UI 컴포넌트 구현:
  - Button.tsx - 기본 버튼 컴포넌트
  - ButtonLink.tsx - 링크 스타일 버튼
  - Container.tsx - 레이아웃 컨테이너
  - Panel.tsx - 패널 컴포넌트
  - Pill.tsx - 태그/배지 컴포넌트
  - LocaleSwitcher.tsx - 언어 전환 컴포넌트

### Phase 5: 페이지 라우팅 구현
- 동적 라우팅 구현:
  - src/app/[locale]/layout.tsx - 다국어 레이아웃
  - src/app/[locale]/page.tsx - 홈 페이지
  - src/app/editor/page.tsx - 에디터
  - src/app/templates/ - 템플릿 섹션
- 로딩 상태 UI (loading.tsx)
- 글로벌 스타일 설정 (globals.css)

## 기술 스택

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1
- **State Management**: Zustand
- **Data Validation**: Zod
- **Package Manager**: pnpm
- **Architecture**: FSD (Feature-Sliced Design)

## 설치

\\\ash
pnpm install
\\\

## 개발 서버 실행

\\\ash
pnpm dev
\\\

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 빌드

\\\ash
pnpm build
pnpm start
\\\

## 프로젝트 구조 (FSD)

\\\
src/
 app/                    # Next.js App Router
 shared/                 # 공유 리소스
    ui/                # UI 컴포넌트
       common/        # 공통 컴포넌트 (Button, Card 등)
       layouts/       # 레이아웃 컴포넌트
    lib/               # 유틸리티 함수
       hooks/         # React Hooks (useForm, useClickOutside 등)
       utils/         # 헬퍼 함수
       helpers/       # 비즈니스 로직 헬퍼
    stores/            # Zustand 상태 관리
    types/             # TypeScript 타입 및 Zod 스키마
    constants/         # 상수 정의
    config/            # 설정 파일
 features/              # 기능 모듈
 entities/              # 데이터 엔티티
 pages/                 # 페이지 컴포넌트
\\\

## 주요 기능

-  다국어 지원 (가장 우선)
-  TypeScript 설정 (Path aliases 포함)
-  Tailwind CSS 4.1 스타일링
-  Zustand를 이용한 상태 관리
-  Zod를 이용한 데이터 검증
-  React Hooks 모음
-  재사용 가능한 UI 컴포넌트
-  FSD 아키텍처 구조
-  반응형 레이아웃

## 현재 상태 (v0.1.0)

### ✅ 완료된 기능
- 다국어 지원 시스템 (한국어, 영어)
- 기본 UI 컴포넌트 세트 구현
- 반응형 레이아웃 설계
- TypeScript 타입 안전성 구성
- 상태 관리 인프라 (Zustand)
- 라우팅 구조 (App Router, 동적 라우팅)
- 데이터 검증 스키마 (Zod)
- 미들웨어 기반 locale 감지

### 🔄 진행 중
- 템플릿 갤러리 기능 개발
- 에디터 페이지 기능 구현
- 데이터 API 통합

### 📋 향후 예정
- 템플릿 저장 및 로드 기능
- 사용자 계정 관리
- 템플릿 공유 기능
- 분석 및 로깅
- E2E 테스트 구성

## 라이센스

MIT
