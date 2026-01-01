# CAN Gateway Application for M5Stack CoreMP135

![Go Version](https://img.shields.io/badge/Go-1.21+-00ADD8?style=flat&logo=go&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-M5Stack%20CoreMP135-orange?style=flat&logo=arduino&logoColor=white)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

M5Stack CoreMP135を使用したCANバス通信ゲートウェイアプリケーション。CANバスからのデータを受信し、処理・変換してクラウドやローカルネットワークに転送するIoTゲートウェイシステムです。

## 📋 概要

このプロジェクトは、産業用機器や車載システムで広く使用されているCANバス通信をIoTシステムに統合するためのゲートウェイアプリケーションです。M5Stack CoreMP135の強力な処理能力とGo言語の並行処理機能を活用し、高速で信頼性の高いデータ転送を実現します。

### 主な機能

- 🚀 **高速CAN通信**: CANバスからのリアルタイムデータ受信・処理
- 🔄 **プロトコル変換**: CAN → MQTT/HTTP/WebSocket
- 📊 **データフィルタリング**: 必要なデータのみを抽出・転送
- 🔧 **設定可能**: YAML/JSON形式の設定ファイルによる柔軟な設定
- 📡 **マルチプロトコル対応**: MQTT, HTTP REST API, WebSocket
- 🛡️ **エラーハンドリング**: 堅牢なエラー処理と自動リトライ機能
- 📝 **ログ管理**: 構造化ログによる詳細な動作記録

## 🏗️ 技術スタック

![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![M5Stack](https://img.shields.io/badge/M5Stack-FF6C37?style=for-the-badge&logo=arduino&logoColor=white)
![MQTT](https://img.shields.io/badge/MQTT-660066?style=for-the-badge&logo=mqtt&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

### 開発環境

- **言語**: Go 1.21+
- **ハードウェア**: M5Stack CoreMP135
- **OS**: Linux (Buildroot)
- **通信**: CAN Bus, MQTT, HTTP
- **ビルドツール**: Go Modules, Make

## 🚀 セットアップ

### 前提条件

- Go 1.21以上がインストールされていること
- M5Stack CoreMP135デバイス
- CANバスインターフェース設定済み

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/tinayla696/mp135_gateway_go.git
cd mp135_gateway_go

# 依存関係のインストール
go mod download

# ビルド
go build -o can_gateway ./src/main.go

# 実行
./can_gateway
```

### クロスコンパイル (M5Stack用)

```bash
# ARM64向けビルド
GOOS=linux GOARCH=arm64 go build -o can_gateway_arm64 ./src/main.go

# デバイスへ転送
scp can_gateway_arm64 root@<M5Stack_IP>:/usr/local/bin/can_gateway
```

## ⚙️ 設定

設定ファイル `config.yaml` をプロジェクトルートに配置してください。

```yaml
can:
  interface: "can0"
  baudrate: 500000

mqtt:
  broker: "tcp://localhost:1883"
  client_id: "can_gateway"
  topic: "can/data"

filters:
  - id: 0x123
  - id: 0x456
```

## 📖 使い方

### 基本的な起動

```bash
./can_gateway --config config.yaml
```

### オプション

```bash
./can_gateway --help
  -config string
        設定ファイルのパス (default "config.yaml")
  -log-level string
        ログレベル (debug, info, warn, error) (default "info")
  -version
        バージョン情報を表示
```

## 🏛️ アーキテクチャ

```mermaid
graph TD
    A[CAN Bus] --> B[CAN Reader<br/>goroutine]
    B --> C[Data Filter<br/>& Processor]
    C --> D[Protocol<br/>Converter]
    D --> E[MQTT Publisher]
    D --> F[HTTP REST API]
    D --> G[WebSocket Server]
    
    style A fill:#ff6b6b,stroke:#c92a2a,color:#fff
    style B fill:#4ecdc4,stroke:#099268,color:#fff
    style C fill:#45b7d1,stroke:#0c8599,color:#fff
    style D fill:#96ceb4,stroke:#5fa77f,color:#fff
    style E fill:#feca57,stroke:#ee9a00,color:#333
    style F fill:#feca57,stroke:#ee9a00,color:#333
    style G fill:#feca57,stroke:#ee9a00,color:#333
```

### データフロー

```mermaid
sequenceDiagram
    participant CAN as CAN Bus
    participant Reader as CAN Reader
    participant Filter as Data Filter
    participant Converter as Protocol Converter
    participant MQTT as MQTT Broker
    participant HTTP as HTTP Client
    
    CAN->>Reader: CANフレーム受信
    Reader->>Filter: 生データ転送
    Filter->>Filter: フィルタリング処理
    Filter->>Converter: 有効なデータのみ
    Converter->>Converter: JSON/Protocol変換
    
    par 並行配信
        Converter->>MQTT: Publish
        Converter->>HTTP: POST Request
    end
    
    MQTT-->>Converter: ACK
    HTTP-->>Converter: Response
```

## 🧪 テスト

```bash
# 全テスト実行
go test ./...

# カバレッジ付き
go test -cover ./...

# ベンチマーク
go test -bench=. ./...
```

## 📝 開発

### ブランチ戦略

| Prefix | 用途 | 例 |
| :--- | :--- | :--- |
| `feature/` | 新機能追加 | `feature/add-websocket` |
| `bugfix/` | バグ修正 | `bugfix/mqtt-reconnect` |
| `docs/` | ドキュメント更新 | `docs/update-readme` |

### コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 👥 作者

- **tinayla696** - [GitHub](https://github.com/tinayla696)

## 🙏 謝辞

- M5Stack CoreMP135の素晴らしいハードウェア
- Go言語コミュニティ
- CANバス通信に関する各種オープンソースライブラリ

## � サポート

問題が発生した場合やご質問がある場合は、[Issues](https://github.com/tinayla696/mp135_gateway_go/issues)ページでお知らせください。

---

Made with ❤️ for IoT and Industrial Applications