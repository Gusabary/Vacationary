# Learning notes of Week 1

## 1.16 Thu.

### Pod Topology Spread Constraints

+ 1.16 alpha 的 api，在 pod 的配置文件中指定 spec.topologySpreadConstraints
+ 主要功能是根据 label 将 node 分类，然后新来的 pod 在被调度到某个 node 时需要遵循如下原则：该 node 所在的类和别的类相比，拥有这类 pod 的数量差距不能过大。即将 pod 尽量平均分配到每类 node 中，以保证不同 zone 的 node 上都有这样的 pod，提高可用性。

### Disruptions

+ Disruptions 有两种：Involuntary 的和 Voluntary 的。Involuntary 的主要是硬件故障、系统故障、网络分区、资源不足等非直接人为的情况；Voluntary 的主要是删除 deployment、删除 pod、删除 node 等直接人为的情况。
+ PodDisruptionBudget (PDB) 是一种资源，可以为每一个 application 创建一个 PDB，其功能在于指定这个 application 所拥有的最少 pod 数量。设想这样一个场景，某个 application 正在以 deployment 中指定的 pod 数量运行着，此时集群管理员做了某些操作导致 Voluntary Disruptions，pod 数量减少，但是当数量减少到小于 PDB 中所指定的值时，集群管理员的操作会 fail 以保证 application 仍然可用（deployment 中指定最大数量，PDB 中指定最小数量）。这种功能在有集群管理员和 application owner 的角色分工的场景下很适用。

### Ephemeral Containers

+ 1.16 alpha，用于调试 pod，朝生暮死

### ReplicaSet

+ 和 Deployment 相似，但是 Deployment 是一种 high-level 的管理着 ReplicaSet 的资源。

+ 当 ReplicaSet 在运行时，如果有新的 pod 和 rs 的 labelSelector 相匹配（且该 pod 没有对应的 Controller 管理），rs 会将其纳入到自己的管理中（将自己添加进 pod 的 metadata.ownerReferences 中），此时往往会发现 pod 数量多于指定的 replica 数量，新的 pod 会被删除。而 Deployment 则不会这样，Deployment 只管理自己 template 中指定的 pod，对于新来的 pod，即使 label match 它也不会管。

  *A ReplicaSet can own a **non-homogenous** set of Pods*

+ 被 rs 或者 Deployment 管理的 pod 可以通过 metadata.ownerReferences 查看到自己的 Controller 是谁。

+ rs 的配置文件中，label Selector 一定要和 template pod label 相匹配

+ 在删除 rs 时，可以通过指定 `--cascade=false` 选项来避免删除相应的 pods

+ 可以用 HorizontalPodAutoscaler (HPA) 资源或者 `kubectl autoscale` 命令来修改 rs 的 replica 数量。

+ ReplicaSet 比 ReplicationController 多一个 set-based label selector 的功能。

### Deployment

+ 在 `kubectl apply` 以后可以用 `kubectl rollout status deploy ${name}` 来 check deployment 的状态，感觉和 `--watch` 参数差不多

+ 通过 deployment 起的 pods 的 name 形如 `${deployname}-${randomstr1}-${randomstr2}`，其中 randomstr1 是 deployment 管理的 ReplicaSet 的 random string，用 pod template 的 hash 作为随机种子

+ 为什么 ReplicaSet 会管理新来的 label match 的 pod 而 Deployment 不会？

  因为 Deployment 在启动 ReplicaSet 的时候会根据 pod template 算一个哈希，将这个哈希插入到 ReplicaSet 的 label, selector 以及 template pod label 中，这样即使新来了一个 pod 看上去 label match，但是实际上它没有 pod-template-hash 这个 label，所以 Deployment 不会管。如果在 pod 的配置文件中手动加上这一个 label，Deployment 事实上还是会管的，actually no magic here.

+ Deployment 的 rollout （例如更新 pod template）通过删除原来的 rs，起一个新的 rs 完成。在这过程中，总是删一点旧 pod，起一点新 pod，再删一点再起一点，因为 Deployment 默认保证有 75% ~ 125% 的 pod 是 available 的。

+ Rollover：连续更新两次 Deployment 时，有可能前一次还没更新完，但是也会立刻停止更新前一次，下达 kill 命令。

+ Rollback：

  + `kubectl rollout history` 查看历史版本
  + `kubectl rollout undo` 回退到上一版本，通过指定 `--to-revision` 选项回退到指定版本

+ proportional scaling：当 Deployment 正在 rollout 的时候来了一个 scale 请求，Deployment Controller 会将一部分 replica 分给旧的 rs，另一部分分给新的 rs

+ 可以通过 `kubectl rollout pause` 和 `kubectl rollout resume` 来让 Deployment 暂时阻塞 rollout 请求，这样可以在这段时间里进行多次修改，而只 rollout 一次，省去多余的 rollout。需要注意的是 rollback 请求也会被阻塞。

+ rollout history 中旧的 rs 并不会立刻被删除，可以通过 Deployment 配置文件中的 .spec.revisionHistoryLimit 指定最多保存的历史 rs 数量，rollback 也只能回退到仍被保存的 rs 上。

+ Deployment 的 rollout 也不总是 RollingUpdate，只不过 RollingUpdate 是默认行为，除此以外，还可以有 Recreate 类型，即先把旧的 pods 全部删掉，再起新的 pods。通过 Deployment 配置文件中的 .spec.strategy.type 指定。

### Garbage Collection

+ 跨 namespace 的 owner reference 是不允许的
+ 有两种 cascading deletion：foreground 和 background。foreground 的场景下，删除 owner，需要等待所有 blocking dependents 被删除（如果 owner 是 controller，则 dependents 会自动设成 blocking 的）background 场景下，可以立即删除 owner，dependents 会在后台清理。

### TTL Controller

+ 1.12 alpha，目前只支持应用于 Jobs。目的是将一个已经 finish 的资源在一定时间后回收掉。

### Jobs

+ 不应该在 job 的配置文件中指定 selector，pod template 也不需要 label
+ 有三种主要的 job 类型：Non-parallel jobs，只有一个 pod，只用成功一次；Parallel jobs with a fixed completion count，需要成功指定次数；Parallel jobs with a work queue
+ 终止 job 的方法：设置 backoffLimit，在失败一定次数以后终止；或者设置 activeDeadlineSeconds，在启动一段时间后终止。后者具有较高的优先级。
+ 可以用 TTL Controller 来自动删除终止的 jobs

##### Last-modified date: 2020.1.16, 8 p.m.

