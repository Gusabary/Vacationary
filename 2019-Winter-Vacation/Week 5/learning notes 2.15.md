# Learning notes of Week 5

## 2.15 Fri.

+ >实施 Token 验证的方法挺多的，还有一些标准方法，比如 JWT，读作 *jot* ，表示 JSON Web Tokens 。JWT 标准的 Token 有三个部分：Header, Payload, Signature.
  >
  >三部分中间用点分隔开，并且都会使用 Base64 编码。

  + Header：包含如何处理这个 Token 的信息，用 Base64url 编码。
  + Payload：Token 的具体内容，有标准字段和自定义字段，用 Base64url 编码。
  + Signature：有三部分，分别是经过加密的 header 和 payload， 以及加密时用到的密码，密码存储在服务端。

##### Last-modified date: 2019.2.15, 10 p.m.




