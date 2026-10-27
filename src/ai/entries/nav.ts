/** 导航与通知 —— 应用外壳上的导航与告警入口，数据全由 props 注入。 */
import type { ComponentSpec } from '../types'

export const nav: ComponentSpec[] = [
  {
    name: 'RTabBar',
    file: 'RTabBar.vue',
    summary: '移动端底部标签栏：等分图标 + 文字，选中态用主色，已处理底部安全区。',
    when: ['手机端 3–5 个一级入口', '平板窄布局的底部导航'],
    notFor: ['桌面端顶部导航', '可滚动的大量分类（用 RRadioGroup）'],
    props: {
      items: '标签数组 { key, label, icon }',
      activeKey: '当前选中项 key',
      isActive: '激活判定函数，优先于 activeKey（路由项目传 i => route.name === i.key）',
      label: '导航的无障碍名，默认 Main navigation',
      railOnLandscape: '横屏变成左侧竖栏（@media orientation: landscape）',
      fillActive: '激活项图标填充',
    },
    tokens: ['--bg-card', '--color-primary', '--font-xs', '--border-default'],
    a11y: 'role="tablist" + 每项 role="tab" + aria-selected；焦点可见；不内置断点，显示条件交给使用方',
    demo: {
      components: ['RTabBar'],
      setup: `const active = ref('screening')
const items = [
  { key: 'dashboard', label: '大盘', icon: 'Home' },
  { key: 'screening', label: '筛选', icon: 'Search' },
  { key: 'portfolio', label: '持仓', icon: 'BarChart3' },
  { key: 'strategy', label: '策略', icon: 'NotebookPen' },
]`,
      template: `<div style="max-width:420px">
  <RTabBar :items="items" :active-key="active" @select="active = $event" />
</div>`,
    },
  },
  {
    name: 'RHamburgerButton',
    file: 'RHamburgerButton.vue',
    summary: '汉堡菜单按钮：open 时三条线变叉，尺寸跟随密度档。',
    when: ['窄屏打开 RDrawer 的触发按钮'],
    notFor: ['桌面端常驻导航', '需要图标的普通按钮（用 RButton + RLucideIcon）'],
    props: {
      open: '菜单是否打开（控制动画与 aria-expanded）',
    },
    tokens: ['--control-h', '--bg-subtle', '--text-primary', '--motion-base'],
    a11y: 'button + aria-expanded + 动态 aria-label（打开/关闭菜单）',
    demo: {
      components: ['RHamburgerButton'],
      setup: `const open = ref(false)`,
      template: `<RHamburgerButton :open="open" @toggle="open = !open" />`,
    },
  },
  {
    name: 'RAlertBell',
    file: 'RAlertBell.vue',
    summary: '告警铃铛 + 下拉规则列表：数据从 props 进、开关与检查动作 emit 出去，组件本身不认识 store。',
    when: ['顶栏的告警/通知入口', '需要就地开关某条规则的小面板'],
    notFor: ['整页的通知中心', '需要分页的复杂列表'],
    props: {
      items: '规则数组 { id, title, badge?, note?, enabled }',
      unreadCount: '未读数（>0 显示红点）',
      title: '面板标题，默认「告警列表」',
      emptyText: '空态文案',
      solid: '触发器用实底样式（放在渐变/图片头部时）',
    },
    tokens: ['--bg-card', '--color-danger', '--z-dropdown', '--shadow-lg', '--control-h'],
    a11y: '触发器 aria-expanded + aria-label（含未读数）；面板 role="dialog"；开关是 RSwitch（自带 aria-checked）；点击外部关闭',
    demo: {
      components: ['RAlertBell'],
      setup: `const items = ref([
  { id: 1, title: '000961', badge: { text: '涨超', tone: 'danger' }, note: '5%', enabled: true },
  { id: 2, title: '023461', badge: { text: '跌超', tone: 'success' }, note: '3%', enabled: false },
])`,
      template: `<RAlertBell :items="items" :unread-count="2" solid
  @toggle="id => { const it = items.find(x => x.id === id); if (it) it.enabled = !it.enabled }" />`,
    },
  },
  {
    name: 'RSettingsNav',
    file: 'RSettingsNav.vue',
    summary: '常驻侧栏导航：分组标题 + 选中态 + 右侧角标，宽度与分组全由 props 给。',
    when: ['设置页左侧分区导航（常驻，不浮层）', '桌面/平板的后台一级导航'],
    notFor: ['移动端抽屉导航（用 RDrawer）', '底部标签栏（用 RTabBar）', '桌面端顶部导航（用页面自己的 flex 列表）'],
    props: {
      items: '数组 { id, label, badge?, group? }；group 变化时插一条分组标题',
      modelValue: '当前选中项的 id',
      title: '顶部标题，空则不渲染',
      width: '侧栏宽度，默认 240，数字按 px 处理',
      ariaLabel: 'nav 的无障碍名称，默认「设置导航」',
      '默认插槽': '导航列表之后的附加内容',
    },
    tokens: ['--bg-card', '--border-default', '--color-primary-bg', '--control-h-sm', '--radius-sm'],
    a11y: '<nav aria-label> + 每项 <button>，选中项标 aria-current="page"；键盘 Tab 可达',
    demo: {
      components: ['RSettingsNav'],
      setup: `const active = ref('general')`,
      template: `<RSettingsNav v-model="active" title="设置" :width="200" :items="[
  { id: 'general', label: '常规' },
  { id: 'toolbar', label: '工具栏' },
  { id: 'plugins', label: '插件管理', group: '插件设置' },
  { id: 'bookmarks', label: '书签', badge: '核心', group: '插件设置' },
]" style="height:220px;border-radius:var(--radius-md)" />`,
    },
  },
]
