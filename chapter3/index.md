# 3장 중요하지만 헷갈리는 리액트 개념 이해하기

* 프레임워크나 라이브러리를 온전히 이해하지 못한 채로 프로젝트를 시작하면 기술 부채(더 좋은 방식이 있음에도 불구하고 쉬운 방식을 택함으로써 미래에 발생하게 되는 비용)가 된다. 
* 제대로 이해하고 넘어가자

## 3.1 상탯값과 속성괎으로 관리하는 UI 데이터

* UI 데이터를 관리하는 방법
   1. 컴포넌트 내부에서 관리되는 상탯값
   2. 부모 컴포넌트에서 내려 주는 속성 값

* UI 데이터가 변경이 되면 화면을 다시 그려야 하는데, 리액트와 같은 라이브러리를 활용하지 않을 경우 직접 DOM을 수정 --> 비즈니스 로직과 UI를 수정하는 코드가 뒤섞여서 코드가 복잡
* 리액트에서는 화면을 그리는 모든 코는 컴포넌트의 render 함수로 작성
* UI 데이터가 변경되면 리액트에서 자동으로 render 함수를 활용해서 화면을 자동으로 갱신

### 3.1.1 리액트를사용한 코드의 특징

* UI 라이브러리를 사용하지 않은 코드
   1. 비즈니스 로직과 UI를 수정하는 코드가 뒤섞여있어서 코드이 가독성이 떨어짐
   2. 코드를 어떻게 그리지는 나타냄
   3. 명령형(imperative) 프로그래밍

* 리액트로 작성한 코드
   1. render 메서드에 화면에 무엇을 그려야 하는지 설명하는 UI 코드가 있고, 추가, 삭제 등의 비즈니스 로직과 분리
   2. 화면에 무엇을 그리는지 나타냄
   3. 선언형(declarative) 프로그래밍

* https://github.com/killerdong/react-study/blob/009f5b1f7061470cfa7586af27eb9dae10157c07/lecture2_3%EC%9E%A5.md#32-%EB%AA%85%EB%A0%B9%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EA%B3%BC-%EC%84%A0%EC%96%B8%EC%A0%81-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EB%B9%84%EA%B5%90
* https://velog.io/@kyusung/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%9A%94%EC%95%BD

### 3.1.2 컴포넌트의 속성값과 상탯값

* 상탯값(state) : 해당 컴포넌트가 관리하는 데이터
* 속성값(property) : 부모 컴포넌트로부터 전달 받은 데이터
* 리액트에는 해당 2개의 값의 변화가 있을 때만 render 함수를 활용해서 화면을 업데이트 함
```javascript
//이런 경우에는 화면 업데이트가 안됨
class MyComponent extends React.Component {
    color='red';
    onClick = () => {
        this.color = 'blue';
    }

    render() {
        return (
            <button style={{backgroundColor: this.color}} onClick={this.onClick}>
                좋아요
            </button>
        )
    }
}
//위에 것은 이렇게 수정
class MyComponent extends React.Component {
    state = {color: 'red'};
    onClick = () => {
        this.setState({color: blue});
    }

    render() {
        return (
            <button style={{backgroundColor: this.state.color}} onClick={this.onClick}>
                좋아요
            </button>
        )
    }
}
```

* React.memo
   * 랜더링 결과를 메모이징(memoizing)함으로써, 불필요한 랜더링을 억제
   * 동일한 props, state에 대해서 동일한 결과를 랜더링
   * 고차함수(high order function)
   * 성능 최적화를 위해서만 사용해야 함(다른 이유로 사용할 경우 버그를 만들 수 있음)
   * 기본적으로는 얕은 비교만 함. 좀 더 비교 값을 개선하기 위해서는 두 번째 property 를 활용
   * https://ko.reactjs.org/docs/react-api.html#reactmemo
   * https://ui.toast.com/weekly-pick/ko_20190731/

