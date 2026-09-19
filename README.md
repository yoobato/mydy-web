# MYDY

민영(Minyoung Ha), 대열(Daeyeol Ryu), 아들 백호(Baekho Ryu)의 일상에서 시작된 사이드 프로젝트를 모아 둔 가족의 개인 홈페이지입니다. 프로젝트 제작자는 민영과 대열입니다. 종이 노트, 직접 그린 SVG, 부드러운 색을 사용하고 가족의 생활과 제작 동기를 중심으로 소개합니다.

- 대표 주소: https://mydy.kr/
- 공개 서비스: [알버타 출생증명서 한글 번역문 생성](https://ab-birthcert-ko.mydy.kr/), [AB Care Map](https://abcaremap.mydy.kr/)
- 만든 사람: Minyoung Ha · [Daeyeol Ryu](https://yoobato.com)

## 구성

빌드 도구나 외부 UI 라이브러리 없이 HTML·CSS·SVG로 구성합니다. 배포 대상은 `site/`뿐입니다.

| 파일 | 역할 |
| --- | --- |
| `site/index.html` | 소개, 프로젝트 모음, 만든 사람 안내, AdSense 연결 코드 |
| `site/style.css`, `site/mark.svg` | 반응형 디자인과 로고 |
| `site/privacy.html` | 개인정보 및 광고 안내 |
| `site/ads.txt` | Google 광고 판매자 정보 |
| `site/robots.txt`, `site/sitemap.xml` | 검색엔진 안내 |

## 서비스 목록 관리

홈페이지는 공개 소개가 승인된 8개 프로젝트을 카드로 소개합니다. 운영 중인 서비스는 이용 링크를 제공하고, 개발·베타·프로토타입은 현재 상태를 표시합니다. 프로젝트별 설명, 이용 상태, 링크와 주의사항은 `site/index.html`에서 관리합니다. 현재 소개 범위는 우리의 청첩장, 출생증명서 번역, AB Care Map, Drive in Alberta, CaLog, BabyLog, ChutChut, 포근입니다. 앱/API 및 포근 ML은 해당 제품에 묶어 소개합니다. 추가 제품은 공개 승인을 확인한 뒤 추가하며, 개인 기록·내부 서버 정보·실제 사용자 데이터는 포함하지 않습니다.

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
