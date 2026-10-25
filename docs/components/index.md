<!-- 生成物：源在 src/ai/registry.ts -->
# 组件总览

35 个组件。每页都带可交互示例，页面内容与 `ai/manifest.json` 同源（`bun run gen:all` 生成）。

## 表单控件

- [BButton](./BButton) — 按钮。6 种语义色 × 3 档尺寸，支持 plain/round/circle/text/link/loading。
- [BInput](./BInput) — 输入框 / 密码框 / 文本域（type="textarea"），带清空、字数统计、前缀图标。
- [BInputNumber](./BInputNumber) — 数字输入，min/max/step/precision 钳制，带加减控件。
- [BCheckbox](./BCheckbox) — 复选框，支持半选（indeterminate）。
- [BSwitch](./BSwitch) — 开关，立即生效型布尔切换。
- [BRadio](./BRadio) — 单选按钮，必须放在 BRadioGroup 内使用（值由 group 提供）。
- [BRadioGroup](./BRadioGroup) — 单选组，provide/inject 管理子项状态，可横向/纵向/描边。
- [BDatePicker](./BDatePicker) — 日期选择（原生 date input 的封装，带图标与清空）。
- [BTimePicker](./BTimePicker) — 时间选择（原生 time input 的封装）。
- [BFileInput](./BFileInput) — 文件选择（隐藏原生 input，trigger 插槽自定义外观）。

## 浮层

- [BaseModal](./BaseModal) — 模态框底座：一个组件吃下居中弹窗、底部/顶部长弹出、左右抽屉五种方向。
- [BDialog](./BDialog) — 轻量确认/选择对话框：给一组带图标的选项，点击直接返回选项值。
- [BDrawer](./BDrawer) — 左侧抽屉导航：导航项由 props 传入、选中靠 key 匹配；复用 useOverlayLayer（ESC / 焦点 / 滚动锁 / 层号）。

## 导航与通知

- [BTabBar](./BTabBar) — 移动端底部标签栏：等分图标 + 文字，选中态用主色，已处理底部安全区。
- [BHamburgerButton](./BHamburgerButton) — 汉堡菜单按钮：open 时三条线变叉，尺寸跟随密度档。
- [BAlertBell](./BAlertBell) — 告警铃铛 + 下拉规则列表：数据从 props 进、开关与检查动作 emit 出去，组件本身不认识 store。

## 展示与反馈

- [BCard](./BCard) — 内容卡片容器，shadow 三档 + 可选 header 渐变。
- [SkeletonCard](./SkeletonCard) — 卡片骨架屏（shimmer 动画），数据未到位时的占位。
- [SkeletonChart](./SkeletonChart) — 图表骨架屏（虚线走势 + 图例占位）。
- [ErrorBoundary](./ErrorBoundary) — 渲染错误捕获，失败时显示提示 + 重试按钮。
- [OfflineBanner](./OfflineBanner) — 断网提示条（顶栏 sticky，online/offline 事件驱动）。
- [LucideIcon](./LucideIcon) — Lucide 图标包装：按名字取图标，缺名时回退显示原名（不会白屏）。
- [BEmptyState](./BEmptyState) — 空状态占位：圆形图标位 + 标题 + 说明，图标可用插槽换。
- [BLoadingState](./BLoadingState) — 加载态：主色圆环 spinner + 可选文案，三档尺寸。
- [BErrorState](./BErrorState) — 失败态：一句标题 + 可选重试按钮（只在传了 @retry 时渲染）。
- [BProgress](./BProgress) — 进度条：value/max 两参数，颜色走语义色，可显示百分比。
- [BConfirmDialog](./BConfirmDialog) — 确认/提示对话框（受控）：图标 + 标题 + 说明 + 确定/取消。
- [BConfirmHost](./BConfirmHost) — 确认框宿主：应用根挂一次，useConfirm()/useAlert() 就能 await。
- [BChipGroup](./BChipGroup) — 胶囊选择组：单选/多选 × 横滑/等分网格，四种形态一个组件。

## 移动端

- [MobileHeader](./MobileHeader) — 移动端页面标题栏：返回键 + 居中标题 + 左右两个 44px 槽，高度读 --header-h。
- [MobileCalendar](./MobileCalendar) — 日历面板：单选/范围两种模式，固定 6 行不抖高，单元格可整块替换。
- [MobileWheelPicker](./MobileWheelPicker) — 滚轮选择器：吸附滚动 + 中间高亮，常与 MobileTimePicker 搭配。
- [MobileTimePicker](./MobileTimePicker) — 时间选择底部弹层：双滚轮选时/分，确认后回传 "HH:mm"。
- [MobileDatePicker](./MobileDatePicker) — 日期字段：一个触发按钮 + 底部日历弹层，选完即关，带清空与确认兜底。
- [MobileIconPicker](./MobileIconPicker) — 图标 + 颜色选择弹层：候选图标名与颜色都由 props 传入，带搜索与预览。
