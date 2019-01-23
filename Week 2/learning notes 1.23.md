# Learning notes of Week 2

## 1.23 Wed.

+ >通过调用 `setState()` ，React 知道状态已经改变，并再次调用 `render()` 方法来确定屏幕上应当显示什么。

+ >构造函数是唯一能够初始化 `this.state` 的地方。
  >
  >此代码不会重新渲染组件：
  >
  >```react
  >// Wrong
  >this.state.comment = 'Hello';
  >```
  >
  >应当使用 `setState()`:
  >
  >```react
  >// Correct
  >this.setState({comment: 'Hello'});
  >```

+ >类的方法默认是不会绑定 `this` 的。
  >
  >在 `constructor()` 里加上 `this.handleClick = this.handleClick.bind(this);` 。
  >
  >通常情况下，如果你没有在方法后面添加 `()` ，例如 `onClick={this.handleClick}`，你应该为这个方法绑定 `this`。

+ >JavaScript 的逻辑与 &&，它可以方便地条件渲染一个元素：
  >
  >```react
  >return (
  >    <div>
  >      <h1>Hello!</h1>
  >      {unreadMessages.length > 0 &&
  >        <h2>
  >          You have {unreadMessages.length} unread messages.
  >        </h2>
  >      }
  >    </div>
  >  );
  >```
  >
  >三目运算符同理。

+ >让 `render` 方法返回 `null` 而不是它的渲染结果即可隐藏组件。
  >
  >```react
  >function WarningBanner(props) {
  >  if (!props.warn) {
  >    return null;
  >  }
  >
  >  return (
  >    <div className="warning">
  >      Warning!
  >    </div>
  >  );
  >}
  >```

+ 将数组渲染成无序列表：

  >```react
  >function NumberList(props) {
  >  const numbers = props.numbers;
  >  const listItems = numbers.map((number) =>
  >    <li key={number.toString()}>
  >      {number}
  >    </li>
  >  );
  >  return (
  >    <ul>{listItems}</ul>
  >  );
  >}
  >```

+ > 如果你选择不指定显式的键值，那么React将默认使用**索引**用作为列表项目的键值。

+ >元素位于 **`map()` 方法内**时需要设置键属性。

+ >key 会作为给 React 的提示，但不会传递给你的组件。如果您的组件中需要使用和 `key` 相同的值，请用其他属性名显式传递这个值：
  >
  >```react
  >const content = posts.map((post) =>
  >  <Post
  >    key={post.id}
  >    id={post.id}
  >    title={post.title} />
  >);
  >```
  >
  >上面例子中，`Post` 组件可以读出 `props.id`，但是不能读出 `props.key` 。

+ >你应该依赖自上而下的数据流，而不是尝试在不同组件中同步状态。

+ >一些组件不能提前知道它们的子组件是什么。这对于 `Sidebar` 或 `Dialog` 这类通用容器尤其常见。
  >
  >我们建议这些组件使用 **`children` 属性**将子元素直接传递到输出。
  >
  >```react
  >function FancyBorder(props) {
  >  return (
  >    <div className={'FancyBorder FancyBorder-' + props.color}>
  >      {props.children}
  >    </div>
  >  );
  >}
  >```
  >
  >这样做还允许其他组件通过嵌套 JSX 来传递子组件。
  >
  >```react
  >function WelcomeDialog() {
  >  return (
  >    <FancyBorder color="blue">
  >      <h1 className="Dialog-title">
  >        Welcome
  >      </h1>
  >      <p className="Dialog-message">
  >        Thank you for visiting our spacecraft!
  >      </p>
  >    </FancyBorder>
  >  );
  >}
  >```

+ >`state` 只在交互的时候使用，即随时间变化的数据。

##### Last-modified date: 2019.1.23, 9 p.m.