# コントリビューションガイド

M5Stack CoreMP135 IoT Portalへの貢献に興味を持っていただき、ありがとうございます！

詳細なコントリビューションガイドは、以下をご覧ください：

**📚 [完全版コントリビューションガイド](https://tinayla696.github.io/M5Stack_IoT_Portal/contributing/)**

---

## 🚀 クイックスタート

### Issue の作成

バグ報告や機能提案は、[GitHub Issues](https://github.com/tinayla696/M5Stack_IoT_Portal/issues)で受け付けています。

### Pull Request の作成

```bash
# 1. リポジトリをフォーク
# 2. ローカルにクローン
git clone https://github.com/YOUR_USERNAME/M5Stack_IoT_Portal.git
cd M5Stack_IoT_Portal

# 3. 依存関係のインストール
pip install -r requirements.txt

# 4. 作業用ブランチの作成
git checkout -b feature/your-feature-name

# 5. 変更を加える & ローカルでテスト
mkdocs serve

# 6. コミット & プッシュ
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name

# 7. GitHub上でPull Requestを作成
```

---

## 📋 ブランチ命名規則

| Prefix | 用途 | 例 |
|--------|------|-----|
| `feature/` | 新機能追加 | `feature/add-mqtt-example` |
| `fix/` | バグ修正 | `fix/broken-link` |
| `docs/` | ドキュメントのみの変更 | `docs/update-quickstart` |
| `chore/` | 雑務（設定変更等） | `chore/update-dependencies` |

---

## ⚠️ 重要な注意事項

- **`apps/` ディレクトリは直接編集禁止**: サブプロジェクトから自動同期されます
- **Pull Request は Squash and Merge**: コミット履歴を整理します
- **Conventional Commits に従う**: コミットメッセージは `feat:`, `fix:`, `docs:` などで開始

---

## 📞 お問い合わせ

質問やフィードバックは、以下でお願いします：

- [GitHub Discussions](https://github.com/tinayla696/M5Stack_IoT_Portal/discussions)
- [GitHub Issues](https://github.com/tinayla696/M5Stack_IoT_Portal/issues)

---

**詳細は [完全版コントリビューションガイド](https://tinayla696.github.io/M5Stack_IoT_Portal/contributing/) をご覧ください。**
