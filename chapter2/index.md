# 2장 ES6+를 품은 자바스크립트, 매력적인 언어가 되다.

* ES6는 ECMA에서 2015년에 채택한 자바스크립트 표준. 보통 ES6부터는 ES2015라고 부른다.
* ES2015부터는 매년 언어 명세를 변경해서 ES{년도}로 해서 나온다.
* 현재는 ES2019까지 나와있음
* https://exploringjs.com/ 

## 1. 변수를 정의하는 새로운 방법: const, let

* ES5까지는 변수를 선언할 수 있는 방법이 `var`가 유일한 방법
* `var` 가진 문제점 때문에 `const`, `let` 이 생김
* `var` 가진 문제점
   1. 함수 스코프
   2. 호이스팅
   3. 재정의가 가능
   4. 재할당 가능한 변수로밖에 만들 수 없음
* `var` 가 가진 문제를 해결하기 위해서 나온 것이 `const`, `let`
   1. 블럭 스코프
   2. 임시적 사각지대(temporal dead zone) - 참고: https://poiemaweb.com/js-execution-context
   3. const는 재할당을 불가능하게 만든다. 하지만 내부 속성 변경은 가능하다. 내부 속성도 변하지 못하게 하기 위해서는 외부 라이브러리(immer, immutable.js)를 활용
   4. const와 let 둘 중에 무엇을 우선으로 사용해야 할까요?
* https://github.com/JAVACAFE-JS2016/ES6/blob/master/Dongwoo-Seo/episode1/1.const_let_var.md

## 2. 객체와 배열의 사용성 개선

```javascript
// 단축 속성명
const obj = {
   age: 21,
   name, //name: name
   getName() { //getName: function() ..

   }
}
//동적 속성명 사용 시
const key = '1111';
//예전
const obj = {};
obj[key] = value;
//ES2015+
const obj = {[key]: 1111};

//전개 연산사(spread operator)
//배열을 합칠 때
const a = [1,2,3,4];
const b = [5,6,7,8];
//예전
const c = a.concat(b);
//ES2015+
const c = [...a, ...b];

//두 개의 객체 합치기
const a = {a:1, b:2};
const b = {c:3, d:4};

//예전
const c = 1; //만들기 어려움 그래서 외부 라이브러리 이용
//ES2015+
const c = {...a, ...b};

//배열 비구조화(array destructuring)
const a = [1,2];
const [c,d] = a;  //c=1, d=2

//객체 비구조화
const obj = {age: 21, name: 'mike'};
const {age, name} = obj;   //age:21, name: mike

```
* https://github.com/JAVACAFE-JS2016/ES6/blob/master/Dongwoo-Seo/episode1/4.destucturing_assignment.md
* https://github.com/JAVACAFE-JS2016/ES6/blob/master/Dongwoo-Seo/episode1/3.parameter.md
* 

## 3. 강화된 함수의 기능

```javascript
function printLog(a=1) {
   console.log(a);
}

printLog(); //1

function printLog(a, ...rest) {
   console.log(a);
}
```

* https://github.com/JAVACAFE-JS2016/ES6/blob/master/Dongwoo-Seo/episode1/2.arrow_expression.md


## 4. 향상된 비동기 프로그래밍 1: 프로미스

* https://github.com/JAVACAFE-JS2016/ES6/blob/master/Dongwoo-Seo/episode3/promise.md

## 5. 향상된 비동기 프로그래밍 2: .async await

* https://exploringjs.com/es2016-es2017/ch_async-functions.html

## 6. 템플릿 리터럴로 동적인 문자열 생성하기

* https://github.com/JAVACAFE-JS2016/ES6/blob/master/Dongwoo-Seo/episode1/5.template.md
* 

## 7. 실행을 멈출 수 있는 제너레이터

* https://github.com/JAVACAFE-JS2016/ES6/blob/master/Dongwoo-Seo/episode2/5.interators.md
* https://github.com/JAVACAFE-JS2016/ES6/blob/master/Dongwoo-Seo/episode2/6.gernerator.md
