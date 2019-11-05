# 4. 리액트 코딩은 결국 컴포넌트 작성이다.

## 4.1 가독성과 생산성을 고려한 컴포넌트 코드 작성법

* 컴포넌트를 작성하는 사람 입장에서는 유지 보수하기 쉬운 코드
* 컴포넌트를 사용하는 사람 입장에서는 컴포넌트의 인터페이스를 쉽게 파악할 수 있는 코드

### 4.1.1 추천하는 컴포넌트 파일 작성법

* 비슷한 그룹의 코드끼리 묶어주는 게 도움이 됨

#### 코드를 그룹으로 나누고 우선순위에 따라 배치하기

* 리액트 프로젝트에서 대부분의 작업은 컴포넌트 파일 안에서 이루어짐
* 이런 컴포넌트 파일이 정리가 잘 안 되어 있고, 무언가를 수정하려 할 때마다 코드를 찾아다녀야 한다면 불필요하게 에너지와 시간을 낭비
* 컴포넌트 그룹 간의 배치 우선 순위
   1. 속성값 타입 정의 코드
   2. 상탯값 초기화 코드
   3. render 메서드를 제외한 나머지 생명 주기 메서드
   4. 생명 주기 메서드를 제외한 나머지 메서드
   5. render 메서드
   6. 컴포넌트 외부에서 정의하는 변수와 함수
```javascript
class MyComponent extends React.Component {
    static propTypes = {};
    state = {};
    constructor(props) {};
    componentDidMount() {};
    componentWillUnmount() {};
    requestData() {};
    onClick = () => {};
    render() {
        const {prop1, prop2} = this.props;
        const {state1, state2} = this.state;
        ...
    }
}

const URL_PRODUCT_LIST = '/api/products';
const getTotalPrice({price, total}) {};

export default MyComponent;
```
* 속성 값이 가장 먼저오는 이유는 사용하는 입장에서 다른 것은 모르더라도(알 필요도 없고) 속성 값을 알아야 하기 때문에(인터페이스) 사용자에게 속성 값을 찾는 편의를 제공하기 위해서
* 생명 주기 메서드의 경우 constructor 메서드를 가장 먼저 둔다.
* 클래스 필드를 사용하면 바인딩하지 않아도 사용 가능(아직 표준은 아니지만 babel 에서 지원)

> 클래스 필드(class field) : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields

#### 외부 변수와 함수 정의하기

* 파일의 가장 밑에 정의
* 특별한 이유가 없다면 변수는 상수 변수(const)로 정의하는 게 좋다.
* 상수 변수의 이름은 예제처럼 대문자로 작성하는 게 가독성에 좋다.
* render 메서드 내부에서 배열 리터럴로 직접 작성할 경우 가독성도 떨어질 뿐 아니라, render 메서드가 호출될 때 마다 커다란 크기의 객체가 매번 생성되기 때문에 성능도 낮아진다.

#### 함수형 컴포넌트 작성하기

* 클래스 컴포넌트가 필요한 경우가 아니라면(생명 주기 메서드를 세부적으로 사용한다던가, ref를 생성해야 한다던가 등등) 될 수 있으면 함수형 컴포넌트로 작성
```javascript
MyComponent.propTypes = {

};

function MyComponent({prop1, prop2}) {
    //
}

const URL_PRODUCT_LIST = '/api/products';
const getTotalPrice({price, total}) {};

export default MyComponent;

```

* 컴포넌트를 선언하는 부분과 export 부분은 따로 선언하는 것이 좋다. 이유는 고차 컴포넌트 등 적용하기 편하기 때문에
* 컴포넌트에 이름을 부여하자. 이름을 부여하지 않으면 디버깅 하기 어렵다.

### 4.1.2 속성값 타입 정의하기: prop-types

* 속성값의 타입 정보는 컴포넌트 코드의 가독성을 위해서 필수로 작성하는 것이 좋다.
* 성능상의 문제로 개발 모드에서만 사용
* 잘못된 속성 값을 사용할 경우 콘솔에서 에러 메시지가 출력(빌드랑 실제적으로 실행은 됨)

