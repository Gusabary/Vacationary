# Learning notes of Week 2

## 1.21 Mon.

+ >JSON 是一种纯数据格式，它只包含属性，没有方法。
  >
  >在 JSON 中，只有字符串才能用作属性。

+ [HTTP verbs 学习笔记](HTTP verbs.md)。

+ ES6.变量声明

  ES6 之前，用 `var` 声明的变量都会**顶置**，即无论声明在何处，都会被视为声明在**函数**的最顶部，且声明可以在使用后。

  而 ES6 的 `let` 和 `const` 的作用于被限制在 `{}` 内部，且声明必须在使用之前（暂时性死区 TDZ）。

+ ES6.拼接字符串

  ```js
  `hello ${name}` 与 'hello' + name 效果一样
  ```

  注意新写法为反引号（`）。

+ ES6.字面量对象添加方法

  >```js
  >const people = {
  >    name: 'lux',
  >    getName () {
  >        console.log(this.name)
  >    }
  >}
  >```

+ ES6.浅复制

  >`Object.assign()` 可以把任意多个源对象自身可枚举的属性拷贝给目标对象，然后返回目标对象。第一参数即为目标对象。在实际项目中，我们为了不改变源对象。一般会把目标对象传为{}
  >
  >```js
  >    const objA = { name: 'cc', age: 18 }
  >    const objB = { address: 'beijing' }
  >    const objC = {} // 这个为目标对象
  >    const obj = Object.assign(objC, objA, objB)
  >
  >    // 我们将 objA objB objC obj 分别输出看看
  >    console.log(objA)   // { name: 'cc', age: 18 }
  >    console.log(objB) // { address: 'beijing' }
  >    console.log(objC) // { name: 'cc', age: 18, address: 'beijing' }
  >    console.log(obj) // { name: 'cc', age: 18, address: 'beijing' }
  >
  >    // 是的，目标对象ObjC的值被改变了。
  >    // so，如果objC也是你的一个源对象的话。请在objC前面填在一个目标对象{}
  >    Object.assign({}, objC, objA, objB)
  >```

##### Last-modified date: 2019.1.21, 8 p.m.