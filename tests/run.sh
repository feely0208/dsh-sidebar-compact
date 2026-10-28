#!/bin/bash
set -uo pipefail
cd "$(dirname "$0")/.."
PASS=0; FAIL=0
ok(){ echo "  ✅ $1"; PASS=$((PASS+1)); }
bad(){ echo "  ❌ $1"; FAIL=$((FAIL+1)); }
echo ""; echo "  深鲸侧栏收纳 · 回归"
S=$(cat lib/client.js)
echo "$S" | grep -q 'nav\[aria-label="全局面板"\]' && ok "中文选择器" || bad "缺中文选择器"
echo "$S" | grep -q 'nav\[aria-label="Global panels"\]' && ok "英文选择器" || bad "缺英文选择器"
echo "$S" | grep -q "max-height" && ok "有限高" || bad "缺 max-height"
echo "$S" | grep -q "overflow-y: auto" && ok "内部滚动" || bad "缺 overflow"
echo "$S" | grep -q "sidebar.panellist" && ok "注释说明槽位" || bad "缺说明"
echo "$S" | grep -q "slots.register" && bad "不应注册任何 slot" || ok "不注册任何 slot（不给侧栏加行）"
echo "  ────────────────────────────────────────"; echo "  通过 $PASS · 失败 $FAIL"; [ "$FAIL" -eq 0 ]
