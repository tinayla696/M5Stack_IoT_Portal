# M5Stack CoreMP135 CAN Gateway Application

![C++](https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white)
![C](https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![CMake](https://img.shields.io/badge/CMake-064F8C?style=for-the-badge&logo=cmake&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

M5Stack CoreMP135を使用したCANバスゲートウェイアプリケーションのリポジトリです。  
CANバス経由でデータを収集し、IoTシステムとの連携を実現します。

## 📋 概要

このプロジェクトは、M5Stack CoreMP135デバイスを利用して、CANバスネットワークからデータを受信し、
処理・転送を行うゲートウェイアプリケーションです。産業用IoTシステムや車載ネットワークとの統合に最適です。

## 🚀 主な機能

- 📡 CANバス通信インターフェース
- 🔄 リアルタイムデータ処理
- 🌐 ネットワークゲートウェイ機能
- 📊 データログ記録
- ⚙️ 柔軟な設定管理

## 🛠️ 技術スタック

- **言語**: C/C++
- **プラットフォーム**: M5Stack CoreMP135 (Linux)
- **通信**: CAN Bus, TCP/IP, MQTT (予定)
- **ビルドシステム**: CMake
- **バージョン管理**: Git

## 📁 プロジェクト構成

```
mp135_gateway_cpp/
├── src/              # ソースコード
├── docs/             # ドキュメント
├── datas/            # データファイル
├── README.md         # プロジェクト概要
├── mkdocs.yml        # ドキュメント設定
└── requirements.txt  # Python依存関係 (ドキュメント生成用)
```

## 🔧 セットアップ

### 必要な環境

- M5Stack CoreMP135
- GCC/G++ コンパイラ
- CMake (3.10以降)
- CAN通信用のハードウェア/ドライバ

### ビルド手順

```bash
# リポジトリのクローン
git clone https://github.com/tinayla696/mp135_gateway_cpp.git
cd mp135_gateway_cpp

# ビルドディレクトリの作成
mkdir build && cd build

# CMakeの実行
cmake ..

# ビルド
make

# 実行
./can_gateway
```

## 📖 ドキュメント

詳細なドキュメントは `docs/` ディレクトリを参照してください。

```bash
# ドキュメントのビルド (MkDocs)
pip install -r requirements.txt
mkdocs serve
```

## 🤝 コントリビューション

プルリクエストを歓迎します！以下の手順でご協力ください：

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## � ライセンス

このプロジェクトのライセンスについては、リポジトリ管理者にお問い合わせください。

## 👥 作成者

- GitHub: [@tinayla696](https://github.com/tinayla696)

## 🔗 関連リンク

- [M5Stack 公式サイト](https://m5stack.com/)
- [M5Stack CoreMP135 製品ページ](https://docs.m5stack.com/en/core/CoreMP135)
- [CAN Bus プロトコル](https://en.wikipedia.org/wiki/CAN_bus)