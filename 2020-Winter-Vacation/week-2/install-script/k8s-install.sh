set -e

curl https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | apt-key add -

cat << EOF >/etc/apt/sources.list.d/kubernetes.list  
deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main  
EOF
apt-get update

apt-get install -y kubelet kubeadm kubectl
apt-mark hold kubelet kubeadm kubectl

for ip in $@
do
ssh root@$ip << EOF
    curl https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | apt-key add -

    echo "deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main" > /etc/apt/sources.list.d/kubernetes.list  
    apt-get update

    apt-get install -y kubelet kubeadm kubectl
    apt-mark hold kubelet kubeadm kubectl
EOF
done

kubeadm init --image-repository registry.aliyuncs.com/google_containers --pod-network-cidr=192.168.0.0/16

mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

kubectl apply -f https://docs.projectcalico.org/v3.8/manifests/calico.yaml

tokenhash=$(kubeadm token create --print-join-command)
token=$(echo $tokenhash | awk '{print $5}')
hash=$(echo $tokenhash | awk '{print $7}')

masterip=$(ifconfig -a | grep 'inet addr:10.0.0.' | awk '{print $2}' | sed -e 's/addr://g')

for ip in $@
do
ssh root@$ip << EOF
    kubeadm join $masterip:6443 --token $token --discovery-token-ca-cert-hash $hash
EOF
done