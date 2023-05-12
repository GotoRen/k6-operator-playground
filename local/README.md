## 簡易的な負荷試験

configs/k6 下に [k6](https://k6.io/) 用の設定があるので、これを用いて簡易的な負荷試験を行うことができます。

```console
$ k6 run configs/k6/get_race.js --vus 10 --duration 60s
```

パラメータは適宜変更してください。

ID: 2587

```
http://loadtest_influxdb:8086
```
