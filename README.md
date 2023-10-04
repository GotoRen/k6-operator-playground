# k6-load-testing

ローカル環境での k6 負荷試験シミュレーション

### xk6 を使用する場合

- インストール & ビルド

```shell
$ go install go.k6.io/xk6/cmd/xk6@latest
$ xk6 build --with github.com/szkiba/xk6-dashboard@latest --output ./bin/k6
```

- 負荷試験実行

```shell
$ ./bin/k6 run ./local/scenario/case-1.js -u 100 --rps 100 -d 10s --out dashboard
```

- ダッシュボード確認
  - http://localhost:5665/ui/?endpoint=/

### kube-prom-stack

- prometheus -> `./install.sh`
- grafana -> `./install.sh`

## 使用するコンポーネント

- kustomize
- kube-prometheus-stack
- k6-operator

# tmp

```shell
$ k3d cluster create k6-operator-playground
$ kubectl config get-contexts
CURRENT   NAME                         CLUSTER                      AUTHINFO                           NAMESPACE
          docker-desktop               docker-desktop               docker-desktop
*         k3d-k6-operator-playground   k3d-k6-operator-playground   admin@k3d-k6-operator-playground

$ kubectl create namespace monitoring
$ kubectl create namespace k6-operator
$ kubectl create namespace k6-operator-load

### Prometheus/Grafana
$ cd prometheus
$ kustomize build ./base | kubectl apply -f -

$ cd grafana
$ kustomize build ./base | kubectl apply -f -

### k6-operator
$ cd k6-operator
$ kustomize build ./base | kubectl apply -f -
```

### Grafana 設定

```shell
$ kubectl port-forward -n monitoring service/grafana 3000:80
>> http://localhost:3000
Username: admin
Password: 0VAZVeURGNMcKgtgksoOtvFOjGPWB7LUB7u7DKui
```

#### Dashboards

- Official k6 Test Result
  - 18492
  - https://grafana.com/grafana/dashboards/18492-official-k6-test-result/

### 削除

```shell
$ k3d cluster delete k6-operator-playground
```
