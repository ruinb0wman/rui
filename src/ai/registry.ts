/**
 * 组件注册表 —— 文档页（docs/components/*.md）与 AI 清单（ai/manifest.json、AI.md）的唯一真源。
 * 加组件：先写组件，再在这里加一条，然后 `bun run gen:all`（漂移测试会拦漏登记的组件）。
 *
 * 字段约定：
 * - summary：一句话，写给 AI 挑组件时判断用
 * - when / notFor：AI 最需要的两个字段（该用 / 别用）
 * - props：只列人话说明，类型以 .vue 的 defineProps 为准
 * - demo：会原样嵌进 VitePress 页面（ClientOnly 包裹），components 里的名字自动 import
 */
export interface DemoSpec {
  /** demo 里用到的组件名（从 src/components 自动 import） */
  components: string[]
  /** 需要额外逻辑时写在这里（可用 ref / computed） */
  setup?: string
  template: string
}

export interface ComponentSpec {
  name: string
  file: string
  summary: string
  when: string[]
  notFor: string[]
  props: Record<string, string>
  tokens: string[]
  a11y?: string
  demo?: DemoSpec
}

export const components: ComponentSpec[] = [
  {
    name: 'BButton',
    file: 'BButton.vue',
    summary: '按钮。6 种语义色 × 3 档尺寸，支持 plain/round/circle/text/link/loading。',
    when: ['表单提交与主操作', '打开弹窗/抽屉的触发点', '危险操作入口（type="danger"）', '工具栏图标按钮（circle + icon）'],
    notFor: ['页面跳转（用 <a> 或路由链接，按钮不承担导航）', '纯装饰性图形'],
    props: {
      type: 'default | primary | success | warning | danger | info',
      size: 'large | default | small',
      plain: '浅底描边样式',
      round: '全圆角胶囊',
      circle: '圆形（配 icon 用）',
      text: '无底无边的文字按钮',
      link: '链接样式按钮',
      loading: '加载态并禁用点击',
      disabled: '禁用',
      nativeType: 'button | submit | reset',
      icon: '图标名（Lucide），渲染在文字左侧',
    },
    tokens: ['--color-primary', '--color-danger', '--control-h', '--radius-sm', '--motion-fast'],
    a11y: '原生 <button>，键盘可聚焦；仅图标时用 aria-label 说明动作',
    demo: {
      components: ['BButton'],
      template: `<div style="display:flex;gap:8px;flex-wrap:wrap">
  <BButton type="primary">主操作</BButton>
  <BButton>次操作</BButton>
  <BButton type="danger" plain>删除</BButton>
  <BButton type="primary" loading>提交中</BButton>
  <BButton size="small" text>文字按钮</BButton>
  <BButton size="small" circle icon="Plus" />
</div>`,
    },
  },
  {
    name: 'BInput',
    file: 'BInput.vue',
    summary: '输入框 / 密码框 / 文本域（type="textarea"），带清空、字数统计、前缀图标。',
    when: ['单行文本、搜索、密码', '多行备注（type="textarea" + autosize）'],
    notFor: ['数字输入（用 BInputNumber）', '日期/时间（用 BDatePicker / BTimePicker）', '下拉选择（用原生 <select> 或列表组件）'],
    props: {
      modelValue: 'v-model 值',
      type: 'text | password | textarea 等原生 input type',
      size: 'large | default | small',
      placeholder: '占位文本',
      clearable: '显示清空按钮',
      showPassword: '密码可见切换',
      showWordLimit: '显示字数 x/maxlength',
      maxlength: '最大长度',
      rows: 'textarea 行数',
      autosize: 'textarea 自适应高度',
      prefixIcon: '前缀图标名',
      suffixIcon: '后缀图标名',
      formatter: '显示值格式化（(v) => string）',
      parser: '回写值解析（(v) => string | number）',
    },
    tokens: ['--bg-card', '--border-default', '--control-h', '--radius-sm'],
    a11y: 'label 用外部 <label for> 关联，不要只靠 placeholder',
    demo: {
      components: ['BInput'],
      setup: `const text = ref('')`,
      template: `<div style="display:grid;gap:8px;max-width:320px">
  <BInput v-model="text" placeholder="输入点什么" clearable prefix-icon="Search" />
  <BInput v-model="text" type="textarea" :rows="2" show-word-limit :maxlength="40" placeholder="多行备注" />
</div>`,
    },
  },
  {
    name: 'BInputNumber',
    file: 'BInputNumber.vue',
    summary: '数字输入，min/max/step/precision 钳制，带加减控件。',
    when: ['金额、份额、期数、阈值等数值字段', '需要上下键微调的场景'],
    notFor: ['纯文本数字（如基金代码）—— 用 BInput 保留前导 0'],
    props: {
      modelValue: 'v-model 数字值',
      min: '最小值（默认 Number.MIN_SAFE_INTEGER）',
      max: '最大值',
      step: '步长，默认 1',
      precision: '小数位',
      stepStrictly: '强制对齐步长',
      controls: '是否显示加减按钮',
      controlsPosition: 'default | right',
      valueOnClear: '清空后回填的值',
    },
    tokens: ['--bg-card', '--border-default', '--control-h', '--radius-sm'],
    demo: {
      components: ['BInputNumber'],
      setup: `const amount = ref(1000)`,
      template: `<div style="max-width:220px">
  <BInputNumber v-model="amount" :min="0" :max="100000" :step="100" />
  <p style="margin-top:8px;color:var(--text-secondary);font-size:var(--font-sm)">当前值：{{ amount }}</p>
</div>`,
    },
  },
  {
    name: 'BCheckbox',
    file: 'BCheckbox.vue',
    summary: '复选框，支持半选（indeterminate）。',
    when: ['多选列表', '「全选」控制子项（indeterminate）', '单个开关式确认（同意条款）'],
    notFor: ['立即生效的开关（用 BSwitch）', '互斥选项（用 BRadioGroup）'],
    props: {
      modelValue: 'v-model 布尔值',
      label: '右侧文案',
      indeterminate: '半选态（视觉，不改变值）',
      disabled: '禁用',
      size: 'large | default | small',
    },
    tokens: ['--color-primary', '--border-default', '--radius-sm'],
    demo: {
      components: ['BCheckbox'],
      setup: `const checked = ref(true)`,
      template: `<div style="display:grid;gap:8px">
  <BCheckbox v-model="checked" label="已选中的选项" />
  <BCheckbox :model-value="false" indeterminate label="半选（全选用的视觉态）" />
  <BCheckbox :model-value="false" disabled label="禁用" />
</div>`,
    },
  },
  {
    name: 'BSwitch',
    file: 'BSwitch.vue',
    summary: '开关，立即生效型布尔切换。',
    when: ['设置项即时开关', '启用/停用某个功能'],
    notFor: ['提交时才生效的表单项（用 BCheckbox）'],
    props: {
      modelValue: 'v-model 布尔值',
      activeText: '开启时文案',
      inactiveText: '关闭时文案',
      loading: '加载态',
      disabled: '禁用',
      size: 'large | default | small',
    },
    tokens: ['--color-primary', '--bg-hover', '--motion-fast'],
    a11y: 'role="switch"，空格/回车切换',
    demo: {
      components: ['BSwitch'],
      setup: `const on = ref(true)`,
      template: `<div style="display:grid;gap:8px">
  <BSwitch v-model="on" active-text="已启用" inactive-text="已停用" />
  <BSwitch :model-value="false" disabled />
</div>`,
    },
  },
  {
    name: 'BRadio',
    file: 'BRadio.vue',
    summary: '单选按钮，必须放在 BRadioGroup 内使用（值由 group 提供）。',
    when: ['BRadioGroup 的子项'],
    notFor: ['单独使用（没有 group 上下文时值不会同步）'],
    props: {
      value: '该项的值',
      label: '右侧文案',
      disabled: '单项禁用',
    },
    tokens: ['--color-primary', '--control-h'],
    demo: {
      components: ['BRadio', 'BRadioGroup'],
      setup: `const picked = ref('b')`,
      template: `<BRadioGroup v-model="picked">
  <BRadio value="a" label="选项 A" />
  <BRadio value="b" label="选项 B" />
  <BRadio value="c" label="选项 C（禁用）" disabled />
</BRadioGroup>`,
    },
  },
  {
    name: 'BRadioGroup',
    file: 'BRadioGroup.vue',
    summary: '单选组，provide/inject 管理子项状态，可横向/纵向/描边。',
    when: ['2–5 个互斥选项、且选项少到值得全部展示', '周期选择（每周/每月/每季）'],
    notFor: ['选项超过 6 个（用 <select> 或列表）', '多选（用 BCheckbox）'],
    props: {
      modelValue: 'v-model 当前值',
      disabled: '整组禁用',
      size: 'large | default | small',
      vertical: '纵向排列',
      border: '每项加描边',
    },
    tokens: ['--color-primary', '--border-default', '--control-h'],
    demo: {
      components: ['BRadio', 'BRadioGroup'],
      setup: `const period = ref('monthly')`,
      template: `<div style="display:grid;gap:12px">
  <BRadioGroup v-model="period">
    <BRadio value="weekly" label="每周" />
    <BRadio value="monthly" label="每月" />
    <BRadio value="quarterly" label="每季" />
  </BRadioGroup>
  <BRadioGroup v-model="period" border>
    <BRadio value="weekly" label="描边式" />
    <BRadio value="monthly" label="描边式 B" />
  </BRadioGroup>
</div>`,
    },
  },
  {
    name: 'BDatePicker',
    file: 'BDatePicker.vue',
    summary: '日期选择（原生 date input 的封装，带图标与清空）。',
    when: ['交易日期、定投起始日等日期字段'],
    notFor: ['需要日历面板/范围选择的场景（当前只封装原生控件，移动端要自己换成 wheel picker）'],
    props: {
      modelValue: 'v-model 日期字符串（YYYY-MM-DD）',
      placeholder: '占位文本',
      clearable: '显示清空按钮',
      min: '最小日期',
      max: '最大日期',
      size: 'large | default | small',
    },
    tokens: ['--bg-card', '--border-default', '--control-h'],
    demo: {
      components: ['BDatePicker'],
      setup: `const date = ref('2026-10-24')`,
      template: `<div style="max-width:220px"><BDatePicker v-model="date" clearable /></div>`,
    },
  },
  {
    name: 'BTimePicker',
    file: 'BTimePicker.vue',
    summary: '时间选择（原生 time input 的封装）。',
    when: ['提醒时间、交易时间点'],
    notFor: ['需要滚动轮盘（移动端）—— 页面自己实现，别硬套'],
    props: {
      modelValue: 'v-model 时间字符串（HH:mm）',
      placeholder: '占位文本',
      clearable: '显示清空按钮',
      min: '最小时间',
      max: '最大时间',
      step: '秒级步长，默认 60',
      size: 'large | default | small',
    },
    tokens: ['--bg-card', '--border-default', '--control-h'],
    demo: {
      components: ['BTimePicker'],
      setup: `const at = ref('09:30')`,
      template: `<div style="max-width:180px"><BTimePicker v-model="at" clearable /></div>`,
    },
  },
  {
    name: 'BFileInput',
    file: 'BFileInput.vue',
    summary: '文件选择（隐藏原生 input，trigger 插槽自定义外观）。',
    when: ['导入 CSV/图片', '需要自定义上传按钮外观时'],
    notFor: ['拖拽上传（未实现 drop 区域）', '需要上传进度（本组件不负责传输）'],
    props: {
      accept: '可接受的文件类型',
      multiple: '多选',
      disabled: '禁用',
      placeholder: '未选择时的文案',
    },
    tokens: ['--bg-card', '--border-default', '--radius-sm'],
    demo: {
      components: ['BFileInput'],
      template: `<div style="max-width:320px"><BFileInput accept=".csv" placeholder="选择一个 CSV 文件" /></div>`,
    },
  },
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
    name: 'BCard',
    file: 'BCard.vue',
    summary: '内容卡片容器，shadow 三档 + 可选 header 渐变。',
    when: ['页面内的内容分组', '需要 hover 抬起的可点击卡片（shadow="hover"）'],
    notFor: ['页面级布局（用页面自己的 grid/flex）', '弹窗容器（用 BaseModal）'],
    props: {
      shadow: 'always | hover | never',
      header: '标题文本（也可用 header 插槽）',
      bodyStyle: '正文区内联样式对象',
    },
    tokens: ['--bg-card', '--border-default', '--shadow-sm', '--radius-md'],
    demo: {
      components: ['BCard'],
      template: `<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
  <BCard header="默认卡片"><p style="color:var(--text-secondary)">shadow=always</p></BCard>
  <BCard header="悬浮抬起" shadow="hover"><p style="color:var(--text-secondary)">shadow=hover</p></BCard>
  <BCard shadow="never"><p style="color:var(--text-secondary)">shadow=never</p></BCard>
</div>`,
    },
  },
  {
    name: 'SkeletonCard',
    file: 'SkeletonCard.vue',
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
      components: ['SkeletonCard'],
      template: `<div style="max-width:320px"><SkeletonCard :lines="3" :widths="['100%','72%','45%']" title /></div>`,
    },
  },
  {
    name: 'SkeletonChart',
    file: 'SkeletonChart.vue',
    summary: '图表骨架屏（虚线走势 + 图例占位）。',
    when: ['K 线/走势图加载中'],
    notFor: ['非图表区域（用 SkeletonCard）'],
    props: {
      height: '高度，默认 300',
      width: '宽度，默认 300',
    },
    tokens: ['--bg-subtle', '--border-subtle', '--radius-md'],
    demo: {
      components: ['SkeletonChart'],
      template: `<div style="max-width:420px"><SkeletonChart :height="180" :width="420" /></div>`,
    },
  },
  {
    name: 'ErrorBoundary',
    file: 'ErrorBoundary.vue',
    summary: '渲染错误捕获，失败时显示提示 + 重试按钮。',
    when: ['包住易崩的第三方图表/富文本区域'],
    notFor: ['包裹整个应用（页面级错误交给路由 onError）', '异步请求失败（那不是渲染错误）'],
    props: { '—': '无 props，默认插槽即受保护内容' },
    tokens: ['--color-warning', '--bg-card'],
    demo: {
      components: ['ErrorBoundary'],
      template: `<ErrorBoundary>
  <p style="color:var(--text-secondary)">这层内容一旦渲染抛错，就会替换成「渲染异常 + 重试」。</p>
</ErrorBoundary>`,
    },
  },
  {
    name: 'OfflineBanner',
    file: 'OfflineBanner.vue',
    summary: '断网提示条（顶栏 sticky，online/offline 事件驱动）。',
    when: ['应用级布局顶部放一条，浏览器离线时自动出现'],
    notFor: ['接口报错提示（那是请求层的事）'],
    props: { '—': '无 props；依赖 useOnlineStatus' },
    tokens: ['--color-warning', '--z-toast'],
    demo: {
      components: ['OfflineBanner'],
      template: `<p style="color:var(--text-secondary);font-size:var(--font-sm)">组件只在 navigator.onLine === false 时渲染；想验证可在 DevTools → Network 里切 Offline。</p>
<OfflineBanner />`,
    },
  },
  {
    name: 'LucideIcon',
    file: 'LucideIcon.vue',
    summary: 'Lucide 图标包装：按名字取图标，缺名时回退显示原名（不会白屏）。',
    when: ['所有图标的地方（统一尺寸与描边）'],
    notFor: ['需要两个图标叠加/自定义 path 的场景'],
    props: {
      name: 'Lucide 图标名（PascalCase，如 "TrendingUp"）',
      size: '尺寸，默认 20',
      color: '颜色，默认 currentColor',
      strokeWidth: '线宽，默认 2',
    },
    tokens: ['--text-secondary'],
    demo: {
      components: ['LucideIcon'],
      template: `<div style="display:flex;gap:16px;align-items:center;color:var(--text-secondary)">
  <LucideIcon name="TrendingUp" :size="20" />
  <LucideIcon name="Wallet" :size="20" />
  <LucideIcon name="Bell" :size="24" />
  <LucideIcon name="NoSuchIcon" :size="16" />
</div>`,
    },
  },
]

/** 非组件但属于公共面：composable / token 常量 */
export const extras = [
  { name: 'useOnlineStatus', summary: '返回 { isOnline }，监听 window online/offline（SSR 安全）。' },
  { name: 'lightTokens / darkTokens / getTokens(mode)', summary: '与 CSS 变量同源的 TS 常量，供 ECharts 等 JS 侧读取。' },
  { name: 'themeNames', summary: '全部合法主题名：gofund-light / gofund-dark / bow-dark / exp1-dark。' },
  { name: 'useOverlayLayer({ visible, container, onEscape })', summary: '浮层行为内核：返回 { zIndex, isTop }。ESC 只关最上层、焦点进层并在 Tab 间循环、关闭后回到原触发元素、body 滚动按层计数加锁、z-index = --z-modal + 层号。自建浮层（抽屉/popover/右键菜单）复用它，别各写一份。' },
]
