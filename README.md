# 우리 언제 만나?

친구 모임별로 가능한 날짜를 모아 공통 일정을 찾는 웹 앱입니다.

서비스: https://meet-day-friends-kr.subtlenashi4.chatgpt.site

## DM방마다 다른 링크 사용하기

1. 홈페이지에서 이름과 약속 이름을 입력해 약속방을 만듭니다.
2. **초대 링크 복사**를 눌러 DM방 1에 공유합니다.
3. 로고를 눌러 홈페이지로 돌아가 새 약속방을 만듭니다.
4. 새 초대 링크를 DM방 2에 공유합니다.

약속방을 만들 때마다 고유 UUID가 생성됩니다. 참여자와 가능한 날짜는 약속방별로 저장되어 서로 섞이지 않습니다. 같은 사람이 여러 방에 참여해도 각 방의 선택은 독립적입니다.

## 기능

- 이름으로 간편 참여 및 초대 링크 공유
- 월별 달력에서 가능한 날짜 선택과 저장
- 전원 가능한 날짜와 참여 가능 인원순 날짜 표시
- 10초마다 참여자 및 저장된 일정 갱신
- Cloudflare D1에 일정 저장

이름 입력은 본인 인증이 아닙니다. 참여 토큰은 해당 브라우저에 저장되며, 같은 브라우저에서 다시 열면 본인 일정을 수정할 수 있습니다. 초대 링크를 아는 사람은 방의 일정과 이름을 볼 수 있습니다.

## 개발

Node.js 22.13 이상. React, TypeScript, Vinext, Cloudflare Workers, D1, Drizzle을 사용합니다.

```sh
npm ci
npm run build
```

빌드 후 로컬 DB를 준비합니다. 최초 마이그레이션은 한 번만 실행합니다.

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_first_spectrum.sql
npm start
```

`.openai/hosting.json`은 기존 Sites 배포의 식별자와 D1 바인딩을 담습니다. GitHub 업로드와 Sites 배포는 별개이며 GitHub push만으로 운영 사이트가 자동 갱신되지는 않습니다.

## 검증

타입 검사 및 프로덕션 빌드 통과. 로컬 API에서 방 생성, 두 명 참여, 날짜 저장, 공통 날짜 계산, 잘못된 참여 토큰의 수정 거절을 확인했습니다.

## GitHub Pages

주소: https://playboikarim.github.io/meet-day/

화면은 GitHub Pages의 docs 폴더에서 제공하고 API와 D1 데이터는 기존 Cloudflare 서버를 사용합니다. 방 링크는 각 호스트의 현재 경로를 유지합니다. 브라우저별 참여 정보는 도메인마다 별도로 저장됩니다.

Pages 화면 갱신: node node_modules/vite/bin/vite.js build --config vite.pages.config.ts 실행 후 docs/.nojekyll 파일을 유지하고 main에 push합니다.

