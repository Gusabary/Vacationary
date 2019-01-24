import React from 'react';
import ListArea from './ListArea.js';

class InputBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            num: 0,
            list: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange(event) {
        this.setState({
            value: event.target.value,
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            list: this.state.list.concat({
                value: this.state.value,
                isDone: false,
            }),
            value: '',
            num: this.state.num + 1,
        });
    }
    handleClick(i) {
        //alert(i);
        const list = this.state.list;
        list[i].isDone = !list[i].isDone;
        this.setState({
            list: list,
        });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" value={this.state.value} onChange={this.handleChange} />
                <input type="submit" value="Add" />
                <br />
                <ListArea num={this.state.num} list={this.state.list} onClick={i => this.handleClick(i)} />
            </form>
        );
    }
}

export default InputBar;