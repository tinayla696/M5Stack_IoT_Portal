# [Project Name] Portal Repository

本リポジトリは、プロジェクト全体のドキュメントを集約し、統合ポータルサイトとして公開・管理するための親リポジトリです。
**Docs as Code** の原則に基づき、アプリケーションリポジトリ（子）からの更新を自動で取り込みます。

## ⚠️ 重要: 運用ルール
* [cite_start]**直接編集の禁止:** `apps/` ディレクトリ配下は自動同期されるため、本リポジトリで直接編集・コミットしないでください [cite: 565]。
* [cite_start]**マージ戦略:** Pull Request は必ず **Squash and Merge** してください [cite: 543]。
* [cite_start]**権限:** `main` ブランチへの直接 Push は禁止されています [cite: 452]。

## 🚀 プロジェクト立ち上げ手順 (管理者向け)

### 1. リポジトリ作成
このテンプレート (`temp_knowledge_portal`) から新規リポジトリを作成してください。

### 2. Secrets設定
[cite_start]`Settings` > `Secrets and variables` > `Actions` に以下を登録してください [cite: 474]。
* **Name:** `PROJECT_REPO_PAT`
* **Value:** 管理者の Personal Access Token (Repo権限付き)

### 3. 子リポジトリの連携 (Subtree登録)
[cite_start]ローカル環境で以下のコマンドを実行し、子リポジトリを登録します [cite: 480-483]。

```bash
# 1. リモートの追加
git remote add [アプリ名] [子リポジトリのURL]

# 2. Subtreeの追加 (初回のみ)
git subtree add --prefix=apps/[アプリ名] [アプリ名] main --squash

# 3. Push
git push origin main
```

### 4. メニュー更新

`mkdocs.yml` の `nav:` セクションに、追加したアプリへのリンクを追記してください。

## 📚 関連リンク

- [統合運用ガイドライン]()
- [プロジェクトボード]()