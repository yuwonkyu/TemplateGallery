# Portfolio Template Builder

코드 없이 포트폴리오를 만들고, 내가 소유하는 HTML/PDF로 내보낼 수 있는 노코드 에디터입니다.

## 주요 기능

### 📝 에디터
- **프로필 섹션**: 이름, 직책, 소개, 프로필 이미지 업로드
- **소개 문구**: 대표 문구 및 부제목 작성
- **대표 프로젝트**: 프로젝트 설명 및 링크 추가
- **타임라인**: 경력 및 경험 기록
- **연락처**: 이메일, 전화번호, 소셜 링크

### 👀 실시간 미리보기
- 데스크탑/모바일 뷰 전환
- 작성 내용 즉시 반영
- 모바일 뷰 스크롤 지원

### 💾 자동 저장
- 브라우저 로컬 스토리지에 자동 저장
- 페이지 새로고침 시에도 데이터 유지

### 📤 내보내기
- **HTML 내보내기**: 독립적인 HTML 파일 생성
- **PDF 내보내기**: 스타일이 적용된 PDF 생성
- 완전한 소유권 보장 (클라우드 종속 없음)

### 🎨 템플릿 갤러리
- 검색 기능 (템플릿명, 태그)
- 필터링 (전체, 개발자 등)
- 정렬 (최신순, 인기순, 가나다순)
- 무한 스크롤
- 미리보기 이미지 확대 기능

### 🌍 다국어 지원
- 한국어, 영어 지원
- 언어 전환 시 현재 경로 유지

## 기술 스택

- **Framework**: Next.js 15.5.12
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.18
- **State Management**: Zustand 5.0.11
- **Internationalization**: next-intl 4.8.2
- **PDF Generation**: html2pdf.js 0.14.0
- **Data Validation**: Zod 3.25.76
- **Package Manager**: pnpm

## 시작하기

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 빌드

```bash
pnpm build
pnpm start
```

## 프로젝트 구조

```
src/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # 다국어 라우팅
│   │   ├── page.tsx              # 홈 페이지
│   │   ├── editor/               # 에디터 페이지
│   │   └── templates/            # 템플릿 갤러리
│   └── globals.css               # 글로벌 스타일
├── i18n/                         # 국제화 설정
├── messages/                     # 번역 파일 (ko.json, en.json)
└── shared/                       # 공유 리소스
    ├── constants/                # 템플릿 데이터 등
    ├── lib/                      # 유틸리티 (export 등)
    ├── stores/                   # Zustand 스토어
    ├── types/                    # TypeScript 타입
    └── ui/                       # UI 컴포넌트
        ├── common/               # 공통 컴포넌트
        └── editor/               # 에디터 컴포넌트
```

## 에디터 사용법

1. **템플릿 선택**: 갤러리에서 원하는 템플릿 선택
2. **정보 입력**: 왼쪽 패널에서 섹션별로 정보 작성
3. **미리보기**: 오른쪽에서 실시간으로 결과 확인
4. **내보내기**: HTML 또는 PDF로 다운로드

## 주요 개발 히스토리

- `feat: 프로필 이미지 업로드 기능 추가`
- `feat: 미리보기 영역 개선`
- `feat: HTML 내보내기 개선`
- `feat: 템플릿 미리보기 이미지 추가`
- `feat: 템플릿 갤러리 상호작용성 개선`
- `feat: PDF 내보내기 기능 추가`
- `refactor: 섹션 네이밍 변경 "히어로 문장" → "소개 문구"`

## 라이센스

MIT
