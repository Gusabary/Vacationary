set -e

apt-get update && apt-get install -y curl wget htop git vim tmux 
apt-get install -y apt-transport-https ca-certificates gnupg-agent software-properties-common 

# install docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - 
add-apt-repository -y "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" 
apt-get update && apt-get install -y docker-ce docker-ce-cli containerd.io 

for ip in $@
do
ssh ubuntu@$ip << EOF
    sudo su;
    cd ~/.ssh;
    sed -i -e 's/^.*sleep 10" //g' authorized_keys;

    apt-get update && apt-get install -y curl wget htop git vim tmux
    apt-get install -y apt-transport-https ca-certificates gnupg-agent software-properties-common

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    add-apt-repository -y "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    apt-get update && apt-get install -y docker-ce docker-ce-cli containerd.io
EOF
done