* PureComponent
   * 동일한 props, state에 대해서 동일한 결과를 랜더링
   * https://ko.reactjs.org/docs/react-api.html#reactpurecomponent

* setState
   * 기존 상태값과 병합을 해서 새로운 상태 값을 생성
   * 비동기로 상탯값을 변경하는 구조
   * 비동기로 처리가 되지만 순서는 보장
   * https://ko.reactjs.org/docs/react-component.html#setstate
   * https://ko.reactjs.org/docs/state-and-lifecycle.html

* 속성값과 상탯값은 불변의 객체로 관리

## 3.2 리액트 요소와 가상 돔

* 리액트 요소(element)는 리액트가 UI를 표현하는 수단
* 보통은 jsx 문법을 사용하기 때문에 해당 요소에 대한 존재를 잘 모름

### 3.2.1 리액트 요소 이해하기

* type 속성값이 문자열이면 html 태그, 함수이면 우리가 작성한 클래스
* 리액트 요소는 불변 객체
* 리액트 요스를 받으면 이전의 리개트 요소와 비교해서 변경된 부분만 실제 돔에 반영
* https://ko.reactjs.org/docs/rendering-elements.html

### 3.2.2 리액트 요소가 돔 요소로 만들어지는 과정

* 하나의 화면을 표현하기 위해 여러 개의 리액트 요소가 트리 구조로 구성
* 랜더단계(render phase, reconciliation phase), 커밋단계(commit phase)로 구성
* 랜더 단계는 실제 돔에 반영할 변경 사항을 파악하는 단계
* 커밋 단계는 파악된 변경 사항을 돔에 반영하는 단계
* 랜더 단계에서는 변경 사항을 파악하기 위해 가상 돔을 사용
* 최초의 래익트 요소 트리로부터 가상 돔을 만들고 이전 가상 돔과 비교해서 실제 돔에 반영할 내용을 결정
* https://ko.reactjs.org/docs/reconciliation.html
* https://medium.com/@codesquad_yoda/%EB%82%A8%EB%8B%A4%EB%A5%B8-%EA%B0%9C%EC%84%A0%EB%B0%A9%EB%B2%95%EC%9D%84-%EB%8B%A4%EC%8B%9C-%EB%B3%B4%EC%97%AC%EC%A4%80-%ED%8E%98%EC%9D%B4%EC%8A%A4%EB%B6%81%EC%9D%98-react-fiber-80b7ca5bd9bb

## 3.3 생명 주기 메소드

* 모든 컴포넌트는 다음과 같이 세 단계를 거침
   1. 초기화 단계
   2. 업데이트 단계
   3. 소멸 단계
* http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
* https://ko.reactjs.org/docs/react-component.html

### 3.3.1 constructor 매서드

