- ローカル環境に Kubernetes を構築

```shell
### 検証クラスタを作成
$ k3d cluster create loadtest-cluster
```

- リソースの準備

```shell
### 1. k6-opertor をデプロイ
$ cd ${PRJECT_ROOT}/k6-load-testing/manifests/k6-operator/overlay/dev
$ kustomize build . | k apply -f -

### 2. InfluxDB をデプロイ
$ cd ${PRJECT_ROOT}/k6-load-testing/manifests/influxdb/overlay/dev
$ kustomize build . | k apply -f -

### 3. kube-prometheus-stack をデプロイ
$ cd ${PRJECT_ROOT}/k6-load-testing/manifests/kube-prometheus-stack/overlay/dev
$ kustomize build . | k apply -f -
```
