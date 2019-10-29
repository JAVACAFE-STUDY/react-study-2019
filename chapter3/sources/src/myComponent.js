import React from 'react';
import Title from './title';

class MyComponent extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {desc: '', currentId: 1, todoList: []};    
    // }
    state = {desc: '', currentId: 1, todoList: []};
    //textRef = React.createRef();
    textRef = null;

    componentDidMount() {
        this.setFocus();
    }

    setFocus = () => {
        this.textRef.focus();
    };

    onAdd = () => {
        const {desc, currentId, todoList} = this.state;
        const todo = {id: currentId, desc};
        this.setState({
            currentId: currentId + 1,
            todoList: [...todoList, todo],
        })
    }

    onDelete = e => {
        const {todoList} = this.state;
        const id = Number(e.target.dataset.id);
        const newTodoList = todoList.filter(todo => todo.id !== id);
        this.setState({todoList: newTodoList});
    }

    onSaveToServer = () => {}

    onChangeDesc = e => {
        const desc = e.target.value;
        this.setState({desc});
    }

    render() {
        const {desc, todoList} = this.state;
        const count = todoList.length;

        console.log(<Title title="dwdwd" />);

        return (
            <div>
                <Title title={`현재 할 일 갯수는: ${count}`} />
                <Title title="dwdwd" />
                <ul>
                    {todoList.map(todo => 
                        <li key={todo.id}>
                            <span>{todo.desc}</span>
                            <button data-id={todo.id} onClick={this.onDelete}>삭제</button>
                        </li>
                    )}
                </ul>
                <input value={desc} onChange={this.onChangeDesc} ref={input => this.textRef = input} />
                <button onClick={this.onAdd}>추가</button>
                <button onClick={this.onSaveToServer}>서버에 저장</button>
            </div>
        )
    }
}

export default MyComponent;