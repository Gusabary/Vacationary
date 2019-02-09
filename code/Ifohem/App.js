import React from 'react';
import TopBar from './Components/TopBar';
import TitleBar from './Components/TitleBar';
import ExpansionBar from './Components/ExpansionBar';
import Content from './Components/Content';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <TopBar />
            <TitleBar />
            <ExpansionBar />
            <Content />
        </MuiThemeProvider>
    );
}

export default App;