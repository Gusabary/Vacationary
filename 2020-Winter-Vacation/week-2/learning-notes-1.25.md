# Learning notes of Week 2

## 1.25 Sat.

### Main Concepts

+ Fission 有三个最主要的概念：Functions, Environments, Triggers.

+ Function 就是 Fission 真正执行的东西，通常是一个有入口的模块

+ Environment 包含了构建和运行 Function 的全部代码，运行时它是一个有 HTTP server 和 dynamic loader 的容器

+ Trigger 就是一个 event 到 function invocation 的绑定，来了一个 event，根据 Trigger 的配置，Fission 会选择一个 Function 来调用。

  有 HTTP Trigger，Timer Trigger，Message Queue Trigger，Kubernetes Watch Trigger 等等

### Controller

+ 接受用户请求，操作 Kubernetes CRD（Custom Resource Definition）或者转发到其它服务
+ Controller 使用 cluster-wide admin permission 的 service account

### Executor

+ 当有请求过来的时候，Router 先查一遍缓存，如果 cache miss，会让 Executor 创建一个新的 function service record（就是可以提供服务的实例），Executor 会创建一些 pods 来提供服务。

+ 有两种 Executor：PoolManager 和 NewDeploy。

+ PoolManager 会事先维护一组 generic pods 作为可用池，池中的 pod 里面跑着 `fetcher` container，这个 container 的功能在于可以将一个 Function 装载到一个 generic pod 中使其变成一个 specialized pod，也就是即将对外提供服务的 pod。当有一段时间没有请求后，这个 specialized pod 会被回收。

  PoolManager 的一个不足之处在于每个 Function 只创建一个 pod（下次再请求这个 Function 的时候 Route 就会 cache hit 了），无法支撑大流量的请求。

+ NewDeploy 不维护 pool，当被调用时会创建一组 Deployment, Service 以及 HPA，所以可以用来应对大流量的请求。可以设置 minimum scale 参数大于 0，这样即使有一段时间没有请求，仍能维持几个 pod 来降低 latency

### Router

+ Router 连接着 Trigger 和 Function，是唯一一个无状态的组件
+ 当有请求过来时，Router 先检查一遍是否有对应的 Trigger，没有就返回 404，有的话再检查这个 Trigger 对应的 Function 在不在缓存中，如果 cache miss 就去问 Executor 要，如果 cache hit 就直接把请求 redirect 到响应的 address

### Function Pod

+ Function Pod 用来响应 HTTP 请求，其中包含两个 container：Fetcher 和 Environment Container
+ Fetcher 会先把一些数据拉取下来存到 shared volume 中，然后通知 Environment Container 加载这些数据并对外提供服务。Environment Container 包含 HTTP server 和 function loader

### Builder Manager

+ 监听 environment 和 package CRD 的变化，如果有新的 environment 被创建（有新的 builder），Build Manager 会创建一组 Builder Deployment 和 Builder Service；如果有新的 package 被创建（有新的 function），Builder Manager 会请求 Builder Service 进行构建，并将结果更新到 StorageSvc 供 fetcher 拉取。

### Builder Pod

+ Builder Pod 用来将 source archive 构建成 deployment archive，其中包含两个 container：Fetcher 和 Builder Container
+ Fetch 在收到 Builder Manager 构建的请求后，先从 StorageSvc 拉取 source archive，进行一些可能的检查，存放到 shared volume 里面，然后通知 Builder Container 加载这些 source archive 并进行构建，构建完了以后把 deployment archive 存入 shared volume，再由 Fetcher 上传至 StorageSvc

### StorageSvc

+ 用来存储 source archive 和 deployment archive，本质是 PV

### Installation

```bash
# helm v2, OpenShift without LoadBalancer
helm install --name fission --namespace fission --set serviceType=NodePort,routerServiceType=NodePort,logger.enableSecurityContext=true,prometheus.enabled=false \
https://github.com/fission/fission/releases/download/1.7.1/fission-all-1.7.1.tgz

# install fission CLI
curl -Lo fission https://github.com/fission/fission/releases/download/1.7.1/fission-cli-linux && chmod +x fission && sudo mv fission /usr/local/bin/
```

##### Last-modified date: 2020.1.25, 10 p.m.