* https://reactjs-kr.firebaseapp.com/docs/typechecking-with-proptypes.html

#### prop-types 로 정의할 수 있는 타입

```javascript
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Anything that can be rendered: numbers, strings, elements or an array
  // (or fragment) containing these types.
  optionalNode: PropTypes.node,

  // A React element.
  optionalElement: PropTypes.element,

  // You can also declare that a prop is an instance of a class. This uses
  // JS's instanceof operator.
  optionalMessage: PropTypes.instanceOf(Message),

  // You can ensure that your prop is limited to specific values by treating
  // it as an enum.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // An object taking on a particular shape
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.
  requiredFunc: PropTypes.func.isRequired,

  // A value of any data type
  requiredAny: PropTypes.any.isRequired,

  // You can also specify a custom validator. It should return an Error
  // object if the validation fails. Don't `console.warn` or throw, as this
  // won't work inside `oneOfType`.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // You can also supply a custom validator to `arrayOf` and `objectOf`.
  // It should return an Error object if the validation fails. The validator
  // will be called for each key in the array or object. The first two
  // arguments of the validator are the array or object itself, and the
  // current item's key.
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```
* 기본값도 지정이 가능하다.
* 기본값에서도 타입 체크가 발생
```javascript
class Greeting extends React.Component {
  static defaultProps = {
    name: 'stranger'
  }

  render() {
    return (
      <div>Hello, {this.props.name}</div>
    )
  }
}
```

### 4.1.3 가독성을 높이는 조건부 렌더링 방법

* 조건부 렌더링을 구현할 때는 삼항 연산자가 유용한 경우도 있지만 && 연산자가 가독성이 더 좋다.
* 상황에 따라서 if을 쓰는 경우도 있으니 이것은 상황에 따라서 적절한 선택을 해야한다.

> && || 처리: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/%EB%85%BC%EB%A6%AC_%EC%97%B0%EC%82%B0%EC%9E%90(Logical_Operators)

```javascript
//3항 연산자를 사용한 경우
function GreetingA({isLogin, name}) {
    if (isLogin) {
        return <p>{`${name}님 안녕하세요.`}</p>;
    } 

    return <p>권한이 없습니다.</p>
}

function GreetingA({isLogin, name}) {
    return <p>{isLogin ? `${name}님 안녕하세요.` : '권한이 없습니다.'}</p>
}

// && 연산자를 사용한 경우

function Gretting({isLogin, name, cash}) {
    return (
        <div>
            저희 사이트에 방문해 주셔서 감사합니다.
            {isLogin ? (
                <div>
                    <p>{name}님 안녕하세요.</p>
                    <p>현재 보유하신 금액은 {cash}원입니다.</p>
                </div>
            ) : null}
        </div>
    )
}

function Gretting({isLogin, name, cash}) {
    return <div> 
        {isLogin && (
            <div>
                <p>{name}님 안녕하세요.</p>
                <p>현재 보유하신 금액은 {cash}원입니다.</p>
            </div>
        )}
        </div>
    )
}
```
* && 연산을 사용할 때 0, 빈문자열 등로 false 로 처리되기 때문에 이 부분을 주위해야 한다.

### 4.1.4 관심사 분리를 위한 프레젠테이션, 컨테이너 컴포넌트 구분하기

* 관심사 분리란? https://ko.wikipedia.org/wiki/%EA%B4%80%EC%8B%AC%EC%82%AC_%EB%B6%84%EB%A6%AC
* 비즈니스 로직과 상탯값의 유무에 따라서 프리젠테이션과 컨테이너로 분리는 두 가지 컴포넌트로 구분한다.
* 책에 있는 내용을 한번 보는 것으로

## 4.2 이벤트 처리 함수 작성하기

* 리액트 프로그램의 동작을 단순화하면
   1. 프로그램의 상탯값이 변경
   2. 리액트가 렌더 함수를 호출해서 화면을 다시 그린다.
