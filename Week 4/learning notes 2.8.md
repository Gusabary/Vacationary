# Learning notes of Week 4

## 2.8 Fri.

+ 扩展面板

  >```react
  ><ExpansionPanel>
  >	<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
  >		<Typography className={classes.heading}>Expansion Panel</Typography>
  >	</ExpansionPanelSummary>
  >	<ExpansionPanelDetails>
  >		<Typography>
  >			details
  >		</Typography>
  >	</ExpansionPanelDetails>
  ></ExpansionPanel>
  >```

  `expandIcon` 属性不一定非得是 `<ExpandMoreIcon />` 。

+ 纸片

  >```react
  ><Chip
  >	icon={<FaceIcon />}
  >	label="Deletable Secondary Chip"
  >    onClick={handleCLick}
  >	onDelete={handleDelete}
  >	className={classes.chip}
  >	color="secondary"
  >    variant="outlined"
  >/>
  >```

  + `icon` 属性可以试着与 `avater` 属性替换。

    >```react
    >avatar={
    >	<Avatar>
    >		<FaceIcon />
    >	</Avatar>
    >}
    >```

  + `label` 属性为显示在纸片上的内容。

  + 如果只是想让纸片可点击，而没有点击事件的回调函数，可将 `onClick` 属性替换为 `clickable` 属性。

  + 可添加 `deleteIcon` 属性来改变删除按钮的图标。

##### Last-modified date: 2019.2.8, 8 p.m.