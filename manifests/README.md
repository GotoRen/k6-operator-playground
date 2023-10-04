# manifests

## ネームスペースリスト

| Namespace   | Resource            |
| :---------- | :------------------ |
| monitoring  | prometheus, grafana |
| influxdb    | influxdb            |
| k6-operator | k6-operator         |

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

$ cd prometheus
$ kustomize build ./base | kubectl apply -f -

$ cd grafana
$ kustomize build ./base | kubectl apply -f -
```

```shell
### InfluxDB
$ kubectl create namespace influxdb

$ cd influxdb
$ kustomize build ./base | kubectl apply -f -
```

```shell
### k6-operator
$ kubectl create namespace k6-operator

$ cd k6-operator
$ kustomize build ./base | kubectl apply -f -
```

- （後片付け）クラスタ削除

```shell
$ k3d cluster delete k6-operator-playground
```

## Grafana ダッシュボード設定

```shell
$ kubectl port-forward -n monitoring service/grafana 3000:80
```

- http://localhost:3000
  - Username: `admin`
  - Password: `0VAZVeURGNMcKgtgksoOtvFOjGPWB7LUB7u7DKui`
- <u>Home >> Connections >> Data sources</u>
  - Prometheus
    - Name: Prometheus
    - Prometheus server URL: http://prometheus-server.monitoring.svc.cluster.local:80
  - InfluxDB
    - Name: InfluxDB
    - HTTP URL: http://influxdb.influxdb.svc.cluster.local:8086
    - Database: loadtest
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
