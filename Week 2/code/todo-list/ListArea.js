import React from 'react';

class ListArea extends React.Component {
    render() {
        const listItems = this.props.list.map((content, index) => 
            <li key={index.toString()} onClick={() => this.props.onClick(index)}>
                {content.isDone ? "Done" : content.value}
            </li>
        );

        return (
            <ul>
                <li>{listItems}</li>
            </ul>
        );
    }
}

export default ListArea;