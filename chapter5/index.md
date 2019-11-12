# 5장 진화된 함수형 컴포넌트: 리액트 훅

* https://ko.reactjs.org/docs/hooks-intro.html#___gatsby
* 리액트 16.8에 추가된 기능(현재 버전은 16.11.0)
* 훅이 나옴으로써 클래스 컴포넌트의 입지는 점점 줄어들고, 로직을 재사용하기 위해 사용했던 고차 컴포넌트와 렌더 속성값 패턴도 지금처럼 자주 사용하지 않게 될 것
* https://velog.io/@vies00/React-Hooks

## 5.1 리액트 훅 기초 익하기

### 5.1.1 리액트 훅이란?

* 함수형 컴포넌트에서도 클래스 형 컴포넌트의 기능을 사용할 수 있게 하는 기능
   1. 컴포넌트의 상탯값을 관리
   2. 컴포넌트의 생명 주기 함수도 이용 가능

#### 로직 재사용하는 기존 방식의 한계

* 리액트에서 로직의 재사용은 주로 고차 컴포넌트와 랜더 속성값 패턴으로 이루어진다.
* 두 방법은 대상이 도니느 컴포넌트를 감싸는 새로운 컴포넌트를 생성하기 때문에 리액트 요소 트리가 깊어진다는 단점

#### 클래스 컴포넌트의 한계

* 서로 연관성이 없는 여러 가지 로직을 하나의 생명 주기 메서드에서 작성하는 경우가 많다.
* componentDidMount, componentWillUnmout 메소드를 통해서 컴포넌트를 등록, 해제하는 경우가 있는데 깜빡할 수도 있다.

#### 훅의 장점

* 재사용 가능한 로직을 쉽게 만들 수 있다.
* 훅은 단순한 함수이므로 함수 안에서 다른 함수를 호출하는 것으로 새로운 훅을 만들 수 있기 때문
* 훅을 사용하면 같은 로직을 한곳으로 모을 수 있어서 가독성이 좋다.
* 훅은 단순한 함수이므로 정적 타입 언어로 타입을 정의하기 쉽다.

### 5.1.2 함수형 컴포넌트에 상탯값 추가하기: useState

```javascript
import React, { useState } from 'react';

function Example() {
  // 새로운 state 변수를 선언하고, count라 부르겠습니다.
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
```

* useState의 경우 결과 값으로 배열을 반환하는데, 첫 번째 원소에 상탯 값, 두 번째 원소에 상태를 변경할 수 있는 함수를 제공.
* 함수 호출 시 입력한 인수가 초깃값

#### 클래스형 컴포넌트와 비교하기

```javascript
class Example extends React.Component {
    state = {
        conut: 0
    }

    render() {
        return (
        <div>
            <p>You clicked {this.state.count} times</p>
            <button onClick={() => this.setState({ count: this.state.count + 1 })}>
            Click me
            </button>
        </div>
        );
    }
}
```

#### 여러 개의 useState 훅 사용하기
```javascript
function ExampleWithManyStates() {
  // 상태 변수를 여러 개 선언했습니다!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
```

#### useState. 훅 하나로 여러 상탯값 관리하기
```javascript
function ExampleWithManyStates() {
  // 상태 변수를 여러 개 선언했습니다!
  const [profile, setProfile] = useState([{ name: 'aaaa', age: 12 }]);


  setProfile({...profile, age: 22});    //변경할 때는 이런 식으로 불변의 객체를 생성하는 방식으로 표현한다.
  // ...
}
```

### 5.1.3 함수형 컴포넌트에서 생명 주기 함수 이용하기: useEffect

* useEffect 훅을 통해서 함수형 컴포넌트에서 생명 주기 함수를 이용할 수 있다.
* 각 생명 주기 별로 매칭되는 메서드가 전부 존재하는 것은 아님
* 기존 생명 주기 메서드에 문제가 있어서 새로운 방식으로 표현
* useEffect를 활용해서 기존의 연관성이 없는 여러 가지 기능을 한곳에 모을 수 있게 되었다.
* useEffect의 경우 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`를 합쳐놓은 것 같이 동작한다.

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
```

* 특정 상탯 값이 변경될 때만 호출할 수 있도록 설정이 가능
```javascript
mport React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);//mount 하거나 카운트가 변경될 때만 호출

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
```

* mount 할 때 한번만 호출되게도 설정이 가능
```javascript
mport React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, []);//mount 할 때 한번 호출

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
```

* 헤제하는 방법
```javascript
useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

#### 클래스 컨포넌트와 비교
* 클래스 컴포넌트
```javascript
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...

