import { createPlugin, pkgRootFrom } from '@deepwhale-cn/dsh-guard-core/plugin';

const base = createPlugin({
  name: 'sidebar-compact',
  pkgRoot: pkgRootFrom(import.meta.url),
  skillFile: 'skill/sidebar-compact.md',
  description: '深鲸侧栏收纳：给侧栏插件列表限高 + 内部滚动，插件多了也不挤掉会话区（纯 CSS，不加入口）',
  whenToUse: '当侧栏插件图标太多、把工作区/会话列表挤出屏幕时使用。装上即生效，不新增任何图标或面板。',
});
export const name = base.name;
export const inject = base.inject;
export const apply = base.apply;
