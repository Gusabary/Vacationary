# Learning notes of Week 6

## 2.23 Sat.

+ 状态钩子 State Hook

  >```react
  >import { useState } from 'react';
  > 
  >function Example() {
  >	const [count, setCount] = useState(0);
  >
  >	return (
  >		<div>
  >			<p>You clicked {count} times</p>
  >			<button onClick={() => setCount(count + 1)}>
  >				Click me
  >			</button>
  >		</div>
  >	);
  >}
  >```

  + `useState` 方法接收一个参数，为 state 的初值，返回一个 pair，这个 pair 包含 state 的名字和修改 state 的方法的名字。初值只会在第一次 render 时赋给 state，之后每一次 render 都会用上一次 state 的值。
  + 修改 state 的方法接受一个参数，即修改后 state 的值。需要注意的是，如果 state 是一个 object，则修改后的值需要包含所有的 key（原来 `this.setState` 写法里修改 object 的值采用的是新旧状态合并的方法，即 merge，而用 hook 的写法更新 state 是彻彻底底的 replace）。

+ 副作用钩子 Effect Hook

  >```react
  >useEffect(() => {
  >	ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  >	return () => {
  >		ChatAPI.unsubscribeFromFriendStatus(props.friend.id, 						handleStatusChange);
  >	};
  >});
  >```

  + `useEffect` 方法中 return 之外的部分会在每次 render 之后被调用，相当于 `componentDidMount` 和 `componentDidUpdate` 的组合。
  + `useEffect` 方法可以返回一个函数，会在 unmount 的时候调用执行清理，相当于 `componentWillUnmount`。

+ Hooks 规范

  只在 React **组件函数**的**顶层**使用 Hooks。

  + 不能在普通的 JavaScript 函数中使用。
  + 不能在循环语句、条件语句或嵌套函数内使用。
  + 但是可以在一个 Hook 中使用另一个 Hook。

##### Last-modified date: 2019.2.23, 1 p.m.