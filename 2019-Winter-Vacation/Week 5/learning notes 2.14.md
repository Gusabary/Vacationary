# Learning notes of Week 5

## 2.14 Thu.

+ 组件根据如何 `export` 大致可分两类，一类是容器组件，描述如何运行：

  ```react
  export default connect(
      mapStateToProps,
    	mapDispatchToProps
  )(App)
  ```

  另一类是展示组件，描述如何展现：

  ```react
  export default withStyles(styles)(App)
  ```

  一般来说，每个目录的 `index.js` 设为容器组件比较好。

  [了解更多](http://cn.redux.js.org/docs/basics/UsageWithReact.html)

+ ```
  Error: Uncaught TypeError: Object(...) is not a function
  ```

  这个错误一般是由于引用第三方类库的路径不对。

  例如本该是

  ```react
  import { connect } from 'react-redux'
  ```

  这时 import 进来的 `connect` 当成一个 `function`，

  而如果写成

  ```react
  import { connect } from 'net'
  ```

  则 `connect` 成了一个 `Object` 。

+ ```react
  Error: Could not find "store" in either the context or props of "Connect(ReduxForm)". Either wrap the root component in a <Provider>, or explicitly pass "store" as a prop to "Connect(ReduxForm).
  ```

  这个错误一般是由于 `store` 没有正确导入。

  需要注意的是，使用 `<Provider store = {store}>` 时，**`<Provider>` 元素必须在 `ReactDOM.render` 内**，即：

  ```react
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
      	<App />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
  );
  ```

  而不能写成

  ```react
  ReactDOM.render(<App />, document.getElementById('root'));
  ```

  再去 `App.js` 的 `render` 方法里写

  ```react
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
      	balabala...
      </MuiThemeProvider>
    </Provider>
  ```

+ ```react
  export default connect(()=>({}),mapDispatchToProps)(withStyles(styles)(SignIn));
  ```

  如果没有用到 `mapStateToProps`，则在第一个参数的位置上要写 `()=>({})`，否则会报 `TypeError: dispatch is not a function` 的错误。

+ 用 `dispatch` 修改 `store` 和利用路由进行页面跳转最好不要同时发生。

+ >then 方法有两个参数，第一个参数是Promise实例对象为Resolved状态时的回调函数，它的参数就是上面Promise构造函数里resolve传递过来的异步操作成功的结果。
  >
  >第二个参数可选，是Promise实例对象为Rejected状态时的回调函数，它的参数就是上面Promise构造函数里reject传递过来的异步操作失败的信息。
  >
  >```js
  >myPromise.then(function(value) {
  >    console.log(value);
  >}, function(error) {
  >     console.log(error);
  >});
  >```

  即then的两个参数均为函数（且被异步调用），Promise对象为Resolved状态时，调用then的第一个参数，为Rejected状态时，调用then的第二个参数。

  >then方法最强大之处在于，它内部可以使用return或throw来实现**链式调用**。使用return或throw后的返回值是一个新的Promise实例对象。

  用return返回的是Resolved状态的Promise对象。

  用throw返回的是Rejected状态的Promise对象。

+ >Promise构造函数用一个函数作为参数，该函数有两个参数，两个参数均是回调函数，**由JS引擎提供，你不用自己部署了**。第一个参数resolve，当异步操作成功时会调用，它有一个参数用于传递异步操作成功的结果。第二个参数reject，当异步操作失败时会调用，它有一个参数用于传递异步操作失败的信息。例如：
  >
  >```js
  >var myPromise = new Promise(function(resolve, reject) {
  >    ...  //异步操作
  >    if( success ) {
  >        resolve(value);
  >    } else {
  >        reject(error);
  >    }
  >});
  >```

  即Promise的构造函数有一个参数，这个参数是带函数体的函数，这个函数又有两个参数，为resolve和reject，这两个参数是JS引擎提供好的回调函数，分别在异步操作成功和失败后调用，这两个回调函数分别有一个参数，自己设定，用来传递操作结果的信息。

+ >`async` 函数中可能会有 `await` 表达式，这会使 `async` 函数暂停执行，等待 `Promise`  的结果出来，然后恢复`async`函数的执行并返回解析值（resolved）。
  >
  >注意， `await` 关键字仅仅在 `async` function中有效。

  *Source: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function*

##### Last-modified date: 2019.2.14, 7 p.m.


