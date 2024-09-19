# load

## 概要

- 負荷試験スクリプトを配置する
- 手順：JavaScript >> ConfigMap >> k6 Custom Resource
  - 負荷試験シナリオ（JavaScript）から ConfigMap を生成
  - k6 マニフェストから ConfigMap の値を読み込んで負荷試験を実行

## 負荷試験実行用 k6 マニフェストのサンプル

### 負荷試験データの書き込み先

- Prometheus
  - http://kube-prometheus-stack-prometheus.monitoring.svc.cluster.local:9090/api/v1/write
- InfluxDB
  - http://influxdb.influxdb.svc.cluster.local:8086/loadtest

### Prometheus にメトリクスを流す場合

```yaml
apiVersion: k6.io/v1alpha1
kind: K6
metadata:
  name: k6-operator-example01
  namespace: k6-operator
spec:
  parallelism: 1
  arguments: -o experimental-prometheus-rw
  script:
    configMap:
      name: k6-operator-example01
      file: load-test.js
  runner:
    env:
      - name: K6_PROMETHEUS_RW_SERVER_URL
        value: http://kube-prometheus-stack-prometheus.monitoring.svc.cluster.local:9090/api/v1/write
```

![prometheus-1849](https://github.com/GotoRen/k6-operator-playground/assets/63791288/7d00acbf-31cf-45b3-a79f-c0356737e0a0)

### InfluxDB にメトリクスを流す場合

```yaml
apiVersion: k6.io/v1alpha1
kind: K6
metadata:
  name: k6-operator-example01
  namespace: k6-operator
spec:
  parallelism: 1
  arguments: --out influxdb=http://influxdb.influxdb.svc.cluster.local:8086/loadtest
  script:
    configMap:
      name: k6-operator-example01
      file: load-test.js
```

![influxdb-2587](https://github.com/GotoRen/k6-operator-playground/assets/63791288/9f58d490-f14d-4d37-9e66-b82b497ef7a9)

- InfluxDB に接続してデータを確認

```
### 接続
root@influxdb-0:/# influx
Connected to http://localhost:8086 version 1.8.3
InfluxDB shell version: 1.8.3
>

### テーブルを選択
> USE loadtest
Using database loadtest

### データを確認
> SELECT * FROM http_req_duration LIMIT 10
name: http_req_duration
time                expected_response instance_id job_name                method name               proto    scenario status tls_version url                value
----                ----------------- ----------- --------                ------ ----               -----    -------- ------ ----------- ---                -----
1696396044625618631 true              1           k6-operator-example01-1 GET    https://test.k6.io HTTP/1.1 default  200    tls1.3      https://test.k6.io 177.581759
1696396044637129974 true              1           k6-operator-example01-1 GET    https://test.k6.io HTTP/1.1 default  200    tls1.3      https://test.k6.io 179.924661
1696396044638339712 true              1           k6-operator-example01-1 GET    https://test.k6.io HTTP/1.1 default  200    tls1.3      https://test.k6.io 172.597401
1696396044684120812 true              1           k6-operator-example01-1 GET    https://test.k6.io HTTP/1.1 default  200    tls1.3      https://test.k6.io 177.603871
1696396044713006325 true              1           k6-operator-example01-1 GET    https://test.k6.io HTTP/1.1 default  200    tls1.3      https://test.k6.io 178.812152
1696396044727631651 true              1           k6-operator-example01-1 GET    https://test.k6.io HTTP/1.1 default  200    tls1.3      https://test.k6.io 172.663508
1696396044764963889 true              1           k6-operator-example01-1 GET    https://test.k6.io HTTP/1.1 default  200    tls1.3      https://test.k6.io 173.624092
1696396044797198952 true              1           k6-operator-example01-1 GET    https://test.k6.io HTTP/1.1 default  200    tls1.3      https://test.k6.io 172.597831
1696396044799971307 true              1           k6-operator-example01-1 GET    https://test.k6.io HTTP/1.1 default  200    tls1.3      https://test.k6.io 173.752688
1696396044810442320 true              1           k6-operator-example01-1 GET    https://test.k6.io HTTP/1.1 default  200    tls1.3      https://test.k6.io 171.931634
```

## 参考

- https://k6.io/docs/results-output/real-time/
