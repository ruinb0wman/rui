# @ruinb0w/ui — 给 AI 的速查表

Vue 3 组件库。**不要手写这些组件已有的样式或行为，先查这里。**

```ts
import { RButton, RInput } from '@ruinb0w/ui'
import '@ruinb0w/ui/style.css'   // token + 基线样式，应用入口引入一次
```

主题：`document.documentElement.dataset.theme = 'gofund-light'`（可选：gofund-light / gofund-dark / bow-dark / exp1-dark，另有 `html.dark` 兼容 VitePress）
密度：`document.documentElement.dataset.density = 'default'`（compact / default / touch：控件高 28px / 36px / 44px）

## 硬规则

- 只用语义变量（--bg-*/--text-*/--border-*/--color-*），禁止在组件外写死色值
- 只用 --space-* 档位（2/4/8/12/16/24/32/48），禁止裸 px
- 只用 --radius-sm|md|lg|full（6/10/16/999），控件 sm、卡片 md、弹窗 lg
- 控件高度读 --control-h / --control-h-sm，字号读 --font-ui，不要自己写 px
- 过渡只用 var(--motion-fast|base) + var(--motion-ease)
- 浮层层级用 --z-sticky|dropdown|modal|toast，禁止 9999
- 允许在项目内覆盖语义变量，禁止覆盖组件内部 scoped 样式
- 不引入 Tailwind/UnoCSS，不写 @apply，也不做 Tailwind @theme 适配层；只有本库没盖住的样式才在项目里手写 CSS

间距档：2px / 4px / 8px / 12px / 16px / 24px / 32px / 48px
圆角档：sm=6px / md=10px / lg=16px / full=999px
字号档：12px / 13px / 14px / 15px / 18px / 24px
动效：120ms / 200ms / cubic-bezier(0.4, 0, 0.2, 1)
层级：sticky=10 / dropdown=100 / modal=3000 / toast=4000

## 组件

### RButton — 按钮。6 种语义色 × 3 档尺寸，支持 plain/round/circle/text/link/loading。
用：表单提交与主操作；打开弹窗/抽屉的触发点；危险操作入口（type="danger"）；工具栏图标按钮（circle + icon）
别用：页面跳转（用 <a> 或路由链接，按钮不承担导航）；纯装饰性图形
props：`type` `size` `plain` `round` `circle` `text` `link` `loading` `disabled` `nativeType` `icon`
token：--color-primary --color-danger --control-h --radius-sm --motion-fast


### RInput — 输入框 / 密码框 / 文本域（type="textarea"），带清空、字数统计、前缀图标。
用：单行文本、搜索、密码；多行备注（type="textarea" + autosize）
别用：数字输入（用 RInputNumber）；日期/时间（用 RDatePicker / RTimePicker）；下拉选择（用原生 <select> 或列表组件）
props：`modelValue` `type` `size` `placeholder` `clearable` `showPassword` `showWordLimit` `maxlength` `rows` `autosize` `prefixIcon` `suffixIcon` `formatter` `parser`
token：--bg-card --border-default --control-h --radius-sm


### RInputNumber — 数字输入，min/max/step/precision 钳制，带加减控件。
用：金额、份额、期数、阈值等数值字段；需要上下键微调的场景
别用：纯文本数字（如基金代码）—— 用 RInput 保留前导 0
props：`modelValue` `min` `max` `step` `precision` `stepStrictly` `controls` `controlsPosition` `valueOnClear`
token：--bg-card --border-default --control-h --radius-sm


### RCheckbox — 复选框，支持半选（indeterminate）。
用：多选列表；「全选」控制子项（indeterminate）；单个开关式确认（同意条款）
别用：立即生效的开关（用 RSwitch）；互斥选项（用 RRadioGroup）
props：`modelValue` `label` `indeterminate` `disabled` `size`
token：--color-primary --border-default --radius-sm


### RSwitch — 开关，立即生效型布尔切换。
用：设置项即时开关；启用/停用某个功能
别用：提交时才生效的表单项（用 RCheckbox）
props：`modelValue` `activeText` `inactiveText` `loading` `disabled` `size`
token：--color-primary --bg-hover --motion-fast


