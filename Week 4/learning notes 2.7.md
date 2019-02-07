# Learning notes of Week 4

## 2.7 Thu.

+ Hexo 中，`hexo new page "title"` 命令用来 创建**子页**，即 `./title` 。

+ React 项目中，可以在 `package.json` 文件内查看 `material-ui`, `react` 等的版本号。（可用来检查是否装过 `material-ui` ）。

+ >SVG 路径 - `<path>`
  >`<path>` 元素用于定义一个矢量图的绘图路径。
  >
  >下面的命令可用于路径数据：
  >
  >M = move to
  >L = line to
  >H = horizontal line to
  >V = vertical line to
  >C = curve to
  >S = smooth curve to
  >Q = quadratic Bézier curve
  >T = smooth quadratic Bézier curve to
  >A = elliptical Arc
  >Z = close path
  >注意：以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。
  >
  >*source:* *http://www.runoob.com/svg/svg-path.html*

+ Google提供了一套SVG Icons: **Material icons**。可通过 `npm install @material-ui/icons` 命令安装。

  + 安装完成后，如需要使用 `delete` 图标，先 

    ```react
    import Delete from '@material-ui/icons/Delete';
    ```

    再在需要的地方添加 `<Delete />` 即可。

    [更多图标](https://material.io/tools/icons/?icon=delete&style=baseline)

+ `import` 时的一个错误`[ts]应为";"` 可能是由于类名首字母没有大写。 

+ `<AppBar>`

  >```react
  ><AppBar>
  >		<Toolbar>
  >    	<IconButton>
  >            <MenuIcon />
  >        </IconButton>
  >        <Typography variant="h6">
  >        	News
  >        </Typography>
  >        <Button>
  >            Login
  >        </Button>
  >		</Toolbar>
  ></AppBar>
  >```

  - `<Toolbar>` 使 `<AppBar>` 中的元素横向排列。
  - `<IconButton>` 使按钮呈圆形，包裹着的 `<MenuIcon>` 是按钮上的图标。
    + 如果 `<MenuIcon>` 没有被 `<Button>` 或类似的元素包裹，则不可点击。
    + 如果 `<MenuIcon>` 被 `<Button>` 包裹，则按钮呈方形。
    + 如果 `<IconButton>` 包裹两个图标元素，则会在一个按钮上并排显示。
  - `<Typography>` 元素渲染出被包裹的文本，以 `h6` 大小。
  - `<Button>` 元素渲染出一个方形按钮，按钮上显示被包裹的内容。

+ `<Button>`

  ```react
  <Button
  	variant="contained"
  	color="primary"
  	onClick={this.handleClick}
  	size="small"
  >
  	add
  	<Add />
  </Button>
  ```

  + `variant` 属性可取如下值：

    + `"contained"` 实心按钮
    + `"outlined"` 描边按钮
    + `"text"` 文本按钮

    以上三种按钮强调性递减。

    + `"fab"` 浮动按钮，现已弃用，可用 `<Fab>` 元素替代。
    + `"extendedFab"` 扩展浮动按钮，现已弃用，可用 `<Fab variant="extended">` 元素替代。

  + `size` 属性可取 `small`, `medium`, `large` 。

  + 原有的属性如 `onClick` 等仍然适用。

  + `<Button>` 包裹着的内容会显示在按钮上，文本 + Icon 是个不错的方式。

+ 进度条

  `<CircularProgress />` 环形进度条。

  `<LinearProgress />` 线性进度条。

+ 单选框

  > ```react
  > <FormControl component="fieldset">
  > 	<FormLabel component="legend">Gender</FormLabel>
  > 	<RadioGroup onChange={this.handleChange}>
  > 		<FormControlLabel value="female" control={<Radio />} label="Female" />
  > 		<FormControlLabel value="male" control={<Radio />} label="Male" />
  > 		<FormControlLabel value="other" control={<Radio />} label="Other" />
  > 		<FormControlLabel
  > 			value="disabled"
  > 			disabled
  > 			control={<Radio />}
  > 			label="(Disabled option)"
  > 		/>
  > 	</RadioGroup>
  > </FormControl>
  > ```

  + `<FormControl>` 元素包裹着一个单选框表单。
  + `<FormLabel>` 元素包裹着表单标题。
  + `<RadioGroup>` 元素包裹着所有单选框和其对应的 `label` 。
  + `<RadioControlLabel>` 元素的属性：
    + `"control = {<Radio />}"` 单选框，可在 `<Radio>` 元素中设置属性以改变单选框样式。
    + `"label"` 单选框对应的标签。

+ 复选框

  >```react
  ><FormControl component="fieldset">
  >	<FormLabel component="legend">Assign responsibility</FormLabel>
  >	<FormGroup>
  >		<FormControlLabel 
  >            control={
  >				<Checkbox onChange={this.handleChange('a')} value="a" />
  >			}
  >			label="Gilad Gray"
  >		/>
  >		<FormControlLabel
  >			control={
  >				<Checkbox onChange={this.handleChange('b')} value="b" />
  >			}
  >			label="Jason Killian"
  >		/>
  >		<FormControlLabel
  >			control={
  >				<Checkbox onChange={this.handleChange('c')} value="c" />
  >			}
  >			label="Antoine Llorca"
  >		/>
  >	</FormGroup>
  >	<FormHelperText>Be careful</FormHelperText>
  ></FormControl>
  >```

  + `<FormControl>` 元素包裹着一个复选框表单。
  + `<FormLabel>` 元素包裹着表单标题。
  + `<FormGroup>` 元素包裹着所有复选框和其对应的 `label` 。
  + `<FormControlLabel>` 元素的属性：
    - `"control"` 复选框，可在 `<Checkbox>` 元素中设置属性以改变复选框样式。
    - `"label"` 复选框对应的标签。

+ 开关

  > ```react
  > <Switch
  > 	checked={this.state.isChecked}
  > 	onChange={this.handleChange()}
  > 	value="checked"
  > 	color="primary"
  > />
  > ```

+ 选择器

  >```react
  ><FormControl>
  >	<InputLabel htmlFor="age-simple">Age</InputLabel>
  >	<Select
  >		value={this.state.age}
  >		onChange={this.handleChange}
  >		inputProps={{
  >			name: 'age',
  >			id: 'age-simple',
  >		}}
  >	>
  >		<MenuItem value="">
  >			<em>None</em>
  >		</MenuItem>
  >		<MenuItem value={10}>Ten</MenuItem>
  >		<MenuItem value={20}>Twenty</MenuItem>
  >		<MenuItem value={30}>Thirty</MenuItem>
  >	</Select>
  ></FormControl>
  >```

  选择器显示框内显示的内容是 `<MenuItem>` 中 `value` 与 `<Select>` 的 `value` 相等的那一项。

  >通过访问`onChange`属性中的回调`event.target.value`来提取新值，它总是一个**数组**。

+ 文本框

  + 简洁文本框

    >```react
    ><TextField
    >	id="standard-name"
    >	label="Name"
    >	className={classes.textField}
    >	value={this.state.name}
    >	onChange={this.handleChange('name')}
    >	margin="normal"
    >/>
    >```

  + 复杂（自定义）文本框

    >```react
    ><FormControl className={classes.formControl}>
    >	<InputLabel htmlFor="component-simple">Name</InputLabel>
    >	<Input 
    >        id="component-simple" 
    >        value={this.state.name} 
    >        onChange={this.handleChange} 
    >    />
    ></FormControl>
    >```

##### Last-modified date: 2019.2.7, 8 p.m.