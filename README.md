# [App Name] Application Repository

本リポジトリは、アプリケーションのソースコードおよび詳細仕様書を管理する子リポジトリです。
親リポジトリ (Portal) と連携し、ドキュメントの更新は自動的にポータルサイトへ反映されます。

## 🏁 セットアップ手順 (初回のみ)

### 1. ワークフロー設定
`.github/workflows/notify_portal.yml` を開き、以下の箇所を修正してコミットしてください [cite: 580]。
* `repository`: 親リポジトリ名 (例: `org/project_portal`)
* `app_name`: アプリ名 (例: `sales_app`)

### 2. Secrets設定
`Settings` > `Secrets and variables` > `Actions` に以下を登録してください [cite: 474]。
* **Name:** `PROJECT_REPO_PAT`
* **Value:** 管理者の Personal Access Token (Repo権限付き)

## 🛠 開発ルール (Docs as Code)

### 1. ブランチ命名規則 [cite: 511]
| Prefix | 用途 | 例 |
| :--- | :--- | :--- |
| `feature/` | 新機能 (Minor Update) | `feature/login` |
| `bugfix/` | バグ修正 (Patch Update) | `bugfix/header` |
| `docs/` | ドキュメントのみ | `docs/manual` |

### 2. 実装・PRルール
* **ドキュメント同期:** コード修正時は、必ず同じPR内で `docs/` 配下も修正してください [cite: 526]。
* **PR記述:** Description に必ず `Closes #Issue番号` を記述してください [cite: 532]。
* **マージ:** **Squash and Merge** が必須です [cite: 543]。

## 📦 リリース
PRが `main` にマージされると、**自動的にタグが付与され**、親リポジトリへ同期・デプロイされます。手動でのタグ作成は禁止です 。