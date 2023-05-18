# k6 ローカル環境での負荷試験実施手順

## 【outdated】 簡易的な負荷試験

configs/k6 下に [k6](https://k6.io/) 用の設定があるので、これを用いて簡易的な負荷試験を行うことができます。

```shell
$ k6 run configs/k6/get_race.js --vus 10 --duration 60s
```

パラメータは適宜変更してください。

## docker で k6 を検証

- xk6 ダッシュボード
  - ID: 2587
  - [k6 Load Testing Results](https://grafana.com/grafana/dashboards/2587-k6-load-testing-results/)
- DataSource 登録
  - InfluxDB
  - [http://loadtest_influxdb:8086](http://loadtest_influxdb:8086)
- 負荷試験の実行

```shell
$ make run/out
```

## Local K8s で k6-operator を検証

https://k6.io/blog/running-distributed-tests-on-k8s/

- ローカルクラスタを構築

```shell
### k3dをデプロイ
$ k3d cluster create loadtest-cluster
```

- ConfigMap でシナリオをデプロイ

```shell
### シナリオからConfigMapを生成
$ kubectl create configmap k6-operator-sample --from-file ./scenario/sample.js

### 確認
$ kubectl get configmap | grep k6-operator
NAME                 DATA   AGE
k6-operator-sample   1      19s

### マニフェスト
$ kubectl describe configmap k6-operator-sample
```

- Custom Resource (CR) を追加

```shell
### 負荷試験実行: k6オペレーターと通信するためのカスタムリソースを作成してデプロイ
$ make run/job
kubectl apply -f ./scenario/custom-resource.yaml
k6.k6.io/k6-load-test created

### シナリオに基づいて負荷試験が開始される
$ kubectl get k6
NAME           STAGE            AGE   TESTRUNID
k6-load-test   initialization   16s
```

- 確認

```shell
### リソースを確認
$ kubectl get all -n k6-operator-system
NAME                                                  READY   STATUS      RESTARTS   AGE
pod/k6-operator-controller-manager-75cf89897f-czvkn   2/2     Running     0          19m
pod/k6-load-test-initializer-qz6zj                    0/1     Completed   0          3m57s
pod/k6-load-test-starter-dp7bg                        0/1     Completed   0          3m35s
pod/k6-load-test-2-c2k27                              0/1     Completed   0          3m47s
pod/k6-load-test-1-tjln4                              0/1     Completed   0          3m47s
pod/k6-load-test-3-dpk9l                              0/1     Completed   0          3m47s
pod/k6-load-test-4-8bnz7                              0/1     Completed   0          3m47s

NAME                                                     TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
service/k6-operator-controller-manager-metrics-service   ClusterIP   10.43.167.4    <none>        8443/TCP   19m
service/k6-load-test-service-1                           ClusterIP   10.43.155.85   <none>        6565/TCP   3m47s
service/k6-load-test-service-2                           ClusterIP   10.43.31.78    <none>        6565/TCP   3m47s
service/k6-load-test-service-3                           ClusterIP   10.43.133.81   <none>        6565/TCP   3m47s
service/k6-load-test-service-4                           ClusterIP   10.43.52.235   <none>        6565/TCP   3m47s

NAME                                             READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/k6-operator-controller-manager   1/1     1            1           19m

NAME                                                        DESIRED   CURRENT   READY   AGE
replicaset.apps/k6-operator-controller-manager-75cf89897f   1         1         1       19m

NAME                                 COMPLETIONS   DURATION   AGE
job.batch/k6-load-test-initializer   1/1           10s        3m57s
job.batch/k6-load-test-starter       1/1           13s        3m35s
job.batch/k6-load-test-2             1/1           46s        3m47s
job.batch/k6-load-test-1             1/1           46s        3m47s
job.batch/k6-load-test-4             1/1           47s        3m47s
job.batch/k6-load-test-3             1/1           47s        3m47s

### 負荷試験ログの確認
$ stern k6-load-test
```

## 負荷試験の実行タイミング
