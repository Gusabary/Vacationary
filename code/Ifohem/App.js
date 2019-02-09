import React from 'react';
import TopBar from './TopBar';
import TitleBar from './TitleBar';
import ExpansionBar from './ExpansionBar';
import Content from './Content';

function App() {
    return (
        <React.Fragment>
            <TopBar />
            <TitleBar />
            <ExpansionBar />
            <Content />
        </React.Fragment>
    );
}

export default App;