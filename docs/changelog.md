# 変更履歴（Changelog）

このページでは、M5Stack CoreMP135 IoT Portalの主要な変更履歴を記録しています。

---

## [1.0.0] - 2026-01-03

### 🎉 初回リリース

M5Stack CoreMP135を活用したIoTシステム開発のポータルサイトを公開しました。

### ✨ 追加機能

#### ドキュメント

- **README.md**: M5Stack CoreMP135に特化したプロジェクト説明
  - プロジェクトの目的、構成、クイックスタートガイド
  - M5Stack CoreMP135の仕様とユースケースの詳細
  - バッジ（Docs、License）を追加

- **ポータルサイト（MkDocs）**:
  - トップページ（`docs/index.md`）: M5Stack CoreMP135の詳細な紹介
  - プロジェクト一覧ページ（`docs/projects.md`）
  - リソースページ（`docs/resources.md`）: 公式ドキュメント、コミュニティリンク集

- **コントリビューションガイド（`CONTRIBUTING.md`）**:
  - Issue作成、PR作成の詳細手順
  - ブランチ戦略、コミットメッセージ規約
  - ドキュメント作成ガイドライン

#### サイト機能

- **Material for MkDocs テーマ**:
  - ダークモード切り替え
  - ナビゲーションタブ
  - コードのコピーボタン
  - 検索機能の強化（日本語・英語対応）
  
- **Markdown拡張機能**:
  - Mermaid.js 図表対応
  - タブ表示
  - アドモニション（注意書きボックス）
  - シンタックスハイライト（Python、C++、Go対応）

- **カスタムスタイル**:
  - M5Stack テーマカラーの定義
  - UIコンポーネントのカスタマイズ

#### 自動化

- **GitHub Actions ワークフロー**:
  - main ブランチへのプッシュで自動的に GitHub Pages にデプロイ
  - Python 3.11 を使用
  - pip キャッシュ機能でビルド時間を短縮

#### サブプロジェクト

- **MP135 Gateway (C++)**: C++による高性能IoTゲートウェイ
- **MP135 Gateway (Go)**: Goによるスケーラブルなゲートウェイ

### 📦 依存関係

- mkdocs >= 1.6.0
- mkdocs-material >= 9.5.0
- mkdocs-mermaid2-plugin >= 1.1.1
- mkdocs-glightbox >= 0.4.0
- pymdown-extensions >= 10.8
- Pygments >= 2.17.0

### 📂 ファイル構成

```
M5Stack_IoT_Portal/
├── README.md
├── CONTRIBUTING.md
├── mkdocs.yml
├── requirements.txt
├── docs/
│   ├── index.md
│   ├── projects.md
│   ├── resources.md
│   ├── contributing.md
│   ├── changelog.md
│   └── stylesheets/
│       └── extra.css
├── .github/
│   └── workflows/
│       └── deploy-mkdocs.yml
└── apps/
    ├── mp135_gateway_cpp/
    └── mp135_gateway_go/
```

---

## 今後の予定

### 計画中の機能

- [ ] Python版データロガープロジェクトの追加
- [ ] Rust版エッジAI推論プロジェクトの追加
- [ ] 産業用プロトコル対応（Modbus RTU/TCP、OPC UA）
- [ ] チュートリアルページの追加
- [ ] サンプルコード集の拡充
- [ ] 多言語対応（英語版ドキュメント）

### 改善予定

- [ ] ロゴとファビコンの追加
- [ ] API リファレンスの自動生成
- [ ] ビデオチュートリアルの埋め込み
- [ ] コミュニティフォーラムの統合

---

## フォーマット説明

このchangelogは[Keep a Changelog](https://keepachangelog.com/ja/1.0.0/)の形式に従っています。

### バージョン番号

[セマンティックバージョニング](https://semver.org/lang/ja/)を採用：

- **Major (X.0.0)**: 互換性のない大きな変更
- **Minor (0.X.0)**: 後方互換性のある機能追加
- **Patch (0.0.X)**: 後方互換性のあるバグ修正

### 変更タイプ

- **Added**: 新機能
- **Changed**: 既存機能の変更
- **Deprecated**: 非推奨化された機能
- **Removed**: 削除された機能
- **Fixed**: バグ修正
- **Security**: セキュリティ修正

---

## 関連リンク

- [GitHub リポジトリ](https://github.com/tinayla696/M5Stack_IoT_Portal)
- [Issue トラッカー](https://github.com/tinayla696/M5Stack_IoT_Portal/issues)
- [コントリビューションガイド](contributing.md)
