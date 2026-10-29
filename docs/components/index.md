<!-- 生成物：源在 src/ai/registry.ts -->
# 组件总览

42 个组件。每页都带可交互示例，页面内容与 `ai/manifest.json` 同源（`bun run gen:all` 生成）。

## 表单控件

- [RButton](./RButton) — 按钮。6 种语义色 × 3 档尺寸，支持 plain/round/circle/text/link/loading。
- [RInput](./RInput) — 输入框 / 密码框 / 文本域（type="textarea"），带清空、字数统计、前缀图标。
- [RInputNumber](./RInputNumber) — 数字输入，min/max/step/precision 钳制，带加减控件。
- [RCheckbox](./RCheckbox) — 复选框，支持半选（indeterminate）。
- [RSwitch](./RSwitch) — 开关，立即生效型布尔切换。
- [RRadio](./RRadio) — 单选按钮，必须放在 RRadioGroup 内使用（值由 group 提供）。
- [RRadioGroup](./RRadioGroup) — 单选组，provide/inject 管理子项状态，可横向/纵向/描边。
- [RDatePicker](./RDatePicker) — 日期选择（原生 date input 的封装，带图标与清空）。
- [RCalendar](./RCalendar) — 日历面板：单选/范围两种模式，固定 6 行不抖高，单元格可整块替换；不限端，宽度跟随容器。
- [RTimePicker](./RTimePicker) — 时间选择（原生 time input 的封装）。
- [RFileInput](./RFileInput) — 文件选择（隐藏原生 input，trigger 插槽自定义外观）。
- [RFormRow](./RFormRow) — 设置行布局：定宽 label + 控件 + 说明，控件放默认插槽。只管布局，不包表单逻辑。
- [RSelect](./RSelect) — 原生 select 的壳：统一高度/内距/字号/箭头，选项还是原生 &lt;option&gt;。

## 浮层

- [RModal](./RModal) — 模态框底座：一个组件吃下居中弹窗、底部/顶部长弹出、左右抽屉五种方向。
- [RDialog](./RDialog) — 轻量确认/选择对话框：给一组带图标的选项，点击直接返回选项值。
- [RDrawer](./RDrawer) — 左侧抽屉导航：导航项由 props 传入、选中靠 key 匹配；复用 useOverlayLayer（ESC / 焦点 / 滚动锁 / 层号）。

## 导航与通知

- [RTabBar](./RTabBar) — 移动端底部标签栏：等分图标 + 文字，选中态用主色，已处理底部安全区。
- [RHamburgerButton](./RHamburgerButton) — 汉堡菜单按钮：open 时三条线变叉，尺寸跟随密度档。
- [RAlertBell](./RAlertBell) — 告警铃铛 + 下拉规则列表：数据从 props 进、开关与检查动作 emit 出去，组件本身不认识 store。
- [RSettingsNav](./RSettingsNav) — 常驻侧栏导航：分组标题 + 选中态 + 右侧角标，宽度与分组全由 props 给。

## 展示与反馈

- [RCard](./RCard) — 内容卡片容器，shadow 三档 + 可选 header 渐变。
- [RSkeletonCard](./RSkeletonCard) — 卡片骨架屏（shimmer 动画），数据未到位时的占位。
- [RSkeletonChart](./RSkeletonChart) — 图表骨架屏（虚线走势 + 图例占位）。
- [RErrorBoundary](./RErrorBoundary) — 渲染错误捕获，失败时显示提示 + 重试按钮。
- [ROfflineBanner](./ROfflineBanner) — 断网提示条（顶栏 sticky，online/offline 事件驱动）。
- [RLucideIcon](./RLucideIcon) — Lucide 图标包装：按名字取图标；本库内置十几个自用图标，其他名字由消费方 registerIcons() 登记，未登记时显示原名（不回落到整包）。
- [REmptyState](./REmptyState) — 空状态占位：圆形图标位 + 标题 + 说明，图标可用插槽换。
- [RLoadingState](./RLoadingState) — 加载态：主色圆环 spinner + 可选文案，三档尺寸。
- [RErrorState](./RErrorState) — 失败态：一句标题 + 可选重试按钮（只在传了 @retry 时渲染）。
- [RProgress](./RProgress) — 进度条：value/max 两参数，颜色走语义色，可显示百分比。
- [RConfirmDialog](./RConfirmDialog) — 确认/提示对话框（受控）：图标 + 标题 + 说明 + 确定/取消。
- [RConfirmHost](./RConfirmHost) — 确认框宿主：应用根挂一次，useConfirm()/useAlert() 就能 await。
- [RChipGroup](./RChipGroup) — 胶囊选择组：单选/多选 × 横滑/等分网格，四种形态一个组件。
- [RBadge](./RBadge) — 状态徽标：语义色胶囊 + 可选圆点，只用圆点就是状态灯（可脉冲表示进行中）。
- [RListCard](./RListCard) — 列表卡片壳：首列图标方块 + 标题行徽标 + 副信息行 + 可选进度条 + 尾部状态，数据用 props 喂。
- [RInfoTip](./RInfoTip) — 字段说明气泡：一个 ⓘ 图标，hover / 聚焦 / 点击弹出解释。替代原生 title（延迟 1s、不可样式化、触屏看不到）。
- [RCollapsible](./RCollapsible) — 可折叠区块：标题 + 数量徽标 + 右侧操作，内部自管展开状态（默认可收起）。

## 移动端

- [RMobileHeader](./RMobileHeader) — 移动端页面标题栏：返回键 + 居中标题 + 左右两个 44px 槽，高度读 --header-h。
- [RMobileWheelPicker](./RMobileWheelPicker) — 滚轮选择器：吸附滚动 + 中间高亮，常与 RMobileTimePicker 搭配。
- [RMobileTimePicker](./RMobileTimePicker) — 时间选择底部弹层：双滚轮选时/分，确认后回传 "HH:mm"。
- [RMobileDatePicker](./RMobileDatePicker) — 日期字段：一个触发按钮 + 底部日历弹层，选完即关，带清空与确认兜底。
- [RMobileIconPicker](./RMobileIconPicker) — 图标 + 颜色选择弹层：候选图标名与颜色都由 props 传入，带搜索与预览。
