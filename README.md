# 深鲸侧栏收纳（@deepwhale-cn/dsh-sidebar-compact）

侧栏插件图标一多，工作区/会话列表就被挤下去。这个插件只做一件事：给「全局面板」列表**限高 + 内部滚动**（38vh、最多 340px，底部渐隐）。

**不新增图标、不新增面板、不改任何插件行为**，删掉即恢复。

## 安装

```bash
dsh plugin --profile web add @deepwhale-cn/dsh-sidebar-compact
```

装完刷新页面即生效。侧栏收起时自动不生效。

## 说明

官方 `sidebar.panellist` 槽只支持 `{id, order, label}`，没有分组/折叠能力；这里用稳定的 `nav[aria-label="全局面板"]`（英文 `Global panels`）做纯 CSS 收纳，从简。
