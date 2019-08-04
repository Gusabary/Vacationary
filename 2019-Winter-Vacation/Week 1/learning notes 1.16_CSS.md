# Learning notes of Week 1

## 1.16 Wed. CSS

- CSS`  应用到 ` HTML 上的方法：

  - 外部样式表（推荐）

    > ```html
    > <head>
    >     <meta charset="utf-8">
    >     <title>My CSS experiment</title>
    >     <link rel="stylesheet" href="style.css">
    > </head>
    > ```

  - 内部样式表
  - 内联样式

- `/*...*/` 注释

- 简写

  >```css
  >/* 在padding和margin这样的简写属性中，值赋值的顺序是top、right、bottom、left。 
  >   它们还有其他简写方式，例如给padding两个值，则第一个值表示top/bottom，第二个值表示left/right */
  >padding: 10px 15px 15px 5px;
  >```

+ 选择器

  + 简易选择器

    + 类型选择器 / 元素选择器：

      >```css
      >div {
      >  color: blue;
      >}
      >```

    + 类选择器：

      >```html
      ><ul>
      >  <li class="first done">Create an HTML document</li>
      >  <li class="second done">Create a CSS style sheet</li>
      >  <li class="third">Link them all together</li>
      ></ul>
      >```
      >
      >```css
      >.first {
      >  font-weight: bold;
      >}
      >.done {
      >  text-decoration: line-through;
      >}
      >```
      >
      >文档中的多个元素可以具有相同的类名，而单个元素可以有多个类名 (以空格分开多个类名的形式书写)。

    + ID选择器：

      >```html
      ><p id="polite"> — "Good morning."</p>
      ><p id="rude"> — "Go away!"</p>
      >```
      >
      >```css
      >#polite {
      >  font-family: cursive;
      >}
      >
      >#rude {
      >  font-family: monospace;
      >  text-transform: uppercase;
      >}
      >```
      >
      >一个ID名称必须在文件中是**唯一**的。

    + 通用选择器：

      >```css
      >* {
      >  padding: 5px;
      >  border: 1px solid black;
      >  background: rgba(255,0,0,0.25)
      >}
      >```
      >
      >选择在一个页面中的所有元素。

  + 属性选择器

    + 存在和值 (Presence and value) 属性选择器

      >这些属性选择器尝试匹配**精确**的属性值：
      >
      >- `[attr]`：该选择器选择包含 `attr` 属性的所有元素，不论 `attr` 的值为何。
      >
      >- `[attr=val]`：该选择器仅选择 `attr` 属性**刚好**为 `val` 的所有元素。
      >
      >- `[attr~=val]`：该选择器仅选择 `attr` 属性中**包含** `val` 的所有元素。
      >
      >  （包含是指 `val` 在 `attr` 属性中前后为空格）

    + 子串值 (Substring value) 属性选择器

      >这些属性选择器对属性值**灵活**匹配。
      >
      >- `[attr|=val]`: 选择 `attr` 属性的值是 `val` 或值以 `val-` 开头的元素（注意，这里的 “-” 不是一个错误，这是用来处理语言编码的）。
      >
      >- `[attr^=val]`: 选择 `attr` 属性的值以 `val` 开头（包括 `val`）的元素。
      >
      >- `[attr$=val]`: 选择 `attr` 属性的值以 `val` 结尾（包括 `val`）的元素。
      >
      >- `[attr*=val]`: 选择 `attr` 属性的值中包含子字符串 `val` 的元素（一个子字符串就是一个字符串的一部分而已，例如，”cat“ 是 字符串 ”caterpillar“ 的子字符串）。
      >
      >  （注意与 `[attr~=val]` 的区别）

  + 伪选择器

    伪选择器不是直接选择元素，而是仅在某些特定条件下的元素，或是元素的某些部分。

    + [伪类](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Introduction_to_CSS/Pseudo-classes_and_pseudo-elements#%E4%BC%AA%E7%B1%BB%EF%BC%88Pseudo-class%EF%BC%89) (Pseudo-class)

      某个元素在处于某种状态下会呈现另一种样式。

      以冒号(`:`)作为前缀，添加到一个选择器**末尾**。

      `:hover` 鼠标悬停时

    + [伪元素](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Introduction_to_CSS/Pseudo-classes_and_pseudo-elements#%E4%BC%AA%E5%85%83%E7%B4%A0) (Pseudo-element)

      某个元素的某个部分会呈现另一种样式。

      以双冒号(`::`)作为前缀，添加到一个选择器**末尾**。

    (`:` 和 `::` 可以同时使用但是 `:` 必须在 `::` 之前)

  + 组合器

    | 名称           | 组合器 | 选择                                                         |
    | -------------- | ------ | ------------------------------------------------------------ |
    | 选择器组       | A, B   | 匹配满足 A 或 B 的任意元素。                                 |
    | 后代选择器     | A B    | 匹配 B 元素，满足条件：B 是 A 的后代结点（B 是 A 的子节点，或者 A 的子节点的子节点...） |
    | 子选择器       | A > B  | 匹配 B 元素，满足条件：B 是 A 的直接子节点                   |
    | 相邻兄弟选择器 | A + B  | 匹配 B 元素，满足条件：B 是 A 的下一个兄弟节点（A, B 有相同的父结点，并且 B 紧跟在 A 的后面） |
    | 通用兄弟选择器 | A ~ B  | 匹配 B 元素，满足条件：B 是 A 之后的兄弟节点中的任意一个（A, B 有相同的父节点，B 在 A 之后，但不一定是紧挨着 A） |

    > A和B代表任意选择器。

+ > `em` : 1em与当前元素的字体大小相同（更具体地说，一个大写字母M的宽度）。

##### Last-modified date: 2019.1.16, 9 p.m.