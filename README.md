# k6-operator-playground

- Load test simulation using k6-operator.

## 使用ツール

- マニフェスト管理

  - Kustomize<br />
    <img src="https://github.com/GotoRen/k6-operator-playground/assets/63791288/0abf4b23-602f-4486-b480-0f83d4df7e49" alt="Kustomize" width="80">

- モニタリング

  - kube-prometheus-stack<br />
    <img src="https://github.com/GotoRen/k6-operator-playground/assets/63791288/e8871511-04fc-4e52-b6d3-4bf4f27c22eb" alt="kube-prometheus-stack" width="80">

- 負荷試験
  - k6-operator<br />
    <img src="https://github.com/GotoRen/k6-operator-playground/assets/63791288/1e241c8d-62c7-45fe-b293-2fa83703297b" alt="k6-operator" width="80">

## ディレクトリ構成

```
.
├── docs      ・・・ ドキュメント
├── helm      ・・・ Helm リポジトリから直接リソースを適用する場合のスクリプトを配置（基本的に使用しない。公式からのリリースと大きな差分が発生した際の確認用として準備しておく。）
├── load      ・・・ Kubernetes 上で負荷試験を実行する際に必要となるシナリオとマニフェストを配置
├── local     ・・・ docker compose を使用して k6 を検証する場合に必要となるリソースを配置（Kubernetes を使用しない場合に使用）
├── manifests ・・・ 負荷試験に必要となるリソース用の Kustomize マニフェストを配置
└── services  ・・・ 負荷試験の対象となるサービスを配置
```

## 使い方

1. [manifests ディレクトリ](./manifests/README.md) を参考に Kubernetes に負荷試験に必要なリソースを構築する
2. [k6-operator による負荷試験の実施](./docs/03_k6-operator.md) を参考に負荷試験を実施する
