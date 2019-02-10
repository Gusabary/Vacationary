# Learning notes of Week 4

## 2.10 Sun.

+ >为了把 action 和 state 串起来，开发一些函数，这就是 reducer。再次地，没有任何魔法，reducer 只是一个接收 state 和 action，并返回新的 state 的纯函数。

+ `store` 的 API 有 `subscribe`, `dispatch` 和 `getState ` 。

+ `Redux` 三大原则：

  + 单一数据源
  + `state` 只读
  + 是用纯函数执行修改

+ >`action` 本质上是 JavaScript 普通对象。我们约定，`action` 内必须使用一个字符串类型的 `type` 字段来表示将要执行的动作。

+ >**`action 创建函数`** 就是生成 `action` 的方法。“`action`” 和 “`action 创建函数`” 这两个概念很容易混在一起，使用时最好注意区分。
  >
  >在 Redux 中的 `action 创建函数 `只是简单的返回一个 `action` :
  >
  >```js
  >function addTodo(text) {
  >  return {
  >    type: ADD_TODO,
  >    text
  >  }
  >}
  >```

+ >Redux 中只需把 `action 创建函数` 的结果传给 `dispatch()` 方法即可发起一次 dispatch 过程。
  >
  >```js
  >dispatch(addTodo(text))
  >```

+ >`reducer` 指定了应用状态的变化如何响应 `action` 并发送到 `store` ，记住 `action` 只是描述了*有事情发生了*这一事实，并没有描述应用如何更新 `state`。
  >
  >`reducer` 就是一个纯函数，接收旧的 `state` 和 `action`，返回新的 `state`。

+ >```js
  >Object.assign(target, ...sources)
  >```

  从左至右，把 `source` 里的内容放到 `target` 中，如果已存在则覆盖。

+ 在 `reducer` 中，**default 情况下返回旧的 `state`。**遇到未知的 `action` 时，一定要返回旧的 `state`。

+ >主 reducer 并不需要设置初始化时完整的 state。初始时，如果传入 `undefined`, 子 reducer 将负责返回它们的默认值。
  >
  >```js
  >function todos(state = [], action) {
  >  switch (action.type) {
  >    case ADD_TODO:
  >      return [
  >        ...state,
  >        {
  >          text: action.text,
  >          completed: false
  >        }
  >      ]
  >    case TOGGLE_TODO:
  >      return state.map((todo, index) => {
  >        if (index === action.index) {
  >          return Object.assign({}, todo, {
  >            completed: !todo.completed
  >          })
  >        }
  >        return todo
  >      })
  >    default:
  >      return state
  >  }
  >}
  >
  >function visibilityFilter(state = SHOW_ALL, action) {
  >  switch (action.type) {
  >    case SET_VISIBILITY_FILTER:
  >      return action.filter
  >    default:
  >      return state
  >  }
  >}
  >
  >function todoApp(state = {}, action) {
  >  return {
  >    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
  >    todos: todos(state.todos, action)
  >  }
  >}
  >```
  > `todoApp` 函数也可以写成这样：
  >```js
  >const todoApp = combineReducers({
  >  visibilityFilter,
  >  todos
  >})
  >```

+ >```js
  >let store = createStore(todoApp)
  >```
  >
  >[`createStore()`](http://cn.redux.js.org/docs/api/createStore.html) 的第二个参数是可选的, 用于设置 state 初始状态。

+ >```js
  >// 打印初始状态
  >console.log(store.getState())
  >
  >// 每次 state 更新时，打印日志
  >// 注意 subscribe() 返回一个函数用来注销监听器
  >const unsubscribe = store.subscribe(() => console.log(store.getState()))
  >
  >// 发起一系列 action
  >store.dispatch(addTodo('Learn about actions'))
  >store.dispatch(addTodo('Learn about reducers'))
  >store.dispatch(addTodo('Learn about store'))
  >store.dispatch(toggleTodo(0))
  >store.dispatch(toggleTodo(1))
  >store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))
  >
  >// 停止监听 state 更新
  >unsubscribe()
  >```

+ >Redux 和 React 之间没有关系。Redux 支持 React、Angular、Ember、jQuery 甚至纯 JavaScript。

##### Last-modified date: 2019.2.10, 6 p.m.