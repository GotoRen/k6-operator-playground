# k6 概要

## 良さ・魅力

- **導入コストが低い**
  - 検証スクリプト (シナリオ) は Javascript ES2015/ES6 で記載
    - Go 言語は CMAScript 2015+（ES6+）を実行
    - https://github.com/dop251/goja
  - JavaScript に慣れている人であれば、基本的な構文が同じなのでキャッチアップコストが低くて済む
    - JavaScript/TypeScript を採用している OPENREC では初速を速くできると考えられる
  - JavaScript に慣れている人であれば、インフラエンジニア/SRE でなくてもシナリオを書くことができる
    - インフラエンジニア/SRE はそのシナリオをどう検証時に適用するかに集中可能
  - CLI オプションが豊富
  - シナリオ内でも定義可能
- **外部ツールとの親和性**
  - ダッシュボードによる可視化や外部 npm モジュールを使用可能
  - 結果自体を Prometheus 等メトリクス収集ツールに保存可能
  - NewRelic/Datadog 等 SaaS ツールから確認可能
  - OpenTelemetry などを組み合わせることで、ボトルネックの改善や課題解決がしやすくなるかも
  - コンテナ化して Kubernetes 上に展開可能
    - シナリオをコピーした k6 コンテナを作ってレジストリに登録しておく
- 段階的な負荷をかけられる（後に説明）
  - 30 秒間かけて徐々に 20 VUs にしていく
  - 1 分 30 秒かけて 10 VUs に減らしていく
  - 20 秒かけて 0 VUs に減らしていく
    ```js
    export const options = {
      stages: [
        { duration: "30s", target: 20 },
        { duration: "1m30s", target: 10 },
        { duration: "20s", target: 0 },
      ],
    };
    ```
- **CI/CD との親和性**
  - CI/CD パイプラインで負荷テストを実装して、結果を Grafana で確認することが可能
  - GitHub Actions と連携して workflows に組み込める
    - Git push → Generate → E2E テスト or 負荷テストまで自動化
- **k6 Operator という Kubernetes Operator が提供されている**
  - Slash コマンドを用いて, GitHub Issues や slack 内から負荷試験を実行可能
  - 結果は、ダッシュボードから確認可能
  - ChatOpt, CaC を実現できる

## 注意点・懸念点

- **シナリオは Javascript で記載可能だが Node.js ではない**
  - npm モジュールなどをインストールして使うことはできない
  - npm module や NodeJS API を使用する場合、別途モジュールを作成して、ファイルからインポートする必要がある
    - 例：AWS の API GW へのリクエストを投げる場合は、`browserify` を利用して`node_module` にインストールした後インポートすることで k6 でも実行可能
    - https://github.com/browserify/browserify
- **デフォルトの結果表示ではレスポンス等の時系列変化が見れない**
  - リアルタイムの描画については、k6 自体では対応していない
    - Jmeter / Taurus と比べると外部ツールの導入が必要なのでやや面倒
  - k6 の 拡張機能として xk6-dashboard (xk6) というツールが容易されているので、ビルド or イメージ化して使用する

## ユースケース

- 負荷テスト
  - k6 は、リソース消費を最小限に抑えるように最適化されており、高負荷テスト (スパイク、ストレス、ソーク テスト) を実行するように設計されている
- ブラウザテスト
  - k6 ブラウザを通じて、ブラウザベースのパフォーマンステストを実行可能
- カオスと回復力のテスト
  - k6 を使用して、カオス実験の一部としてトラフィックをシミュレートしたり、k6 テストからトラフィックをトリガー可能
  - xk6-disruptor を使用して Kubernetes にさまざまなタイプの障害を挿入可能
- パフォーマンスと総合モニタリング
  - k6 を使用すると、実稼働環境のパフォーマンスと可用性を継続的に検証するために、小さな負荷で非常に頻繁にテストをトリガーするように自動化およびスケジュール設定可能

## サポートしているプロトコル

- HTTP/1.1、HTTP/2（Java、NodeJS、PHP、[ASP.NET](http://asp.net/) 等）
- Web socket
- gRPC
- SOAP / REST Web

## 参考

- https://k6.io/blog/k6-vs-jmeter/
