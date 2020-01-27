# Learning notes of Week 3

## 1.27 Fri.

### Using Fission

+ 创建好 env, function, route 之后，教程说要设置 FISSION_ROUTER 环境变量然后 curl，我懵了，能不能 curl 和这个环境变量还有关系的么。

  后来我想明白这个环境变量不是随便设的，fission namespace 下有一个 router service，默认是 NodePort 类型，端口 31314，要设成 `<node-ip>:31314`，然后 curl 这个地址（我一开始以为是随便设一个环境变量然后对着 curl 就行 - -），当然设成 `<cluster-ip>:80` 也行。

  因为这个环境变量是给 Fission CLI 用的，之前 `fission fn test` 的时候没有这个环境变量用的就是 local port-forward，有的话就用这个环境变量的值。

+ 在创建 route（httptrigger）时，指定的 url 可以形如 `/guestbook/messages/{id}`，甚至可以用正则表达式：`/guestbook/messages/{id:[0-9]+}`，以处理一批 url。

  当有匹配的请求过来时，请求头会被添加上以 `X-Fission-Params-` 开头的字段，表示参数的值，代码中可以获取到。

##### Last-modified date: 2020.1.27, 7 p.m.