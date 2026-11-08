# 공재성 — 실행의 기록

HTML/CSS/JavaScript로 만든 정적 포트폴리오입니다. 별도의 설치·빌드 없이 작동하며 GitHub Pages의 `/portfolio/` 하위 경로를 지원합니다.

현재 상태: 개발 및 주요 브라우저 기능 검수 완료. GitHub 저장소 생성 완료, 소스 업로드 및 Pages 배포 진행 중입니다.

## 파일 구조

| 파일 / 폴더 | 용도 |
| --- | --- |
| `dist/index.html` | 메인 화면, 자기소개, 연락 영역 |
| `dist/style.css` | 색상, 크기, 모바일 배치, 애니메이션 |
| `dist/data.js` | 6개 분류, 29개 사례, 이미지·로고 경로, 증빙 링크 |
| `dist/app.js` | 탭, 상세 페이지, URL, 이미지 확대 및 임시 미리보기 |
| `dist/assets/` | 직접 교체할 이미지 파일 |
| `.github/workflows/deploy.yml` | main 변경 시 GitHub Pages 배포 |
| `validate.cjs` | 사례 필수 항목, 중복 ID, 파일 경로 검사 |
| `CONTENT_CHECKLIST.md` | 실제 자료가 필요한 항목 |
| `TEST_REPORT.md` | 실행한 검증과 남은 검증 |
| `screenshots/` | PC·모바일·경력 탭·상세 화면 |

## PC에서 미리 보기

ZIP을 풀고 `dist/index.html`을 Chrome으로 여세요. 네트워크 없이도 기본 글꼴로 표시됩니다. 공유 링크 복사 기능은 HTTPS 배포나 localhost에서 정상 지원됩니다.

Python이 있다면 프로젝트 폴더에서 `python -m http.server 8000 --directory dist`를 실행하고 `http://localhost:8000/`으로 접속해도 됩니다.

## 이미지 바꾸기

1. PNG/JPG/WebP 파일을 `dist/assets/`에 넣습니다. 예: `report-01.webp`.
2. VS Code 또는 GitHub의 편집 화면에서 `dist/data.js`를 엽니다.
3. 해당 사례의 `id` 또는 제목을 검색합니다.
4. `images`의 빈 `src`를 `./assets/report-01.webp`로 바꿉니다.
5. `alt`에 이미지 내용, `caption`에 화면 아래 설명을 적습니다.

```js
images: [
  {src: './assets/report-01.webp', alt: '비식별 캠페인 비교 보고서', caption: '동일 기간 캠페인별 성과 비교'},
  {src: './assets/report-02.webp', alt: '운영 조치 기록', caption: '변경 일자와 검증 기준'}
]
```

여러 개를 넣으면 갤러리가 자동으로 생성되고 누르면 확대됩니다. 파일명 대소문자를 맞추고, 경로 맨 앞에 `/assets/` 대신 `./assets/`를 사용하세요. 빈 경로는 디자인된 추가 예정 영역으로 표시됩니다. 깨진 이미지도 오류 안내로 대체됩니다.

프로필은 `profile`, 회사 로고는 `companies.hackers` 및 `companies.ifc`의 `src`와 `alt`를 바꾸면 됩니다. 회사 로고는 상세 화면 상단에 표시됩니다.

상세 화면 아래의 **내 이미지로 미리보기**는 파일을 서버로 전송하지 않습니다. 현재 브라우저 메모리에만 보관되며 새로고침하면 사라집니다. PNG/JPG/WebP/GIF, 장당 10MB 이하를 지원합니다. 영구 반영은 파일 업로드와 data.js 변경 후 재배포가 필요합니다.

## 본문 바꾸기

`dist/data.js`의 해당 사례에서 아래 필드를 수정하세요. 따옴표와 쉼표를 유지하고 줄바꿈이 필요하면 `\n`을 사용합니다.

| 필드 | 화면 내용 |
| --- | --- |
| `title`, `summary` | 제목·요약 |
| `problem`, `cause` | 문제 또는 학습 목표·배경과 원인 |
| `solution` | 해결·준비·실행 과정 목록 |
| `test` | 검증 조건 및 TEST |
| `result`, `insight` | 결과와 배운 점 |
| `role`, `period`, `tools` | 본인의 역할·기간·사용 기술 |
| `images`, `evidence` | 이미지와 증빙 링크 |
| `status` | `record`는 기록, `draft`는 작성 예정 |

하단 `drafts`와 `certificates` 배열은 간단한 편집용 초안입니다. 해당 항목을 풍부하게 수정하려면 배열에서 해당 줄을 빼고 아래의 일반 프로젝트 객체로 추가하세요. 같은 `id`를 중복으로 추가하지 마세요.

메인 자기소개·이메일·경력 타임라인은 `dist/index.html`에서 수정합니다. 이메일이 확인되면 Contact 버튼을 `mailto:본인이메일`로 변경할 수 있습니다.

## 새 프로젝트 추가

