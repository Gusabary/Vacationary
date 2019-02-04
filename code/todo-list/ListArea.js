import React from 'react';

class ListArea extends React.Component {
    render() {
        const listItems = this.props.list.map((content, index) => {
            if (this.props.filter.showImportantOnly && !content.isImportant)
                return;
            if (this.props.filter.showUnfinishedOnly && content.isDone)
                return;

            const importantChecked = content.isImportant ? true : false;
            const doneChecked = content.isDone ? true : false;
            return (
                <div>
                    <li key={index.toString()} >
                        {content.value}
                        <input type="checkbox" checked={importantChecked} onChange={() => this.props.onChange(index, 1)} />
                        <label>Important</label>
                        <input type="checkbox" checked={doneChecked} onChange={() => this.props.onChange(index, 2)} />
                        <label>Done</label>
                    </li>
                </div>
            );
        });

        return (
            <ul>
                {listItems}
            </ul>
        );
    }
}

export default ListArea;