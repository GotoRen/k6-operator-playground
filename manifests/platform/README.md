# platform

## 概要

- 負荷試験プラットフォーム構築用のマニフェストを配置する

負荷試験用プラットフォーム

| Namespace   | Name                  | Charts                                             | Chart version | Application version |
| :---------- | :-------------------- | :------------------------------------------------- | ------------: | ------------------: |
| monitoring  | kube-prometheus-stack | https://prometheus-community.github.io/helm-charts |       v62.7.0 |             v0.76.1 |
| kube-system | metrics-server        | https://kubernetes-sigs.github.io/metrics-server   |       v3.12.2 |              v0.7.2 |
| influxdb    | influxdb2             | https://helm.influxdata.com                        |        v2.1.2 |              v2.7.4 |
| k6-operator | k6-operator           | https://grafana.github.io/helm-charts              |      v.0.0.17 |              v3.9.0 |
