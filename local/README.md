# k6 ローカル環境での負荷試験実施手順

## outdated: 簡易的な負荷試験

configs/k6 下に [k6](https://k6.io/) 用の設定があるので、これを用いて簡易的な負荷試験を行うことができます。

```shell
$ k6 run configs/k6/get_race.js --vus 10 --duration 60s
```

パラメータは適宜変更してください。

## docker compose を使用する

- xk6 ダッシュボード
  - ID: 2587
  - [k6 Load Testing Results](https://grafana.com/grafana/dashboards/2587-k6-load-testing-results/)
- DataSource 登録
  - InfluxDB
  - [http://loadtest_influxdb:8086](http://loadtest_influxdb:8086)

## k6-operator の追加

- https://k6.io/blog/running-distributed-tests-on-k8s/

### ConfigMap でシナリオをデプロイ

```shell
### シナリオからConfigMapを生成
$ kubectl create configmap k6-operator-sample --from-file ./scenario/sample.js

### 確認
$ kubectl describe configmap k6-operator-sample
```

### Custom Resource (CR) を追加

```shell
### オペレーターと通信するためのカスタムリソースを作成してデプロイ
$ kubectl apply -f ./custom-resource.yaml
configmap/k6-operator-sample created

### シナリオに基づいて負荷試験が開始される
$ kubectl get k6
NAME           STAGE            AGE   TESTRUNID
k6-load-test   initialization   16s
```
