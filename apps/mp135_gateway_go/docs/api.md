# API仕様

## 概要

CAN Gatewayアプリケーションが提供するREST API、WebSocket API、および外部システムとの通信仕様を定義します。

## REST API

### ヘルスチェック

ゲートウェイの稼働状態を確認します。

**エンドポイント**
```
GET /health
```

**レスポンス**
```json
{
  "status": "healthy",
  "uptime": 3600,
  "version": "1.0.0",
  "components": {
    "can_reader": "ok",
    "mqtt_client": "ok",
    "http_client": "ok"
  },
  "timestamp": "2026-01-03T10:30:45Z"
}
```

### メトリクス取得

システムメトリクスを取得します。

**エンドポイント**
```
GET /metrics
```

**レスポンス例**
```json
{
  "can": {
    "frames_received": 125000,
    "frames_filtered": 5000,
    "errors": 10
  },
  "mqtt": {
    "published": 120000,
    "errors": 5,
    "reconnects": 2
  },
  "http": {
    "posted": 120000,
    "errors": 3
  },
  "performance": {
    "processing_latency_ms": 5.2,
    "cpu_usage_percent": 45.3,
    "memory_usage_mb": 180
  }
}
```

### 設定取得・更新

**設定取得**
```
GET /config
```

**設定更新**
```
PUT /config
Content-Type: application/json

{
  "mqtt": {
    "qos": 2
  },
  "logging": {
    "level": "debug"
  }
}
```

## WebSocket API

### リアルタイムデータストリーム

**接続エンドポイント**
```
ws://gateway-ip:8080/ws
```

**メッセージ形式**
```json
{
  "type": "can_data",
  "timestamp": "2026-01-03T10:30:45.123Z",
  "can_id": "0x0C0",
  "data": "1A2B3C4D5E6F7890",
  "parsed": {
    "rpm": 2500,
    "temperature": 85.5
  }
}
```

## MQTT トピック仕様

### データPublish

**トピック構造**
```
{topic_prefix}/{device_id}/can/{can_id}
```

**例**
```
vehicle/can/gateway-001/can/0x0C0
```

**ペイロード (JSON)**
```json
{
  "timestamp": "2026-01-03T10:30:45.123Z",
  "can_id": "0x0C0",
  "data": "1A2B3C4D5E6F7890",
  "dlc": 8,
  "parsed": {
    "rpm": 2500
  }
}
```

## HTTP POST エンドポイント

### データ送信先API

**送信先URL** (設定による)
```
POST https://api.example.com/v1/can/data
```

**リクエストヘッダー**
```
Content-Type: application/json
Authorization: Bearer {token}
```

**リクエストボディ**
```json
{
  "device_id": "gateway-001",
  "timestamp": "2026-01-03T10:30:45.123Z",
  "frames": [
    {
      "can_id": "0x0C0",
      "data": "1A2B3C4D5E6F7890",
      "parsed": {
        "rpm": 2500
      }
    }
  ]
}
```

## エラーレスポンス

### 標準エラー形式

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid CAN ID format",
    "details": "CAN ID must be in hex format (0x000-0x7FF)",
    "timestamp": "2026-01-03T10:30:45Z"
  }
}
```

### エラーコード一覧

| コード | HTTPステータス | 説明 |
|-------|--------------|------|
| `INVALID_REQUEST` | 400 | リクエストパラメータが不正 |
| `UNAUTHORIZED` | 401 | 認証失敗 |
| `NOT_FOUND` | 404 | リソースが見つからない |
| `INTERNAL_ERROR` | 500 | 内部エラー |
| `SERVICE_UNAVAILABLE` | 503 | サービス利用不可 |

## 認証

### Bearer Token認証

HTTPリクエストには`Authorization`ヘッダーにBearer Tokenを含めます。

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### MQTT認証

MQTT接続時はusername/passwordによる認証を行います。

```yaml
mqtt:
  username: "gateway"
  password: "${MQTT_PASSWORD}"
```

## レート制限

| エンドポイント | 制限 |
|--------------|-----|
| `/health` | 100 req/min |
| `/metrics` | 60 req/min |
| `/config` | 10 req/min |
| WebSocket | 1000 msg/sec |
