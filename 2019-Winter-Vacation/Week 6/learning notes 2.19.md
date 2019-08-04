# Learning notes of Week 5

## 2.19 Tue.

+ 浏览器遇到单词长度超过边界的情况，默认将单词移到下一行，如果单词长度超过了整个宽度，就会溢出。

  + 添加属性 `wordWrap: 'break-word'`，如果被移到下一行的单词超过宽度，就会被折断到再下一行。
  + 添加属性 `wordBreak: 'break-all'`，长单词不会被下移，直接在当前行折断到下一行。

  以上两种方法都不会导致溢出，但更推荐第一种。

  *Source: http://www.cnblogs.com/2050/archive/2012/08/10/2632256.html*

+ `Reducer` 中 return 的值如果不加 `...state`，则除了 return 里的 key，其他 key 都是空。

+ >下面这个例子创建了一个长度为 0 的数组 `msgArray`，然后给 `msgArray[0]` 和 `msgArray[99]` 赋值，从而导致数组长度变为了 100。
  >
  >```js
  >var msgArray = [];
  >msgArray[0] = 'Hello';
  >msgArray[99] = 'world';
  >
  >if (msgArray.length === 100) {
  >  console.log('The length is 100.');
  >}
  >```

##### Last-modified date: 2019.2.19, 8 p.m.

