import React from 'react';
import ListArea from './ListArea.js';
import FilterBox from './FilterBox.js';

class InputBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            list: [],
            filter: {
                showImportantOnly: false,
                showUnfinishedOnly: false,
            },
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }
    handleChange(event) {
        this.setState({
            value: event.target.value,
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.value)
            return;
        this.setState({
            list: this.state.list.concat({
                value: this.state.value,
                isImportant: false,
                isDone: false,
            }),
            value: '',
        });
    }
    handleStatusChange(index, status) {
        const list = this.state.list;
        if (status === 1)
            list[index].isImportant = !list[index].isImportant;
        else
            list[index].isDone = !list[index].isDone;
        this.setState({
            list: list,
        });
    }
    handleFilter(status) {
        const filter = this.state.filter;
        if (status === 1)
            filter.showImportantOnly = !filter.showImportantOnly;
        else
            filter.showUnfinishedOnly = !filter.showUnfinishedOnly;
        this.setState({
            filter: filter,
        });
    }
    render() {
        const { value, list, filter } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    autoFocus
                    type="text"
                    name="name"
                    value={value}
                    onChange={this.handleChange} />
                <input
                    type="submit"
                    value="Add" />
                <FilterBox
                    onChange={status => this.handleFilter(status)} />
                <br />
                <ListArea
                    list={list}
                    filter={filter}
                    onChange={(index, status) => this.handleStatusChange(index, status)} />
            </form>
        );
    }
}

export default InputBar;