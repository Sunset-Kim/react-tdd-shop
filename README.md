# Order Page Test.

## Use mock service worker

> 두가지 방식의 이해

![Mock Service Worker Browser Diagram](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG5cdEJyb3dzZXIgLT4-IFNlcnZpY2UgV29ya2VyOiAxLiByZXF1ZXN0XG4gIFNlcnZpY2UgV29ya2VyIC0tPj4gbXN3OiAyLiByZXF1ZXN0IGNsb25lXG4gIG1zdyAtLT4-IG1zdzogMy4gbWF0Y2ggYWdhaW5zdCBtb2Nrc1xuICBtc3cgLS0-PiBTZXJ2aWNlIFdvcmtlcjogNC4gTW9ja2VkIHJlc3BvbnNlXG4gIFNlcnZpY2UgV29ya2VyIC0-PiBCcm93c2VyOiA1LiByZXNwb25kV2l0aChtb2NrZWRSZXNwb25zZSlcblx0XHRcdFx0XHQiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)

### 설치

1. msw 설치

```
npm install msw -D
```

2. handler 생성

- type : rest , graphQL 생성
- http method
- req: 매칭 요청에 대한정보
- res: 모의 응답을 생성하는 기능적 유틸리티
- ctx: 모의 응답의 헤더 본문, 상태코드 등을 설정하는 데 도움이 되는 함수 그룹

### 브라우저 통합

[browser setup](https://mswjs.io/docs/getting-started/integrate/browser)

### 노드와 통합 (Jest 사용하는 테스트 환경)

[node setup](https://mswjs.io/docs/getting-started/integrate/node)

```ts
// src/mocks/server.js
import { setupServer } from "msw/node";
import { handlers } from "./handlers";
// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
```

```ts
// src/setupTests.js
import { server } from "./mocks/server.js";
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
```
