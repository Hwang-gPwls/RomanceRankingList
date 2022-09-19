# RomanceRankingList

로맨스 장르 웹툰 필터 기능 제공

# 사용 기술 

## Frontend
- Javascript(ES6) / HTML / CSS
- React
- React Query
- styled-components
- Typescript

## DevOps
- Git
- GitHub

# 로컬 실행 명령어
```
# 로컬 실행
$ yarn start

# 패키지 설치
$ yarn
```

# 라이브러리 적용 이유
### React Query
- React Query는 React 어플리케이션에서 서버 상태를 불러오고, 캐싱하며, 지속적으로 동기화하고 업데이트하는 작업을 도와주는 비동기 데이터 관리 라이브러리이다.
- React 컴포넌트 내부에서 간단하고 직관적으로 API를 사용할 수 있으며(API 요청 수행을 위한 규격화된 방식 제공), React Query에서 제공하는 캐싱, Window Focus Refetching 등 다양한 기능을 활용   하여 API 요청과 관련된 많은 보일러플레이트 코드 및 번잡한 코드 작업 없이 "핵심 로직"에 집중할 수 있다.
- useInfiniteQuery hook 등 자체적으로 제공하는 다양한 기능을 사용할 수 있다.
  
### Intersection Observer API
- Intersection Observer API는 기본적으로 브라우저 Viewport와 Target으로 설정한 요소의 교차점을 관찰하여 그 Target이 Viewport에 포함되는지 구별하는 기능을 제공한다.
- 스크롤 이벤트로 무한 스크롤 구현시 리플로우에 불필요한 렌더링 성능 저하가 생긴다는 문제점이 발생한다. Intersection Observer API는 루트 요소와 타겟 요소의 교차점을 관찰한다. 그리고 타겟 요소가     루트 요소와 교차하는지 아닌지를 구별하는 기능을 제공한다. scroll 이벤트와 다르게 교차 시 비동기적으로 실행되며 가시성 구분 시 리플로우를 발생시키지 않아 성능적으로 더 나은 무한 스크롤을 구현할 수 있   다.
  
### styled-components
- JavaScript와 CSS 사이의 상수와 함수를 쉽게 공유 할 수 있어 props를 활용한 조건부 스타일링이 가능하다.
- 해당 컴포넌트에 대해서의 스타일만을 정의하므로, 스타일 적용범위가 한정적이라서 사이드 이펙트 확률이 줄어든다.
  
### Prettier
- 깔끔한 코드와 협업을 위해서 일관성 있는 코드 스타일을 제공 해준다.
