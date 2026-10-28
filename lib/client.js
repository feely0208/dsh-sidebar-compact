/**
 * 深鲸侧栏收纳 —— 只做一件事：给侧栏的「全局面板」列表限高 + 内部滚动。
 *
 * 为什么需要：每个带面板的插件都会在侧栏加一行，插件多了会把「工作区 / 会话列表」挤下去。
 * 官方的 sidebar.panellist 槽只支持 {id, order, label}，没有分组/折叠能力，
 * 所以这里用一条稳定的选择器 `nav[aria-label="全局面板"]`（英文 `Global panels`）做纯 CSS 收纳：
 *   · 最多占 38vh（有上限 340px），超出内部滚动，会话区始终可见；
 *   · 不加图标、不加面板、不改任何插件行为，可随时删掉回车位。
 *
 * 不注册任何 slot —— 装上也看不见"多了一个插件图标"，只生效样式。
 */
window.__ModuleLoader__.load({
  id: '@deepwhale-cn/dsh-sidebar-compact',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    const STYLE_ID = 'dwh-sidebar-compact';
    const CSS = `
      /* 全局面板列表：限高 + 内部滚动 */
      nav[aria-label="全局面板"],
      nav[aria-label="Global panels"] {
        max-height: min(38vh, 340px);
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-width: thin;
        padding-right: 2px;
        mask-image: linear-gradient(to bottom, #000 calc(100% - 14px), transparent);
        -webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - 14px), transparent);
      }
      nav[aria-label="全局面板"]::-webkit-scrollbar,
      nav[aria-label="Global panels"]::-webkit-scrollbar { width: 4px; }
      nav[aria-label="全局面板"]::-webkit-scrollbar-thumb,
      nav[aria-label="Global panels"]::-webkit-scrollbar-thumb {
        background: var(--dsw-alias-border-l2, rgba(128,128,128,.35)); border-radius: 4px;
      }
      /* 侧栏收起时（宽 <= 88px）不生效，避免挤压图标 */
      @media (max-width: 120px) {
        nav[aria-label="全局面板"], nav[aria-label="Global panels"] { max-height: none; overflow: visible; mask-image: none; -webkit-mask-image: none; }
      }
    `;
    function apply() {
      try {
        if (document.getElementById(STYLE_ID)) return;
        const el = document.createElement('style');
        el.id = STYLE_ID;
        el.textContent = CSS;
        document.head.appendChild(el);
      } catch (e) { try { console.warn('[sidebar-compact] 注入失败', e && e.message); } catch {} }
    }
    exports.apply = apply;
    return module.exports;
  },
});
