import React from 'react';
import ReactDOM from 'react-dom';
import InputBar from './InputBar.js';

class Hello extends React.Component {
    render() {
        return (
            <div>
                <h1>TODO LIST:</h1>
                <InputBar />
            </div>
        );
    }
}

ReactDOM.render(<Hello />, document.getElementById('root'));