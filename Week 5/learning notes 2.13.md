# Learning notes of Week 5

## 2.13 Wed.

+ 路由

  >```react
  >import { BrowserRouter, Route } from 'react-router-dom';
  >
  >class App extends Component {
  >  render() {
  >    return (
  >      <MuiThemeProvider theme={theme}>
  >          <BrowserRouter>
  >            <div>
  >              <Route exact path="/" component={Home} />
  >              <Route exact path="/Detail" component={Detail} />
  >            </div>
  >          </BrowserRouter>
  >      </MuiThemeProvider>
  >    );
  >  }
  >}
  >```

+ >```css
  >display: 'flex',
  >flexDirection: 'column',
  >alignItems: 'center',
  >```
  >
  >内容居中显示

+ 有时出现神秘的换行可能是因为页面变长使右侧滑条出现导致页面变窄。

##### Last-modified date: 2019.2.13, 8 p.m.