`data.js` 맨 아래에 다음 형태로 추가합니다. `id`는 영문·숫자·하이픈으로 고유하게 정하고, 공개 후에는 URL 유지를 위해 바꾸지 않는 것을 권장합니다.

```js
PORTFOLIO.projects.push({
  id: 'new-project',
  category: 'career',
  company: 'hackers',
  group: 'common',
  title: '새 프로젝트 제목',
  tag: 'ANALYSIS / ACTION',
  summary: '프로젝트 요약',
  status: 'draft',
  role: '본인의 실제 담당 역할',
  period: '실제 수행 기간',
  tools: ['Excel'],
  problem: '당시 과제와 발견 근거',
  cause: '원인 또는 가설',
  solution: ['직접 실행한 내용', '협업한 내용'],
  test: '비교 기간, 기준, 검증 방법',
  result: '확인한 결과와 한계',
  insight: '배운 점과 다음 실행',
  images: [{src: '', alt: '증빙 자료', caption: '자료 추가 예정'}],
  metrics: [],
  evidence: []
});
```

카테고리: `career`, `experience`, `certificates`, `awards`, `volunteer`, `education`.
해커스 하위 영역: `common`, `job`, `remote`, `offline`.
데이터 운영 경력은 `company: 'ifc'`로 지정합니다. 카드 수는 자동 갱신됩니다.

## 실제 수치와 전후 비교 차트

공개 허용된 실측값이 있을 때만 `metrics`에 다음 필드를 넣습니다. 원자료가 없으므로 현재 화면에는 성과 차트를 억지로 넣지 않았습니다. 메인 그림의 막대는 업무 방식의 일러스트이며 실제 성과 데이터가 아닙니다.

- `label`: 지표명
- `before`, `after`: 0 이상 실제 숫자 (문자열 제외)
- `unit`: 단위 (예: `%`, `건`)
- `periodBefore`, `periodAfter`: 비교 기간
- `source`: 출처
- `note`: 비교 조건 및 인과 해석의 한계

필수 비교 기간·출처가 없거나 숫자가 잘못되면 차트를 표시하지 않습니다. ROAS 변화는 %와 %p를 구분하세요. 수치가 비공개라면 비식별 자료와 공개 허용 범위를 확인한 뒤에만 추가하세요.

## GitHub Pages 최초 배포

1. `hehat00-ai` 계정에 `portfolio`라는 새 저장소를 만듭니다. 기존 저장소가 있으면 덮어쓰기 전에 확인합니다.
2. 프로젝트 파일을 업로드합니다. 폴더 구조, 특히 `.github/workflows/deploy.yml`을 유지합니다. ZIP 파일 자체를 올리는 것이 아닙니다.
3. Settings → Pages → Build and deployment에서 Source를 **GitHub Actions**로 설정합니다.
4. `main` 브랜치에 커밋합니다. Actions의 `Deploy portfolio to GitHub Pages`가 성공하는지 확인합니다. 필요하면 Run workflow를 실행합니다.
5. Pages 화면에 표시된 실제 URL을 열고, 상세 사례 링크 새로고침과 이미지 표시를 확인합니다.

예상 URL은 `https://hehat00-ai.github.io/portfolio/`이지만, 배포 성공 전에는 실제 제출 URL로 안내하지 않습니다.

## 수정 후 재배포

GitHub에서 이미지 파일과 `dist/data.js`를 수정하고 main에 Commit changes를 누르면 워크플로가 실행됩니다. Actions가 초록색으로 완료된 후 사이트에서 Ctrl+Shift+R로 새로고침하세요.

실패하면 Actions 로그를 확인합니다. 데이터 문법 검사 실패는 따옴표·쉼표·중복 ID·누락 필드를 점검합니다. Pages 권한 실패는 저장소 Settings → Pages 및 Actions 권한을 확인합니다. 비밀번호나 토큰을 프런트엔드 코드에 넣지 마세요.

## 접근성 및 동작

- 메인 탭: 방향키, Home, End로 이동. Enter/Space로 버튼 실행.
- 상세 및 이미지 확대: Escape로 닫기. 모달 내 포커스 유지.
- 사례마다 `#/career/hackers/job/bid-response` 같은 고유 해시 URL 지원.
- 브라우저 뒤로/앞으로와 새로고침 지원.
- OS 모션 감소 설정을 사용하면 애니메이션 비활성화.
- 외부 폰트가 차단돼도 시스템 글꼴로 표시.

## 콘텐츠 기준

회사 소속 관계, 수상 등급, 행사 규모, 참가자 수, 성과 수치, 자동화 실운영 여부를 임의로 만들지 않았습니다. `(주)아이에프씨그룹`을 사용하며 한화 계열사 여부는 확정하지 않았습니다. 업무 기록 상태는 증빙 이미지 검증 완료를 의미하지 않습니다. 채용 제출 전에는 `CONTENT_CHECKLIST.md`의 내용을 확인해 주세요.
