# helm

## 概要

- Helm リポジトリから直接インストールする場合に使用する（簡易的）
- 基本的に、manifests ディレクトリの Kustomize マニフェストを使用してリソースを追加する

## コマンド

```shell
### Prometheus
$ cd prometheus
$ ./install.sh

### Grafana
$ cd grafana
$ ./install.sh

### Helm リポジトリリスト
$ helm repo list

### Helm リリースリスト
$ helm list --all
```
