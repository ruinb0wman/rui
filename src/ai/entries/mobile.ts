/** 移动端专属 —— 底部弹出、轮盘、横屏 rail。这些形态在桌面端没有对应物。 */
import type { ComponentSpec } from '../types'

export const mobile: ComponentSpec[] = [
  {
    name: 'RMobileHeader',
    file: 'RMobileHeader.vue',
    summary: '移动端页面标题栏：返回键 + 居中标题 + 左右两个 44px 槽，高度读 --header-h。',
    when: ['移动端二级页面的顶部栏', '需要左右各放一个图标按钮的标题栏'],
    notFor: [
      '需要塞下拉菜单、搜索框的桌面顶栏（用页面自己布局）',
      '带问候语/统计的个性化头部（那是页面内容，不是标题栏）',
    ],
    props: {
      title: '标题（自动截断）',
      back: '显示返回键；点击只 emit("back")，路由由使用方接',
      'left 插槽': '返回键之外想放左侧内容时用',
      'right 插槽': '右侧操作区（图标按钮）',
    },
    tokens: ['--header-h', '--bg-page', '--border-default', '--control-h', '--z-sticky'],
    a11y: '真实 <header> + <h1>；返回键有 aria-label="Back"；两个槽 ≥44×44；焦点可见',
    demo: {
      components: ['RMobileHeader', 'RButton'],
      setup: `const hint = ref('')`,
      template: `<div style="border:1px solid var(--border-default);border-radius:10px;overflow:hidden">
  <RMobileHeader title="Settings" back @back="hint = 'back'" >
    <template #right><RButton size="small" text>Save</RButton></template>
  </RMobileHeader>
  <p style="padding:16px;color:var(--text-secondary)">{{ hint || '点左侧箭头试试（这里只 emit back，不做路由跳转）' }}</p>
</div>`,
    },
  },
  {
    name: 'RMobileWheelPicker',
    file: 'RMobileWheelPicker.vue',
    summary: '滚轮选择器：吸附滚动 + 中间高亮，常与 RMobileTimePicker 搭配。',
    when: ['移动端选小时/分钟/数量这类有序数字', '需要滑动手感而非点击的选择器'],
    notFor: ['选项带图标或长文本（用 RChipGroup 或列表）', '桌面端（用 RInputNumber 的上下键）'],
    props: {
      options: '候选数字数组',
      modelValue: '当前值',
      format: '每项显示文本，默认 String',
    },
    tokens: ['--color-primary-bg', '--color-primary', '--text-secondary', '--radius-sm'],
    a11y: '点每项即可选中（不依赖手势）；高亮不只用颜色，选中项字号/颜色同时变化',
    demo: {
      components: ['RMobileWheelPicker'],
      setup: `const hour = ref(9)`,
      template: `<div style="max-width:220px">
  <RMobileWheelPicker v-model="hour" :options="[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]" :format="(v) => String(v).padStart(2, '0')" />
  <p style="color:var(--text-secondary)">选中：{{ hour }}</p>
</div>`,
    },
  },
  {
    name: 'RMobileTimePicker',
    file: 'RMobileTimePicker.vue',
    summary: '时间选择底部弹层：双滚轮选时/分，确认后回传 "HH:mm"。',
    when: ['移动端设置提醒时间、番茄时长这类时刻字段'],
    notFor: ['桌面端（用 RTimePicker 的原生控件）', '要选日期（用 RMobileDatePicker）'],
    props: {
      isOpen: '受控显示（配合 @close）',
      modelValue: '"HH:mm"',
      title: '标题，默认 Select Time',
      minuteInterval: '分钟步进，默认 15',
    },
    tokens: ['--bg-card', '--radius-lg', '--color-primary', '--z-modal'],
    a11y: '走 RModal：焦点进层、Tab 循环、ESC 关闭、滚动锁、Android 返回手势只关最上层',
    demo: {
      components: ['RMobileTimePicker', 'RButton'],
      setup: `const open = ref(false)
const time = ref('09:30')`,
      template: `<RButton type="primary" @click="open = true">选时间</RButton>
<p style="color:var(--text-secondary)">当前：{{ time }}</p>
<RMobileTimePicker v-model="time" :is-open="open" @close="open = false" />`,
    },
  },
  {
    name: 'RMobileDatePicker',
    file: 'RMobileDatePicker.vue',
    summary: '日期字段：一个触发按钮 + 底部日历弹层，选完即关，带清空与确认兜底。',
    when: ['移动端表单里的日期字段'],
    notFor: ['桌面端（用 RDatePicker 的原生 input）', '需要范围选择（直接用 RCalendar mode="range"）'],
    props: {
      modelValue: '受控值 Date | null',
      defaultValue: '非受控初始值',
      placeholder: '占位文案',
      disabled: '禁用',
      format: '显示格式化函数',
      minDate: '最早可选',
      maxDate: '最晚可选',
      weekStartsOn: '0=周日开头，1=周一开头',
      showYearSwitcher: '显示上/下一年按钮',
    },
    tokens: ['--bg-card', '--border-default', '--radius-sm', '--control-h'],
    a11y: '触发区是 <button>；清空是独立可点元素并带 aria-label；弹层同 RModal',
    demo: {
      components: ['RMobileDatePicker'],
      setup: `const date = ref(null)`,
      template: `<div style="max-width:360px">
  <RMobileDatePicker v-model="date" placeholder="选择日期" />
  <p style="color:var(--text-secondary)">{{ date ? date.toDateString() : '未选' }}</p>
</div>`,
    },
  },
  {
    name: 'RMobileIconPicker',
    file: 'RMobileIconPicker.vue',
    summary: '图标 + 颜色选择弹层：候选图标名与颜色都由 props 传入，带搜索与预览。',
    when: ['让用户挑一个图标（奖励、成就、分类）', '需要「图标 + 主题色」一起选'],
    notFor: [
      '项目只有固定两三个图标可选（用 RChipGroup 更直接）',
      '图标名不是 Lucide 名称体系的项目',
    ],
    props: {
      isOpen: '受控显示（配合 @close）',
      icons: '候选图标名数组（Lucide 名称）',
      colors: '候选颜色数组，留空则不显示取色区',
      icon: '当前图标名',
      color: '当前颜色',
      title: '标题，默认 Select icon',
      'confirm 事件': '确认时回传 (icon, color)',
    },
    tokens: ['--bg-page', '--bg-elevated', '--color-primary', '--color-primary-bg', '--radius-sm'],
    a11y: '每格是 button + aria-pressed + aria-label；色块同样可 Tab；搜索框有 placeholder',
    demo: {
      components: ['RMobileIconPicker', 'RButton'],
      setup: `const open = ref(false)
const icon = ref('Gift')
const color = ref('#f56565')
const icons = ['Gift','Coffee','BookOpen','Dumbbell','Pizza','Trophy','Crown','Medal','Flame','Target','Rocket','Award']
const colors = ['#f56565','#f9b44e','#3dd68c','#5c73e7','#f0abfc']`,
      template: `<RButton type="primary" @click="open = true">选图标</RButton>
<p style="color:var(--text-secondary)">{{ icon }} / {{ color }}</p>
<RMobileIconPicker :is-open="open" :icons="icons" :colors="colors" :icon="icon" :color="color"
  @confirm="(i, c) => { icon = i; color = c }" @close="open = false" />`,
    },
  },
]
