# k6-load-testing

ローカル環境での k6 負荷試験シミュレーション

### xk6 を使用する場合

- インストール & ビルド

```shell
$ go install go.k6.io/xk6/cmd/xk6@latest
$ xk6 build --with github.com/szkiba/xk6-dashboard@latest --output ./bin/k6
```

- 負荷試験実行

```shell
$ ./bin/k6 run ./local/scenario/case-1.js -u 100 --rps 100 -d 10s --out dashboard
```

- ダッシュボード確認
  - http://localhost:5665/ui/?endpoint=/

### kube-prom-stack

- prometheus -> `./install.sh`
- grafana -> `./install.sh`
