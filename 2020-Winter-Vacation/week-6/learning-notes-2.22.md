# Learning notes of Week 6

## 2.22 Sat.

+ Fake Objects：相对与生产环境而言，在开发环境中使用的实现更简单的对象

  Mock Objects：在测试环境中使用，用于检查该对象和使用该对象的模块之间的通信是否正常

+ 需要在 mock function 被调用前 set expectations，这样可以在出错的第一时间停下来，更安全也更易于调试

  > This means `EXPECT_CALL()` should be read as expecting that a call will occur *in the future*, not that a call has occurred.

+ `EXPECT_CALL` 接受两个参数：mock object 和该 object 的 function，第二个参数（function）可以跟一个括号，括号中包含调用这个 mock function 时期望的参数，可以用模糊匹配。

+ `EXPECT_CALL` 之后可以跟一些子句：

  + `Times`：表示期望这个 mock function 被调用的次数，可以用模糊匹配，如果没有指定 `Times`，gMock 会根据 `WillOnce` 和 `WillRepeatedly` 的数量自行推测
  + `WillOnce`：可以接受一个 `Return` 作为参数，表示 mock function 将要返回的值，也可以接受其他参数
  + `WillRepeatedly`：同 `WillOnce`，但是会重复使用。如果没有指定，而且 `WillOnce` 的个数又小于 `Times` 中指定的次数的话，超出的部分会返回 0 或者默认构造函数。

+ 靠下的 `EXPECT_CALL` 具有较高的优先级。

+ `MOCK_METHOD` 宏中逗号的使用需要注意，参数的个数应等于未保护逗号的个数 +1

+ 不管原始类中的函数是 protected 还是 private，mock 类中的 `MOCK_METHOD` 都要放在 public 段下

+ 我的 mock 类直接继承自原始的实现类，没有一个公共的接口类（纯虚类）。在构造 mock 对象的时候，报了如下错误：`‘SAIL::test::MockRuleManager::MockRuleManager()’ is implicitly deleted because the default definition would be ill-formed`，原因是在构造 mock 对象的时候，没有传递任何实参，也即试图用默认构造函数实例化 mock 对象，但是 mock 类的父类也就是实现类是没有默认构造函数的。但是如果有一个纯虚类作为 mock 类和实现类两者公共的父类的话，就不会有这个问题，因为纯虚类不能定义构造函数，所以会有一个默认的构造函数。我暂时的解决方案是重载实现类的构造函数，加一个默认构造函数。

##### Last-modified date: 2020.2.22, 8 p.m.