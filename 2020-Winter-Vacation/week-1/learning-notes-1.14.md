# Learning notes of Week 1

## 1.14 Tue.

### Node status

+ Addresses: 有三种地址：HostName, ExternalIP, InternalIP
+ Conditions: 描述节点的状态，例如是否 Ready，内存，磁盘，pid 的压力等等
+ Capacity and Allocatable: 描述节点上的资源总量以及可以分配给 normal pods 的资源量
+ Info: 节点的一些通用信息，例如版本、操作系统

### Master-Node communication

+ Cluster to Master: All communication paths from the cluster to the master **terminate at the apiserver**
+ Master to Cluster: 有两种方式：apiserver to kubelet 以及 apiserver to nodes, pods and services

### Controller

+ 就像恒温器一样，Controller 不断调整着集群状态，使其朝着目标状态改变。
+ Controller 有两种 work 方式：通过 apiserver，以及 direct control，后者常用来处理和集群外相关的改动。

### Cloud Controller Manager (CCM)

+ 在引入 CCM 之前，kube-controller-manager, apiserver, kubelet 都和 Cloud 通信，引入 CCM 之后，只有 CCM 负责与 Cloud 通信。即 CCM 从以上三个组件中分离出 cloud-dependent 的部分
+ 从 KCM 中分离出的部分有 Node Controller, Route Controller 和 Service Controller（没有 Volume Controller，尽管它也是 cloud-dependent 的）
+ 从 Kubelet 中分离出的部分有节点的 cloud-specific 信息。在引入 CCM 之前，初始化节点的时候，Kubelet 需要知道一些 cloud-specific 的信息，例如 ip，region，实例类型等等，在引入 CCM 之后，Kubelet 只会用非 cloud-specific 的信息来初始化节点，但是会标记一个 taint，等 CCM 将 cloud-specific 信息加入进来后，消除这个 taint，才算初始化完成。
+ 疑问：文档里的说法是只要实现了 CloudProvider Interface 就都可以接入 CCM，但是有那么多不同的云服务提供商，我在搭集群以及使用的过程中，并没有指定用的是哪一个云服务提供商，CCM 是怎么知道用哪一种实现的呢？还是说学校给的离线安装包里已经包含了这一信息（我觉得可能性不大）？又或者是说，这个安装包根本就没有 CCM，事实上我好像也的确没有用过什么 cloud-specific 的功能，没有自动添加节点，没有 Route，也没有 LoadBalancer 的 service。

### Docker Manifest

+ 用来解决的问题：不同架构或操作系统不能使用同一个镜像，需要加后缀很麻烦。用了 manifest 以后，不同的架构或操作系统可以使用同一个 manifest，manifest 中会根据架构或操作系统的不同来实际使用不同的镜像。*[了解更多](<https://yeasy.gitbooks.io/docker_practice/image/manifest.html>)*
+ k8 中在 pull 镜像的时候也支持这一特性，但是为了向后兼容，有时不得不继续维护名字带后缀的镜像

### Use a private registry

+ 可以配置节点使其能 pull 私有仓库中的镜像：将 `~/.docker/config.json` 分发至各节点。要小心如果没有配置 node template 的话，autoscaling 出的节点将不会有权限
+ 另一种方法是配置 pod 使其能 pull 私有镜像，和上一种相比粒度更细。首先创建一个 docker-registry 类型的 secret，用于认证，然后在 pod 的配置文件中指定 imagePullSecret。也可以在 serviceAccount 中指定 imagePullSecret，然后让 pod 以这个 sa 去 pull。

### Container environment

+ container 的 hostname 就是 pod 的 name，可以通过 `hostname` 命令查看
+ 在容器起来的时候正在运行着的 service 会以环境变量的形式将自己的 ip 和端口通知给容器。

### Container lifecycle hooks

+ 有两种 hook：PostStart 和 PreStop，需要注意的是 PostStart hook handler 和 ENTRYPOINT 的执行顺序并不能确定。
+ 有两种 hook handler：exec 和 http，即执行一段命令或者发送一个 http 请求
+ 如果 handler fail 了，会广播 event，通过 `kubectl describe pod` 查看

##### Last-modified date: 2020.1.14, 9 p.m.