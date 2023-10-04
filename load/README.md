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

![prometheus-18492](https://github.com/GotoRen/k6-operator-playground/assets/63791288/fdc9e9a4-d81d-4898-bf7d-6f33082775ab)

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

![influxdb-2587](https://github.com/GotoRen/k6-operator-playground/assets/63791288/f0d7673f-afc3-45b3-902b-72d60f1738d1)
