# platform

## 概要

- 負荷試験プラットフォーム構築用のマニフェストを配置する

負荷試験用プラットフォーム

| Namespace   | Name                  | Charts                                             |
| :---------- | :-------------------- | :------------------------------------------------- |
| monitoring  | kube-prometheus-stack | https://prometheus-community.github.io/helm-charts |
| influxdb    | influxdb2             | https://helm.influxdata.com                        |
| k6-operator | k6-operator           | https://grafana.github.io/helm-charts              |
