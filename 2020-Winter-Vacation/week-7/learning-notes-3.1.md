# Learning notes of Week 7

## 3.1 Sun.

### STL Functor

+ 重载了 operator() 的对象称为函数对象，STL Algorithm 中的大部分函数都重载了接受 Functor 作为入参的版本，以提升灵活性。
+ 主要分为一元函数（unary_function）和二元函数（binary_function）
+ 按功能分为算术运算、关系运算和逻辑运算。
+ 还提供了一些 wrapper class，例如将函数返回值取反，固定某个入参。

##### Last-modified date: 2020.3.1, 5 p.m.