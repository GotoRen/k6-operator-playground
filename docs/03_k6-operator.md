# k6-operator による負荷試験の実施

## 負荷試験実施手順

- ① **負荷試験シナリオ（JavaScript）を作成する**
- ② **シナリオをもとに ConfigMap を生成して、Kubernetes にデプロイする**
- ③ **`K6` Custom Resource を生成して負荷試験を実行する**
  - k6 は`K6`というカスタムリソースファイルを apply することで、負荷試験を開始する
  - Slash コマンドをはじめ、いくつか実行手法は考えられるが、現時点で Makefile を準備した（後々、Slash コマンドを導入したい）

## 新たなシナリオを追加する手順

- `./load/scenarios/[シナリオ名]/load-test.js` という配置・命名規則に従って 負荷試験シナリオ（JavaScript）を作成する
- `make generate/configmap` を実行して JS から ConfigMap を生成
  - このコマンドは `./load/scripts/gen-k6-scenarios-configmaps.sh` を叩くことで、`./load/scenarios` 配下の全てのシナリオファイルを再起的に探して ConfigMap を生成する
    ```yaml
    - "./load/scenarios/example01/configmap.yaml"
    - "./load/scenarios/example02/configmap.yaml"
    .....
    .....
    .....
    ```
- `make run/job NAME=[シナリオ名] PARAL=[同時実行数]` を実行する
  - `./load/scripts/run-load-testing.sh` が `./load/k6/base.yaml` にあるベースリソースを元に、パラメータ（シナリオ名、同時実行数）をオーバーライドして `k6.yaml` を生成する
  - `k6.yaml`を apply して負荷試験を開始する

## 負荷試験実施コマンド

- 基本コマンド

```shell
### シナリオを定義
$ vim ./load/scenarios/[シナリオ名]/load-test.js

### ConfigMap生成して適用
$ make generate/configmap

### 負荷試験を実行 => k6カスタムリソースと 負荷試験用の Pod (Jobリソース) が生成される
$ make run/job NAME=[シナリオ名] PARAL=[同時実行数]
  (ex. $make run/job NAME=example01 PARAL=1)

### 負荷試験を強制停止
$ make stop/job
```

- 実行ログ

```shell
### 実行ログを確認（ローカル環境）
$ stern $(kubectl get k6 --no-headers | awk '{print $1}')

### 負荷試験リソースの確認
$ kubectl get pod -n k6-operator
NAME                                              READY   STATUS      RESTARTS        AGE
k6-operator-example01-initializer-b85kf           0/1     Completed   0               14h
k6-operator-example01-starter-cdvf8               0/1     Completed   0               14h
k6-operator-example01-1-8wd4p                     0/1     Completed   0               14h

$ kubectl get k6 -n k6-operator
NAME                    STAGE      AGE   TESTRUNID
k6-operator-example01   finished   14h

###【その他】現在のネームスペース内の全てのリソースを取得する
$ kubectl get "$(kubectl api-resources --namespaced=true --verbs=list -o name | tr "\n" "," | sed -e 's/,$//')"
```

## 参考

- https://k6.io/blog/running-distributed-tests-on-k8s/
- https://docs.influxdata.com/influxdb/v1.3/administration/config/
- https://future-architect.github.io/articles/20210324/
- https://sreake.com/blog/learn-about-k6/
