<!-- 生成物：源在 src/ai/registry.ts -->
# 组件总览

22 个组件。每页都带可交互示例，页面内容与 `ai/manifest.json` 同源（`bun run gen:all` 生成）。

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

- [BaseModal](./BaseModal) — 模态框底座（Teleport + 遮罩 + header/body/footer 三槽 + 移动端底部弹出）。
- [BDialog](./BDialog) — 轻量确认/选择对话框：给一组带图标的选项，点击直接返回选项值。

## 展示与反馈

- [BCard](./BCard) — 内容卡片容器，shadow 三档 + 可选 header 渐变。
- [SkeletonCard](./SkeletonCard) — 卡片骨架屏（shimmer 动画），数据未到位时的占位。
- [SkeletonChart](./SkeletonChart) — 图表骨架屏（虚线走势 + 图例占位）。
- [ErrorBoundary](./ErrorBoundary) — 渲染错误捕获，失败时显示提示 + 重试按钮。
- [OfflineBanner](./OfflineBanner) — 断网提示条（顶栏 sticky，online/offline 事件驱动）。

## 图标

- [LucideIcon](./LucideIcon) — Lucide 图标包装：按名字取图标，缺名时回退显示原名（不会白屏）。