* 프로그램의 상탯값 변경은 주로 여러 가지 이벤트에 반응하는 이벤트 처리 함수에서 발생

### 4.2.1 클래스 필드를 이용해 이벤트 처리 메서드 작성하기
 
* 클래스 필드를 이용해서 이벤트 처리 메서드를 작성하면 함수에 바인딩을 적용하면서 렌더링 성능과 가독성이라는 두 마리 토끼를 잡을 수 있다.
* 이벤트 처리 메서드가 컴폰넌트 인스턴스에 접근할 필요가 없다면 클래스 바깥에서 정의
```javascript
// 이벤트 처리 메서드의 함수 바인딩 코드를 작성하는 기존의 방법
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
        <>
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
            <button onClick={this.handleClick.bind(this)}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        </>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);

```
* 함수를 바인딩을 할 때마다 새로운 함수가 생성되기 때문에 render 메서드 내부네서 함수를 바인딩하는 건 성능에 마이너스 요소가 됨
* 성능을 생각한다면 생성자 안에서 바인딩하는 방법을 이용
* 생성자에 바인딩하는 방식은 귀찮다.
* 그래서 클래스 필드를 활용하는 방식을 사용한다.

```javascript
class LoggingButton extends React.Component {
  // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
  // 주의: 이 문법은 *실험적인* 문법입니다.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```
* https://ko.reactjs.org/docs/handling-events.html

### 4.2.2 데이터 시트로 이벤트 처리 함수에 값 전달하기

