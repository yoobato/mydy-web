# mydy.kr 도메인 연결

## 현재 상태 (2026-09-17 확인)

- GitHub 저장소: `yoobato/mydy-web`
- GitHub Pages 배포: GitHub Actions, `site/`만 배포
- Custom domain: `mydy.kr` 설정 완료
- 현재 루트 A 레코드: `3.33.130.190`, `15.197.148.33` (파킹 페이지)
- 권한 네임서버: `ns55.domaincontrol.com`, `ns56.domaincontrol.com` (GoDaddy 계열)
- 도메인 DNS 레코드는 이번 코드 배포에서 변경하지 않았습니다.

## DNS 변경

도메인의 DNS 관리 화면에서 `mydy.kr`을 선택합니다. 현재 네임서버 기준 GoDaddy DNS에서 관리하는 것으로 보이며, 도메인 구매처와 DNS 관리처가 다르면 네임서버를 운영하는 쪽에서 수정합니다.

1. 호스트가 `@`인 기존 A 레코드 `3.33.130.190`, `15.197.148.33`을 삭제하거나 아래 값으로 교체합니다.
2. 아래 네 개의 A 레코드를 각각 추가합니다. `@`는 루트 도메인 `mydy.kr`을 뜻하며, TTL은 기본값을 사용할 수 있습니다.

| 유형 | 이름/호스트 | 값 |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

`www.mydy.kr`도 사용하려면 `www`의 기존 레코드를 확인한 뒤 `CNAME`, 이름 `www`, 값 `yoobato.github.io`로 설정합니다. 값에 `https://`나 `/mydy-web` 경로를 넣지 않습니다. GitHub Pages가 `www`에서 대표 주소로 리디렉션합니다.

서비스별 서브도메인, MX, TXT, 메일 레코드는 그대로 둡니다. 네임서버 자체를 바꾸지 않습니다. 루트에 다른 서버를 가리키는 AAAA 레코드가 있다면 함께 검토해야 하며, 현재 조회에서는 루트 AAAA 레코드가 없었습니다.

## GitHub에서 HTTPS 마무리

1. [저장소 Pages 설정](https://github.com/yoobato/mydy-web/settings/pages)을 엽니다.
2. Source가 **GitHub Actions**, Custom domain이 **mydy.kr**인지 확인합니다. 현재 도메인 값은 설정되어 있습니다.
3. DNS 검사가 통과하고 인증서가 발급되면 **Enforce HTTPS**를 켭니다.
4. `https://mydy.kr/`에서 7개 프로덕트가 보이는지, `https://mydy.kr/ads.txt`가 열리는지 확인합니다.

DNS 전파 및 HTTPS 옵션 활성화에는 각각 최대 24시간이 걸릴 수 있습니다.

```sh
dig +short mydy.kr A
curl -I https://mydy.kr/
```

A 조회 결과가 위 네 주소로 바뀌어야 합니다. 이후 홈페이지 수정은 `main`에 푸시하면 자동 배포됩니다.

근거: [GitHub 공식 사용자 도메인 연결 안내](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
