# 運用ガイド

## デプロイメント

### 初回デプロイ

#### 1. バイナリのビルド

```bash
# クロスコンパイル
GOOS=linux GOARCH=arm64 go build \
  -ldflags="-s -w" \
  -o bin/can_gateway_arm64 \
  ./cmd/gateway/main.go
```

#### 2. デバイスへの転送

```bash
# バイナリ転送
scp bin/can_gateway_arm64 root@<M5Stack_IP>:/usr/local/bin/can_gateway

# 設定ファイル転送
scp configs/config.yaml root@<M5Stack_IP>:/etc/can_gateway/
scp configs/filter_rules.json root@<M5Stack_IP>:/etc/can_gateway/

# 実行権限付与
ssh root@<M5Stack_IP> "chmod +x /usr/local/bin/can_gateway"
```

#### 3. systemdサービス登録

```bash
# サービスファイル作成
cat <<EOF | ssh root@<M5Stack_IP> "cat > /etc/systemd/system/can_gateway.service"
[Unit]
Description=CAN Gateway Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/usr/local/bin
ExecStart=/usr/local/bin/can_gateway -config /etc/can_gateway/config.yaml
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

# サービス有効化・起動
ssh root@<M5Stack_IP> "systemctl daemon-reload"
ssh root@<M5Stack_IP> "systemctl enable can_gateway"
ssh root@<M5Stack_IP> "systemctl start can_gateway"
```

### 更新デプロイ

```bash
# 新バイナリ転送
scp bin/can_gateway_arm64 root@<M5Stack_IP>:/usr/local/bin/can_gateway.new

# サービス停止
ssh root@<M5Stack_IP> "systemctl stop can_gateway"

# バイナリ入れ替え
ssh root@<M5Stack_IP> "mv /usr/local/bin/can_gateway.new /usr/local/bin/can_gateway"

# サービス再起動
ssh root@<M5Stack_IP> "systemctl start can_gateway"
```

## 監視

### ログ確認

#### journalctlでログ確認

```bash
# リアルタイムログ表示
ssh root@<M5Stack_IP> "journalctl -u can_gateway -f"

# エラーログのみ表示
ssh root@<M5Stack_IP> "journalctl -u can_gateway -p err"

# 過去1時間のログ
ssh root@<M5Stack_IP> "journalctl -u can_gateway --since '1 hour ago'"
```

#### ログファイル確認

```bash
# ログファイル確認
ssh root@<M5Stack_IP> "tail -f /var/log/can_gateway.log"

# エラー検索
ssh root@<M5Stack_IP> "grep ERROR /var/log/can_gateway.log"
```

### サービス状態確認

```bash
# サービス状態
ssh root@<M5Stack_IP> "systemctl status can_gateway"

# プロセス確認
ssh root@<M5Stack_IP> "ps aux | grep can_gateway"

# リソース使用状況
ssh root@<M5Stack_IP> "top -b -n 1 | grep can_gateway"
```

### ヘルスチェック

```bash
# ヘルスチェックAPI
curl http://<M5Stack_IP>:8080/health

# メトリクス確認
curl http://<M5Stack_IP>:8080/metrics
```

## トラブルシューティング

### 起動しない場合

#### 設定ファイルの確認

```bash
# 設定ファイルの妥当性チェック
ssh root@<M5Stack_IP> "cat /etc/can_gateway/config.yaml"

# YAML構文チェック
ssh root@<M5Stack_IP> "can_gateway -config /etc/can_gateway/config.yaml -validate"
```

#### CANインターフェースの確認

```bash
# CANインターフェース確認
ssh root@<M5Stack_IP> "ip link show can0"

# CANインターフェース起動
ssh root@<M5Stack_IP> "ip link set can0 up type can bitrate 500000"

# CAN通信テスト
ssh root@<M5Stack_IP> "candump can0"
```

### MQTT接続エラー

#### ネットワーク疎通確認

```bash
# Broker接続確認
ssh root@<M5Stack_IP> "ping -c 3 mqtt.example.com"

# ポート確認
ssh root@<M5Stack_IP> "nc -zv mqtt.example.com 8883"
```

#### 認証情報確認

```bash
# 環境変数確認
ssh root@<M5Stack_IP> "echo \$MQTT_PASSWORD"

# mosquitto_pubでテスト
ssh root@<M5Stack_IP> "mosquitto_pub -h mqtt.example.com -p 8883 -t test -m hello"
```

### メモリ不足

#### メモリ使用状況確認

```bash
# メモリ使用量
ssh root@<M5Stack_IP> "free -m"

# プロセスメモリ使用量
ssh root@<M5Stack_IP> "ps aux --sort=-%mem | head"
```

#### 対処方法

- 不要なプロセスの停止
- ログローテーション設定の見直し
- フィルタリングルールの最適化

### CAN通信エラー

#### エラーカウンタ確認

```bash
# CANインターフェース統計
ssh root@<M5Stack_IP> "ip -s link show can0"

# エラーログ確認
ssh root@<M5Stack_IP> "journalctl -u can_gateway | grep 'CAN error'"
```

## バックアップ

### 設定ファイルバックアップ

```bash
# バックアップ作成
ssh root@<M5Stack_IP> "tar -czf /tmp/can_gateway_backup_$(date +%Y%m%d).tar.gz \
  /etc/can_gateway/ \
  /var/log/can_gateway.log"

# ローカルにダウンロード
scp root@<M5Stack_IP>:/tmp/can_gateway_backup_*.tar.gz ./backups/
```

### リストア

```bash
# バックアップ解凍
scp ./backups/can_gateway_backup_20260103.tar.gz root@<M5Stack_IP>:/tmp/

# リストア
ssh root@<M5Stack_IP> "tar -xzf /tmp/can_gateway_backup_20260103.tar.gz -C /"

# サービス再起動
ssh root@<M5Stack_IP> "systemctl restart can_gateway"
```

## セキュリティ

### ファイアウォール設定

```bash
# ポート8080を開放（WebSocket用）
ssh root@<M5Stack_IP> "iptables -A INPUT -p tcp --dport 8080 -j ACCEPT"

# 特定IPのみ許可
ssh root@<M5Stack_IP> "iptables -A INPUT -p tcp -s 192.168.1.0/24 --dport 8080 -j ACCEPT"
```

### パスワード管理

```bash
# 環境変数で機密情報を管理
ssh root@<M5Stack_IP> "echo 'export MQTT_PASSWORD=your_secure_password' >> /etc/profile.d/can_gateway.sh"
```

## パフォーマンスチューニング

### CPU使用率が高い場合

- Worker goroutineの数を調整
- フィルタリングルールの見直し
- バッチ送信サイズの最適化

### ネットワーク遅延が大きい場合

- QoSレベルの調整（MQTT）
- HTTPタイムアウト値の調整
- 圧縮の有効化

## 定期メンテナンス

### ログローテーション

```bash
# logrotate設定
cat <<EOF | ssh root@<M5Stack_IP> "cat > /etc/logrotate.d/can_gateway"
/var/log/can_gateway.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 0640 root root
    postrotate
        systemctl reload can_gateway
    endscript
}
EOF
```

### システムアップデート

```bash
# パッケージ更新
ssh root@<M5Stack_IP> "apt update && apt upgrade -y"

# 再起動
ssh root@<M5Stack_IP> "reboot"
```
