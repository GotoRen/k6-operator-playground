# load

負荷試験スクリプトを配置

- ConfigMap Generator で 負荷試験スクリプトを生成
  - JavaScript >> ConfigMap >> k6 Custom Resource

### k6 マニフェストサンプル

- Prometheus にメトリクスを流す場合

```yaml
apiVersion: k6.io/v1alpha1
kind: K6
metadata:
  name: k6-operator-example01
  namespace: k6-operator-load
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

- InfluxDB にメトリクスを流す場合

```yaml
apiVersion: k6.io/v1alpha1
kind: K6
metadata:
  name: k6-operator-example01
  namespace: k6-operator-load
spec:
  parallelism: 1
  arguments: --out influxdb=http://influxdb.influxdb.svc.cluster.local:8086/loadtest
  script:
    configMap:
      name: k6-operator-example01
      file: load-test.js
```
