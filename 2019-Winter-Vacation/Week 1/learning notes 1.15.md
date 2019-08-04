# Learning notes of Week 1

## 1.15 Tue.

通用格式：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title> My Title </title>
    </head>
    <body>
        
    </body>
</html>
```

> `<head></head>`: `<head>元素`. 这个元素是一个容器，它包含了所有你想包含在HTML页面中但不想在HTML页面中显示的内容。这些内容包括你想在搜索结果中出现的关键字和页面描述，CSS样式，字符集声明等等。

+ `<img src="address">` 插入图片

+ `<a href="address"> a hyper link </a>` 超链接，`address`加上`https://`才会链接到某个网页，否则只会链接到本地的目录或文件。

+ `<a href="address" target="_blank">` 会在新标签页中显示链接，不加`target="_blank"`则会在原标签页中显示链接。

+ `<!-- comment -->` 注释

```html
<meta name="author" content="author name">
<meta name="description" content="some info about the webpage">
```

加上这两行是一个好的习惯，而且description的内容会出现在搜索引擎的结果中。

+ `<link rel="shortcut icon" href="address" type="image/x-icon">` 可以更改页面标签上的图标

+ `<link rel="stylesheet" href="*.css">`  放在 `<head>` 和 `</head>` 内，连接 .css 文件。

+ `<script src="*.js"></script>` 放在 `</body>` 前， 连接 .js 文件。

+ `<html lang="en-US">` 设定主语言。

+ `<em>` 斜体强调 `<strong>` 加粗强调

+ `<i>` 斜体 `<b>` 加粗 `<u>` 下划线

```html
<a href="address1">
	<img src="address2">
</a>
```

图片也可以作为超链接。

+ 链接到文档某个**特定部分**的方法：

  先在目标处添加id：`<h1 id="target"> target </h2>`

  然后在超链接处添加#：`<a href="address#target"> hyper link </a>`

  也可以在文档内部链接到目标处：`<a href="#target"> hyper link </a>`

+ 列表：

  + 无序列表：

    ```html
    <ul>
        <li> content1 </li>
        <li> content2 </li>
    </ul>
    ```

  + 有序列表：

    ```html
    <ol>
        <li> content1 </li>
        <li> content2 </li>
    </ol>
    ```

  + 描述列表：

    ```html
    <dl>
        <dt> term1 </dt>
        <dd> description1.1 </dd>
        <dd> description1.2 </dd>
        <dt> term2 </dt>
        <dd> description2 </dd>
    </dl>
    ```


+ 引用

  + 块引用

    ```html
    <blockquote cite="address">
        <p>
            content
        </p>
    </blockquote>
    ```

  + 行内引用

    ```html
    <p> <q cite="address"> content </q> </p>
    ```

  然后可以在引用出处（人名、书名等）加上

  ```html
  <a href="address"> <cite> source </cite> </a>
  ```

  这里的`<cite>`有斜体的作用。

+ `<abbr title="full name"> abbreviation </abbr>` 缩略语

+ 标记联系方式

  ```html
  <address>
  	<p> Gusabary, SJTU, Shanghai, China </p>
  </address>
  ```

  这里的`<address>`有斜体的作用。

+ `<sup>` 上标 `<sub>` 下标

+ > `<code>` 用于标记计算机通用代码。

+ > `<pre>` 对保留的空格（通常是代码块）——如果您在文本中使用缩进或多余的空白，浏览器将忽略它，您将不会在呈现的页面上看到它。但是，如果您将文本包含在`<pre></pre>`标签中，那么空白将会以与你在文本编辑器中看到的相同的方式渲染出来。

+ `<time datetime="2019-01-15"> 2019/1/15 <time>` datetime后的时间为年月日的标准格式。

  月、日、时、分、秒必须是两位数，**前置0不能省略**

  [这里](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#%E6%A0%87%E8%AE%B0%E6%97%B6%E9%97%B4%E5%92%8C%E6%97%A5%E6%9C%9F)还有其他的一些格式。

+ `<br>`  换行，相当于\n，比`<p> <\p>` 行间距小。

+ `<hr>`  水平分割线。

+  图片

  ```html
  <figure>
    <img src="address"
         alt="the alt of the image"
         width="400"
         height="341"
         title="the title of the image">
    <figcaption>A T-Rex on display in the Manchester University Museum.</figcaption>
  </figure>
  ```

  `<figcaption>` 是图片下方的文字。

+ 视频

  ```html
  <video src="address" controls>
    <p>Your browser doesn't support HTML5 video. Here is a <a href="address">link to the video</a> instead.</p> 
  </video>
  ```

  `controls` 表示用户可以使用回放、调节音量等功能。

  `<p>` 后的内容只有浏览器不支持该视频时才显示。

##### Last-modified date: 2019.1.15, 8 p.m.