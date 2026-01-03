# 開発ガイド

## 開発環境セットアップ

### 必須ツール

- **Go**: 1.21以上
- **Git**: バージョン管理
- **Make**: ビルド自動化
- **Docker**: コンテナ環境（オプション）

### インストール手順

#### Go言語のインストール

```bash
# Ubuntu/Debian
wget https://go.dev/dl/go1.21.0.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc
```

#### 開発ツールのインストール

```bash
# golangci-lint (Linter)
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest

# mockery (Mockジェネレータ)
go install github.com/vektra/mockery/v2@latest

# gosec (セキュリティチェック)
go install github.com/securego/gosec/v2/cmd/gosec@latest
```

### プロジェクトのクローン

```bash
git clone https://github.com/tinayla696/mp135_gateway_go.git
cd mp135_gateway_go

# 依存関係のインストール
go mod download
```

## プロジェクト構造

```
mp135_gateway_go/
├── cmd/
│   └── gateway/          # エントリーポイント
│       └── main.go
├── internal/             # 内部パッケージ
│   ├── can/              # CAN通信
│   ├── filter/           # フィルタリング
│   ├── processor/        # データ処理
│   ├── protocol/         # プロトコル実装
│   ├── config/           # 設定管理
│   └── logger/           # ログ
├── pkg/                  # 外部公開パッケージ
│   └── models/           # データモデル
├── configs/              # 設定ファイル
├── tests/                # テストコード
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── scripts/              # スクリプト
├── docs/                 # ドキュメント
├── go.mod
├── go.sum
├── Makefile
└── README.md
```

## コーディング規約

### パッケージ構成

