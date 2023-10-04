# k6-operator

## [更新作業時] grafana/k6-operator から base を作成する方法

```shell
### k6-operator clone or fork する
$ git clone https://github.com/grafana/k6-operator

### マニフェストを取得する
$ kustomize build ./config/manifests | pbcopy
```

## kustomization

```shell
### baseマニフェスト適用
$ make deploy

### baseマニフェスト削除
$ make delete
```

### overlay / patch

- Development 環境

```shell
### overlayマニフェスト適用
$ kustomize build ./overlay/cluster01/dev | kubectl apply  -f -

### overlayマニフェスト削除
$ kustomize build ./overlay/cluster01/dev | kubectl delete  -f -
```

- Staging 環境

```shell
### overlayマニフェスト適用
$ kustomize build ./overlay/cluster01/stg | kubectl apply  -f -

### overlayマニフェスト削除
$ kustomize build ./overlay/cluster01/stg | kubectl delete  -f -
```

## 負荷試験の実施

手順

1. 負荷試験シナリオを作成する
2. シナリオをもとに`ConfigMap`を生成して、Kubernetes にデプロイ（デプロイ方法要検討）
3. `K6` CR を生成して負荷試験を実行

```shell
- ターミナル1
### シナリオを定義
$ vim ./base/load/scenarios/[シナリオ名]/load-test.js

### ConfigMap生成して適用
$ make generate/configmap

### 負荷試験を実行
$ make run/job NAME=[シナリオ名] PARAL=[同時実行数]
ex. make run/job NAME=example01 PARAL=1
```

```shell
- ターミナル2
### InfluxDBを公開する
$ make port-foward
```

```shell
- ターミナル3
### 実行ログを確認（ローカル環境）
$ stern $(k get k6 --no-headers | awk '{print $1}')
```

### docs

- https://docs.influxdata.com/influxdb/v1.3/administration/config/

### シナリオ

300,000 VU それぞれで 1req/s