* `props` 를 매개변수로 가진다.
* 항상 `super(props)`를 호출해야 한다.
* 대표적인 사용 예는 초기 속성값을 활용해서 상태 값을 만드는 경우(그냥 복사는 하지 않는 것을 추천: https://ko.reactjs.org/docs/react-component.html)
* 클래스 필드를 활용하면 constructor 메서드를 활용하지 않고 위와 같은 기능을 구현 가능
* setState는 무시되기 때문에 호출할 필요가 없다.

> 클래스 필드(class field) : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields

### 3.3.2 getDerivedStateFromProps 메서드

* 속성값을 이용해서 새로운 상태 값을 만들 때 사용
* 정적 메소드이기 때문에 this 객체 접근이 불가
* 시간에 따라 변하는 속성값으로부터 상탯값을 계산하기 위해 추가
* 보통 에니메이션과 관련된 속성값으로부터 상태값을 계산할 때 유용
* 많이 사용하지 않음

### 3.3.3 render 메서드

* 반드시 작성해야하는 메서드
* 화면에 보여질 내용을 결정
* React.Fragment: https://ko.reactjs.org/docs/fragments.html
* React.createPortal: https://ko.reactjs.org/docs/react-dom.html#createportal
* Portals: https://ko.reactjs.org/docs/portals.html
* 순수함수: https://github.com/killerdong/react-study/blob/009f5b1f7061470cfa7586af27eb9dae10157c07/lecture2_3장.md#32-명령형-프로그래밍과-선언적-프로그래밍-비교

### 3.3.4 componentDidMount 메서드

* render 메서드의 첫 번째 반환값이 실제 돔에 반영된 직후 호출

### 3.3.5 shouldComponentUpdate 메서드

* 성능 최적화를 위해 존재
* React.memo, PureComponent 처럼 특정 조건에 랜더링을 하지 않도록 하지 않는 목적으로 사용

### 3.3.6 getSnapshotBeforeUpdate 메서드

* 랜더링 결과가 실제 돔에 반영되기 직전에 호출

### 3.3.7 componetDidUpdate 메서드

* 업데이트 단계에서 마지막으로 호출되는 생명 주기 메서드

### 3.3.8 componentWillUnmount 메서드

* 소멸 단계에서 호출되는 유일한 메서드

### 3.3.9 getDerivedStateFromError, compontDidCatch 메서드

* 생명 주기 메서드에서 발생한 예외를 처리할 수 때 사용
* getDerivedStateFromError: 화면에 에러 내용을 나타내는 용도
* compontDidCatch: 서버에 에러정보를 전송하는 목적으로 사용

## 3.4 콘텍스트 API로 데이터 전달하기

* 보통 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달할 때 속성값을 사용
* 컴포넌트 깊이가 몇 개 안되는 경우면 상관 없지만 많을 경우 속성 값을 내려줘야 하는 소스를 반복적으로 작성해야한다.
* 이런 반복적으로 코드를 없애고 보다 쉽게 속성 값을 전달하기 위한 방법으로 콘텍스트 API가 있다.

### 3.4.1 콘텍스트 API 이해하기

* 콘택스트 API를 활용하면 Profile 콤포넌트가 중간에 개입하지 않고도 속성값을 전달할 수 있다.
* createContext는 다음과 같은 구조를 가진다.(https://ko.reactjs.org/docs/context.html#reactcreatecontext)
* 상위 컴포넌트에서는 Provider 컴포넌트를 이용해서 데이터를 전달
* 하위 컴포넌트에서는 Consumer 컴포넌트를 이용해서 데이터를 사용
* Comsumer에서 데이터를 찾기 위해 가장 가까운 Provider를 찾게되고 없는 경우에는 기본 값을 사용한다.
* Provider 속성 값이 변경되면 모든 Comsumer 가 업데이트 된다. 이 때 shouldComponentUpdate 메서드를 무시한다.

### 3.4.2 콘텍스트 API 활용하기

* 여러 콘텍스트를 중첩해서 사용하기
* 생명 주기 메서드에서 콘텍스트 데이터 사용하기
   * https://ko.reactjs.org/docs/context.html#classcontexttype
* 하위 컨포넌트에서 콘텍스트 데이터를 수정하기   

### 3.4.3 콘텍스트 API 사용 시 주의할 점

* 불필요한 렌더링이 발생하지 않도록 한다.
* Provider, Consumer를 적절한 위치에 둬야 한다.

* https://ko.reactjs.org/docs/context.html

## 3.5 ref 속성값으로 자식 요소에 접근하기

* 리액트 작업하다 보면 돔 요소에 직접 접근해야 하는 경우가 발생
* 이 때 ref 속성값을 이용하면 자식 요소에 직접 접근이 가능
* 자식 요소로는 dom 일수도 있고 react 컴포넌트 일 수도 있다.
* createRef 함수가 반환하는 ref 객체를 이용해서 자식 요소에 접근가능(https://ko.reactjs.org/docs/react-api.html#reactcreateref)
* https://ko.reactjs.org/docs/forwarding-refs.html
* https://ko.reactjs.org/docs/refs-and-the-dom.html


# 번외편

## this
https://blueshw.github.io/2018/03/12/this/
