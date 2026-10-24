/** 表单控件 —— 输入/选择类：B* 表单控件。 */
import type { ComponentSpec } from '../types'

export const forms: ComponentSpec[] = [
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
]
