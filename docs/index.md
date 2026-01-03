# M5Stack CoreMP135 IoT Portal へようこそ 🚀

M5Stack CoreMP135を活用した様々なIoTシステム開発プロジェクトの統合ポータルサイトです。

## 🎯 このポータルについて

本ポータルは、**M5Stack CoreMP135**（STM32MP135搭載のLinux対応開発ボード）を用いた、IoTゲートウェイ、エッジコンピューティング、産業用制御システムなど、多様なユースケースのナレッジベースです。

各プロジェクトの技術ドキュメント、実装例、開発ガイドを一元管理し、開発者コミュニティでの知識共有を促進します。

---

## 🔧 M5Stack CoreMP135 について

M5Stack CoreMP135は、産業用途に対応した高性能Linux対応IoTデバイスです。

### 主な仕様

| 項目 | 仕様 |
|------|------|
| **CPU** | STM32MP135FAF6 |
| **メインプロセッサ** | Cortex-A7 @ 1GHz |
| **コプロセッサ** | Cortex-M4 @ 209MHz |
| **メモリ** | 512MB DDR3 |
| **OS** | Linux (Buildroot / Yocto) |
| **ディスプレイ** | 2.0インチ 320x240 IPS LCD |
| **接続** | Wi-Fi 2.4GHz, Ethernet 10/100M, USB 2.0 |
| **拡張** | GPIO, I2C, SPI, UART, RS485 |
| **電源** | USB Type-C, 5V/1A |

### 主なユースケース

- 🌐 **IoTゲートウェイ**: センサーネットワークとクラウドの橋渡し
- 🏭 **産業用制御**: PLCとの連携、設備監視
- 📊 **エッジコンピューティング**: ローカルでのデータ処理・AI推論
- 🔌 **プロトコル変換**: Modbus, MQTT, HTTP等の変換ハブ
- 📡 **データロガー**: 高速・高信頼性データ収集

---

## 📂 プロジェクト一覧

### 現在公開中のプロジェクト

=== "MP135 Gateway (C++)"

    **C++による高性能IoTゲートウェイ実装**

    - 🚀 低レベル最適化による高速処理
    - 🔌 各種センサー・プロトコル対応
    - 📊 リアルタイムデータ処理
    
    [プロジェクトを見る →](https://github.com/tinayla696/mp135_gateway_cpp)

=== "MP135 Gateway (Go)"

    **Goによるスケーラブルなゲートウェイ実装**

    - ⚡ 並行処理による高スループット
    - 🛠️ シンプルな保守性
    - 🌐 クラウドネイティブ対応
    
    [プロジェクトを見る →](https://github.com/tinayla696/mp135_gateway_go)

---

## 🚀 クイックスタート

### 1. ハードウェアセットアップ

```bash
# M5Stack CoreMP135をUSBで接続
# シリアルコンソールを開く (Linux/Mac)
screen /dev/ttyUSB0 115200

# または minicom を使用
minicom -D /dev/ttyUSB0 -b 115200
```

### 2. 開発環境構築

各プロジェクトのREADMEに従って、開発環境をセットアップしてください。

=== "C++ プロジェクト"

    ```bash
    cd apps/mp135_gateway_cpp
    # README.md の手順に従う
    ```

=== "Go プロジェクト"

    ```bash
    cd apps/mp135_gateway_go
    # README.md の手順に従う
    ```

### 3. サンプルコードの実行

各プロジェクトの `src/` ディレクトリにサンプルコードが含まれています。

---

## 📚 リソース

### 公式ドキュメント

- [M5Stack CoreMP135 公式ドキュメント](https://docs.m5stack.com/en/core/CoreMP135)
- [M5Stack 公式ストア](https://shop.m5stack.com/)
- [STM32MP135 データシート](https://www.st.com/en/microcontrollers-microprocessors/stm32mp135.html)

### コミュニティ

- [M5Stack コミュニティフォーラム](https://community.m5stack.com/)
- [GitHub リポジトリ](https://github.com/tinayla696/M5Stack_IoT_Portal)

### 技術記事・チュートリアル

- Buildroot による Linux カスタマイズ
- Yocto によるイメージビルド
- リアルタイム処理の実装パターン
- セキュアなIoTゲートウェイの構築

---

## 🤝 コントリビューション

本プロジェクトへの貢献を歓迎します！

### 貢献方法

1. **Issue作成**: バグ報告や機能提案
2. **Pull Request**: コード改善やドキュメント追加
3. **ディスカッション**: 技術的な質問や提案

詳細は [GitHub リポジトリ](https://github.com/tinayla696/M5Stack_IoT_Portal) をご覧ください。

---

## 📞 お問い合わせ

質問やフィードバックは、GitHub Issues または Discussions でお願いします。

- [GitHub Issues](https://github.com/tinayla696/M5Stack_IoT_Portal/issues)
- [GitHub Discussions](https://github.com/tinayla696/M5Stack_IoT_Portal/discussions)

---

**Happy Making with M5Stack CoreMP135! 🎉**