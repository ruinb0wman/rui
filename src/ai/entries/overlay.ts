/** 浮层 —— 弹窗、抽屉：都走 useOverlayLayer（ESC / 焦点 / 滚动锁 / 层号）。 */
import type { ComponentSpec } from '../types'

export const overlay: ComponentSpec[] = [
  {
    name: 'BaseModal',
    file: 'BaseModal.vue',
    summary: '模态框底座（Teleport + 遮罩 + header/body/footer 三槽 + 移动端底部弹出）。',
    when: ['需要承载任意内容的弹窗（表单、详情）', '需要 footer 操作区的确认流程'],
    notFor: ['只要两三个按钮的确认（用 BDialog 更轻）', '页面内联展开（用 BCard）'],
    props: {
      visible: 'v-model 式的可见标志（配合 @close）',
      title: '标题（也可用 header 插槽）',
      width: '宽度 px 或字符串，默认 min(60vw, 900px)',
      height: '高度，默认 min(60vh, 600px)',
      closable: '显示右上角关闭',
      closeOnOverlay: '点遮罩关闭',
      closeOnEscape: 'ESC 关闭，默认 true（只有最上层响应）',
      to: "teleport 目标，默认 'body'；demo/故事里传容器选择器可留在页内",
    },
    tokens: ['--bg-overlay', '--bg-card', '--shadow-lg', '--radius-md', '--z-modal'],
    a11y: 'role="dialog" + aria-modal + aria-label；焦点进层、Tab 循环、关闭后回到原触发元素；ESC 只关最上层；body 滚动按层计数加锁',
    demo: {
      components: ['BButton', 'BaseModal'],
      setup: `const open = ref(false)`,
      template: `<BButton type="primary" @click="open = true">打开弹窗</BButton>
<BaseModal :visible="open" title="示例弹窗" width="480" height="auto" @close="open = false">
  <p style="color:var(--text-secondary)">弹窗正文，可放表单或详情。</p>
  <template #footer>
    <BButton @click="open = false">取消</BButton>
    <BButton type="primary" @click="open = false">确定</BButton>
  </template>
</BaseModal>`,
    },
  },
  {
    name: 'BDialog',
    file: 'BDialog.vue',
    summary: '轻量确认/选择对话框：给一组带图标的选项，点击直接返回选项值。',
    when: ['「导出还是打印」这类 2–4 个带图标的选择', '需要图标+副标题的确认框'],
    notFor: ['承载复杂表单（用 BaseModal）', '只有「确定/取消」（用 BaseModal + footer 更直白）'],
    props: {
      visible: '可见标志',
      title: '标题，默认「确认」',
      subtitle: '副标题',
      options: '选项数组 { icon, title, desc, value, danger }',
      closable: '显示关闭按钮',
      closeOnEscape: 'ESC 取消，默认 true（只有最上层响应）',
      to: "teleport 目标，默认 'body'",
    },
    tokens: ['--bg-overlay', '--bg-card', '--shadow-lg', '--radius-md', '--z-modal'],
    a11y: 'role="dialog" + aria-modal + aria-label；选项是真 button（可 Tab/回车）+ focus-visible；焦点进层与还原、ESC、滚动锁同 BaseModal',
    demo: {
      components: ['BButton', 'BDialog'],
      setup: `const open = ref(false)
const options = [
  { icon: 'Download', title: '导出 CSV', desc: '下载到本地', value: 'csv' },
  { icon: 'Printer', title: '打印', desc: '发送到打印机', value: 'print' },
  { icon: 'Trash2', title: '清空', desc: '不可撤销', value: 'clear', danger: true },
]`,
      template: `<BButton type="primary" @click="open = true">打开选择框</BButton>
<BDialog :visible="open" title="怎么处理这份数据？" subtitle="选择后立即生效" :options="options" @select="open = false" @cancel="open = false" />`,
    },
  },
  {
    name: 'BDrawer',
    file: 'BDrawer.vue',
    summary: '左侧抽屉导航：导航项由 props 传入、选中靠 key 匹配；复用 useOverlayLayer（ESC / 焦点 / 滚动锁 / 层号）。',
    when: ['窄屏把主导航收进抽屉', '需要从侧边滑出的次级导航'],
    notFor: ['桌面端常驻侧栏（用普通布局）', '居中弹窗（用 BaseModal）'],
    props: {
      visible: '可见标志',
      title: '抽屉标题，默认「导航」',
      items: '导航项数组 { key, label, icon }',
      activeKey: '当前选中项的 key（由使用方按路由算）',
      width: "宽度，默认 '280px'",
      closeOnEscape: 'ESC 关闭，默认 true',
      to: "teleport 目标，默认 'body'",
    },
    tokens: ['--bg-card', '--bg-overlay', '--radius-sm', '--control-h', '--z-modal', '--shadow-lg'],
    a11y: 'role="dialog" + aria-modal + aria-label；导航项是 button 且有 aria-current；ESC/焦点循环/滚动锁由 useOverlayLayer 提供',
    demo: {
      components: ['BDrawer', 'BButton'],
      setup: `const open = ref(false)
const items = [
  { key: 'dashboard', label: '市场大盘', icon: 'Home' },
  { key: 'screening', label: '基金筛选', icon: 'Search' },
  { key: 'backtest', label: '回测', icon: 'Code2' },
]`,
      template: `<BButton type="primary" @click="open = true">打开抽屉</BButton>
<BDrawer :visible="open" :items="items" active-key="screening" @close="open = false" @select="open = false" />`,
    },
  },
]
