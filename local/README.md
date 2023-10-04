# local

## 概要

- docker compose を使用してローカル環境で k6 による負荷試験を検証する

## 環境構築

```shell
### docker compose を起動
$ docker compose up -d
```

## Grafana ダッシュボード設定

- http://localhost:3000
  - Username: admin
  - Password: password
- Home >> Connections >> Data sources

  ![dashboard-source](https://github.com/GotoRen/k6-operator-playground/assets/63791288/6059370e-882b-4f41-b6c7-185e6846447a)

  - Prometheus
    - Name: Prometheus
    - Prometheus server URL: http://prometheus-local:9090
  - InfluxDB
    - Name: InfluxDB
    - HTTP URL: http://influxdb-local:8086
    - Database: loadtest

- <u>Home >> Dashboards >> New >> Import</u>
  - Official k6 Test Result
    - **Prometheus**
    - **18492**
    - https://grafana.com/grafana/dashboards/18492-official-k6-test-result/
  - k6 Load Testing Results
    - **InfluxDB**
    - **2587**
    - https://grafana.com/grafana/dashboards/2587-k6-load-testing-results/

## 負荷試験の実行

```shell
### 負荷試験実行
$ make run

### 負荷試験を実行して InfluxDB へメトリクス出力
$ make run/influxdb-out

### 負荷試験を実行して Prometheus へメトリクス出力
$ make run/prometheus-out
```
