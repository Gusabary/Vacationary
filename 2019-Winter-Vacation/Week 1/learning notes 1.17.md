# Learning notes of Week 1

## 1.17 Thu.

+ `margin` 为当前框与相邻框的距离， 而不是与网页边界的距离。

  两个相邻的框相邻的边的 `margin` 取较大的那个（外边距塌陷）。

+ >当你使用绝对的值设置了一个框的大小（如，固定像素的宽/高），允许的大小可能不适合放置内容，这种情况下内容会从盒子溢流。我们使用 `overflow` 属性来控制这种情况的发生。它有一些可能的值，但是最常用的是：
  >
  >- `auto`: 当内容过多，溢流的内容被隐藏，然后出现滚动条来让我们滚动查看所有的内容。（推荐）
  >- `hidden`: 当内容过多，溢流的内容被隐藏。
  >- `visible`: 当内容过多，溢流的内容被显示在盒子的外边。（这个是默认的行为）

+ 用 `background-clip` 属性裁剪背景图片

  + `background-clip: border-box;` 贴合至 `border` 外缘。
  + `background-clip: padding-box;` 贴合至 `border` 内缘。
  + `background-clip: content-box;` 贴合至 `padding` 内缘。

+ 文字样式

  + 字体样式
    + `color` 颜色
    + `font-family` 字体种类
    + `font-size` 字体大小
    + `font-style` 字体样式
    + `font-weight` 字体粗细
    + `text-transform` 文本转换
    + `text-decoration` 文本装饰
    + `text-shadow` 文本阴影
  + 文本布局
    + `text-align` 文本对齐
    + `line-height` 行间距
    + `letter-spacing` `word-spacing` 字母和单词间距

+ 列表样式

  + `list-style-type` 项目符号样式
  + `list-style-position` 项目符号位置
  + `list-style-image` 项目符号自定义图片

+ 管理列表计数

  >+ `start` 属性允许你从1 以外的数字开始计数。
  >
  >  ```html
  >  <ol start="4">
  >    <li> line 1 </li>
  >    <li> line 2 </li>
  >    <li> line 3 </li>
  >    <li> line 4 </li>
  >  </ol>
  >  ```
  >
  >+ `reversed` 属性将启动列表倒计数。
  >
  >  ```html
  >  <ol start="4" reversed>
  >    <li> line 1 </li>
  >    <li> line 2 </li>
  >    <li> line 3 </li>
  >    <li> line 4 </li>
  >  </ol>
  >  ```
  >
  >+ `value` 属性允许设置列表项指定数值。
  >
  >  ```html
  >  <ol>
  >    <li value="2"> line 1 </li>
  >    <li value="4"> line 2 </li>
  >    <li value="6"> line 3 </li>
  >    <li value="8"> line 4 </li>
  >  </ol>
  >  ```

+ 链接样式

  可以通过**伪类**来处理不同状态下的链接样式

  + `:link` 用于处理未访问过的链接，是链接的默认状态。
  + `:visited` 用于处理访问过的链接。
  + `:focus` 用于处理链接被选中时的状态。
  + `:hover` 用于处理鼠标悬停处的链接的状态。
  + `:active` 用于处理被激活（如被点击）时链接的状态。

  在 CSS 中实现时顺序不能颠倒。

  > 要记住这个顺序，你可以尝试这样帮助记忆：**L**o**V**e **F**ears **HA**te.

  在自定义链接时，需要关闭 `text-decoration` 和 `outline` ，否则会破坏自定义链接的样式：

  >```css
  >a {
  >  outline: none;
  >  text-decoration: none;
  >}
  >```

+ 背景

  + `background-color` 

    大部分元素该属性的默认值是 `transparent` （透明）。

  + `background-image`

    两种用途：设定背景图片和颜色渐变

    + 设定背景图片

      ```css
      background-image: url(address);
      ```

      背景图片只是装饰，如果和内容有关，则应使用 `HTML` 的 `<img>` 。

    + 颜色渐变

      ```css
      background-image: linear-gradient(to bottom, orange, yellow);
      ```

      第一个参数为线性渐变的方向。

      后面两个参数为开始和结尾的颜色。

      ```css
      background-image: linear-gradient(to bottom, yellow, orange 40%, yellow);
      ```

      附加参数：颜色站点。

      ```css
      background-image: repeating-linear-gradient(to right, yellow, orange 25px, yellow 50px);
      ```

      重复线性渐变。

  + `background-position`

    指定图像的 `x`, `y` 坐标（相对于左上角），以空格分开。

    `x`, `y` 的值可以是如下任意组合：

    >- 像px这样的绝对值——比如 `background-position: 200px 25px`.
    >- 像rems 这样的相对值——比如 `background-position: 20rem 2.5rem`.
    >- 百分比 ——比如 `background-position: 90% 25%`.
    >- 关键字——比如 `background-position: right center`. 这两个值是直观的，可以分别取值比如 `left`，`center`， `right`和 `top`，`center`， `bottom`。

  + `background-repeat`

    设置图像是否重复显示，可取如下值：

    > - `no-repeat`: 图像将不会重复: 它只会显示一次。
    > - `repeat-x`: 图像会在背景中水平地重复。
    > - `repeat-y`: 图像会在背景中垂直地重复。
    > - `repeat`: 图像会在背景中水平和竖直地重复（默认值）。

  + `background-attachment`

    设置图像滚动方式。

  + `background`

    在一行中指定以上五个属性，以空格分开。

  + `background-size`

    设置背景尺寸：指定宽度和高度，以空格分开。

  + 多个背景

    在 `background` 或 `background-*` 的属性值中以逗号分隔。

+ 边界

  + 一般的简写是 `border-width`, `border-style`, `border-color`, 同时设置四条边。

    ```css
    border: 2px solid red; 
    ```

  + `border-radius` 边界半径

  + `border-image` 边界图像

+ 表格

  > + 使用 `table-layout: fixed` 创建更可预测的表布局，可以通过在标题 `width` 中设置 `width` 来轻松设置列的宽度。
  >
  > + 使用 `border-collapse: collapse` 使表元素边框合并，生成一个更整洁、更易于控制的外观。

##### Last-modified date: 2019.1.17, 9 p.m.

