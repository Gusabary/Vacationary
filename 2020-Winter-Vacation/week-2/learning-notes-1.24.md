# Learning notes of Week 2

## 1.24 Thu.

### Kafka 基本概念

+ broker：一台服务器（或者一个 kafka server 进程）就是一个 broker，多个 broker 组成 kafka 集群。

+ topic：消息的类型

+ partition：topic 可以被分为若干个 partition，不同的 partition 可以在不同的 broker 上。每个 partition 中的消息是顺序写入，顺序消费的，像一个队列一样。

+ replica：每个 partition 可以有多个 replica 分布在不同 broker 上，其中有一个 leader 和若干 follower。

+ 某个 topic 可能按如下方式存储：

  | broker 0             | broker 1             | broker 2             |
  | -------------------- | -------------------- | -------------------- |
  | partition 0 leader   | partition 0 follower | partition 0 follower |
  | partition 1 follower | partition 1 leader   | partition 1 follower |
  | partition 2 follower | partition 2 follower | partition 2 leader   |

+ consumer group：一个消费组对应一个逻辑订阅者，消费组中有多个消费者实例，一般实例数量小于该消费组订阅的 topic 的分区数量，以确保一个分区中只有一个消费者实例。

### Kafka 核心 API

Kafka 有五类核心 API：

+ Producer API：向 Kafka 集群中写入数据
+ Consumer API：从 Kafka 集群中读出数据
+ Streams API：从某个 topic 中读出数据经过一系列处理再写入某个 topic
+ Connect API：从某些系统中读取数据存入 Kafka 集群，从 Kafka 集群中读取数据存入某些系统（感觉上和 Producer API 以及 Consumer API 最大的区别在于主动发起操作的是 Kafka 集群，而不是 Producer 或者 Consumer）
+ AdminClient API：用于管理 Kafka 集群中的对象，比如 topic，broker 等等。

### Nginx 架构

+ Nginx 以 daemon 方式在后台运行，包含一个 master 进程和多个 worker 进程。master 管理 worker，worker 处理网络事件，一般设置 worker 数量和 cpu 核数相等。

### Nginx 配置

+ 由简单配置项和复杂配置项构成，
  + 简单配置项是一个 name 后面跟着空格区分的参数，分号结尾
  + 复杂配置项是一个 name 后面跟着一对花括号（花括号前也可以有空格区分的参数），花括号内是一堆配置项，也称为 context
+ 最外层称为 main context，一般会包含 events，http，mail context，http context 会包含 server，server context 会包含 location
+ 在第一次尝试 serve static content 的时候，总是 403，后来发现原因是配置文件第一行 `user nginx;` 的问题，改成 `user root;` 就可以了。
+ location 配置项后紧跟着的路径用来匹配 URI（最长匹配），之后的花括号里面的 root 用来插在 URI 前构成服务器上的绝对路径。
+ location 里面没有 root 配置项的话会用 location 外面一层的 root 配置项。
+ location 配置项的第一个参数可以是一个正则表达式，以 `~` 开头，也可以是刚才说的路径，也叫 prefix。在匹配的时候，优先匹配正则表达式，没有的话再匹配最长 prefix
+ location 配置项的花括号中可以用 proxy_pass 配置项指定被代理的服务

##### Last-modified date: 2020.1.24, 8 p.m.