### RRadio — 单选按钮，必须放在 RRadioGroup 内使用（值由 group 提供）。
用：RRadioGroup 的子项
别用：单独使用（没有 group 上下文时值不会同步）
props：`value` `label` `disabled`
token：--color-primary --control-h


### RRadioGroup — 单选组，provide/inject 管理子项状态，可横向/纵向/描边。
用：2–5 个互斥选项、且选项少到值得全部展示；周期选择（每周/每月/每季）
别用：选项超过 6 个（用 <select> 或列表）；多选（用 RCheckbox）
props：`modelValue` `disabled` `size` `vertical` `border`
token：--color-primary --border-default --control-h


### RDatePicker — 日期选择（原生 date input 的封装，带图标与清空）。
用：交易日期、定投起始日等日期字段
别用：需要日历面板或范围选择（用 RCalendar）
props：`modelValue` `placeholder` `clearable` `min` `max` `size`
token：--bg-card --border-default --control-h


### RCalendar — 日历面板：单选/范围两种模式，固定 6 行不抖高，单元格可整块替换；不限端，宽度跟随容器。
用：需要在页面里内联一块日历（桌面侧栏、移动端弹层、范围筛选都一样用）；范围选择（mode="range"）与 minDate/maxDate 限制；需要在格子里画标记（如打卡点、有数据的日期）
别用：只要一个日期输入框（桌面用 RDatePicker，移动端用 RMobileDatePicker）；K 线/热力图这类领域可视化（项目自己做）
props：`mode` `modelValue` `defaultValue` `defaultMonth` `minDate` `maxDate` `weekStartsOn` `weekDayLabels` `monthLabel` `showYearSwitcher` `cell 插槽`
token：--color-primary --color-primary-bg --text-primary --text-disabled --radius-sm


### RTimePicker — 时间选择（原生 time input 的封装）。
用：提醒时间、交易时间点
别用：需要滚动轮盘（移动端）—— 页面自己实现，别硬套
props：`modelValue` `placeholder` `clearable` `min` `max` `step` `size`
token：--bg-card --border-default --control-h


### RFileInput — 文件选择（隐藏原生 input，trigger 插槽自定义外观）。
用：导入 CSV/图片；需要自定义上传按钮外观时
别用：拖拽上传（未实现 drop 区域）；需要上传进度（本组件不负责传输）
props：`accept` `multiple` `disabled` `placeholder`
token：--bg-card --border-default --radius-sm


### RFormRow — 设置行布局：定宽 label + 控件 + 说明，控件放默认插槽。只管布局，不包表单逻辑。
用：设置页/配置面板的「标签 + 控件」行；需要在控件下方补一句说明（hint）；把控件换行排列（body 内 flex-wrap）
别用：表单校验与错误提示（控件自己负责）；表格/列表行（用列表自己写）
props：`label` `hint` `labelWidth` `align` `默认插槽`
token：--text-secondary --font-ui --font-xs --space-3 --space-4


### RSelect — 原生 select 的壳：统一高度/内距/字号/箭头，选项还是原生 <option>。
用：选项 6 个以上、不值得全部铺开的下拉选择；设置项里的枚举选择（引擎/端口/精度）
别用：2–5 个互斥选项（用 RRadioGroup，少点一次）；可搜索/多选下拉（未实现，项目自己做）
props：`modelValue` `size` `disabled` `ariaLabel` `默认插槽`
token：--bg-card --border-default --control-h --radius-sm --control-px


### RModal — 模态框底座：一个组件吃下居中弹窗、底部/顶部长弹出、左右抽屉五种方向。
用：需要承载任意内容的弹窗（表单、详情）；移动端底部弹出（direction="bottom"，带拖动条与安全区）；侧边抽屉里放任意内容（direction="left"/"right"）
别用：只要两三个按钮的确认（用 RConfirmDialog / RDialog）；纯导航项列表的抽屉（用 RDrawer，已内置导航项样式）；页面内联展开（用 RCard）
props：`visible` `direction` `title` `width` `height` `maxHeight` `hideHandle` `hideOverlay` `animated` `closable` `closeOnOverlay` `closeOnEscape` `header-right 插槽` `to`
token：--bg-overlay --bg-card --shadow-lg --radius-md --radius-lg --z-modal


