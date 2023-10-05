# k6-operator-playground

- Load test simulation using k6-operator.

## 使用ツール

- マニフェスト管理

  - Kustomize<br />
    <img src="https://github.com/GotoRen/k6-operator-playground/assets/63791288/fbd77eb1-da77-40ce-bf4d-ba8c5fdb1f38" alt="Kustomize" width="80">

- モニタリング

  - kube-prometheus-stack<br />
    <img src="https://github.com/GotoRen/k6-operator-playground/assets/63791288/5b7a359f-f450-48bc-9024-6c5e1f33da17" alt="kube-prometheus-stack" width="80">

- 負荷試験
  - k6-operator<br />
    <img src="https://github.com/GotoRen/k6-operator-playground/assets/63791288/2d1f5906-ae71-4310-ad68-482e7d991783" alt="k6-operator" width="80">

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

## 負荷試験アーキテクチャ

![k6-operator-architecture](https://github.com/GotoRen/k6-operator-playground/assets/63791288/8c65d565-b920-4b0b-8a95-797267e82a41)

- **負荷試験クラスタ（このリポジトリ）**
  - 負荷試験を実行する側のクラスタ
  - 負荷試験レポートは Prometheus または InfluxDB に流す（二経路準備しておく）
    - Prometheus：大規模負荷試験においてより高度な耐久性を得られる
    - InfluxDB：シンプルな構成で軽い負荷試験が容易
- **ターゲットクラスタ（別途準備）**
  - 負荷試験を受ける側のクラスタ
  - LB（基本的には L7SLB）に向けて実行する
    - パブリッククラウド：事前に暖気申請等を行なっておく
    - プライベートクラウド（MetalLB 等のベアメタル）：パケット分散率及びおよび負荷状況に合わせて LB 専用のインスタンスを準備する

## 使い方

1. [manifests ディレクトリ](./manifests/README.md) を参考に Kubernetes に負荷試験に必要なリソースを構築する
2. [k6-operator による負荷試験の実施](./docs/03_k6-operator.md) を参考に負荷試験を実施する
