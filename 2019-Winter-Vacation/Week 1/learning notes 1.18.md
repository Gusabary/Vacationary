# Learning notes of Week 1

## 1.18 Fri.

+ 弹性盒子

  >- 设置了 `display: flex` 的父元素被称之为 **flex 容器（flex container）**。
  >- 在 flex 容器中表现为柔性的盒子的元素被称之为 **flex 项（flex item）**。

  + 在父类中通过 `flex-direction` 属性设置 flex项 的排列方式， `flex-direction` 有以下取值：

  `row`, `column`, `row-reverse`, `column-reverse`

  + 在子类中通过 `flex-grow` （或简写为 `flex`）属性设置 flex项 的相对大小。

    >```css
    >article:nth-of-type(3) {
    >  flex: 2;
    >}
    >```

+ 浮动

  >浮动元素会脱离正常的文档布局流，并吸附到其父容器的一侧。在正常布局中位于该浮动元素之下的内容，此时会围绕着浮动元素，填满其另一侧的空间。

  只需要在浮动的元素中添加 `float: left` 或 `float: right` 。

  + 清除浮动

    `clear: both` 

    >当把这个应用到一个元素上时，它主要意味着"此处停止浮动"——这个元素和源码中后面的元素将不浮动，除非稍后将一个新的 `float` 声明应用到此后的另一个元素。

+ 定位

  `position` 属性

  + 静态定位

    `position: static`

    >将元素放入它在文档布局流中的正常位置 。

  + 相对定位

    `position: relative`

    通过`top`, `bottom`, `left`, 和 `right` 属性来精确指定元素相对于正常位置的偏移。

  + 绝对定位

    `position: absolute`

    将元素移出正常的文档布局流，相对于**定位上下文**进行偏移。

    **定位上下文**可通过添加 `position: relative;` 进行设定，默认为 `<html>` 元素。

    还可通过 `z-index` 属性更改堆叠顺序。

  + 固定定位

    `position: fixed`

    >这与绝对定位的工作方式完全相同，只有一个主要区别：绝对定位固定元素是相对于 `<html>` 元素或其最近的定位祖先，而固定定位固定元素则是相对于浏览器视口本身。 

##### Last-modified date: 2019.1.18, 11 p.m.