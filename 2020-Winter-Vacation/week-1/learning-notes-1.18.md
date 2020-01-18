# Learning notes of Week 1

## 1.18 Sat.

### Volume

+ Volume 的生命周期和 Pod 一样，用于解决两个问题：容器重启之后数据恢复以及容器之间共享数据
+ 要使用 Volume，在 Pod 的配置文件中通过 .spec.volumes 指定要使用什么 Volume，通过 .spec.containers[*].volumeMounts 指定要挂载到容器的哪个目录下。这么说的话，好像 Volume 天生就是挂载两层（主机 - pod - 容器），感觉上 pod 只是一个抽象的感念，没有物理上的文件，容器里的目录也只能挂到主机上。只不过有些类型的 Volume 的内容在 pod 终止后会被删除而有的不会，所以看上去的效果就好像是有些 Volume 只挂载到 pod 一层而有些能挂载到主机一层。
+ emptyDir 类型的 Volume 提供临时的挂载，Pod 终止后数据也被删除
+ hostPath 类型的 Volume 将 Pod 所在节点的目录挂载到 Pod 中，最大的问题是 Pod 被重新调度到其他节点时数据不会跟过去，但是也可以通过将 Pod 绑定到 Node 来解决这个问题。
+ projected 类型的 Volume 可以将多个 Volume source 挂载到同一个目录
+ 在 Pod 配置文件中的 .spec.containers[*].volumeMounts 用 subPath 或 subPathExpr 来指定挂载 Volume 的子路径。但是有些类型的 Volume 当挂载它们的子路径时，它们的更新不会同步反映在容器中。

### Persist Volume

+ PV 是集群的资源，其生命周期长于 Pod

+ PV 和 PVC 交互的周期如下：

  + Provisioning：创建 PV，有 static 和 dynamic 两种方式：

    + static：由集群管理员直接创建
    + dynamic：当没有静态 PV 可以匹配某个 PVC 时，集群会根据 StorageClass 自动创建一个 PV

  + Binding：绑定 PV 和 PVC，this binding is a one-to-one mapping

  + Using：Pods use PVC as volumes

    （PVC 直到不被 pod 使用才会被删除，PV 直到不和任何 PVC 绑定才会被删除）

  + Reclaiming：在 PVC 被删除后，PV 有三种回收策略：

    + Retain：不删除 PV，但是也不能和其他 PVC 绑定
    + Delete：删除 PV，同时也删除外部基础设施中的存储介质
    + Recycle：已弃用，感觉上是清空 volume 数据让 PV 可以和其他 PVC 再绑定

+ PV 是挂载在 node 上的，PV is non-namespaced resource while PVC is namespaced one.

+ 有 selector 的 PVC 不可以动态创建 PV

+ 在 Pod 的配置文件中 .spec.volumes[*] 可以选择用 PVC 类型的 volume，指定 PVC name 即可。

+ PVC 也可以从 VolumeSnapshot 或另一个 PVC 创建

### Storage Class

+ StorageClass 用来标识集群提供的不同类型的存储。
+ StorageClass 的配置文件中可以指定 provisioner（storage 服务提供商），parameters（vendor 需要的一些参数），reclaimPolicy（由该 StorageClass 创建出来的 PV 的 reclaimPolicy），volumeBindingMode 等等。
+ VolumeBindingMode 可以指定为 Immediate，即立刻绑定，当有 PVC 被创建时就创建 PV 并绑定上去；也可以指定为 WaitForFirstConsumer，即等待第一个使用这个 PVC 的 Pod 出现时，再创建 PV 并绑定，这样做的好处在于可以让 Pod 先按照它自己的限制（topology，affinity 等等）被调度到某个 node 上，然后再在那个 node 挂载 PV。如果在还没有 pod 使用 PVC 的时候就挂载了 PV，有可能会出现挂载 PV 的 node 由于 Pod 的限制无法接受这个 Pod 的情况。
+ 通过 `storageclass.kubernetes.io/is-default-class` annotation 来指定一个 StorageClass 为 default，当 PVC 没有显式指定 StorageClass 时，视为指定了 default StorageClass（如果指定了 StorageClass 为空，则仍旧视为绑定 No class PV，而不是 default class）

##### Last-modified date: 2020.1.18, 10 p.m.

