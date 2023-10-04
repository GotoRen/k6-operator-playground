# load

## 概要

- 負荷試験スクリプトを配置する
- ConfigMap Generator で 負荷試験スクリプトを生成
  - JavaScript >> ConfigMap >> k6 Custom Resource

## k6 マニフェストサンプル

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
        value: http://prometheus-server.monitoring.svc.cluster.local:80/api/v1/write
```

![prometheus-18492](https://github.com/GotoRen/k6-operator-playground/assets/63791288/fdc9e9a4-d81d-4898-bf7d-6f33082775ab)

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

![influxdb-2587](https://github.com/GotoRen/k6-operator-playground/assets/63791288/1c0a7dd5-3cef-4ff0-a9a1-38f51983636d)

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
