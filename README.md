# MYDY

민영(Minyoung Ha), 대열(Daeyeol Ryu), 아들 백호(Baekho Ryu)의 일상에서 시작된 사이드 프로젝트를 모아 둔 가족의 개인 홈페이지입니다. 프로젝트 제작자는 민영과 대열입니다. 종이 노트, 직접 그린 SVG, 부드러운 색을 사용하고 가족의 생활과 제작 동기를 중심으로 소개합니다.

- 대표 주소: https://mydy.kr/
- 공개 서비스: [알버타 출생증명서 한글 번역문 생성](https://ab-birthcert-ko.mydy.kr/), [AB Care Map](https://abcaremap.mydy.kr/), [KoreaVancouverBot](https://korvanbot.mydy.kr/)
- 만든 사람: Minyoung Ha · [Daeyeol Ryu](https://yoobato.com)

## 구성

빌드 도구나 외부 UI 라이브러리 없이 HTML·CSS·SVG로 구성합니다. 배포 대상은 `site/`뿐입니다.

| 파일 | 역할 |
| --- | --- |
| `site/index.html` | 소개, 프로젝트 모음, 만든 사람 안내, AdSense 연결 코드 |
| `site/style.css`, `site/mark.svg` | 반응형 디자인과 로고 |
| `site/og-image.png` | 링크 공유용 1200 × 630 PNG 썸네일 |
| `scripts/generate-social-image.mjs` | 홈페이지 가족 그림을 재사용하는 공유 이미지 생성 도구 |
| `site/services/*.html`, `site/en/services/*.html` | 공개 서비스 3개 및 접근 제한 프로젝트 2개의 한·영 상세 소개 |
| `site/guides/`, `site/en/guides/` | 가이드 목록과 번역·지도·알림 사용 가이드 |
| `site/privacy.html` | 개인정보 및 광고 안내 |
| `site/ads.txt` | Google 광고 판매자 정보 |
| `site/robots.txt`, `site/sitemap.xml` | 검색엔진 안내 |

## 서비스 목록 관리

홈페이지는 공개 소개가 승인된 9개 프로젝트를 카드로 소개합니다. 운영 중인 서비스는 이용 링크를 제공하고, 개발·베타·프로토타입은 현재 상태를 표시합니다. 프로젝트별 설명, 이용 상태, 링크와 주의사항은 `site/index.html`에서 관리합니다. 현재 소개 범위는 우리의 청첩장, 출생증명서 번역, AB Care Map, Drive in Alberta, CaLog, BabyLog, ChutChut, PogeunStory, KoreaVancouverBot입니다. KoreaVancouverBot은 총영사관 게시판 4개를 매시간 확인하는 비공식 알림 채널이며 서비스 소개 페이지 링크를 제공합니다. 앱/API는 해당 제품에 묶어 소개합니다. PogeunStory는 `products/pogeun-story`의 가족 목소리 그림 동화 프로젝트이며, 비공개 가족 전용으로 소개합니다. 추가 제품은 공개 승인을 확인한 뒤 추가하며, 개인 기록·내부 서버 정보·실제 사용자 데이터는 포함하지 않습니다.

## 로컬 확인

```sh
python3 -m http.server 5190 --directory site
```

http://127.0.0.1:5190/ 에서 확인합니다. 홈페이지에는 공식 AdSense 스크립트가 있으므로 자동 브라우저 검증 시 `pagead2.googlesyndication.com` 요청을 차단하세요. 실제 광고를 클릭하거나 노출을 반복해서 만들지 않습니다.

## 배포와 도메인

현재 DNS 상태와 단계별 연결 방법은 [도메인 연결 안내](docs/domain-setup.md)를 참고하세요.

`main`에 푸시하면 GitHub Actions가 GitHub Pages로 배포합니다. 저장소 Settings → Pages의 Source는 GitHub Actions, Custom domain은 `mydy.kr`로 설정합니다.

루트 도메인의 A 레코드:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

기존 파킹용 루트 A 레코드를 교체하되 서비스 서브도메인·메일·검증용 TXT 레코드는 유지합니다. DNS 연결 후 GitHub의 인증서 발급과 Enforce HTTPS를 확인합니다.

## AdSense

게시자 ID는 `ca-pub-4015788090404207`입니다. 홈페이지 `<head>`에 공식 스크립트와 계정 메타 태그가 있으며 루트 `ads.txt`를 제공합니다. DNS 연결 후 실제 `https://mydy.kr/`와 `/ads.txt` 응답을 확인하고 AdSense에서 소유권 확인·검토 요청을 진행합니다.

코드 배포는 사이트 승인이나 광고 수익을 보장하지 않습니다. 자동 광고와 지역별 동의 메시지는 AdSense 콘솔에서 별도로 관리합니다. 수동 광고 단위나 버튼 연동 광고는 포함하지 않습니다. 이 홈페이지에 별도 Google Analytics 태그는 사용하지 않습니다.

## AI 활용과 저작권

AI의 도움을 받아 디자인·코드·문서를 작성했습니다. 클라이언트 라이브러리와 외부 글꼴을 번들로 배포하지 않으며 시스템 글꼴과 프로젝트용 SVG를 사용합니다. Google AdSense는 Google의 외부 서비스입니다.

© Daeyeol Ryu. All rights reserved. 프로젝트 자체에는 별도의 오픈소스 라이선스를 부여하지 않았습니다.

## 링크 공유 이미지

홈페이지의 Open Graph 및 Twitter 카드 메타데이터에 `https://mydy.kr/og-image.png`를 지정합니다. PNG는 저장소에 포함하므로 배포 시 빌드가 필요하지 않습니다. 화면의 가족 그림과 동일한 SVG를 사용하며 외부 이미지·글꼴을 요청하지 않습니다.

이미지를 수정하려면 Playwright가 설치된 환경에서 아래 도구를 실행합니다. 다른 프로젝트의 설치를 재사용할 때는 `MYDY_PLAYWRIGHT_MODULE`에 해당 `playwright/index.mjs`의 절대 경로를 지정할 수 있습니다.

```sh
node scripts/generate-social-image.mjs
```

카카오톡 등 공유 서비스가 예전 미리보기를 캐시했다면 즉시 갱신되지 않을 수 있습니다. 이미지 교체 시에는 이미지 URL 버전도 변경하고, 해당 플랫폼의 공유 캐시 갱신 도구를 사용합니다.

## 한국어 / English

- 한국어 홈페이지: `/`, 개인정보 안내: `/privacy.html`
- 영어 홈페이지: `/en/`, 개인정보 안내: `/en/privacy.html`
- 각 페이지 상단의 한국어 / English 링크는 대응하는 언어의 페이지로 이동합니다. 자동 언어 전환이나 쿠키 없이 JavaScript를 꺼도 작동합니다.
- 두 언어는 동일한 CSS를 사용합니다. 가족 이름은 화면 크기와 언어에 관계없이 세로로 표시합니다.
- 영어 설명은 홈페이지 소개의 번역이며, 연결된 프로젝트의 언어나 접근 권한을 변경하지 않습니다.
- 각 페이지의 `lang`, canonical, `hreflang` 및 사이트맵을 함께 유지합니다. 내용 변경 시 한국어와 영어 페이지 모두 업데이트합니다.
- 영어 공유 이미지는 `node scripts/generate-social-image.mjs --en`으로 생성하며 `site/og-image-en.png`에 저장합니다. 한국어 이미지는 기존 명령을 사용합니다.

## 서비스 상세 소개와 사용 가이드

공개 서비스인 출생증명서 번역, AB Care Map, KoreaVancouverBot에 상세 소개와 단계별 사용 가이드를 제공합니다. CaLog·BabyLog는 접근 제한을 명확히 안내하며 공개 회원가입이나 비공개 기능을 약속하지 않습니다. 기존 카드에서 상세 소개와 서비스 실행 링크를 구분하고, 홈페이지 가이드 섹션과 상단 메뉴에서 내부 문서를 찾을 수 있습니다.

새 페이지는 정적 HTML이며 별도 빌드 없이 배포합니다. 한국어와 영어를 같은 경로 구조로 유지하고 언어 전환은 대응 페이지로 연결합니다. 수정할 때 두 언어의 본문, 설명 메타데이터, canonical·hreflang, 사이트맵을 함께 확인합니다. 가이드의 작성·검토 주체와 갱신일을 표시하며 날짜는 실제 내용 검토 후 갱신합니다.

출생증명서 가이드는 현재 공개된 알버타 버전만 설명합니다. 로컬 개발 중인 BC 지원을 배포된 기능으로 소개하지 않습니다. 지도는 진단·진료 추천이 아닌 화면 사용법을 설명하며 데모·스냅샷·오래된 값과 최신 값을 구분하도록 안내합니다. 영사관 알림은 원문 발췌이며 이미지·첨부파일의 자동 해석이나 기존 글 수정 재알림을 약속하지 않습니다.

승인을 위한 글 수·분량 기준을 만들지 않습니다. 개인정보 없는 실제 사용 설명과 명확한 탐색을 보완하지만, 콘텐츠 추가나 코드 배포가 AdSense 승인을 보장하지는 않습니다. 심사 요청은 AdSense 계정에서 운영자가 별도로 진행합니다.

### 콘텐츠 검증

```sh
python3 scripts/check-site.py
# 로컬 정적 서버 실행 후, 설치된 Playwright를 사용
MYDY_PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node scripts/check-browser.mjs
```

정적 검사는 모든 HTML의 내부 링크·목차 앵커·H1·canonical·양 언어 경로·사이트맵을 확인하며 배포 워크플로에서도 실행합니다. 브라우저 검사는 1440·768·390·320px의 가로 넘침, JavaScript 없는 본문 표시, 메뉴·언어 전환을 확인합니다. 외부 요청을 모두 차단해 광고 노출·클릭을 만들지 않습니다. 화면 검토용 이미지는 Git에서 제외되는 `tmp/`에 저장합니다.
