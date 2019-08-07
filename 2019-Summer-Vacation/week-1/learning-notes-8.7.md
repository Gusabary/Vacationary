# Learning notes of Week 1

## 8.7 Wed.

### 安装 prometheus-operator

虽然可以直接装 Prometheus 和 Grafana，但是据说用 prometheus-operator 和 kubernetes 更搭一些。

#### 设置 docker 代理

在开始安装之前，先设置 docker daemon 的代理（准备翻墙）：

```bash
vim /lib/systemd/system/docker.service
```

在 service 部分下新增 Environment 变量，配置代理：

```
[Service]

Environment="HTTP_PROXY=http://[username]:[password]@[proxy-addr]:[proxy-port]"
Environment="HTTPS_PROXY=http://[username]:[password]@[proxy-addr]:[proxy-port]"
```

重启 docker：

```bash
systemctl daemon-reload
systemctl show --property Environment docker
systemctl restart docker
```

#### 安装 helm

[helm](<https://helm.sh/>) 是一个 Kubernetes 的包管理工具，执行以下命令来安装 helm：

```bash
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get | bash
```

不出问题的话，应该可以看到一个 pod 已经起在了 `kube-system` 的 namespace 中：

```bash
kubectl get pods --namespace=kube-system

# ...
tiller-deploy-7f656b499f-dlxsg             1/1     Running   0          1h
```

如果出了问题，可以把这个 pod 删掉，因为 deployment 的缘故他会自己重启一个，说不定就好了（

安装好后，先设置当前命令行的代理（仅作用于当前命令行会话）：

```bash
export http_proxy=[username]:[password]@[proxy-addr]:[proxy-port]
export https_proxy=[username]:[password]@[proxy-addr]:[proxy-port]
export no_proxy=127.0.0.1,localhost,10.0.0.x   # x替换为实际值
```

然后初始化 helm：

```bash
helm init
```

#### 安装 prometheus-operator

有了 helm 之后，安装 prometheus-operator 就会轻松很多：

```bash
helm install --name prometheus-operator --namespace=kube-system stable/prometheus-operator
```

这个时候可能会遇到这个错误：`forbidden: User "system:serviceaccount:kube-system:default" cannot get namespaces in the namespace "default`，没有关系，[这里](<https://github.com/fnproject/fn-helm/issues/21>)有解决办法。

照着解决办法操作完之后再敲一遍之前的命令，如果还是有问题，就照着问题后面的 hint 输一下他给的命令（update 什么的），然后大概会蹦出来一个链接，curl 一下，一开始可能没反应，然后过一会儿会突然蹦出来一堆反应，这个时候再 update 一下，再 install 一下就可以了。

反正这一段充满玄学，我弄的时候大概过了四五分钟左右。

然后就安装好啦，可以检查一下：

```
kubectl get -n kube-system
helm list
```

有 prometheus-operator 相关的东西就是装好了（

#### 修改访问模式

prometheus-operator 帮我们安装好的 Prometheus, AlertManager 和 Grafana 都是默认 `ClusterIP` 的服务类型，只有集群内部可以访问，要想直接通过外网访问，需要把服务类型改成 `NodePort`:

**Grafana**: `kubectl edit svc prometheus-operator-grafana -n kube-system`

```
# ...
spec:
  clusterIP: 10.233.33.201
  externalTrafficPolicy: Cluster
  ports:
  - name: service
+   nodePort: 30xx1
    port: 80
    protocol: TCP
    targetPort: 3000
  selector:
    app: grafana
    release: prometheus-operator
  sessionAffinity: None
- type: ClusterIP
+ type: NodePort
```

**AlertManager**: `kubectl edit svc prometheus-operator-alertmanager -n kube-system`

```
# ...
spec:
  clusterIP: 10.233.48.195
  externalTrafficPolicy: Cluster
  ports:
  - name: web
+   nodePort: 30xx2
    port: 9093
    protocol: TCP
    targetPort: 9093
  selector:
    alertmanager: prometheus-operator-alertmanager
    app: alertmanager
  sessionAffinity: None
- type: ClusterIP
+ type: NodePort
```

**Prometheus**: `kubectl edit svc prometheus-operator-prometheus -n kube-system`

```
# ...
spec:
  clusterIP: 10.233.21.28
  externalTrafficPolicy: Cluster
  ports:
  - name: web
+   nodePort: 30xx3
    port: 9090
    protocol: TCP
    targetPort: 9090
  selector:
    app: prometheus
    prometheus: prometheus-operator-prometheus
  sessionAffinity: None
- type: ClusterIP
+ type: NodePort
```

#### Get Your Dashboard!

好啦！现在可以通过外网访问到这些服务啦！

**Grafana**: http://202.120.40.8:30xx1

**AlertManager**: http://202.120.40.8:30xx2

**Pormetheus**: http://202.120.40.8:30xx3

还有一个地方要注意，就是第一次访问 Grafana dashboard 用户名是 admin ，密码是 prom-operator，进去之后别忘了改密码。

##### Last-modified date: 2019.8.7, 11 p.m.