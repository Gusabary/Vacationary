# Learning notes of Week 1

## 1.17 Fri.

### Service

+ 在 Service 的配置文件中，targetPort 也可以用 name 指定，这样即使被选中的 pod 端口不一样，只要 name 相同，就仍然可以 work，是一层解耦。
+ Service 可以有指定的 ClusterIP：通过配置文件中的 .spec.ClusterIP 指定，但是 ip 必须是合法的。
+ k8 提供两种方式让 pod 发现服务：
  + 环境变量：在 pod 起来时，k8 会将当前存在的 service 的 ip 和端口以环境变量的方式加入到 pod 中，需要注意的是在 pod 起来以后新来的 service 不会将自己的 ip 和端口加入进去。
  + DNS：在 pod 中 `nslookup ${svcname}` 可以找到 service 的 ip，在 pod 起来以后新来的 service 也可以查询到。
+ NodePort 类型的 service 会将每个 node 的 nodePort 暴露出去，但是如果 node 只有内网 ip 的话，事实上也只有 master 的 nodePort 可以被外访问。
+ 如果不指定 nodePort 端口的话，k8 会从 `--service-node-port-range` （默认是 30000 ~ 32767）中分配一个。
+ ExternalName 类型的 service 用于访问集群外部的服务
+ 任何一种类型的服务都可以通过指定 `externalIPs` 来将自己直接暴露出去（但是我试了一下 202.120.40.8，不能 work，可能是因为神秘的 NAT 配置）

### Service Topology

+ 1.17 alpha，和 Pod Topology 类似，利用 label 将 node 分类，当需要访问某个服务的时候，会优先访问同类 node 中的实例。

### DNS

+ 对于 Service 来说，有两种 DNS Record
  + A Record：Normal Service 的 Record 是 `my-svc.my-namespace.svc.cluster-domain.example` 到 cluster IP 的映射；Headless Service 没有 Cluster IP，它的 Record 直接是 `my-svc.my-namespace.svc.cluster-domain.example` 到 pods 的映射
  + SRV Record：相比于 A Record，可以映射端口 name 到端口号
+ 对于 Pod 来说，可以指定 hostname（不指定的话默认是 pod name）和 subdomain，FQDN 形如 `hostname.subdomain.namespace.svc.cluster-domain.example`

### Ingress

+ Ingress 的功能主要是根据 inbound request 的 url（hostname 以及 path）来将流量导到不同的服务上。
+ 这样就可以将大部分服务的类型设为 ClusterIP，只有通过网关才能从外界访问到。

### Network Policies

+ NetworkPolicy 用于选择一些 pod 将它们变成 isolated，isolated pods 的访问受到 NetworkPolicy 中配置规则的限制。当有多个 NetworkPolicy 时，它们的规则取**或**来作用，即只要满足其中一个就行。
+ NetworkPolicy 配置文件中通过指定 pod selector 来选择要应用规则的 pods，如果 pod selector 为空，则指定该 namespace 下的所有 pods。
+ 一个 NetworkPolicy 可以根据入网和出网分别设置多条规则，每条规则包含一个可以访问的范围（ip 范围或 selector）以及一个端口。入网规则即指定范围中的 pod 可以通过该端口访问 isolated pods，出网规则即 isolated pods 可以通过指定端口访问指定范围中的 pod。指定的范围是一个数组，多个元素之间取**或**来作用，而同一元素内的多个 selector 取**与**来作用。
+ ingress 和 egress 往往会重写网络包的 ip，而这一操作和 NetworkPolicy 的检查的先后顺序是不确定的。
+ 在 NetworkPolicy 的配置文件中，如果不指定 .spec.ingress，则视为拒绝所有入网流量，如果指定 .spec.ingress 为 `-{}` ，则视为接受所有入网流量，egress 同理。

### HostAliases

+ 在 pod 的配置文件中通过指定 .spec.hostAliases 可以向 pod 的容器中的 /etc/hosts 添加一些 entry
+ 这个方法是推荐方法，如果手动修改 /etc/hosts 的话，修改会在容器或 pod 重启时被抹掉。

##### Last-modified date: 2020.1.17, 3 p.m.