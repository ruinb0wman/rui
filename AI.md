# @ruinb0w/ui — 给 AI 的速查表

Vue 3 组件库。**不要手写这些组件已有的样式或行为，先查这里。**

```ts
import { BButton, BInput } from '@ruinb0w/ui'
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

### BButton — 按钮。6 种语义色 × 3 档尺寸，支持 plain/round/circle/text/link/loading。
用：表单提交与主操作；打开弹窗/抽屉的触发点；危险操作入口（type="danger"）；工具栏图标按钮（circle + icon）
别用：页面跳转（用 <a> 或路由链接，按钮不承担导航）；纯装饰性图形
props：`type` `size` `plain` `round` `circle` `text` `link` `loading` `disabled` `nativeType` `icon`
token：--color-primary --color-danger --control-h --radius-sm --motion-fast


### BInput — 输入框 / 密码框 / 文本域（type="textarea"），带清空、字数统计、前缀图标。
用：单行文本、搜索、密码；多行备注（type="textarea" + autosize）
别用：数字输入（用 BInputNumber）；日期/时间（用 BDatePicker / BTimePicker）；下拉选择（用原生 <select> 或列表组件）
props：`modelValue` `type` `size` `placeholder` `clearable` `showPassword` `showWordLimit` `maxlength` `rows` `autosize` `prefixIcon` `suffixIcon` `formatter` `parser`
token：--bg-card --border-default --control-h --radius-sm


### BInputNumber — 数字输入，min/max/step/precision 钳制，带加减控件。
用：金额、份额、期数、阈值等数值字段；需要上下键微调的场景
别用：纯文本数字（如基金代码）—— 用 BInput 保留前导 0
props：`modelValue` `min` `max` `step` `precision` `stepStrictly` `controls` `controlsPosition` `valueOnClear`
token：--bg-card --border-default --control-h --radius-sm


### BCheckbox — 复选框，支持半选（indeterminate）。
用：多选列表；「全选」控制子项（indeterminate）；单个开关式确认（同意条款）
别用：立即生效的开关（用 BSwitch）；互斥选项（用 BRadioGroup）
props：`modelValue` `label` `indeterminate` `disabled` `size`
token：--color-primary --border-default --radius-sm


### BSwitch — 开关，立即生效型布尔切换。
用：设置项即时开关；启用/停用某个功能
别用：提交时才生效的表单项（用 BCheckbox）
props：`modelValue` `activeText` `inactiveText` `loading` `disabled` `size`
token：--color-primary --bg-hover --motion-fast


### BRadio — 单选按钮，必须放在 BRadioGroup 内使用（值由 group 提供）。
用：BRadioGroup 的子项
别用：单独使用（没有 group 上下文时值不会同步）
props：`value` `label` `disabled`
token：--color-primary --control-h


### BRadioGroup — 单选组，provide/inject 管理子项状态，可横向/纵向/描边。
用：2–5 个互斥选项、且选项少到值得全部展示；周期选择（每周/每月/每季）
别用：选项超过 6 个（用 <select> 或列表）；多选（用 BCheckbox）
props：`modelValue` `disabled` `size` `vertical` `border`
token：--color-primary --border-default --control-h


### BDatePicker — 日期选择（原生 date input 的封装，带图标与清空）。
用：交易日期、定投起始日等日期字段
别用：需要日历面板/范围选择的场景（当前只封装原生控件，移动端要自己换成 wheel picker）
props：`modelValue` `placeholder` `clearable` `min` `max` `size`
token：--bg-card --border-default --control-h


### BTimePicker — 时间选择（原生 time input 的封装）。
用：提醒时间、交易时间点
别用：需要滚动轮盘（移动端）—— 页面自己实现，别硬套
props：`modelValue` `placeholder` `clearable` `min` `max` `step` `size`
token：--bg-card --border-default --control-h


### BFileInput — 文件选择（隐藏原生 input，trigger 插槽自定义外观）。
用：导入 CSV/图片；需要自定义上传按钮外观时
别用：拖拽上传（未实现 drop 区域）；需要上传进度（本组件不负责传输）
props：`accept` `multiple` `disabled` `placeholder`
token：--bg-card --border-default --radius-sm


### BaseModal — 模态框底座（Teleport + 遮罩 + header/body/footer 三槽 + 移动端底部弹出）。
用：需要承载任意内容的弹窗（表单、详情）；需要 footer 操作区的确认流程
别用：只要两三个按钮的确认（用 BDialog 更轻）；页面内联展开（用 BCard）
props：`visible` `title` `width` `height` `closable` `closeOnOverlay` `closeOnEscape` `to`
token：--bg-overlay --bg-card --shadow-lg --radius-md --z-modal


### BDialog — 轻量确认/选择对话框：给一组带图标的选项，点击直接返回选项值。
用：「导出还是打印」这类 2–4 个带图标的选择；需要图标+副标题的确认框
别用：承载复杂表单（用 BaseModal）；只有「确定/取消」（用 BaseModal + footer 更直白）
props：`visible` `title` `subtitle` `options` `closable` `closeOnEscape` `to`
token：--bg-overlay --bg-card --shadow-lg --radius-md --z-modal


### BDrawer — 左侧抽屉导航：导航项由 props 传入、选中靠 key 匹配；复用 useOverlayLayer（ESC / 焦点 / 滚动锁 / 层号）。
用：窄屏把主导航收进抽屉；需要从侧边滑出的次级导航
别用：桌面端常驻侧栏（用普通布局）；居中弹窗（用 BaseModal）
props：`visible` `title` `items` `activeKey` `width` `closeOnEscape` `to`
token：--bg-card --bg-overlay --radius-sm --control-h --z-modal --shadow-lg


### BTabBar — 移动端底部标签栏：等分图标 + 文字，选中态用主色，已处理底部安全区。
用：手机端 3–5 个一级入口；平板窄布局的底部导航
别用：桌面端顶部导航；可滚动的大量分类（用 BRadioGroup）
props：`items` `activeKey` `label`
token：--bg-card --color-primary --font-xs --border-default


### BHamburgerButton — 汉堡菜单按钮：open 时三条线变叉，尺寸跟随密度档。
用：窄屏打开 BDrawer 的触发按钮
别用：桌面端常驻导航；需要图标的普通按钮（用 BButton + LucideIcon）
props：`open`
token：--control-h --bg-subtle --text-primary --motion-base


### BAlertBell — 告警铃铛 + 下拉规则列表：数据从 props 进、开关与检查动作 emit 出去，组件本身不认识 store。
用：顶栏的告警/通知入口；需要就地开关某条规则的小面板
别用：整页的通知中心；需要分页的复杂列表
props：`items` `unreadCount` `title` `emptyText` `solid`
token：--bg-card --color-danger --z-dropdown --shadow-lg --control-h


### BCard — 内容卡片容器，shadow 三档 + 可选 header 渐变。
用：页面内的内容分组；需要 hover 抬起的可点击卡片（shadow="hover"）
别用：页面级布局（用页面自己的 grid/flex）；弹窗容器（用 BaseModal）
props：`shadow` `header` `bodyStyle`
token：--bg-card --border-default --shadow-sm --radius-md


### SkeletonCard — 卡片骨架屏（shimmer 动画），数据未到位时的占位。
用：列表/卡片首次加载；轮询刷新时保持布局不跳动
别用：耗时 >3s 且需要说明进度（用进度或文案）
props：`lines` `widths` `height` `title`
token：--bg-subtle --border-subtle --radius-md


### SkeletonChart — 图表骨架屏（虚线走势 + 图例占位）。
用：K 线/走势图加载中
别用：非图表区域（用 SkeletonCard）
props：`height` `width`
token：--bg-subtle --border-subtle --radius-md


### ErrorBoundary — 渲染错误捕获，失败时显示提示 + 重试按钮。
用：包住易崩的第三方图表/富文本区域
别用：包裹整个应用（页面级错误交给路由 onError）；异步请求失败（那不是渲染错误）
props：
token：--color-warning --bg-card


### OfflineBanner — 断网提示条（顶栏 sticky，online/offline 事件驱动）。
用：应用级布局顶部放一条，浏览器离线时自动出现
别用：接口报错提示（那是请求层的事）
props：
token：--color-warning --z-toast


### LucideIcon — Lucide 图标包装：按名字取图标，缺名时回退显示原名（不会白屏）。
用：所有图标的地方（统一尺寸与描边）
别用：需要两个图标叠加/自定义 path 的场景
props：`name` `size` `color` `strokeWidth`
token：--text-secondary


## 其它导出

- `useOnlineStatus` — 返回 { isOnline }，监听 window online/offline（SSR 安全）。
- `lightTokens / darkTokens / getTokens(mode)` — 与 CSS 变量同源的 TS 常量，供 ECharts 等 JS 侧读取。
- `themeNames` — 全部合法主题名：gofund-light / gofund-dark / bow-dark / exp1-dark。
- `useOverlayLayer({ visible, container, onEscape })` — 浮层行为内核：返回 { zIndex, isTop }。ESC 只关最上层、焦点进层并在 Tab 间循环、关闭后回到原触发元素、body 滚动按层计数加锁、z-index = --z-modal + 层号。自建浮层（抽屉/popover/右键菜单）复用它，别各写一份。

## 详细文档

每个组件一页（含可交互 demo 与 props 全表）：docs/components/<组件名>.md。
规范：DESIGN.md。机器可读清单：ai/manifest.json。
