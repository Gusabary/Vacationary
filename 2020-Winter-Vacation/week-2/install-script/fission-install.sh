set -e

curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash

FISSION_NAMESPACE="fission"
kubectl create namespace $FISSION_NAMESPACE
helm install --namespace $FISSION_NAMESPACE --name-template fission \
    --set serviceType=NodePort,routerServiceType=NodePort,logger.enableSecurityContext=true,prometheus.enabled=false \
    https://github.com/fission/fission/releases/download/1.7.1/fission-all-1.7.1.tgz

curl -Lo fission https://github.com/fission/fission/releases/download/1.7.1/fission-cli-linux \
    && chmod +x fission && sudo mv fission /usr/local/bin/