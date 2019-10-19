# 1장 리액트 프로그램 시작하기

## 1. 리액트란 무엇인가?

* 페이스북에서 개발하고 관리하는 UI 라이브러리
* 전역 상태 관리, 라우팅, 빌드 시스템 등의 UI 관련되지 않는 라이브러리는 직접 개발
   * 전역 상태 관리(redux, mobx)
   * 라우팅(react-router)
   * 빌드 시스템(webpack.js)
* react 보다 그 부수적인 것들이 많아서 런닝 커브가 큰 편
* create-react-app: 위 런닝커브를 줄이기 위해서 제공해주는 툴, 자세한 내용은 뒤에 다시

### 장점

1. 상태값, property를 활용한 UI를 자동으로 업데이트
2. 가상 돔(virtual dom)을 통해서 UI를 빠르게 업데이트
3. 함수형 프로그래밍을 적극적으으로 활용

## 2. 리액트 개발 환경 직접 구축하기

* 리액트는 UI 라이브러리이기 때문에 UI를 제외한 나머지 요소들은 개발자가 신경 써서 직접 관리
* 이런 것을 직접 구축하다보면 리액트를 시작하기도 전에 때려치울 가능성이 큼
* create-react-app tool을 활용해서 개발 환경을 구축하는 것을 추천
* 공부할 때는 한번 구축해보는 것도 도움이 될 듯(어떤 구조인지 파악하기 위해서)

### 1) Hello World 페이지 만들기

* 처음 시작 할 때 node, webpack, babel 이런 것에 대한 지식을 아는 것은 상당히 부담
* 처음 한번 테스트 용도로 할 때는 간단한 페이지에 라이브러리를 추가하는 방식으로 진행
* createElement : https://ko.reactjs.org/docs/react-api.html#createelement
   * 일반적으로 jsx(javascript XML) 활용하므로 잘 사용하지 않는다.
* 어러 개의 돔 요소에 렌더링도 가능

### 2) 바벨 사용해 보기

