# Learning notes of Week 4

## 2.9 Sat.

+ 头像

  + 导入图片作为头像：

    >```react
    ><Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
    >```

  + 字母作为头像：

    >```react
    ><Avatar className={classes.purpleAvatar}>OP</Avatar>
    >```

  + 图标作为头像：

    >```react
    ><Avatar className={classes.avatar}>
    >		<FolderIcon />
    ></Avatar>
    >```

+ 利用 `<Toolbar>` 可以将多个元素显示在同一行。

+ 链接

  >```jsx
  ><Link href="address" className={classes.link}>
  >		Link
  ></Link>
  >```

+ >使用 `createMuiTheme` 创建自定义的 theme 主题，用 `<MuiThemeProvider>` 包裹 MUI 组件即可让自定义主题生效。
  >
  >```react
  >const theme = createMuiTheme({
  >  palette: {
  >      primary: {
  >          main: "#ce93d8",  
  >      },
  >  },
  >});
  >```
  >
  >`primary` 里的 `main` 不能省略。
  >
  >```react
  ><MuiThemeProvider theme={theme}>
  >	<Button color="primary">Primary</Button>
  >	<Button color="secondary">Secondary</Button>
  ></MuiThemeProvider>
  >```

+ >```react
  >paddingTop: theme.spacing.unit * 10,
  >```

+ 在[这里](https://material-ui.com/customization/default-theme/)查看 `theme` 对象包含的键。

##### Last-modified date: 2019.2.9, 5 p.m.