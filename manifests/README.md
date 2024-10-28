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
### monitoring NS を作成
$ kubectl create namespace monitoring

### kube-prometheus-stack
$ cd ./manifests/platform/kube-prometheus-stack/playground

### Helm Chart でデプロイ
$ kustomize build . --enable-helm | kubectl apply -f - --server-side
```

```shell
### influxdb NS を作成
$ kubectl create namespace influxdb

### influxdb
$ cd ./manifests/platform/influxdb/playground

### Helm Chart でデプロイ
$ kustomize build . --enable-helm | kubectl apply -f -
```

```shell
### k6-operator NS を作成
$ kubectl create namespace k6-operator

### k6-operator
$ cd ./manifests/platform/k6-operator/playground

### Helm Chart でデプロイ
$ kustomize build . --enable-helm | kubectl apply -f -
```

```shell
### metrics-server
$ cd ./manifests/platform/metrics-server/playground

### Helm Chart でデプロイ
$ kustomize build . --enable-helm | kubectl apply -f -
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
  - Password: `password`
- <u>Home >> Connections >> Data sources</u>

  ![dashboard-source](https://github.com/user-attachments/assets/5051f3cb-404b-4e4e-881f-506c7e056d48)

  - Prometheus
    - Name: Prometheus
    - Prometheus server URL: http://kube-prometheus-stack-prometheus.monitoring:9090
  - InfluxDB
    - Name: InfluxDB 2 系
    - HTTP URL: http://influxdb2.influxdb.svc.cluster.local:80
    - Organization: `loadtest_organization`
    - Default Bucket: `loadtest_result`
    - Token: `admin_token`

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
$ kubectl port-forward -n monitoring service/kube-prometheus-stack-prometheus 9090:9090
```

![prometheus-dashboard](https://github.com/user-attachments/assets/63aafd8d-1e07-4c3c-8708-6b476c373f27)

## InfluxDB ダッシュボード確認

```shell
$ kubectl port-forward -n influxdb service/influxdb2 8086:80
```

![influxdb-dashboard](https://github.com/user-attachments/assets/4ac2bb6b-ddd4-4a13-a6e7-1fc4c357ea34)
