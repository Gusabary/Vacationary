# Learning notes of Week 2

## 1.20 Mon.

### Kubeconfig files

+ 有关 cluster，namespace，user 的配置信息保存在 `~/.kube/config` 文件中，或者 `KUBECONFIG` 环境变量所指的文件中，该环境变量可能包含多个文件，需要 merge 一下。
+ `kubectl config view` 查看配置

### Pod Priority and Preemption

+ PriorityClass 是一种资源，本质上是一个 priority class name 和 priority value 的绑定，使用这个 name 的 Pod 会有这个 value 的优先级。配置文件中的 globalDefault 字段设为 true 可以为没有指定 priority class 的 Pod 也提供 priority value，preemptionPolicy 字段设为 Never 可以确保即使 Pod 优先级很高，他也不能抢占正在运行着的 Pod
+ 在 Pod 的配置文件中，.spec.priorityClassName 可以指定这个 Pod 所属的 priority class
+ 在调度高优先级的 Pod 时，如果没有合适的 node，scheduler 会抢占一些低优先级的 Pod，但是存在几个问题：
  + 低优先级的 Pod 需要 graceful termination，这导致开始抢占和高优先级 Pod 完成调度这两件事存在时间差，这个时间差内可能发生各种各样的事，比如有其他 node 资源空出来了，不用抢占也可以调度上去，或者有个更高优先级的 Pod 来了等等。所以可以将低优先级 Pod 的 graceful termination period 设小一点。
  + 抢占有可能会破坏 Pod 的 PodDisruptionBudget（PDB），但是 PDB 也仅仅是一个 best effort，当抢占不得不发生时，PDB 的限制也不得不被破坏。
  + 被抢占的 Pod 可能和这个高优先级的 Pod 存在 affinity，如果被抢占了 affinity 就会被破坏，高优先级的 Pod 也就不会调度到这个 node 上。所以建议是，affinity 最好只指向那些同等优先级或更高优先级的 Pod（即不会因为自身的到来而被抢占的 Pod）
  + 跨节点抢占：节点本身没有问题，但是和这个节点在同一个 zone 的另一个节点上运行着和高优先级 Pod 存在 anti-affinity 的 Pod，而 scheduler 不支持跨节点抢占，所以这个高优先级 Pod 就无法调度。

### Scheduling Framework

+ 1.15 alpha，Scheduling Framework 定义了一组扩展点使得接入 schedule plugin 更加方便
+ 整个调度过程分为两个大阶段：Scheduling Cycle 和 Binding Cycle，前者主要负责从调度队列中选择 Pod，filter，score，reserve；后者主要负责 permit，bind

### Overview of Cloud Native Security

+ 4C's mental model: Cloud, Cluster, Container and Code.

### Limit Range

+ LimitRange 是一种资源，用于限定一个 namespace 中 pod 对资源的 limit 以及 PVC 对资源的 request
+ 可以限定容器 level 的和 pod level 的 limit 最大值和最小值，以及默认 limit 和默认 request（如果指定了 limit 而没有指定 request，则 request 会用 limit 的值而不是 defaultRequest，如果 request 和 limit 都没指定，才会用 defaultRequest 的值）
+ 也可以限定 PVC 对存储资源 limit 的最大和最小值
+ 还可以限定 limit/request 的 ratio 最大值，即 limit 不能超过 request 太多。

### Resource Quota

+ ResourceQuota 是一种资源，用于限定 namespace 对资源的使用
+ 可以限定 cpu，memory 的 request 和 limit 总量，也可以限定各类资源实例的数量
+ 总之粒度是在 namespace 这一层的，但是 1.12 beta 引入了 scopeSelector，可以将粒度细化到 PriorityClass 这一层，即可以根据优先级高低来做不同的资源限制。

### Percentage of Nodes to Score

+ 调度的时候往往有很多 feasible nodes 通过了 filter，在 score 阶段就会很慢。可以通过 percentageOfNodesToScore 来设置当有百分之多少的 node 通过了 filter，就不再判断剩余的 node 了，而是直接进入 score 阶段。
+ 1.14 以后即使不指定，k8 也会根据集群规模自动指定。
+ 即使指定的百分比再小，也不会少于 50 个节点（

##### Last-modified date: 2020.1.20, 10 p.m.