```
* hook을 사용할 경우

```javascript
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```

### 5.1.4 훅 직접 만들기

* 리액트가 제공하는 훅을 이용해서 커스텀 훅을 만들 수 있다.
* 만든 커스텀 훅을 이용해서 새로운 커스텀 훅을 다시 생성할 수 있다.
* 중복된 코드를 훅으로 만듬으로써 고차 컴포넌트가 랜더 속성값 패턴을 대신할 수 있다.
* 리액트의 내장 훅 처럼 커스텀 훅의 경우 use로 시작하는 것이 좋다.

#### useWindowWidth 커스텀 훅

```javascript
import {useEffect, useState} from 'react';

function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const onResize = () => setWidth(windoe.innerWidth);
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize');
        }
    }, []);

    return width;
}

...

const width = useWindowWidth();
```

#### useHasMounted 커스톰 훅

* 책에서 봅시다(page 226)

### 5.1.5 훅 사용 시 지켜야 할 규칙

1. 최상위(at the Top Level)에서만 Hook을 호출해야 합니다
2. 오직 React 함수 내에서 Hook을 호출해야 합니다

```javascript
function Form() {
  // 1. name이라는 state 변수를 사용하세요.
  const [name, setName] = useState('Mary');

  // 2. Effect를 사용해 폼 데이터를 저장하세요.
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });

  // 3. surname이라는 state 변수를 사용하세요.
  const [surname, setSurname] = useState('Poppins');

  // 4. Effect를 사용해서 제목을 업데이트합니다.
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

  // ...
}

// ------------
// 첫 번째 렌더링
// ------------
useState('Mary')           // 1. 'Mary'라는 name state 변수를 선언합니다.
useEffect(persistForm)     // 2. 폼 데이터를 저장하기 위한 effect를 추가합니다.
useState('Poppins')        // 3. 'Poppins'라는 surname state 변수를 선언합니다.
useEffect(updateTitle)     // 4. 제목을 업데이트하기 위한 effect를 추가합니다.

// -------------
// 두 번째 렌더링
// -------------
useState('Mary')           // 1. name state 변수를 읽습니다.(인자는 무시됩니다)
useEffect(persistForm)     // 2. 폼 데이터를 저장하기 위한 effect가 대체됩니다.
useState('Poppins')        // 3. surname state 변수를 읽습니다.(인자는 무시됩니다)
useEffect(updateTitle)     // 4. 제목을 업데이트하기 위한 effect가 대체됩니다.

// ...

 // 🔴 조건문에 Hook을 사용함으로써 첫 번째 규칙을 깼습니다
if (name !== '') {
useEffect(function persistForm() {
    localStorage.setItem('formData', name);
});
}
```
## 5.2 리액트 내장 훅 살펴보기

### 5.2.1 useContext

* Consumer 컴포넌트를 사용하지 않고도 부모 컴포넌트루부터 전달된 콘테그스 데이터를 사용할 수 있다.

```javascript
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

### 5.2.2 useRef

* 클래스 컴포넌트에서 createRef 함수를 통해서 돔 요소에 접근 했다면, 함수형 컴포넌트에서는 useRef 훅을 퉁해서 돔 요소에 접근할 수 있다.

```javascript
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```
#### 함수형 컴포넌트에서 렌더링과 무관한 값 저장하기

```javascript
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  // ...
}
```

### 5.2.3 useMemo, useCallback

* 이전 값을 기억해서 성능을 최적화는 용도로 사용

#### useMemo

* 메모 제이션된 값을 반환

```javascript
import React, {useMemo} from 'react';
import {runExpensiveJob} from './util';

function MyComponent({v1, v2}) {
    const value =useMemo(() => runExpensiveJob(v1,v2), [v1,v2]);
    return <p>{`value is ${value}`}</p>;
}
```

#### useCallback

* 메모제이션된 콜백을 반환
* useCallback(fn, deps)은 useMemo(() => fn, deps)
* 렌더링 성능을 위해서 제공되는 훅
```javascript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

### 5.2.4 useReducer

* 리덕스의 리듀서처럼 관리
* useState 대체해서 사용 가능
* 자세한 것은 리덕스를 배우면 이해될 듯

```javascript
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

### 5.2.5 useImperativeHandle

* 클래스 컴포넌트의 부모 컴포넌트의 ref 객체를 통해 자식 컴포넌트의 메서드를 호출
* 될 수 있으면 사용하지 말자

```javascript
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

### 5.2.6 useLayoutEffect, useDebugValue

#### useLayoutEffect

* useEffect와 동일하게 동작하나, useEffect는 비동기로 동적하고 useLayoutEffect는 동기로 동작

#### useDebugValue

* 개발 편의를 위해 제공하는 훅
* 커스텀 훅의 내부 상태를 관찰할 수 있기 때문에 디버깅에 도움

## 5.3 클래스형 컴포넌트와 훅

* 리액트 버전 16.8 부터 getSnapshotBeforeUpdate, getDerivedStateFromError, componentDidCatch 메서드를 제외하고 모든 기능을 훅으로 구현 가능
* 책에 있는 소스를 봅시다

## 5.4 기존 클래스형 컴포넌트를 고려한 커스텀 훅 작성법