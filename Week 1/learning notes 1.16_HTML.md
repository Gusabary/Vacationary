# Learning notes of Week 1

## 1.16 Wed. HTML

+ 表格

  + 基础表格

  ```html
  <table>
      <tr>
          <td> 1,1 </td>
          <td> 1,2 </td>
      </tr>
      <tr>
      	<td> 2,1 </td>
          <td> 2,2 </td>
      </tr>
  </table>
  ```

  `&nbsp;` 表示为空。

  + 单元格设为标题

    将 `<td>` 改成 `<th>` 以加粗显示设为标题。

  + 合并单元格

    在 `<td>` 和 `<th>` 中添加属性 `colspan="x"` 表示该单元格横跨 x 列；添加属性 `rowspan="x"` 表示该格横跨 x 行。

  + 为同一列提供样式

    ```html
    <table>
        <colgroup>
        	<col style="style1">
            <col style="style2">
        </colgroup>
        <tr>
        	<td> content </td>
            .
            .
            .
        </tr>
        .
        .
        .
    </table>
    ```

    + `<colgroup>` 写在 `<table>` 下方。
    + 第几个 `<col>` 就表示对第几列进行设置。
    + 没有 `style` 属性的 `<col>`  表示不设置样式。
    + `<col style="style1" span="x">` 表示之后的 x 列都设置为样式1。

  + 表格标题

    `<caption> title </caption>` 写在 `<table>` 下方。

  + 表格结构化

    ```html
    <table>
        <caption> title </caption>
        <colgropu>
        </colgropu>
        <thead>
        	<tr>
            </tr>
        </thead>
        <tbody>
        	<tr>
            </tr>
        </tbody>
        <tfoot>
        	<tr>
            </tr>
        </tfoot>
    </table>
    ```

  + 嵌套表格

    ```html
    <td>
    	<table>
        	<tr>
              <td>cell1</td>
              <td>cell2</td>
              <td>cell3</td>
            </tr>
        </table>
    </td>
    ```

