# locals

## 概要

- docker compose を使用してローカル環境で k6 による負荷試験を検証する

## 環境構築

```shell
### docker compose を起動
$ docker compose up -d
```

## Grafana ダッシュボード確認

- http://localhost:3000
  - Username: admin
  - Password: password
- Home >> Connections >> Data sources
  - Prometheus と InfluxDB がデータソースとして追加されていることを確認
    ![dashboard-source.png](https://github.com/user-attachments/assets/6a8cd138-a147-4295-b0e3-064df41bb3d8)
  - Prometheus
    - Name: Prometheus
    - Prometheus server URL: http://prometheus.local:9090
  - InfluxDB
    - Name: InfluxDB
    - HTTP URL: http://influxdb.local:8086
    - Query language: Flux
    - Organization: loadtest_organization
    - Token: admin_token
    - Bucket: loadtest_result
- Home >> Dashboards
  - 3 つのダッシュボードが追加されていることを確認
    ![datasource.png](https://github.com/user-attachments/assets/5460d344-82b1-4c45-b8c8-91d0286bbadf)
  - **k6 performance test**: InfluxDB をデータソースとして負荷試験結果を可視化
  - **K6 Test Results**: InfluxDB をデータソースとして負荷試験結果を可視化
  - **Official k6 Test Result**: Prometheus をデータソースとして負荷試験結果を可視化

## 負荷試験の実行

```shell
### 負荷試験実行
$ make run

### 負荷試験を実行して Prometheus へメトリクス出力
$ make run/prometheus-out

### 負荷試験を実行して InfluxDB へメトリクス出力
$ make run/influxdb-out
```
