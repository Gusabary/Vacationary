# Kubernetes Installation

学 Fission 学得好好的，Centos 上面集群炸了 - -

就是重启了一下，apiserver 没了，也连不上 slave 了，于是试图在另一个 Ubuntu 的集群上面重新搭建 k8

正好练一下手。

好像可以用 Kubeadm，也可以用 Kubespray，先用第一种试试（

## Kubeadm

### 安装 kubeadm，kubelet 以及 kubectl

一开始我参考的是[官网的教程](<https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#installing-kubeadm-kubelet-and-kubectl>)，但很遗憾需要翻墙，捣鼓了一通 shadowsocks，成功过一次，但之后又失败了，我归结为和梯子有关的玄学问题，只好用国内的镜像。

```bash
# 安装 GPG 证书，用的国内镜像
curl https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | apt-key add -

# 更新软件源信息，用的国内镜像
cat << EOF >/etc/apt/sources.list.d/kubernetes.list  
deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main  
EOF
apt-get update

# 安装kubelet kubeadm kubectl，并取消自动更新
apt-get install -y kubelet kubeadm kubectl
apt-mark hold kubelet kubeadm kubectl
```

以上步骤需要在每个节点都执行一遍。

### 配置 cgroup Driver

[官网](<https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#configure-cgroup-driver-used-by-kubelet-on-control-plane-node>)的说法是如果用的是其他 CRI，需要设置一下 cgroup driver 再重启 kubelet，如果用的是 Docker 就没有必要了。

### 初始化 Master 节点

接下来就可以初始化 master 节点了：

```bash
kubeadm init \
	 --image-repository registry.aliyuncs.com/google_containers \   # 国内镜像源
	 --service-cidr=10.100.0.1/16									# cidr，最好设一下（
	 --pod-network-cidr=192.168.0.0/16								# calico
	 # 其他还有一些可选参数，比如 nodename 啥的，最重要的就是镜像源了
	 
# 没这几步的话，kubectl 访问 apiserver 会报 8080 端口的错误：
# The connection to the server localhost:8080 was refused – did you specify the right    # host or port?
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

在 kubeadm 成功后会打印 token 和 hash，像这样：

```bash
kubeadm join <internal ip>:6443 --token <token> \
    --discovery-token-ca-cert-hash sha256:<hash>
```

这是用来将 slave 节点 join 进来的命令。

### 安装 Pod Network Add-on

现在需要为集群选择一个 Pod Network Add-on，我选择的是 Calico，[官网](<https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/#pod-network>)有其他更多选择。

```bash
kubectl apply -f https://docs.projectcalico.org/v3.8/manifests/calico.yaml
```

需要注意的是 Calico 要求 pod network cidr 为 192.168.0.0/16，如果之前 `kubeadm init` 传递的参数不是这个值话，需要修改一下这个 yaml 文件，可以搜索 192.168.0.0/16，将其改为其他的值。

### 将 Slave 节点加入进来

现在可以将 slave 节点加入到集群中了：

```bash
kubeadm join <master ip>:6443 --token <token> \     
	--discovery-token-ca-cert-hash sha256:<hash>
```

如果之前 `kubeadm init` 的时候忘记了 token 和 hash 是多少，还可以在 master 节点通过如下命令生成一个新的：

```bash
kubeadm token create --print-join-command
```

### 搭建完成

回到 master 节点，检查集群搭建是否完成

```bash
kubectl get nodes
NAME    STATUS   ROLES    AGE     VERSION
ukm     Ready    master   4h51m   v1.17.2
uks-1   Ready    <none>   4h6m    v1.17.2
```

:tada::tada::tada:

##### Last-modified date: 2020.1.26, 2 p.m.

