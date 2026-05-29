# 광산구 선거일투표소 지도

광산구 선거일투표소 95곳을 네이버지도에 표시하고, 선택한 투표소 기준 반경 100m를 A4 가로 용지로 인쇄할 수 있는 정적 페이지입니다.

## 배포 방법

1. GitHub에서 새 저장소를 만듭니다.
   - 추천 저장소 이름: `gwangsan-polling-map`
   - Public 저장소 권장
2. 이 폴더의 `index.html`을 저장소 루트에 업로드합니다.
3. GitHub 저장소의 `Settings > Pages`에서 배포 소스를 `Deploy from a branch`, `main`, `/root`로 설정합니다.
4. 배포 URL을 네이버 클라우드 Maps Application의 Web 서비스 URL에 추가합니다.

예상 배포 URL:

```text
https://<github-username>.github.io/gwangsan-polling-map/
```

네이버 클라우드 Web 서비스 URL 예시:

```text
https://<github-username>.github.io
https://<github-username>.github.io/gwangsan-polling-map
https://<github-username>.github.io/gwangsan-polling-map/
```

## 포함 파일

- `index.html`: 배포용 지도 페이지
- `gwangsan_polling_places_with_naver_coordinates.xlsx`: 투표소 주소와 네이버 지오코딩 좌표
