# Learning notes of Week 1

## 1.13 Mon.

### Kubernetes Object Management

+ Imperative commands，比如 `kubectl run`，不用写配置文件，是好处也是坏处
+ Imperative object configuration，比如 `kubectl apply -f a.yaml`，用的最多的那种
+ Declarative object configuration，说实话没太看明白，官网所说的优点有对于一个目录的配置文件更方便、可以自动检测出你想对 objects 做的操作，以及可以保留对 objects 所做的变更。

### Names

+ 同种资源下，在同一时刻，一个 name 只能被一个 object 拥有。
+ 整个集群中，整个历史中，一个 UID 只能被一个 object 拥有。（即使两个 lifetime 不重叠的 object 也不能用同一个 UID）

### Namespaces

+ 一开始会有三个 ns：default, kube-system 和 kube-public
+ 可以通过 `kubectl config set-context` 命令来更改 ns 偏好。context 有多个，指定 `--current` 参数以更改当前 context
+ service 的 DNS entry 形如 `<service-name>.<namespace-name>.svc.cluster.local`，如果要在跨 ns 的场景下工作的话，最好指定 FQDN（fully qualified domain name），否则 service name 总会被解析到 local ns
+ 有些资源是不属于任何一个 ns 的，比如 ns 本身，nodes 以及 PV，可以通过 `kubectl api-resources --namespaced=false` 查看

### Label & Annotation

+ label 是 identifying 的，相比之下，annotation 是 non-identifying 的。即用来标识谁是谁这种信息，一般用 label
+ label 和 annotation 都由键值对组成，key 由一个 optional 的 prefix 和一个 required 的 name 组成，prefix 如果指定的话应该是一个 DNS subdomain

### Label selector

+ 有两种 selector，equality-based 和 set-based，分隔用的逗号语义是 AND，不是 OR。
+ `kubectl get` 可以用 `-l` 参数指定 selector

### Field selector

+ Field selector 可以根据一些 resource field  做过滤，例如 metadata.name, metadata.namespace，不同资源类型可以用做过滤的 resource field 不一样，但这两个是通用的
+ `kubectl get` 可以用 `--field-selector` 参数指定 field selector

##### Last-modified date: 2020.1.13, 10 p.m.