- **cmd/**: アプリケーションエントリーポイント
- **internal/**: 内部実装（外部から参照不可）
- **pkg/**: 外部公開可能なパッケージ

### 命名規則

#### ファイル名
- 小文字 + アンダースコア: `can_reader.go`
- テストファイル: `can_reader_test.go`

#### 変数・関数名
- キャメルケース: `canFrameBuffer`
- エクスポート: 大文字開始 `CANReader`
- プライベート: 小文字開始 `parseFrame`

#### 定数
- 大文字 + アンダースコア: `MAX_BUFFER_SIZE`

### コメント

```go
// Package can provides CAN bus communication functionality.
package can

// CANReader reads CAN frames from SocketCAN interface.
type CANReader struct {
    // interfaceName is the CAN interface name (e.g., "can0")
    interfaceName string
    // frameChannel is the channel for sending received frames
    frameChannel chan CANFrame
}

// Start begins reading CAN frames in a separate goroutine.
// It returns an error if the CAN interface cannot be opened.
func (r *CANReader) Start(ctx context.Context) error {
    // Implementation
}
```

### エラーハンドリング

```go
// Good: エラーをラップして返す
if err := r.openInterface(); err != nil {
    return fmt.Errorf("failed to open CAN interface: %w", err)
}

// Bad: エラーを無視
_ = r.openInterface()
```

## テスト

### 単体テスト

```bash
# 全テスト実行
go test ./...

# カバレッジ付き
go test -cover ./...

# カバレッジレポート生成
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage.html
```

### テストの書き方

```go
func TestCANReader_Start(t *testing.T) {
    tests := []struct {
        name    string
        setup   func() *CANReader
        wantErr bool
    }{
        {
            name: "正常起動",
            setup: func() *CANReader {
                return &CANReader{
                    interfaceName: "vcan0",
                }
            },
            wantErr: false,
        },
        {
            name: "無効なインターフェース",
            setup: func() *CANReader {
                return &CANReader{
                    interfaceName: "invalid",
                }
            },
            wantErr: true,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            r := tt.setup()
            ctx := context.Background()
            err := r.Start(ctx)
            if (err != nil) != tt.wantErr {
                t.Errorf("Start() error = %v, wantErr %v", err, tt.wantErr)
            }
        })
    }
}
```

### モックの使用

```go
//go:generate mockery --name=Publisher --output=mocks

type Publisher interface {
    Publish(data []byte) error
}

// テストでモック使用
func TestRouter_Route(t *testing.T) {
    mockPub := new(mocks.Publisher)
    mockPub.On("Publish", mock.Anything).Return(nil)
    
    router := NewRouter()
    router.RegisterPublisher("mqtt", mockPub)
    
    err := router.Route([]byte("test"), Metadata{})
    assert.NoError(t, err)
    mockPub.AssertExpectations(t)
}
```

## ビルド

### Makefile使用

```bash
# ビルド
make build

# クロスコンパイル
make build-arm64

# テスト
make test

# Lint
make lint

# 全て実行
make all
```

### Makefile例

```makefile
.PHONY: all build test lint clean

BINARY_NAME=can_gateway
BUILD_DIR=bin

all: lint test build

build:
	go build -o $(BUILD_DIR)/$(BINARY_NAME) ./cmd/gateway

build-arm64:
	GOOS=linux GOARCH=arm64 go build \
		-ldflags="-s -w" \
		-o $(BUILD_DIR)/$(BINARY_NAME)_arm64 \
		./cmd/gateway

test:
	go test -v -cover ./...

lint:
	golangci-lint run ./...

clean:
	rm -rf $(BUILD_DIR)
```

## デバッグ

### ローカルデバッグ

#### 仮想CANインターフェース作成

```bash
# vcanモジュールロード
sudo modprobe vcan

# 仮想CANインターフェース作成
sudo ip link add dev vcan0 type vcan
sudo ip link set up vcan0

# CAN送信テスト
cansend vcan0 123#DEADBEEF
```

#### VSCode設定

`.vscode/launch.json`:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Gateway",
            "type": "go",
            "request": "launch",
            "mode": "debug",
            "program": "${workspaceFolder}/cmd/gateway",
            "args": [
                "-config",
                "${workspaceFolder}/configs/config.yaml"
            ],
            "env": {
                "MQTT_PASSWORD": "test_password"
            }
        }
    ]
}
```

### リモートデバッグ

#### Delveインストール

```bash
go install github.com/go-delve/delve/cmd/dlv@latest
```

#### リモートデバッグ起動

```bash
# M5Stack上でdelve起動
ssh root@<M5Stack_IP> "dlv exec --headless --listen=:2345 --api-version=2 /usr/local/bin/can_gateway"

# ローカルから接続
dlv connect <M5Stack_IP>:2345
```

## CI/CD

### GitHub Actions設定

`.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Go
        uses: actions/setup-go@v4
        with:
          go-version: '1.21'
      
      - name: Test
        run: go test -v -cover ./...
      
      - name: Lint
        uses: golangci/golangci-lint-action@v3
        with:
          version: latest

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Go
        uses: actions/setup-go@v4
        with:
          go-version: '1.21'
      
      - name: Build
        run: |
          GOOS=linux GOARCH=arm64 go build \
            -ldflags="-s -w" \
            -o bin/can_gateway_arm64 \
            ./cmd/gateway
      
      - name: Upload artifact
        uses: actions/upload-artifact@v3
        with:
          name: can_gateway_arm64
          path: bin/can_gateway_arm64
```

## コントリビューション

### ブランチ戦略

- `main`: 本番環境
- `develop`: 開発環境
- `feature/*`: 新機能開発
- `bugfix/*`: バグ修正
- `hotfix/*`: 緊急修正

### プルリクエストプロセス

1. Issueを作成（機能要望・バグ報告）
2. ブランチ作成 (`feature/xxx`, `bugfix/xxx`)
3. 実装・テスト
4. コミット（コミットメッセージ規約に従う）
5. プルリクエスト作成
6. コードレビュー
7. マージ

### コミットメッセージ規約

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type**:
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `style`: コードスタイル
- `refactor`: リファクタリング
- `test`: テスト追加
- `chore`: その他

**例**:
```
feat(can): implement CAN frame filtering

- Add ID-based filtering
- Add data-based filtering
- Add filter rule configuration

Closes #123
```

## リリースプロセス

1. バージョンタグ作成
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

2. GitHub Releaseページで詳細記載

3. バイナリのビルド・アップロード

4. デプロイ実行
