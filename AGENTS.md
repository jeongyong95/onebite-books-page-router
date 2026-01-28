# AGENTS.md - AI 코딩 에이전트 가이드라인

이 문서는 Next.js Pages Router 프로젝트에서 작업하는 AI 코딩 에이전트를 위한 가이드라인입니다.

## 프로젝트 개요

| 항목 | 값 |
|------|-----|
| 프레임워크 | Next.js 16.x (Pages Router) |
| 언어 | TypeScript 5.x (strict 모드) |
| React | React 19.x + React Compiler |
| 스타일링 | Tailwind CSS 4.x + CSS Modules |
| 린팅 | ESLint 9.x (flat config) |
| 패키지 매니저 | npm |
| UI 언어 | 한국어 (ko-KR) |

## 빌드/린트/테스트 명령어

```bash
npm run dev        # 개발 서버 실행
npm run build      # 프로덕션 빌드
npm run start      # 프로덕션 서버 시작
npm run lint       # ESLint 실행
npx eslint src/pages/index.tsx  # 특정 파일 린트
npx eslint --fix   # 린트 오류 자동 수정
npx tsc --noEmit   # 타입 체크만 실행
```

**테스트**: 현재 테스트 프레임워크 미설정. 추가 시:
```bash
npm test -- path/to/test.test.ts              # 단일 테스트 파일
npm test -- --testNamePattern="테스트 이름"     # 특정 테스트
```

## 프로젝트 구조

```
src/
├── pages/                    # Next.js Pages Router
│   ├── api/                  # API 라우트 (서버리스 함수)
│   ├── books/[id].tsx        # 동적 라우트
│   ├── components/           # 공유 레이아웃 컴포넌트
│   ├── search/index.tsx
│   ├── _app.tsx              # Custom App (전역 레이아웃)
│   ├── _document.tsx         # Custom Document (HTML 구조)
│   ├── _error.tsx            # 500 에러 페이지
│   ├── 404.tsx               # 404 에러 페이지
│   └── index.tsx             # 홈 페이지
└── styles/globals.css        # Tailwind 전역 스타일
```

## 코드 스타일 가이드라인

### Import 순서

순서: 1) React/Next.js 코어, 2) 서드파티, 3) 내부 (`@/` 별칭), 4) 상대 경로
```typescript
import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import GlobalLayout from "@/pages/components/global-layout";
import style from "./index.module.css";
```
경로 별칭: `@/*`는 `./src/*`에 매핑됨

### 네이밍 컨벤션

| 요소 | 규칙 | 예시 |
|------|------|------|
| 페이지 컴포넌트 | PascalCase + Page 접미사 | `HomePage`, `BookDetailPage` |
| 레이아웃 컴포넌트 | PascalCase + Layout 접미사 | `GlobalLayout`, `SearchbarLayout` |
| API 핸들러 | `handler` 함수명 사용 | `export default function handler()` |
| 파일명 | kebab-case | `global-layout.tsx`, `global-layout.module.css` |

### 컴포넌트 패턴

**페이지 컴포넌트**:
```typescript
export default function HomePage() {
    return <h1 className={'text-5xl'}>페이지 제목</h1>;
}

HomePage.getLayout = (page: ReactNode) => {
    return <SearchbarLayout>{page}</SearchbarLayout>;
};
```

**레이아웃 컴포넌트**:
```typescript
export default function SearchbarLayout({children}: {children: ReactNode}) {
    return <>{children}</>;
}
```

### TypeScript

- strict 모드 활성화 - 모든 타입 오류 처리 필수
- 함수 매개변수와 props에 명시적 타입 사용
```typescript
type Data = { name: string };

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    res.status(200).json({ name: "John Doe" });
}
```

### 스타일링

CSS Modules와 Tailwind CSS 조합:
```tsx
import style from "./index.module.css";
<h1 className={`${style.title} text-5xl`}>제목</h1>  // 조합 사용
<h1 className={'text-5xl'}>제목</h1>                 // Tailwind만 사용
```

CSS Modules에서 `@apply` 사용:
```css
.container {
    @apply bg-white mx-auto px-4 max-w-150 min-h-screen shadow;
}
```

### 포맷팅

- TypeScript/TSX 파일: 4칸 들여쓰기
- JSON/설정 파일: 2칸 들여쓰기
- import문: 쌍따옴표, JSX 속성: 홑따옴표
- JSX: `className={'...'}` 중괄호 문법 사용

### 에러 처리

- `src/pages/404.tsx` - 페이지 없음 (404)
- `src/pages/_error.tsx` - 서버 오류 (500)

## 설정 파일

| 파일 | 용도 |
|------|------|
| `next.config.ts` | Next.js 설정 (React Compiler, strict 모드 활성화) |
| `tsconfig.json` | TypeScript 설정 (strict, ES2017, 경로 별칭 `@/*`) |
| `eslint.config.mjs` | ESLint 9 flat config (next/core-web-vitals + typescript) |
| `postcss.config.mjs` | PostCSS + Tailwind CSS v4 |

## 중요 사항

1. **React Compiler**: 활성화됨 - `useMemo`/`useCallback` 수동 최적화 불필요
2. **React Strict Mode**: 활성화됨 - 개발 모드에서 컴포넌트가 두 번 렌더링될 수 있음
3. **언어**: UI 텍스트는 한국어 (ko-KR)
4. **HTML lang**: `_document.tsx`에서 `ko-KR`로 설정됨

## 일반 작업

### 새 페이지 추가
1. `src/pages/` 디렉토리에 파일 생성
2. PascalCase + "Page" 접미사로 default export 함수 컴포넌트 작성
3. 특정 레이아웃 필요 시 `getLayout` 추가

### 새 API 라우트 추가
1. `src/pages/api/` 디렉토리에 파일 생성
2. 타입이 지정된 request/response로 `handler` 함수 default export

### 새 레이아웃 추가
1. `src/pages/components/`에 kebab-case 파일명으로 생성
2. `{children}: {children: ReactNode}` prop 받기
3. 페이지의 `getLayout` 함수에서 사용

## Git 커밋 컨벤션

### 커밋 메시지 형식

Conventional Commits 형식을 따르며, 본문은 한국어로 작성합니다.

```
<타입>: <설명>
```

### 타입 종류

| 타입 | 용도 |
|------|------|
| feat | 새로운 기능 추가 |
| fix | 버그 수정 |
| docs | 문서 변경 |
| style | 코드 포맷팅, 세미콜론 누락 등 (기능 변경 없음) |
| refactor | 코드 리팩토링 (기능 변경 없음) |
| test | 테스트 추가 또는 수정 |
| chore | 빌드 설정, 패키지 매니저 등 기타 변경 |

### 예시

```
feat: 도서 검색 기능 추가
fix: 404 페이지 스타일 깨짐 수정
docs: README 설치 가이드 추가
refactor: BookCard 컴포넌트 분리
```