### RDialog — 轻量确认/选择对话框：给一组带图标的选项，点击直接返回选项值。
用：「导出还是打印」这类 2–4 个带图标的选择；需要图标+副标题的确认框
别用：承载复杂表单（用 RModal）；只有「确定/取消」（用 RModal + footer 更直白）
props：`visible` `title` `subtitle` `options` `closable` `closeOnEscape` `to`
token：--bg-overlay --bg-card --shadow-lg --radius-md --z-modal


### RDrawer — 左侧抽屉导航：导航项由 props 传入、选中靠 key 匹配；复用 useOverlayLayer（ESC / 焦点 / 滚动锁 / 层号）。
用：窄屏把主导航收进抽屉；需要从侧边滑出的次级导航
别用：桌面端常驻侧栏（用普通布局）；居中弹窗（用 RModal）
props：`visible` `title` `items` `activeKey` `width` `closeOnEscape` `to`
token：--bg-card --bg-overlay --radius-sm --control-h --z-modal --shadow-lg


### RTabBar — 移动端底部标签栏：等分图标 + 文字，选中态用主色，已处理底部安全区。
用：手机端 3–5 个一级入口；平板窄布局的底部导航
别用：桌面端顶部导航；可滚动的大量分类（用 RRadioGroup）
props：`items` `activeKey` `isActive` `label` `railOnLandscape` `fillActive`
token：--bg-card --color-primary --font-xs --border-default


### RHamburgerButton — 汉堡菜单按钮：open 时三条线变叉，尺寸跟随密度档。
用：窄屏打开 RDrawer 的触发按钮
别用：桌面端常驻导航；需要图标的普通按钮（用 RButton + RLucideIcon）
props：`open`
token：--control-h --bg-subtle --text-primary --motion-base


### RAlertBell — 告警铃铛 + 下拉规则列表：数据从 props 进、开关与检查动作 emit 出去，组件本身不认识 store。
用：顶栏的告警/通知入口；需要就地开关某条规则的小面板
别用：整页的通知中心；需要分页的复杂列表
props：`items` `unreadCount` `title` `emptyText` `solid`
token：--bg-card --color-danger --z-dropdown --shadow-lg --control-h


### RSettingsNav — 常驻侧栏导航：分组标题 + 选中态 + 右侧角标，宽度与分组全由 props 给。
用：设置页左侧分区导航（常驻，不浮层）；桌面/平板的后台一级导航
别用：移动端抽屉导航（用 RDrawer）；底部标签栏（用 RTabBar）；桌面端顶部导航（用页面自己的 flex 列表）
props：`items` `modelValue` `title` `width` `ariaLabel` `默认插槽`
token：--bg-card --border-default --color-primary-bg --control-h-sm --radius-sm


### RCard — 内容卡片容器，shadow 三档 + 可选 header 渐变。
用：页面内的内容分组；需要 hover 抬起的可点击卡片（shadow="hover"）
别用：页面级布局（用页面自己的 grid/flex）；弹窗容器（用 RModal）
props：`shadow` `header` `bodyStyle`
token：--bg-card --border-default --shadow-sm --radius-md


### RSkeletonCard — 卡片骨架屏（shimmer 动画），数据未到位时的占位。
用：列表/卡片首次加载；轮询刷新时保持布局不跳动
别用：耗时 >3s 且需要说明进度（用进度或文案）
props：`lines` `widths` `height` `title`
token：--bg-subtle --border-subtle --radius-md


### RSkeletonChart — 图表骨架屏（虚线走势 + 图例占位）。
用：K 线/走势图加载中
别用：非图表区域（用 RSkeletonCard）
props：`height` `width`
token：--bg-subtle --border-subtle --radius-md


