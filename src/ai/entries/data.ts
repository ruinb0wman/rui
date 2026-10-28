/** 展示与反馈 —— 容器、骨架屏、错误边界、图标。 */
import type { ComponentSpec } from '../types'

export const data: ComponentSpec[] = [
  {
    name: 'RCard',
    file: 'RCard.vue',
    summary: '内容卡片容器，shadow 三档 + 可选 header 渐变。',
    when: ['页面内的内容分组', '需要 hover 抬起的可点击卡片（shadow="hover"）'],
    notFor: ['页面级布局（用页面自己的 grid/flex）', '弹窗容器（用 RModal）'],
    props: {
      shadow: 'always | hover | never',
      header: '标题文本（也可用 header 插槽）',
      bodyStyle: '正文区内联样式对象',
    },
    tokens: ['--bg-card', '--border-default', '--shadow-sm', '--radius-md'],
    demo: {
      components: ['RCard'],
      template: `<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
  <RCard header="默认卡片"><p style="color:var(--text-secondary)">shadow=always</p></RCard>
  <RCard header="悬浮抬起" shadow="hover"><p style="color:var(--text-secondary)">shadow=hover</p></RCard>
  <RCard shadow="never"><p style="color:var(--text-secondary)">shadow=never</p></RCard>
</div>`,
    },
  },
  {
    name: 'RSkeletonCard',
    file: 'RSkeletonCard.vue',
    summary: '卡片骨架屏（shimmer 动画），数据未到位时的占位。',
    when: ['列表/卡片首次加载', '轮询刷新时保持布局不跳动'],
    notFor: ['耗时 >3s 且需要说明进度（用进度或文案）'],
    props: {
      lines: '占位行数，默认 3',
      widths: '每行宽度数组（如 ["100%","60%"]）',
      height: '卡片高度，默认 120',
      title: '是否显示标题占位条',
    },
    tokens: ['--bg-subtle', '--border-subtle', '--radius-md'],
    demo: {
      components: ['RSkeletonCard'],
      template: `<div style="max-width:320px"><RSkeletonCard :lines="3" :widths="['100%','72%','45%']" title /></div>`,
    },
  },
  {
    name: 'RSkeletonChart',
    file: 'RSkeletonChart.vue',
    summary: '图表骨架屏（虚线走势 + 图例占位）。',
    when: ['K 线/走势图加载中'],
    notFor: ['非图表区域（用 RSkeletonCard）'],
    props: {
      height: '高度，默认 300',
      width: '宽度，默认 300',
    },
    tokens: ['--bg-subtle', '--border-subtle', '--radius-md'],
    demo: {
      components: ['RSkeletonChart'],
      template: `<div style="max-width:420px"><RSkeletonChart :height="180" :width="420" /></div>`,
    },
  },
  {
    name: 'RErrorBoundary',
    file: 'RErrorBoundary.vue',
    summary: '渲染错误捕获，失败时显示提示 + 重试按钮。',
    when: ['包住易崩的第三方图表/富文本区域'],
    notFor: ['包裹整个应用（页面级错误交给路由 onError）', '异步请求失败（那不是渲染错误）'],
    props: { '—': '无 props，默认插槽即受保护内容' },
    tokens: ['--color-warning', '--bg-card'],
    demo: {
      components: ['RErrorBoundary'],
      template: `<RErrorBoundary>
  <p style="color:var(--text-secondary)">这层内容一旦渲染抛错，就会替换成「渲染异常 + 重试」。</p>
</RErrorBoundary>`,
    },
  },
  {
    name: 'ROfflineBanner',
    file: 'ROfflineBanner.vue',
    summary: '断网提示条（顶栏 sticky，online/offline 事件驱动）。',
    when: ['应用级布局顶部放一条，浏览器离线时自动出现'],
    notFor: ['接口报错提示（那是请求层的事）'],
    props: { '—': '无 props；依赖 useOnlineStatus' },
    tokens: ['--color-warning', '--z-toast'],
    demo: {
      components: ['ROfflineBanner'],
      template: `<p style="color:var(--text-secondary);font-size:var(--font-sm)">组件只在 navigator.onLine === false 时渲染；想验证可在 DevTools → Network 里切 Offline。</p>
<ROfflineBanner />`,
    },
  },
  {
    name: 'RLucideIcon',
    file: 'RLucideIcon.vue',
    summary: 'Lucide 图标包装：按名字取图标；本库内置十几个自用图标，其他名字由消费方 registerIcons() 登记，未登记时显示原名（不回落到整包）。',
    when: ['所有图标的地方（统一尺寸与描边）'],
    notFor: [
      '需要两个图标叠加/自定义 path 的场景',
      '直接 import 图标组件就能渲染的地方（少一层按名查表，也不会漏登记）',
    ],
    props: {
      name: 'Lucide 图标名（PascalCase，如 "TrendingUp"），需先 registerIcons({ TrendingUp })',
      size: '尺寸，默认 20',
      color: '颜色，默认 currentColor',
      strokeWidth: '线宽，默认 2',
    },
    tokens: ['--text-secondary'],
    demo: {
      components: ['RLucideIcon'],
      template: `<div style="display:flex;gap:16px;align-items:center;color:var(--text-secondary)">
  <RLucideIcon name="TrendingUp" :size="20" />
  <RLucideIcon name="Wallet" :size="20" />
  <RLucideIcon name="Bell" :size="24" />
  <RLucideIcon name="NoSuchIcon" :size="16" />
</div>`,
    },
  },
  {
    name: 'REmptyState',
    file: 'REmptyState.vue',
    summary: '空状态占位：圆形图标位 + 标题 + 说明，图标可用插槽换。',
    when: ['列表没有数据', '搜索无结果', '首次使用时引导用户创建'],
    notFor: ['加载中的占位（用 RLoadingState / RSkeletonCard）', '请求失败（用 RErrorState）'],
    props: {
      title: '主文案',
      description: '补充说明',
      '默认插槽': '替换图标（默认 Plus）',
      'action 插槽': '标题下方的操作按钮',
    },
    tokens: ['--bg-card', '--text-tertiary', '--radius-full', '--space-7'],
    demo: {
      components: ['REmptyState', 'RButton'],
      template: `<REmptyState title="No tasks for today" description="Create a task to get started">
  <template #action><RButton type="primary" style="margin-top:12px">New task</RButton></template>
</REmptyState>`,
    },
  },
  {
    name: 'RLoadingState',
    file: 'RLoadingState.vue',
    summary: '加载态：主色圆环 spinner + 可选文案，三档尺寸。',
    when: ['首次加载、切换数据源时的整块占位'],
    notFor: ['已知结构的列表刷新（用 RSkeletonCard 保持布局不跳）', '按钮内部加载（用 RButton 的 loading）'],
    props: {
      message: '文案，默认 Loading...；传空串则不显示',
      size: 'small | default | large',
    },
    tokens: ['--color-primary', '--text-tertiary', '--space-6', '--space-7'],
    a11y: 'spinner 无文字依赖：文案与图形同时在；prefers-reduced-motion 下放慢动画',
    demo: {
      components: ['RLoadingState'],
      template: `<RLoadingState message="Loading tasks..." />`,
    },
  },
  {
    name: 'RErrorState',
    file: 'RErrorState.vue',
    summary: '失败态：一句标题 + 可选重试按钮（只在传了 @retry 时渲染）。',
    when: ['请求失败、数据读不出来', '需要给用户一个重试入口'],
    notFor: ['表单校验错误（写在字段旁）', '空数据（用 REmptyState）'],
    props: {
      title: '失败文案，默认 Failed to load data',
      retryLabel: '重试按钮文案，默认 Retry',
      'retry 事件': '监听才显示按钮，不监听就不渲染',
    },
    tokens: ['--color-primary', '--text-tertiary', '--radius-sm'],
    a11y: '重试是真 button，可 Tab/回车；按钮有无由是否监听事件决定，避免空按钮',
    demo: {
      components: ['RErrorState'],
      setup: `const tries = ref(0)`,
      template: `<RErrorState title="Failed to load data" @retry="tries++" />
<p style="color:var(--text-secondary);text-align:center">重试 {{ tries }} 次</p>`,
    },
  },
  {
    name: 'RProgress',
    file: 'RProgress.vue',
    summary: '进度条：value/max 两参数，颜色走语义色，可显示百分比。',
    when: ['完成度、任务进度、容量占用', '需要在条上叠加文案时把文案放外面'],
    notFor: ['不定长加载（用 RLoadingState）', '环形/多段进度（项目自己画或用图表库）'],
    props: {
      value: '当前值',
      max: '满分值，默认 100；为 0 时进度按 0 处理',
      size: 'small | default',
      color: 'primary | success | warning | danger',
      showLabel: '右侧显示百分比',
      label: 'progressbar 的无障碍名',
    },
    tokens: ['--color-primary', '--bg-card', '--radius-full', '--motion-base'],
    a11y: 'role="progressbar" + aria-valuenow/min/max；进度不只靠颜色（可选 showLabel）',
    demo: {
      components: ['RProgress'],
      setup: `const done = ref(3)`,
      template: `<div style="display:grid;gap:12px">
  <RProgress :value="done" :max="8" show-label />
  <RProgress :value="done" :max="8" color="success" />
  <RProgress :value="done" :max="8" color="warning" size="small" />
</div>`,
    },
  },
  {
    name: 'RConfirmDialog',
    file: 'RConfirmDialog.vue',
    summary: '确认/提示对话框（受控）：图标 + 标题 + 说明 + 确定/取消。',
    when: ['直接渲染确认框的场合（自己持有 visible 状态）'],
    notFor: [
      '想用 await confirm({...}) 的写法（用 RConfirmHost + useConfirm）',
      '需要多个带图标选项（用 RDialog）',
      '承载表单（用 RModal）',
    ],
    props: {
      visible: '可见标志',
      message: '正文（必填）',
      title: '标题，默认 Confirm',
      confirmLabel: '确定按钮文案',
      cancelLabel: '取消按钮文案',
      variant: 'danger | warning | info（决定图标与按钮色）',
      alertOnly: '只显示确定按钮（提示框语义）',
    },
    tokens: ['--color-danger', '--color-warning', '--color-info', '--bg-card', '--radius-lg'],
    a11y: '走 RModal：焦点进层、ESC 取消、滚动锁、返回手势只关最上层',
    demo: {
      components: ['RConfirmDialog', 'RButton'],
      setup: `const open = ref(false)`,
      template: `<RButton type="danger" @click="open = true">Delete task</RButton>
<RConfirmDialog :visible="open" variant="danger" title="Delete task"
  message="This cannot be undone." confirm-label="Delete"
  @confirm="open = false" @cancel="open = false" />`,
    },
  },
  {
    name: 'RConfirmHost',
    file: 'RConfirmHost.vue',
    summary: '确认框宿主：应用根挂一次，useConfirm()/useAlert() 就能 await。',
    when: ['替代 window.alert / window.confirm（Android WebView 会丢弃 alert，Electron 里会阻塞渲染）'],
    notFor: ['只需要一次性的静态弹窗（直接写 RConfirmDialog）'],
    props: {
      '—': '无 props；状态在 useConfirm 的模块级 store 里',
    },
    tokens: ['--color-danger', '--color-warning', '--color-info'],
    a11y: '同 RConfirmDialog；关掉即 resolve，不会永久挂起的 Promise',
    demo: {
      components: ['RConfirmHost', 'RConfirmDialog'],
      setup: `const open = ref(false)`,
      template: `<p style="color:var(--text-secondary)">挂一次宿主，然后任何地方 <code>await useConfirm()({...})</code>。下面直接渲染 RConfirmDialog 演示外观：</p>
<RConfirmHost />
<RConfirmDialog :visible="open" title="Heads up" message="Saved." variant="info" alert-only
  @confirm="open = false" @cancel="open = false" />
<button style="margin-top:12px" @click="open = true">打开提示框</button>`,
    },
  },
  {
    name: 'RChipGroup',
    file: 'RChipGroup.vue',
    summary: '胶囊选择组：单选/多选 × 横滑/等分网格，四种形态一个组件。',
    when: ['筛选项、标签选择、星期多选', '选项数量固定且都值得展示（2–12 个）'],
    notFor: ['选项很多且需要搜索（用 RInput + 列表）', '开关语义（用 RSwitch）'],
    props: {
      options: '选项数组 { label, value }',
      modelValue: '单选传值，多选传数组',
      multiple: '多选',
      layout: 'scroll（横滑胶囊）| grid（等分网格，默认 4 列）',
      columns: 'grid 列数',
      itemWidth: 'grid 项宽，默认 1fr（可传 "36px"）',
      size: 'small | default',
      disabled: '禁用整组',
      'label 插槽': '自定义每项内容，接收 { option }',
    },
    tokens: ['--color-primary', '--bg-card', '--border-default', '--radius-full', '--control-h'],
    a11y: '每项是 button + aria-pressed；横向滚动不隐藏键盘可达性（Tab 可进入）',
    demo: {
      components: ['RChipGroup'],
      setup: `const one = ref('week')
const many = ref([1, 3])
const filters = ['all','pending','done']
const activeFilter = ref('all')`,
      template: `<div style="display:grid;gap:16px">
  <RChipGroup v-model="one" :options="[{label:'Daily',value:'day'},{label:'Weekly',value:'week'},{label:'Monthly',value:'month'}]" />
  <RChipGroup v-model="many" multiple layout="grid" :columns="7"
    :options="[1,2,3,4,5,6,7].map(d => ({ label: String(d), value: d }))" />
  <RChipGroup v-model="activeFilter" :options="filters.map(f => ({ label: f, value: f }))" />
</div>`,
    },
  },
  {
    name: 'RBadge',
    file: 'RBadge.vue',
    summary: '状态徽标：语义色胶囊 + 可选圆点，只用圆点就是状态灯（可脉冲表示进行中）。',
    when: ['列表/标签上的状态标记（在跑 / 等你 / 失败）', '导航项右侧的角标（核心 / Beta）', '工具栏状态灯（dot + pulse）'],
    notFor: ['未读数字气泡（需要绝对定位贴角，项目自己写）', '交互式标签筛选（用 RChipGroup）'],
    props: {
      type: 'primary | success | warning | danger | info | muted（默认 muted）',
      dot: '文案前的圆点',
      pulse: '圆点脉冲（进行中）',
      round: '胶囊圆角，默认方块',
      '默认插槽': '文案；不给文案 + dot 就是纯状态灯',
    },
    tokens: ['--color-*-bg', '--color-*', '--font-xs', '--radius-sm', '--radius-full'],
    a11y: '纯展示元素；状态不能只靠颜色，文案或 title 要能读出来',
    demo: {
      components: ['RBadge'],
      template: `<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
  <RBadge type="primary" dot pulse round>在跑</RBadge>
  <RBadge type="warning" dot round>等你</RBadge>
  <RBadge type="success" round>已完成</RBadge>
  <RBadge type="danger" round>失败</RBadge>
  <RBadge type="info" round>Beta</RBadge>
  <RBadge type="primary" dot pulse />
</div>`,
    },
  },
  {
    name: 'RListCard',
    file: 'RListCard.vue',
    summary: '列表卡片壳：首列图标方块 + 标题行徽标 + 副信息行 + 可选进度条 + 尾部状态，数据用 props 喂。',
    when: [
      '任务/订单/通知这类「一行实体」的可点击卡片（业务数据留在项目侧映射）',
      '同一列表里要同时显示等级/类型徽标、剩余时间、积分、进度与状态',
    ],
    notFor: [
      '纯展示的内容分组（用 RCard）',
      '表格型多列布局（一行字段超过 4 个就自己写）',
      '需要每一行自由排版（用 RCard + 自己写 flex）',
    ],
    props: {
      title: '主标题（单行截断）',
      tone: 'primary | success | warning | danger | info | muted（图标方块与默认配色）',
      icon: '首列图标名（消费方要先 registerIcons），或用 #icon 插槽给组件',
      badges: '[{ text, type?, round? }]，标题行的小徽标',
      meta: '[{ text, icon?, tone? }]，副信息行的项（剩余时间 / 完成时间 / 积分）',
      progress: '{ percent, label?, color? } | null，0-100 的细进度条',
      status: '{ text, tone? } | null，尾部状态文字',
      disabled: '置灰且不响应点击（预览态）',
    },
    tokens: ['--bg-card', '--bg-elevated', '--border-default', '--color-*-bg', '--color-*', '--radius-md', '--font-*'],
    a11y: '根元素是 button（无修饰键、键盘可点）；disabled 时原生 button 禁用，点击不冒事件',
    demo: {
      components: ['RListCard'],
      template: `<div style="display:grid;gap:12px;max-width:420px">
  <RListCard
    title="读 20 页书"
    tone="primary"
    icon="Clock"
    :badges="[{ text: 'L1', type: 'success' }, { text: 'Daily', type: 'muted' }]"
    :meta="[{ text: 'Due 2d', icon: 'AlertTriangle', tone: 'warning' }, { text: '+12 exp', tone: 'success' }]"
    :progress="{ percent: 40, label: '8/20 pages', color: 'primary' }"
    :status="{ text: 'Pending', tone: 'primary' }"
  />
  <RListCard
    title="晨跑"
    tone="success"
    icon="Check"
    :meta="[{ text: 'Completed Today 07:12', icon: 'Check', tone: 'success' }]"
    :status="{ text: 'Completed', tone: 'success' }"
  />
</div>`,
    },
  },
  {
    name: 'RCollapsible',
    file: 'RCollapsible.vue',
    summary: '可折叠区块：标题 + 数量徽标 + 右侧操作，内部自管展开状态（默认可收起）。',
    when: [
      '列表分区要默认收起（逾期/历史/次要分组）',
      '标题右侧还要放操作按钮（查看全部、筛选）',
    ],
    notFor: [
      '需要记住跨会话展开状态（组件只管当次，自己包一层）',
      '弹窗式展开（用 RModal）',
      '需要手风琴互斥（自己算 active 传 collapsible=false + 受控内容）',
    ],
    props: {
      title: '标题文本',
      count: '标题右侧数量徽标，null 不显示',
      collapsible: 'false = 纯标题区、无折叠交互',
      defaultCollapsed: '初始收起',
      'actions 插槽': '标题行右侧内容',
    },
    tokens: ['--text-primary', '--text-secondary', '--bg-subtle', '--font-lg', '--font-xs', '--motion-fast'],
    a11y: '折叠按钮带 aria-expanded；内容收起用 v-show（DOM 保留，屏幕阅读器不读到隐藏区）',
    demo: {
      components: ['RCollapsible'],
      template: `<div style="max-width:420px">
  <RCollapsible title="Carried Over" :count="3" default-collapsed>
    <template #actions><span style="color:var(--text-secondary);font-size:var(--font-xs)">actions 插槽</span></template>
    <p style="color:var(--text-secondary);margin:0">区块内容</p>
  </RCollapsible>
</div>`,
    },
  },
]
