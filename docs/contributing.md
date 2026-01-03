# コントリビューションガイド

M5Stack CoreMP135 IoT Portalへの貢献に興味を持っていただき、ありがとうございます！

## 🤝 貢献方法

### 1. Issue の作成

以下の場合は、まず Issue を作成してください：

- バグを発見した場合
- 新機能の提案
- ドキュメントの改善提案
- 質問や議論したいトピック

### 2. Pull Request の作成

#### 事前準備

```bash
# 1. リポジトリをフォーク
# GitHubのWebインターフェースで「Fork」ボタンをクリック

# 2. ローカルにクローン
git clone https://github.com/YOUR_USERNAME/M5Stack_IoT_Portal.git
cd M5Stack_IoT_Portal

# 3. 依存関係のインストール
pip install -r requirements.txt

# 4. ローカルで確認
mkdocs serve
```

#### ブランチ戦略

| Prefix | 用途 | 例 |
|--------|------|-----|
| `feature/` | 新機能追加 | `feature/add-mqtt-example` |
| `fix/` | バグ修正 | `fix/broken-link` |
| `docs/` | ドキュメントのみの変更 | `docs/update-quickstart` |
| `chore/` | 雑務（設定変更等） | `chore/update-dependencies` |

#### PRの作成手順

```bash
# 1. 作業用ブランチの作成
git checkout -b feature/your-feature-name

# 2. 変更を加える
# ファイルを編集...

# 3. ローカルでテスト
mkdocs serve
# http://127.0.0.1:8000 で確認

# 4. コミット
git add .
git commit -m "feat: add your feature description"

# 5. プッシュ
git push origin feature/your-feature-name

# 6. GitHub上でPull Requestを作成
```

#### PR作成時のチェックリスト

- [ ] ブランチ名が規約に従っている
- [ ] コミットメッセージが分かりやすい
- [ ] ローカルでビルドが成功する（`mkdocs build`）
- [ ] リンク切れがない
- [ ] 日本語の文章が自然
- [ ] 必要に応じて画像やスクリーンショットを追加

### 3. コミットメッセージ規約

Conventional Commits に従います：

```
<type>: <subject>

<body>

<footer>
```

#### Type の種類

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメントのみの変更
- `style`: コードの意味に影響しない変更（フォーマット等）
- `refactor`: リファクタリング
- `test`: テストの追加・修正
- `chore`: ビルドプロセスやツールの変更

#### 例

```
feat: add MQTT connection example

M5Stack CoreMP135でMQTTブローカーに接続する
サンプルコードを追加しました。

Closes #42
```

## 📝 ドキュメント作成ガイドライン

### Markdownスタイル

#### 見出し

```markdown
# H1: ページタイトル（1つのみ）
## H2: メインセクション
### H3: サブセクション
#### H4: 詳細項目
```

#### コードブロック

言語を指定してください：

```markdown
​```python
print("Hello, M5Stack!")
​```

​```cpp
Serial.println("Hello, M5Stack!");
​```
```

#### アドモニション（注意書き）

```markdown
!!! note "メモ"
    これは補足情報です。

!!! warning "警告"
    これは注意が必要な情報です。

!!! tip "ヒント"
    これは便利な情報です。

!!! danger "危険"
    これは重要な警告です。
```

#### タブ

```markdown
=== "Python"
    ​```python
    print("Hello")
    ​```

=== "C++"
    ​```cpp
    Serial.println("Hello");
    ​```
```

### ファイル配置

- **ポータル全体のドキュメント**: `docs/` 配下
- **サブプロジェクトのドキュメント**: `apps/[project_name]/docs/` 配下

### 画像の追加

```markdown
![説明テキスト](../assets/images/example.png)
```

画像は以下に配置：
- ポータル共通: `docs/assets/images/`
- サブプロジェクト: `apps/[project_name]/docs/assets/images/`

## 🧪 ローカルテスト

### MkDocsのビルド

```bash
# ローカルサーバー起動
mkdocs serve

# 本番用ビルド
mkdocs build --strict

# ビルド結果の確認
ls site/
```

### リンクチェック

```bash
# 外部ツールを使用（オプション）
pip install linkchecker
linkchecker http://127.0.0.1:8000
```

## ⚠️ 重要な注意事項

### `apps/` ディレクトリについて

- **直接編集禁止**: `apps/` 配下はサブプロジェクトから自動同期されます
- サブプロジェクトの変更は、それぞれのリポジトリで行ってください：
  - [mp135_gateway_cpp](https://github.com/tinayla696/mp135_gateway_cpp)
  - [mp135_gateway_go](https://github.com/tinayla696/mp135_gateway_go)

### マージ方法

- Pull Request は必ず **Squash and Merge** してください
- コミット履歴を整理することで、リバート時の管理が容易になります

## 🎨 スタイルガイド

### 日本語表記

- 「です・ます」調で統一
- 技術用語は適宜英語を併記（例: ゲートウェイ（Gateway））
- 半角スペースで単語を区切る（例: `M5Stack CoreMP135`）

### コードスタイル

- インデント: スペース2個または4個（言語による）
- 命名規則: 各言語の標準に従う
  - Python: `snake_case`
  - C++: `PascalCase` (クラス), `camelCase` (変数)
  - Go: `PascalCase` (公開), `camelCase` (非公開)

## 📞 質問やサポート

- [GitHub Discussions](https://github.com/tinayla696/M5Stack_IoT_Portal/discussions)
- [GitHub Issues](https://github.com/tinayla696/M5Stack_IoT_Portal/issues)

## 📄 ライセンス

本プロジェクトへの貢献は、MITライセンスの下で公開されます。

---

**Thank you for contributing to M5Stack CoreMP135 IoT Portal! 🎉**