* 데이터 세트는 html 표준에 정의된 기능(https://developer.mozilla.org/ko/docs/Web/API/HTMLElement/dataset)
```javascript
//데이터 세트가 필요한 경우
class MyComponent extends Component {
    state = {
        selectedName: 'mike';
    }

    onClickMike = () => {
        this.setState({selectedName: 'mike'});
    }

    onClickJone = () => {
        this.setState({selectedName: 'jone'});
    }

    render() {
        const {selectedName} = this.state;

        return {
            <div>
                <button onClick={this.onClickMike}>mike</button>
                <button onClick={this.onClickJone}>jone</button>
                {`selectedName is ${selectedName}`}
            </div>
        }
    }
}

//매게 변수로 전달
class MyComponent extends Component {
    state = {
        selectedName: 'mike';
    }

    onClick = selectedName => {
        this.setState({selectedName});
    }

    render() {
        const {selectedName} = this.state;

        return {
            <div>
                <button onClick={() => this.onClick('mike')}>mike</button>
                <button onClick={() => this.onClick('jone')}>jone</button>
                {`selectedName is ${selectedName}`}
            </div>
        }
    }
}

//dataset을 활용한 경우
class MyComponent extends Component {
    state = {
        selectedName: 'mike';
    }

    onClick = e => {
        const selectedName = e.target.dataset.name;
        this.setState({selectedName});
    }

    render() {
        const {selectedName} = this.state;

        return {
            <div>
                <button onClick={this.onClick} data-name="mike">mike</button>
                <button onClick={this.onClick} data-name="jone">jone</button>
                {`selectedName is ${selectedName}`}
            </div>
        }
    }
}

```

### 4.2.3 상탯값 올림으로 부모 컴포넌트의 상탯값 변경하기

* 부모 컴포넌트는 자신의 이벤트 처리 함수를 자식 컴포넌트에 전달
* 자식 컴포넌트에서 이벤트 발생 시 부모에게서 받은 프로퍼티의 함수를 실행함으로써 부모의 상탯값을 변경
```javascript
class Parent extends Component {
    state ={
        name: '',
    }
    onChangeName = name => {
        this.setState({name});
    }

    render() {
        const {name} = this.state;
        return {
            <div>
                {`name is ${name}`}
                <Child name={name} onChange={onChangeName} />
            </div>
        }
    }
}

function Child({name, onChange}) {
    return <input value={name} onChange={onChange} />;
}
```
* 반대로 부모 컴포넌트에서 자식 컴포넌트의 상탯값을 변경하고 싶은 경우는 ref를 활용한다.
* 하지만 ref를 활용할 경우 부모 컴포넌트에서 자식 컴포넌트의 구현에 대한 의존성이 생기기 때문에 캡슐화에 위배됨으로 꼭 필요할 때만 사용(경우는 거의 없을 것으로 생각됨)

## 4.3 컴포넌트의 공통 기능 관리하기

* 중복되는 코드를 없애기 위해 중복되는 코드를 한 곳에 모아 놓는 방법

### 4.3.1 고차 컴포넌트를 이용한 공통 기능 관리

* 컴포넌트를 입력으로 받아서 컴포넌트를 출력해주는 함수
```javascript
//고차 컴포넌트 형태
const EnhancedComponent = higherOrderComponent(WrappedComponent);
//고차 컴포넌트 예
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" is some global data source
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // Subscribe to changes
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Clean up listener
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Update component state whenever the data source changes
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}

// This function takes a component...
function withSubscription(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);
```
* 오리지날 컴포넌트를 변형하지 말고, 구성(Composition))을 사용해라.
```javascript
//잘못된 예제
function logProps(InputComponent) {
  InputComponent.prototype.componentWillReceiveProps = function(nextProps) {
    console.log('Current props: ', this.props);
    console.log('Next props: ', nextProps);
  };
  // The fact that we're returning the original input is a hint that it has
  // been mutated.
  return InputComponent;
}

// EnhancedComponent will log whenever props are received
const EnhancedComponent = logProps(InputComponent);
//수정한 것
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props} />;
    }
  }
}
```
* 작성 시 주의 사항(https://ko.reactjs.org/docs/higher-order-components.html#convention-pass-unrelated-props-through-to-the-wrapped-component)
* https://ko.reactjs.org/docs/higher-order-components.html

#### 고차 컴포넌트의 단점

* 속성값이 암묵적으로 넘어온다는 점
* 서로 다른 고차 컴포넌트가 똑같은 속성값 이름을 사용할 때 발생
* 의례적인 절차가 필요하다는 점

### 4.3.2 랜더 속성값을 이용한 공통 기능 관리

* 코드 재사용을 위해 함수 타입의 속성값을 이용하는 패턴
```javascript
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/> 
```
* https://ko.reactjs.org/docs/render-props.html

#### 고차 컴포넌트 vs 랜더 속성값

* 고차 컴포넌트의 대부분의 단점은 랜더 속성값에서는 발생하지 않음
* 고차 컴포넌트는 인스턴스가 만들어지기 전에 발생하기 때뭉에 정적이고 랜더 속성값은 랜더 함수 호출 시에 동적으로 로직 변경이 가능
* 랜더 속성값은 함수 호출될 때마다 새로운 함수를 만들기 때문에 성능에 부정적이 영향을 줌
* 랜더 속성값이 중첩될 경우 코드가 복잡해질 수 있다.
* 적절하게 잘 선택하자.

## 4.4 랜더링 속도를 올리기 위한 성능 최적화 방법

* 랜더링이 가장 많은 자원을 사용
* 사용자 요청에 빠르게 반응하기 위해서는 렌더링 속도를 개선
* https://ko.reactjs.org/docs/optimizing-performance.html

### 4.4.1 상탯값을 불변 객체로 관리하기

* 상탯값이 불변처럼 동작을 하지만 실제적으로는 불변의 객체가 아니다.
* 불변의 객체로 해야 객체끼리만의 비교로 바로 변경 여부를 알 수 있기 때뭉에 랜더링 속도가 개선이 된다.
* 랜더링 과정은 지난주에 설명(https://ko.reactjs.org/docs/reconciliation.html)

### 4.4.2 랜더 함수에서 새로운 객체 만들지 않기

* 속성값에 새로운 객체 또는 함수를 생성할 경우 render 시에 항상 새로 생성되기 때문에 자식 입장에서는 다른 객체로 인식하고 새로 render 하게 된다.

### 4.4.3 메모이제이션 이용하기
### 4.4.4 성능 최적화를 위한 도구들 이용하기

* 크롬 개발자 도구 등을 이용
