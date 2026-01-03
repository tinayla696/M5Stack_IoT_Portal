# M5Stack CoreMP135 IoT Portal

[![MkDocs](https://img.shields.io/badge/docs-MkDocs-blue)](https://tinayla696.github.io/M5Stack_IoT_Portal/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

M5Stack CoreMP135を活用した様々なIoTシステム開発プロジェクトの統合ポータルリポジトリです。
複数のサブプロジェクトを集約し、技術ドキュメント・実装例・ナレッジを一元管理します。

## 🎯 プロジェクト概要

本リポジトリは、M5Stack CoreMP135（STM32MP135搭載）を用いたIoTゲートウェイ、センサーネットワーク、産業用システムなど、多様なユースケースに対応したシステム開発のナレッジベースです。

**Docs as Code** の原則に基づき、各サブプロジェクトからのドキュメント更新を自動で取り込み、MkDocsによるポータルサイトとして公開しています。

### 🔧 M5Stack CoreMP135の特徴

- **CPU**: STM32MP135 (Cortex-A7 1GHz + Cortex-M4 209MHz)
- **メモリ**: 512MB DDR3
- **OS**: Linux (Buildroot/Yocto)
- **接続**: Wi-Fi, Ethernet, USB, GPIO, I2C, SPI
- **用途**: IoTゲートウェイ、エッジコンピューティング、産業用制御

## 📁 プロジェクト構成

### サブプロジェクト一覧

| プロジェクト | 言語 | 説明 |
|------------|------|------|
| **mp135_gateway_cpp** | C++ | M5Stack CoreMP135を使用したIoTゲートウェイ（C++実装） |
| **mp135_gateway_go** | Go | M5Stack CoreMP135を使用したIoTゲートウェイ（Go実装） |

各サブプロジェクトの詳細は、`apps/` ディレクトリ配下のREADME、または[ポータルサイト](https://tinayla696.github.io/M5Stack_IoT_Portal/)をご覧ください。

## 🚀 クイックスタート

### ポータルサイトの閲覧

公開ドキュメントサイト: [https://tinayla696.github.io/M5Stack_IoT_Portal/](https://tinayla696.github.io/M5Stack_IoT_Portal/)

### ローカルでのドキュメントビルド

```bash
# 依存関係のインストール
pip install -r requirements.txt

# ローカルサーバー起動
mkdocs serve

# ブラウザで http://127.0.0.1:8000 にアクセス
```

### サブプロジェクトの利用

各サブプロジェクトの詳細な手順は、それぞれのREADMEを参照してください。

```bash
# 例: C++版ゲートウェイプロジェクト
cd apps/mp135_gateway_cpp
cat README.md
```

## 🛠 開発ガイドライン

### ⚠️ 重要: 運用ルール

- **直接編集の禁止**: `apps/` ディレクトリ配下は各サブプロジェクトから自動同期されるため、本リポジトリで直接編集・コミットしないでください。
- **マージ戦略**: Pull Request は必ず **Squash and Merge** してください。
- **権限**: `main` ブランチへの直接 Push は禁止されています。

### 新規サブプロジェクトの追加手順（管理者向け）

#### 1. Secrets設定

`Settings` > `Secrets and variables` > `Actions` に以下を登録：

- **Name**: `PROJECT_REPO_PAT`
- **Value**: 管理者の Personal Access Token (Repo権限付き)

#### 2. サブリポジトリの連携（Git Subtree）

```bash
# 1. リモートの追加
git remote add [アプリ名] [サブリポジトリのURL]

# 2. Subtreeの追加（初回のみ）
git subtree add --prefix=apps/[アプリ名] [アプリ名] main --squash

# 3. Push
git push origin main
```

#### 3. MkDocsメニュー更新

`mkdocs.yml` の `nav:` セクションに、追加したアプリへのリンクを追記してください。

```yaml
nav:
  - Home: index.md
  - MP135 Gateway (C++): apps/mp135_gateway_cpp/docs/index.md
  - MP135 Gateway (Go): apps/mp135_gateway_go/docs/index.md
  - 新規プロジェクト: apps/[アプリ名]/docs/index.md  # ← 追加
```

#### 4. GitHub Actionsによる自動デプロイ

main ブランチへのマージで、自動的に GitHub Pages へデプロイされます。

## 📚 ドキュメント構成

```
docs/
├── index.md                    # ポータルトップページ
└── ...

apps/
├── mp135_gateway_cpp/          # C++版ゲートウェイ
│   ├── docs/
│   │   └── index.md
│   └── src/
├── mp135_gateway_go/           # Go版ゲートウェイ
│   ├── docs/
│   │   └── index.md
│   └── src/
└── ...
```

## 🤝 コントリビューション

本プロジェクトへの貢献を歓迎します！

### コントリビュート方法

1. **Issue作成**: バグ報告や機能提案は Issue でご連絡ください
2. **サブプロジェクト改善**: 各 `apps/` 配下のサブリポジトリで PR を作成
3. **ドキュメント改善**: ポータルサイトのドキュメントは本リポジトリの `docs/` で PR を作成

詳細は以下をご覧ください：
- [コントリビューションガイド](CONTRIBUTING.md)
- [コントリビューションガイド（Web版）](https://tinayla696.github.io/M5Stack_IoT_Portal/contributing/)
- [統合運用ガイドライン](assets/GitHubナレッジ共有型プロジェクト_統合運用ガイドライン.pdf)

## 📖 関連リンク

- [M5Stack CoreMP135 公式ドキュメント](https://docs.m5stack.com/en/core/CoreMP135)
- [ポータルサイト](https://tinayla696.github.io/M5Stack_IoT_Portal/)
- [コントリビューションガイド](CONTRIBUTING.md)
- [変更履歴](https://tinayla696.github.io/M5Stack_IoT_Portal/changelog/)
- [統合運用ガイドライン](assets/GitHubナレッジ共有型プロジェクト_統合運用ガイドライン.pdf)

## 📄 ライセンス

MIT License

---

**Powered by M5Stack CoreMP135 | Built with MkDocs Material**