* 바벨 : 
   * https://babeljs.io/docs/en/index.html
   * 자바스크립트 Compiler
   * 최신 자바스크립트(ECMA 2015+, jsx 등등)을 예전 스크립트가 호환되는 환경에서도 동작하게 해주기 위해 자바스크립트를 변형해주는 툴 도구 집합(툴체인)
   * 특징
      1. 문법을 변형
      2. Polyfill(https://en.wikipedia.org/wiki/Polyfill_(programming)) 기능 제공
      3. 소스 코드 변환
      4. 그 외 주석 제거, 코드 압축 등등의 여러 가지 기능을 제공

* jsx 문법 바벨로 컴파일하기
   * jsx의 경우 기본 자바스크립트 문법이 아니기 때문에 브라우저에서 에러가 발생
   * babel 설치(책 참고)
   * npx babel --watch src --out-dir . --presets @babal/preset-react
      npx: 외부 페키지에 포함된 실행 파일을 실행할 때 사용
   * babel에 대한 자세한 내용은 뒤에 다시
   
### 3) 웹팩의 기본 개념 이해하기

* 자바스크립트로 만든 프로그램을 배포기 좋은 헝태로 묶어주는 툴
* 제작방식이 SPA(Single page applicatiaon)으로 전환되면서 한 페이지에 수십 또는 수백 개의 자바스크립트가 필요하기 때문에 이것을 관리하는데 좋은 툴의 필요성이 생김
* 가장 큰 툭징은 여러 개의 소스(스크립트, CSS, 이미지 등등)을 합쳐서 1개 또는 소수의 파일 수로 전환해서 배포하기 좋은 형태로 만들어준다.

> 자바스크립트 모듈
> commonjs vs amd: https://d2.naver.com/helloworld/12864
> node.js에서 common.js 를 사용하면서 common.js 방식을 많이 사용함
> 이제는 공식적이 모듈 시스템(ESM)이 제공되기 때문에 그것을 많이 사용(https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules)

* 보다 자세한 것은 역시나 뒤에서

## 3. create-react-app 으로 시작하기

* react로 웹 애플리케이션을 만들기 위한 환경을 제공
* babel, webpack, jest, hrm, test server 등등을 기본적으로 포함
* 우선적으로 이 툴을 활용하는 것이 가장 좋고 편하다.

### 1) create-react-app 사용해보기

* 자세한 것은 실습으로

### 2) 명령어

1. yarn(npm) start: 개발모드로 프로그램을 실행, HMR이 반영되기 때문에 코드를 수정하면 바로 반영, 에러 메시지 출력
2. yarn build(npm run build): 배포 환경에서 사용할 파일을 생성
3. yarn test(npm test): 테스트 실행
4. yarn eject(npm run eject): 숨겨져 있던 create-react-app의 내부 설정 파일이 밖으로 노출. 이 기능을 활용하면 babel, webpack 등의 설정을 변경

### 3) 지원 범위

1. ES2015+ 지원
2. JSX 문법
3. 타입스크립트, flow 타입 시스템
4. 선택적으로 다양한 폴리필을 사용할 수 있음

### 4) 코드 분할

* 사용자에서 필요한 양의 코드만 내려 줄 수있는 기능
* 소스양이 많아질 수록 첫 페이지 로딩에 많은 시간이 걸리기 때문에 적절하게 코드를 분할을 해야 함
* 동적 import를 사용하여 코드를 분할할 수 있음

### 5) 환경 변수 사용하기

* 빌드 시점에 환경 변수를 코드로 전달
* `process.env.{환경 변수 이름}`으로 접근
* `NODE_ENV` 환경 변수를 활용
   * npm start로 실행하면 development
   * npm test로 실행하면 test
   * npm run build 로 실행하면 production
* 설정할 내용이 많으면 `.env.{환경 변수 이름}`의 파일을 생성해서 관리하는 것이 좋음
* 환경 변수 설정할 때 `REACT_APP_`으로 시작해야 함(안 그럴 경우 무시 됨)
* https://create-react-app.dev/docs/adding-custom-environment-variables/
* css 파일의 경우 자동으로 벤더 접두사를 붙여준다.

## 4. CSS 작성 방법 결정하기

* 리액트로 프로그램을 할 때는 CSS도 컴포넌트 관리하여 프로그램의 응집도(cohesion)을 높이는 것이 좋다.
* css-module, css-in-js 방법이 있음

### 1) 일반적인 CSS 파일로 작성하기

* 일반적인 CSS 파일을 생성
* js에는 import 를 활용해서 css 파일 가져오는 방식
```javascript
import '{css파일}}.css';
```
* 가장 일반적인 방식
* 클래스 명이 같을 경우 충돌이 발생할 수 있음

### 2) css-module로 작성하기

* css-module은 간결한 클래스명을 이용해서 컴포넌트 단위로 스타일을 적용
* css 파일 명을 `{이름}.module.css` 으로 작성
* js에서는 아래와 같이 받아온다.
```javascript
import style from './{이름}.module.css';
```
* 구성되는 방식은 책에서
* CSS 클래스에 모듈별로 특정 hash 값을 붙여서 중복을 막는다.

### 3) Sass 로 작성하기

* Sass란?(https://poiemaweb.com/sass-basics)
* create-react-app 에서 Sass 를 사용하고 싶으면 아래 모듈 설치
```
npm install node-sass -D
```
* 직접 해보는 것으로(저도 Sass는 안써봐서..)

### 4) css-in-js 로 작성하기

* 최근에 떠오르고 있는 방법
* CSS코드를 자바스크립트 파일 안에서 작성하는 방법
* 공통 내용을 변수로 관리하기 수월하고, 동적으로 CSS 코드를 작성하기 쉽다.
* css-in-js 를 지원하는 패키지 중에서 가장 유명한 `styled-components`를 설치
* 자세한 것은 책을 통해서

## 5. 단일 페이지 애플리케이션 만들기

* 리액트 애플리케이션의 페이지 전환은 단일 페이지 애플리케이션(SPA) 방식으로 개발하는 것이 정석
* SPA은 최초 요청 시 서버에서 첫 페이지를 처리하고 이후의 라우팅은 클라이언트에서 처리하는 웹 애플리케이션
* 책에 있는 내용을 만들어보고 한번 어떤 식으로 동작하는지 이해한다.(자세한 내용은 책 뒤에서 배운다.)





