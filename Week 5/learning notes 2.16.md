# Learning notes of Week 5

## 2.16 Sat.

+ `await` 表达式只能让其所在的 `async` 函数的执行停止，而函数外不会受到影响。所以不存在一种方法能使整个程序在 `await` 表达式处暂停，即主线程无论如何都不会受到影响。

+ ```react
  const store = createStore(reducer,{},enhancer);
  ```

  ```react
  const reducer = combineReducers({
      user,
      ...
  });
  ```

  当 `enhancer` 仅由一个 `middlware` 构成时，可直接使用 `applyMiddleware` 方法：

  ```react
  const enhancer = applyMiddleware(promiseMiddleware)
  ```

  当 `enhancer` 还包含其他函数时，要使用 `compose` 方法：

  ```react
  const enhancer = compose(
      applyMiddleware(promiseMiddleware),
      (window && window.__REDUX_DEVTOOLS_EXTENSION__)? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
  );
  ```

  具体见 [Redux API 文档](http://cn.redux.js.org/docs/api/) 。

+ >`<Route>`中， exact 属性的值为 bool，为 true 表示严格匹配，为 false 表示正常匹配。
  >
  >如 exact 为 true 时，’/link’ 与 ’/’ 是不匹配的，但是在 false 的情况下它们就是匹配的。

+ `componentWillReceiveProps(nextProps)` 方法会在父组件更新时被调用，`nextProps` 是即将被传递的属性。

  [更多关于生命周期钩子的用法](https://blog.csdn.net/wangchenggggdn/article/details/79759171)

+ >+ 普通页面跳转：
  >
  >  ```js
  >  this.props.history.push("/targetURL");
  >  ```
  >
  >+ 带参数页面跳转：
  >
  >  ```js
  >  this.props.history.pushState({passParam: true}, "/targetURL");
  >  ```
  >
  >  第一个参数为需要传递的参数，如果不需要传参数，则为 null。
  >
  >  第二个参数为跳转目标页面。
  >
  >+ 目标页面获取参数：
  >
  >  ```js
  >  let temp = this.props.location.state;
  >  ```

+ 从当前页面跳转出去时，需要 

  1. 在表单提交或按钮按下的回调函数中 dispatch 重定向开始的 action 。

  2. 在 `componentWillReceiveProps` 生命周期钩子中进行页面跳转并 dispatch 重定向完成的 action 。

     （需要注意步骤1中的 action 一定要修改当前页面组件的 props，步骤2的生命周期钩子才会被调用）

+ 自动补全 connect 后注意一下 import 进来的是不是 'react-redux' 。
+ `<Link>` 组件

  + 可以 import 自 `@material-ui/core`，提供 `href` 属性，跳转之后会重新初始化 Redux store 。
  + 可以 import 自 `react-router-dom`， 提供 `to` 属性，跳转之后不会重新初始化 Redux store 。
+ import 自 `react-router-dom` 的 `<Link>` 组件（其实相当于 `<Header>` 组件）**必须位于 `<BrowserRouter>` 内！**

+ 页面间比较好的链接方式是

  + Homepage 利用 `<Link to="">` 跳转到 Subpage 。
  + Subpage 利用重定向跳转回 Homepage 。

+ 恢复未保存的 Typora 文档的方法：文件 -> 偏好设置 -> 恢复未保存的草稿


##### Last-modified date: 2019.2.16, 9 p.m.



