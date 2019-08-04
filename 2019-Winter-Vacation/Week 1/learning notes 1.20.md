# Learning notes of Week 1

## 1.20 Sun.

+ >可以在初始化变量之后再实际声明它，并且它仍然可以工作。这是因为变量的声明通常在其余的代码执行之前完成。这叫做**顶置**。

+ >变量名大小写敏感。

+ >数组是一个单个对象，其中包含很多值，用**方括号**括起来，并用逗号分隔。
  >
  >```js
  >var myNumberArray = [10,15,40];
  >```

+ 对象 `object`

  >```js
  >var dog = { name : 'Spot', breed : 'Dalmatian' };
  >```
  >
  >```js
  >dog.name
  >```

+ `===` 严格等于

  `!==` 严格不等于

+ [运算符优先级](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Operator_precedence)

+ [转义](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Escape_notation)

+ 字符串与数字类型的互换

  + String to Number

    >```js
    >var myString = '123';
    >var myNum = Number(myString);
    >```

  + Number to String

    >```js
    >var myNum = 123;
    >var myString = myNum.toString();
    >```

+ 字符串对象的一些方法

  + `s.length` 获取 s 的长度。

  + `s[i]` 取 s 中的第 i+1 个字符。

  + `s.inedxOf(a)` 返回 s 中子串 a 的起始位置，若不存在子串 a ，则返回 -1。

  + `s.slice(start,end)` 提取 s 中 `[start,end)` 范围内的子串。

    `end` 可省略，此时为提取 s 中 `start` 之后的子串。

  + `s.toLowerCase()`, `s.toUpperCase()` 切换大小写。

  + `a = s.replace(old,new)` 将 s 中的**第一个**子串 old 替换为 new， 并将新串赋给 a 。

+ 一个数组内元素可以不是同一类型。

+ 数组对象的一些方法

  + `a.length` 获取 a 的长度
  + 字符串和数组之间的转换
    + `a = s.split(',')` 以 `,` 分隔 s 内的元素并存入 a 中。
    + `s = a.join(',')` 以 `,` 分隔 a 中的元素并存入 s 。
    + `s = a.toString()` 以 `,` 分隔 a 中的元素并存入 s 。
  + 添加和删除数组项
    + `a.push(x)` 将 x 添加到 a 的末尾，返回数组新长度。
    + `a.pop()` 删除 a 的最后一个元素，范围被删除的元素。
    + `a.unshift(x)` 效果与 `a.push(x)` 相同，只是作用在数组的开始。
    + `a.shift(x)` 效果与 `a.pop(x)` 相同，只是作用在数组的开始。

+ 三元运算符

  `(condition) ? yes : no`

+ 变量的值可以是函数：

  >```js
  >var myGreeting = function() {
  >  alert('hello');
  >}
  >```
  >
  >现在可以使用以下方式调用此函数：
  >
  >```js
  >myGreeting();
  >```

+ 循环（for（）{...}）和条件块（if（）{...}）不是新的 scope。

+ 一些**事件**：

  + `onfocus`,  `onblur` 置于焦点时，解除焦点时。

  + `onclick`, `ondblclick` 单击时，双击时。

  + `onkeydown`, `onkeyup`, `onkeypress` 按下时，松开时，按下并松开时。

    （作用于代表浏览器窗口的 window 对象，而非按钮）

  + `onmouseover`, `onmouseout` 鼠标移入按钮上方时，从按钮移出时。

+ 处理事件的方式

  + 事件 处理器 / 监听器 属性

    >```js
    >btn.onclick = function() {
    >  var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
    >  document.body.style.backgroundColor = rndCol;
    >}
    >```
    >
    >```js
    >buttons[i].onclick = bgChange;
    >```

  + `addEventListener()` 和 `removeEventListener()`

    >```js
    >btn.addEventListener('click', bgChange);
    >```
    >
    >```js
    >btn.removeEventListener('click', bgChange);
    >```

  >您也可以给同一个监听器注册多个处理器，下面这种方式不能实现这一点：
  >
  >```js
  >myElement.onclick = functionA;
  >myElement.onclick = functionB;
  >```
  >
  >第二行会覆盖第一行，但是下面这种方式就会正常工作了：
  >
  >```js
  >myElement.addEventListener('click', functionA);
  >myElement.addEventListener('click', functionB);
  >```
  >
  >当元素被点击时两个函数都会工作。

+ 事件对象

  >事件对象 `e` 的`target`属性始终是事件刚刚发生的元素的引用。
  >
  >```js
  >for (var i = 0; i < divs.length; i++) {
  >  divs[i].onclick = function(e) {
  >    e.target.style.backgroundColor = bgChange();
  >  }
  >```

+ 事件冒泡与事件捕获

  + 事件冒泡

    >- 浏览器检查实际点击的元素是否在冒泡阶段中注册了一个`onclick`事件处理程序，如果是，则运行它
    >- 然后它移动到下一个直接的祖先元素，并做同样的事情，然后是下一个，等等，直到它到达`<html>`元素。

  + 事件捕获

    >- 浏览器检查元素的最外层祖先`<html>`，是否在捕获阶段中注册了一个`onclick`事件处理程序，如果是，则运行它。
    >- 然后，它移动到`<html>`中的下一个元素，并执行相同的操作，然后是下一个元素，依此类推，直到到达实际点击的元素。

  + > 在现代浏览器中，默认情况下，所有事件处理程序都在冒泡阶段进行注册。

  + `stopPropagation()` 可以使事件不会在冒泡链中进一步传递。

    >我们可以通过改变前面代码块中的第二个处理函数来解决当前的问题:
    >
    >```js
    >video.onclick = function(e) {
    >  e.stopPropagation();
    >  video.play();
    >};
    >```

+ 访问对象属性的方法：

  + 点表示法

    >```js
    >person.age
    >person.name.first
    >```

  + 括号表示法

    >```js
    >person['age']
    >person['name']['first']
    >```

  括号表示法可以以变量作为 index, 而点表示法不行。

+ 构造函数

  >```js
  >function Person(name) {
  >  this.name = name;
  >  this.greeting = function() {
  >    alert('Hi! I\'m ' + this.name + '.');
  >  };
  >}
  >```
  >
  >```js
  >var person1 = new Person('Bob');
  >var person2 = new Person('Sarah');
  >```

+ 其他创建对象实体的方法

  + `Object()` 构造函数

    `Object()` 创建了一个空的对象。

    >然后, 可以根据需要, 使用点或括号表示法向此对象**添加**属性和方法。
    >
    >```js
    >var person1 = new Object();
    >person1.name = 'Chris';
    >person1['age'] = 38;
    >person1.greeting = function() {
    >  alert('Hi! I\'m ' + this.name + '.');
    >}
    >```

  + `cerate()` 方法

    >```js
    >var person2 = Object.create(person1);
    >```
    >
    >`person2`是基于`person1`创建的， 它们具有相同的属性和方法。这非常有用， 因为它允许您创建新的对象实例而无需定义构造函数。

##### Last-modified date: 2019.1.20, 7 p.m.