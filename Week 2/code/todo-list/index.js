import React from 'react';
import ReactDOM from 'react-dom';
import InputBar from './InputBar.js';

class Hello extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>hi!</h2>
                <InputBar />
                <h3>haha!</h3>
            </div>
        );
    }
}

ReactDOM.render(<Hello />, document.getElementById('root'));