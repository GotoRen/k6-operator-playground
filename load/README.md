# load

## 概要

- 負荷試験スクリプトを配置する
- 手順：JavaScript >> ConfigMap >> k6 Custom Resource
  - 負荷試験シナリオ（JavaScript）から ConfigMap を生成
  - k6 マニフェストから ConfigMap の値を読み込んで負荷試験を実行

## 負荷試験実行用 k6 マニフェストのサンプル

### 負荷試験データの書き込み先

- Prometheus
  - http://prometheus-server.monitoring.svc.cluster.local:80/api/v1/write
- InfluxDB
  - http://influxdb2.influxdb.svc.cluster.local:80

### Prometheus にメトリクスを流す場合

```yaml
apiVersion: k6.io/v1alpha1
kind: TestRun
metadata:
  name: k6-operator-example01
  namespace: k6-operator
spec:
  parallelism: 1
  arguments: -o experimental-prometheus-rw ## Prometheus Remote-Write を使用
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
kind: TestRun
metadata:
  name: k6-operator-example01
  namespace: k6-operator
spec:
  parallelism: 1
  arguments: -o xk6-influxdb=http://influxdb2.influxdb.svc.cluster.local:80 ## InfluxDB 2系 を使用
  script:
    configMap:
      name: k6-operator-example01
      file: load-test.js
  runner:
    image: ren1007/k6:latest ## カスタムイメージを使用
    env:
      - name: K6_INFLUXDB_ORGANIZATION
        value: "loadtest_organization"
      - name: K6_INFLUXDB_BUCKET
        value: "loadtest_result"
      - name: K6_INFLUXDB_TOKEN
        value: "admin_token"
      - name: K6_INFLUXDB_PUSH_INTERVAL
        value: "30s"
    resources:
      requests:
        memory: "2Gi"
        cpu: "1"
      limits:
        memory: "4Gi"
        cpu: "2"
```

![influxdb-2587](https://github.com/GotoRen/k6-operator-playground/assets/63791288/9f58d490-f14d-4d37-9e66-b82b497ef7a9)

## 参考

- https://k6.io/docs/results-output/real-time/
