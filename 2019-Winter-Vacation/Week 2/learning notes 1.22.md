# Learning notes of Week 2

## 1.22 Tue.

+ >In JavaScript classes, you need to always call `super()` when defining the constructor of a subclass.

+ >一个组件会接受名为 `props` 的参数，并通过名为 `render` 的方法返回一个嵌套结构的视图。
  >
  >`render` 返回的是一个 **React 元素**，是一种对渲染内容比较简洁的描述。

+ >通过 `<ShoppingList />` 这样的标签你就可以在 React 当中调用整个 `ShoppingList` 组件。

+ >当你遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，把子组件的 state 数据提升至其共同的父组件当中保存，之后父组件可以通过 props 将状态数据传递到子组件当中。

+ >每个组件的 state 都是私有的。

+ >通过使用 `.slice()` 方法对已有的数据进行浅拷贝，以此来防止对已有数据的改变。
  >
  >```js
  >const squares = this.state.squares.slice();
  >```

+ >React 专门为只有 `render` 方法的组件提供了一种更简便的定义组件的方法：**函数定义组件** 。
  >
  >```js
  >function Square(props) {
  >  return (
  >    <button className="square" onClick={props.onClick}>
  >      {props.value}
  >    </button>
  >  );
  >}
  >```
  >
  >记得把所有的 `this.props` 替换成参数 `props`。

+ >在渲染列表项时添加 keys 值。
  >
  >组件的 keys 值并不需要在全局都保证唯一，只需要在当前的节点里保证唯一即可。

+ `var` 的顶置作用是**声明的顶置**，而不是赋值的顶置。

  >```js
  >console.log(a);
  >var a = 2;
  >console.log(a);
  >```
  >
  >```js
  >var a;
  >console.log(a);
  >a = 2;
  >console.log(a);
  >```
  >
  >以上两段代码效果相同。

+ >在 JSX 当中的表达式要包含在大括号里。

  比如：`<h1> 2 + 2 </h1>` 显示的是 2 + 2，而 `<h1> {2 + 2} </h1>` 显示的是 4 。

+ >我们书写 JSX 的时候一般都会带上换行和缩进，这样可以增强代码的可读性。与此同时，我们同样推荐在 JSX 代码的外面扩上一个小括号，这样可以防止分号自动插入的 bug。

+ >你可以使用引号来定义以字符串为值的属性：
  >
  >```react
  >const element = <div tabIndex="0"></div>;
  >```
  >
  >也可以使用大括号来定义以 JavaScript 表达式为值的属性：
  >
  >```react
  >const element = <img src={user.avatarUrl} />;
  >```
  >
  >切记你使用了大括号包裹的 JavaScript 表达式时就不要再到外面套引号了。JSX 会将引号当中的内容识别为字符串而不是表达式。

+ >如果 JSX 标签是闭合式的，那么你需要在结尾处用 `/>`
  >
  >```react
  >const element = <img src={user.avatarUrl} />;
  >```

+ >首先我们在一个 HTML 页面中添加一个 `id="root"` 的 `<div>`:
  >
  >```html
  ><div id="root"></div>
  >```
  >
  >在此 div 中的所有内容都将由 React DOM 来管理，所以我们将其称之为 “根” DOM 节点。
  >
  >我们用React 开发应用时一般只会定义一个根节点。
  >
  >要将React元素渲染到根DOM节点中，我们通过把它们都传递给 `ReactDOM.render()` 的方法来将其渲染到页面上：
  >
  >```react
  >ReactDOM.render(
  >    <h1>Hello, world!</h1>, 
  >    document.getElementById('root')
  >);
  >```

+ >组件名称必须以大写字母开头。

+ >组件的返回值只能有一个根元素。这也是我们要用一个`<div>`来包裹所有`<Welcome />`元素的原因。
  >
  >```react
  >function App() {
  >  return (
  >    <div>
  >      <Welcome name="Sara" />
  >      <Welcome name="Cahal" />
  >      <Welcome name="Edite" />
  >    </div>
  >  );
  >}
  >```

+ >无论是使用函数或是类来声明一个组件，它决不能修改它自己的props。

##### Last-modified date: 2019.1.22, 8 p.m.











   
