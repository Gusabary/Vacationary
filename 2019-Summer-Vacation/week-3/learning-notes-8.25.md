# Learning notes of Week 3

## 8.25 Sun.

+ 所有能够使用变量引用的都是*对象*， 每个对象都是一个*类*的实例。在 Dart 中 甚至连 数字、方法和 null 都是对象。所有的对象都继承于 Object 类。

+ 没有初始化的变量自动获取一个默认值为 null。类型为数字的 变量如何没有初始化其值也是 null，不要忘记了数字类型也是对象。

+ 实例变量可以为 `final` 但是不能是 `const` 。

+ Dart 中整除是 `~/`

+ In Dart, only the boolean value `true` is treated as true:

  ```dart
  var myNull = null;
  if (myNull == null) {
    print('use "== null" to check null');
  }
  var zero = 0;
  if (zero == 0) {
    print('use "== 0" to check zero');
  }
  ```

+ 导入外部依赖的时候总是卡在 it is taking an unexpectedly long time. 后来将交大镜像源添加到环境变量就可以了。

##### Last-modified date: 2019.8.25, 10 p.m.