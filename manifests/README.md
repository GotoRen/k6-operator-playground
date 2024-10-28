# manifests

## 使い方

- k3d でクラスタを構築

```shell
$ k3d cluster create k6-operator-playground

$ kubectl config get-contexts
CURRENT   NAME                         CLUSTER                      AUTHINFO                           NAMESPACE
*         k3d-k6-operator-playground   k3d-k6-operator-playground   admin@k3d-k6-operator-playground
```

- （必要となる）リソースを追加

```shell
### Prometheus/Grafana
$ kubectl create namespace monitoring

$ cd manifests/prometheus
$ kustomize build ./base | kubectl apply -f -

$ cd manifests/grafana
$ kustomize build ./base | kubectl apply -f -
```

```shell
### InfluxDB
$ kubectl create namespace influxdb

$ cd manifests/influxdb
$ kustomize build ./base | kubectl apply -f -
```

```shell
### k6-operator
$ kubectl create namespace k6-operator

$ cd manifests/k6-operator
$ kustomize build ./base | kubectl apply -f -
```

- （後片付け）クラスタ削除

```shell
$ k3d cluster delete k6-operator-playground
```

## Grafana ダッシュボード設定

```shell
$ kubectl port-forward -n monitoring svc/grafana 3000:80
```

- http://localhost:3000
  - Username: `admin`
  - Password: `0VAZVeURGNMcKgtgksoOtvFOjGPWB7LUB7u7DKui`
- <u>Home >> Connections >> Data sources</u>

  ![dashboard-source](https://github.com/GotoRen/k6-operator-playground/assets/63791288/30f85c2d-7d23-4aa1-aba9-79208eff121f)

  - Prometheus
    - Name: Prometheus
    - Prometheus server URL: http://prometheus-server.monitoring.svc.cluster.local:80
  - InfluxDB
    - Name: InfluxDB
    - HTTP URL: http://influxdb2.influxdb.svc.cluster.local:8086
    - Database: `loadtest`
    - User: `admin`
    - Password: `hoge`

- <u>Home >> Dashboards >> New >> Import</u>
  - Official k6 Test Result
    - **Prometheus**
    - **18492**
    - https://grafana.com/grafana/dashboards/18492-official-k6-test-result/
  - k6 Prometheus（Deprecated）
    - **Prometheus**
    - **18030**
    - https://grafana.com/grafana/dashboards/18030-test-result/
  - k6 Load Testing Results
    - **InfluxDB**
    - **2587**
    - https://grafana.com/grafana/dashboards/2587-k6-load-testing-results/

## Prometheus ダッシュボード確認

```shell
$ kubectl port-forward -n monitoring svc/prometheus-server 9090:80
```

## InfluxDB ダッシュボード確認

```shell
$ kubectl port-forward -n monitoring svc/prometheus-server 9090:80
```
