# Learning notes of Week 5

## 2.12 Tue.

+ >所有容器组件都可以访问 Redux store。
  >
  >建议的方式是使用指定的 React Redux 组件 `<Provider>` 来魔法般地让所有容器组件都可以访问 store，而不必显式地传递它。只需要在渲染根组件时使用即可。
  >
  >```js
  ><Provider store={store}>
  >	<App />
  ></Provider>
  >```

+ >Redux middleware 提供的是**位于 action 被发起之后，到达 reducer 之前的扩展点。**

##### Last-modified date: 2019.2.12, 7 p.m.