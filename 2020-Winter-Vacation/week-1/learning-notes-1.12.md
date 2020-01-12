# Learning notes of Week 1

## 1.12 Sun.

### Master Components

+ API server is the **front end** for the Kubernetes control plane and the main implementation of a Kubernetes API server is **kube-apiserver**. You can run several instances of kube-apiserver and **balance traffic** between those instances.
+ **kube-controller-manager** runs controllers. （controllers 通过 apiserver 监听集群状态并做出相应改变）
+ **cloud-controller-manager** runs controllers that interact with the underlying cloud providers. 在将来的版本，这部分代码会由相应的云服务供应商自行维护。

### Node Components

+ **kubelet** makes sure that containers are running in a pod. kubelet 会检查容器是否按照它们被声明的那样运行着。
+ **kube-proxy** is a network proxy that runs on each node in your cluster, implementing part of the Kubernetes **Service** concept. k8 中的虚拟 ip 应该就和这个组件相关。
+ **Container Runtime** is the software that is responsible for running containers. 容器运行时，用来运行容器的程序，只要实现了 Kubernetes CRI 的容器运行时就都可以在 k8 中使用。

### Addons

+ Containers started by Kubernetes automatically include this **DNS** server in their DNS searches.

### API Groups

+ api 分为 core group 和 named groups，core group 在配置文件中指定版本时一般就直接是 `apiVersion: v1`， named group 则需要加上 group name，例如 `apiVersion: batch/v1`.
+ api group 和其中的 resource 可以指定启用或禁用：通过指定 apiserver 的 `--runtime-config` 参数，需要重启 apiserver 以及 controller-manager 以生效。

### Kubernetes Objects

+ Object 有两个 field：spec 和 status，spec 是用户指定的想要的状态，status 是该 object 目前的实际状态。
+ spec 是通过 JSON 格式指定给 API server 的，kubectl 帮我们做了从 yaml 到 json 的转换。
+ object 的 metadata 包括 name，UID 以及 namespace

##### Last-modified date: 2020.1.12, 9 p.m.