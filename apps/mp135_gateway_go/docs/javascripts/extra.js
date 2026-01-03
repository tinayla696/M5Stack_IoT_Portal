/* カスタムJavaScript */

// ページロード時の処理
document.addEventListener('DOMContentLoaded', function() {
  console.log('CAN Gateway Documentation loaded');
  
  // 外部リンクに新しいタブで開く属性を追加
  const links = document.querySelectorAll('a[href^="http"]');
  links.forEach(link => {
    if (!link.hostname.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});

// Mermaid図のカスタマイズ
if (typeof mermaid !== 'undefined') {
  mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    themeVariables: {
      primaryColor: '#4ecdc4',
      primaryTextColor: '#fff',
      primaryBorderColor: '#099268',
      lineColor: '#333',
      secondaryColor: '#ff6b6b',
      tertiaryColor: '#feca57'
    }
  });
}