### RErrorBoundary — 渲染错误捕获，失败时显示提示 + 重试按钮。
用：包住易崩的第三方图表/富文本区域
别用：包裹整个应用（页面级错误交给路由 onError）；异步请求失败（那不是渲染错误）
props：
token：--color-warning --bg-card


### ROfflineBanner — 断网提示条（顶栏 sticky，online/offline 事件驱动）。
用：应用级布局顶部放一条，浏览器离线时自动出现
别用：接口报错提示（那是请求层的事）
props：
token：--color-warning --z-toast


### RLucideIcon — Lucide 图标包装：按名字取图标；本库内置十几个自用图标，其他名字由消费方 registerIcons() 登记，未登记时显示原名（不回落到整包）。
用：所有图标的地方（统一尺寸与描边）
别用：需要两个图标叠加/自定义 path 的场景；直接 import 图标组件就能渲染的地方（少一层按名查表，也不会漏登记）
props：`name` `size` `color` `strokeWidth`
token：--text-secondary


### REmptyState — 空状态占位：圆形图标位 + 标题 + 说明，图标可用插槽换。
用：列表没有数据；搜索无结果；首次使用时引导用户创建
别用：加载中的占位（用 RLoadingState / RSkeletonCard）；请求失败（用 RErrorState）
props：`title` `description` `默认插槽` `action 插槽`
token：--bg-card --text-tertiary --radius-full --space-7


### RLoadingState — 加载态：主色圆环 spinner + 可选文案，三档尺寸。
用：首次加载、切换数据源时的整块占位
别用：已知结构的列表刷新（用 RSkeletonCard 保持布局不跳）；按钮内部加载（用 RButton 的 loading）
props：`message` `size`
token：--color-primary --text-tertiary --space-6 --space-7


### RErrorState — 失败态：一句标题 + 可选重试按钮（只在传了 @retry 时渲染）。
用：请求失败、数据读不出来；需要给用户一个重试入口
别用：表单校验错误（写在字段旁）；空数据（用 REmptyState）
props：`title` `retryLabel` `retry 事件`
token：--color-primary --text-tertiary --radius-sm


### RProgress — 进度条：value/max 两参数，颜色走语义色，可显示百分比。
用：完成度、任务进度、容量占用；需要在条上叠加文案时把文案放外面
别用：不定长加载（用 RLoadingState）；环形/多段进度（项目自己画或用图表库）
props：`value` `max` `size` `color` `showLabel` `label`
token：--color-primary --bg-card --radius-full --motion-base


### RConfirmDialog — 确认/提示对话框（受控）：图标 + 标题 + 说明 + 确定/取消。
用：直接渲染确认框的场合（自己持有 visible 状态）
别用：想用 await confirm({...}) 的写法（用 RConfirmHost + useConfirm）；需要多个带图标选项（用 RDialog）；承载表单（用 RModal）
props：`visible` `message` `title` `confirmLabel` `cancelLabel` `variant` `alertOnly`
token：--color-danger --color-warning --color-info --bg-card --radius-lg


### RConfirmHost — 确认框宿主：应用根挂一次，useConfirm()/useAlert() 就能 await。
用：替代 window.alert / window.confirm（Android WebView 会丢弃 alert，Electron 里会阻塞渲染）
别用：只需要一次性的静态弹窗（直接写 RConfirmDialog）
props：
token：--color-danger --color-warning --color-info


### RChipGroup — 胶囊选择组：单选/多选 × 横滑/等分网格，四种形态一个组件。
用：筛选项、标签选择、星期多选；选项数量固定且都值得展示（2–12 个）
别用：选项很多且需要搜索（用 RInput + 列表）；开关语义（用 RSwitch）
props：`options` `modelValue` `multiple` `layout` `columns` `itemWidth` `size` `disabled` `label 插槽`
token：--color-primary --bg-card --border-default --radius-full --control-h