+ 表单

  + `<form>`

    > 所有HTML表单都以一个`<form>`元素开始：
    >
    > ```html
    > <form action="address" method="post">
    > 
    > </form>
    > ```
    >
    > - `action` 属性定义了在提交表单时,应该把所收集的数据送给谁(/那个模块)(URL)去处理。.
    > - `method` 属性定义了发送数据的HTTP方法(它可以是“get”或“post”).

  + `<label> <input> <textarea>`

    >```html
    ><form action="/my-handling-form-page" method="post">
    >    <div>
    >        <label for="name">Name:</label>
    >        <input type="text" id="name" />
    >    </div>
    >    <div>
    >        <label for="mail">E-mail:</label>
    >        <input type="email" id="mail" />
    >    </div>
    >    <div>
    >        <label for="msg">Message:</label>
    >        <textarea id="msg"></textarea>
    >    </div>
    ></form>
    >```

    + `<label>` 的 `for` 属性指向了 `<input>` 或 `<textarea>` 的 `id` 。

    + `<input>` 是空元素，没有关闭标签，而 `<textarea>` 则不是。

      所以设置默认值时，对于 `<input>` : 添加属性 `value="default value"`； 而对于 `<textarea>` ，直接在开始和结束标签之间放置默认值： `<textarea> default value </textarea>`

    + 向服务器发送数据时，在`<input>` , `<textarea>` 中添加属性 `name="itsName"` 以方便处理。

  + `<button>`

    >```html
    ><div class="button">
    >	<button type="submit">Send your message</button>
    ></div>
    >```

    `type` 属性有三个值：`submit`, `reset`, `button`.

    + `submit`: 将表单数据发送到 `<form>` 中的 `action` 地址。

    + `reset`: 将所有表单小部件设为默认值。

    + `button`: 不会发生任何事。

  + `<fieldset> <legend>`

    >```html
    ><form>
    >  <fieldset>
    >    <legend>Fruit juice size</legend>
    >    <p>
    >      <input type="radio" name="size" id="size_1" value="small">
    >      <label for="size_1">Small</label>
    >    </p>
    >    <p>
    >      <input type="radio" name="size" id="size_2" value="medium">
    >      <label for="size_2">Medium</label>
    >    </p>
    >    <p>
    >      <input type="radio" name="size" id="size_3" value="large">
    >      <label for="size_3">Large</label>
    >    </p>
    >  </fieldset>
    ></form>
    >```

    可用于单选框的创建，`<legend>` 作为标题。

    `<input>` 的 `type` 属性为 `radio` 即表示其显示为单选按钮（一个小圆圈）。

  + `<select>`

    >```html
    ><select id="card" name="usercard">
    >    <option value="visa">Visa</option>
    >    <option value="mc">Mastercard</option>
    >    <option value="amex">American Express</option>
    ></select>
    >```

    下拉菜单。

    可以用 `<optgroup>` 对 `<option>` 进行分组。

  + 部件通用属性

    + `autofocus` 自动聚焦与该部件
    + `disabled` 用户无法与该部件交互
    + `name` 用于提交表单数据时的名称
    + `value` 部件初始值

  + `<input>` 高级

    根据不同的 `type` 属性值，`<input>` 有不同的功能：

    + `type="text"` 默认单行文本域

    + `type="email"`  输入邮箱地址

      >通过包括`multiple`属性，它还可以让用户将多个电子邮件地址输入相同的输入(以逗号分隔)。

    + `type="password"` 输入密码

    + `type="search"` 搜索域

    + `type="tel"`  输入电话号码

    + `typr="url"` 输入网址

    + `type="radio"` 单选框

    + `type="checkbox"` 复选框

      >包含`checked`属性使单选框/复选框在页面加载时自动被选中。

    + `type="number"` 输入数字

      >```html
      ><input type="number" name="age" id="age" min="1" max="10" step="2">
      >```

      点击一次增加/减少按钮将使数字值修改`step`。

    + `type="range"` 滑块

      >```html
      ><input type="range" name="beans" id="beans" min="0" max="500" step="10">
      >```

      想要获得滑块当前的值，还需要 JavaScript 的帮助。

    + `type="datetime-local"` 输入日期和时间

    + `type="date"` 输入日期

    + `type="month"` 输入月份

    + `type="week"` 输入星期

    + `type="time"` 输入时间

      >所有日期和时间控制都可以使用`min`和`max`属性来约束。

    + `type="color"` 拾色器

    + `type="file"` 文件选择器

      >被接受的文件类型可以使用`accept`属性来约束。此外，如果您想让用户选择多个文件，那么可以通过添加`multiple`属性来实现。
      >
      >```html
      ><input type="file" name="file" id="file" accept="image/*" multiple>
      >```

    + `type=hidden` 隐藏内容

    + `type=image` 图像按钮

      >当用户点击它时，它的行为就像一个提交按钮。
      >
      >在图像上单击的X和Y坐标是被提交的。
      >
      >这个元素支持与 `<img>` 元素相同的属性，加上其他表单按钮支持的所有属性。
      >
      >```html
      ><input type="image" alt="Click me!" src="my-img.png" width="80" height="30" />
      >```

  + `<datalist>` 自动补全

    >```html
    ><label for="myFruit">What's your favorite fruit?</label>
    ><input type="text" name="myFruit" id="myFruit" list="mySuggestion">
    ><datalist id="mySuggestion">
    >  <option>Apple</option>
    >  <option>Banana</option>
    >  <option>Blackberry</option>
    >  <option>Blueberry</option>
    >  <option>Lemon</option>
    >  <option>Lychee</option>
    >  <option>Peach</option>
    >  <option>Pear</option>
    ></datalist>
    >```

  + `<progress>` 进度条

    >```html
    ><progress max="100" value="75">75/100</progress>
    >```
    >
    >`<progress>` 元素中的内容是不支持该元素的浏览器的回退，以及辅助技术对其发出的声音。

  + `<meter>` 仪表

    >```html
    ><meter min="0" max="100" value="75" low="33" high="66" optimum="50">75</meter>
    >```
    >
    >- 如果当前值位于该范围的优先部分，则该条是绿色的。
    >- 如果当前值位于该范围的平均部分，则该条是黄色的。
    >- 如果当前值处于最糟糕的范围，则该条是红色的。

##### Last-modified date: 2019.1.16, 9 p.m.