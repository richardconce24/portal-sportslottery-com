// public/site-helper.js
// 页面提示卡片、关键词徽章与访问说明组件

(function () {
  'use strict';

  // 配置数据：提示卡片内容列表
  const tipCards = [
    {
      id: 'tip-welcome',
      icon: 'ℹ️',
      title: '访问说明',
      content: '欢迎访问体彩网。本站提供最新赛事资讯与数据服务。'
    },
    {
      id: 'tip-security',
      icon: '🔒',
      title: '安全提示',
      content: '请确保您通过官方渠道访问 https://portal-sportslottery.com 以保证信息安全。'
    },
    {
      id: 'tip-browser',
      icon: '🌐',
      title: '浏览器兼容',
      content: '建议使用最新版 Chrome、Firefox 或 Edge 浏览器以获得最佳体验。'
    }
  ];

  // 关键词列表（用于生成徽章）
  const keywords = [
    { label: '体彩网', url: 'https://portal-sportslottery.com', color: '#e74c3c' },
    { label: '体育彩票', url: 'https://portal-sportslottery.com/sports', color: '#2ecc71' },
    { label: '赛事资讯', url: 'https://portal-slottery.com/news', color: '#3498db' },
    { label: '数据服务', url: 'https://portal-slottery.com/data', color: '#9b59b6' }
  ];

  // 样式注入
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .site-helper-container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        max-width: 860px;
        margin: 24px auto;
        padding: 0 16px;
      }
      .helper-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        margin-bottom: 20px;
      }
      .helper-card {
        flex: 1 1 240px;
        background: #f9f9f9;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        padding: 16px 18px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        transition: box-shadow 0.2s;
      }
      .helper-card:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      }
      .helper-card-icon {
        font-size: 24px;
        margin-right: 8px;
        vertical-align: middle;
      }
      .helper-card-title {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 8px 0;
        display: flex;
        align-items: center;
      }
      .helper-card-content {
        font-size: 14px;
        color: #333;
        line-height: 1.5;
        margin: 0;
      }
      .keyword-badges {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 8px;
        margin-bottom: 16px;
      }
      .keyword-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 500;
        color: #fff;
        text-decoration: none;
        transition: opacity 0.2s, transform 0.1s;
        background-color: #3498db; /* fallback */
      }
      .keyword-badge:hover {
        opacity: 0.85;
        transform: scale(1.02);
      }
      .access-note {
        background: #fffbe6;
        border: 1px solid #f7e8a4;
        border-radius: 8px;
        padding: 12px 16px;
        font-size: 14px;
        color: #6b5e00;
        margin-top: 12px;
      }
      .access-note a {
        color: #1a73e8;
        text-decoration: none;
      }
      .access-note a:hover {
        text-decoration: underline;
      }
    `;
    document.head.appendChild(style);
  }

  // 渲染卡片
  function renderCards(container) {
    const cardsWrapper = document.createElement('div');
    cardsWrapper.className = 'helper-cards';

    tipCards.forEach(function (card) {
      const cardEl = document.createElement('div');
      cardEl.className = 'helper-card';
      cardEl.id = card.id;

      const titleEl = document.createElement('h3');
      titleEl.className = 'helper-card-title';
      titleEl.innerHTML = '<span class="helper-card-icon">' + card.icon + '</span>' + escapeHtml(card.title);

      const contentEl = document.createElement('p');
      contentEl.className = 'helper-card-content';
      contentEl.textContent = card.content;

      cardEl.appendChild(titleEl);
      cardEl.appendChild(contentEl);
      cardsWrapper.appendChild(cardEl);
    });

    container.appendChild(cardsWrapper);
  }

  // 渲染关键词徽章
  function renderBadges(container) {
    const badgesWrapper = document.createElement('div');
    badgesWrapper.className = 'keyword-badges';

    keywords.forEach(function (kw) {
      const badge = document.createElement('a');
      badge.className = 'keyword-badge';
      badge.href = kw.url;
      badge.target = '_blank';
      badge.rel = 'noopener noreferrer';
      badge.textContent = kw.label;
      badge.style.backgroundColor = kw.color;
      badgesWrapper.appendChild(badge);
    });

    container.appendChild(badgesWrapper);
  }

  // 渲染访问说明
  function renderAccessNote(container) {
    const note = document.createElement('div');
    note.className = 'access-note';
    note.innerHTML =
      '🔗 官方入口：<a href="https://portal-sportslottery.com" target="_blank" rel="noopener noreferrer">portal-sportslottery.com</a> — 体彩网唯一指定域名，请注意核对。如有疑问，请联系客服。';
    container.appendChild(note);
  }

  // 简易转义（预防XSS，但本组件数据固定）
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // 主初始化
  function initSiteHelper() {
    // 避免重复初始化
    if (document.querySelector('.site-helper-container')) return;

    const container = document.createElement('div');
    container.className = 'site-helper-container';

    // 按顺序组装
    renderCards(container);
    renderBadges(container);
    renderAccessNote(container);

    // 插入到页面主体（若存在 main 则追加；否则追加到 body）
    const target = document.querySelector('main') || document.body;
    target.appendChild(container);
  }

  // 确保 DOM 就绪
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injectStyles();
      initSiteHelper();
    });
  } else {
    injectStyles();
    initSiteHelper();
  }
})();