### RBadge — 状态徽标：语义色胶囊 + 可选圆点，只用圆点就是状态灯（可脉冲表示进行中）。
用：列表/标签上的状态标记（在跑 / 等你 / 失败）；导航项右侧的角标（核心 / Beta）；工具栏状态灯（dot + pulse）
别用：未读数字气泡（需要绝对定位贴角，项目自己写）；交互式标签筛选（用 RChipGroup）
props：`type` `dot` `pulse` `round` `默认插槽`
token：--color-*-bg --color-* --font-xs --radius-sm --radius-full


### RMobileHeader — 移动端页面标题栏：返回键 + 居中标题 + 左右两个 44px 槽，高度读 --header-h。
用：移动端二级页面的顶部栏；需要左右各放一个图标按钮的标题栏
别用：需要塞下拉菜单、搜索框的桌面顶栏（用页面自己布局）；带问候语/统计的个性化头部（那是页面内容，不是标题栏）
props：`title` `back` `left 插槽` `right 插槽`
token：--header-h --bg-page --border-default --control-h --z-sticky


### RMobileWheelPicker — 滚轮选择器：吸附滚动 + 中间高亮，常与 RMobileTimePicker 搭配。
用：移动端选小时/分钟/数量这类有序数字；需要滑动手感而非点击的选择器
别用：选项带图标或长文本（用 RChipGroup 或列表）；桌面端（用 RInputNumber 的上下键）
props：`options` `modelValue` `format`
token：--color-primary-bg --color-primary --text-secondary --radius-sm


### RMobileTimePicker — 时间选择底部弹层：双滚轮选时/分，确认后回传 "HH:mm"。
用：移动端设置提醒时间、番茄时长这类时刻字段
别用：桌面端（用 RTimePicker 的原生控件）；要选日期（用 RMobileDatePicker）
props：`isOpen` `modelValue` `title` `minuteInterval`
token：--bg-card --radius-lg --color-primary --z-modal


### RMobileDatePicker — 日期字段：一个触发按钮 + 底部日历弹层，选完即关，带清空与确认兜底。
用：移动端表单里的日期字段
别用：桌面端（用 RDatePicker 的原生 input）；需要范围选择（直接用 RCalendar mode="range"）
props：`modelValue` `defaultValue` `placeholder` `disabled` `format` `minDate` `maxDate` `weekStartsOn` `showYearSwitcher`
token：--bg-card --border-default --radius-sm --control-h


### RMobileIconPicker — 图标 + 颜色选择弹层：候选图标名与颜色都由 props 传入，带搜索与预览。
用：让用户挑一个图标（奖励、成就、分类）；需要「图标 + 主题色」一起选
别用：项目只有固定两三个图标可选（用 RChipGroup 更直接）；图标名不是 Lucide 名称体系的项目
props：`isOpen` `icons` `colors` `icon` `color` `title` `confirm 事件`
token：--bg-page --bg-elevated --color-primary --color-primary-bg --radius-sm


## 其它导出

- `useOnlineStatus` — 返回 { isOnline }，监听 window online/offline（SSR 安全）。
- `registerIcons({ Search, Trash2 })` — **消费方入口必须调一次**：把本项目用到的 lucide 图标按名字登记给 RLucideIcon。没有「回落整包」——未登记的名字只显示图标名 + warn（回落会把 ~1500 个图标 / 约 1MB 打进产物）。内置列表之外的图标都要登记，运行期拼出来的名字（cond ? "A" : "B"）两个分支都要登记。
- `lightTokens / darkTokens / getTokens(mode)` — 与 CSS 变量同源的 TS 常量，供 ECharts 等 JS 侧读取。
- `themeNames` — 全部合法主题名：gofund-light / gofund-dark / bow-dark / exp1-dark。
- `useOverlayLayer({ visible, container, onEscape })` — 浮层行为内核：返回 { zIndex, isTop }。ESC 只关最上层、焦点进层并在 Tab 间循环、关闭后回到原触发元素、body 滚动按层计数加锁、z-index = --z-modal + 层号。自建浮层（抽屉/popover/右键菜单）复用它，别各写一份。

## 详细文档

每个组件一页（含可交互 demo 与 props 全表）：docs/components/<组件名>.md。
规范：DESIGN.md。机器可读清单：ai/manifest.json。
