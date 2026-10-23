# 规范

> 权威全文在仓库根 `DESIGN.md`；本页是压缩版，数值表在 [Token 一览](./tokens)。

三个项目（GoFundBot / bow / exp1）**共用同一套视觉尺度**，只有颜色主题不同。

## 硬规则

| 项 | 规则 |
| --- | --- |
| 颜色 | 只用语义变量 `--bg-* / --text-* / --border-* / --color-*`，禁止裸色值；主题只允许重赋这组变量 |
| 间距 | 只用 `--space-*`（2/4/8/12/16/24/32/48），禁止其他 px |
| 圆角 | 控件 `--radius-sm`(6)、卡片/浮层 `--radius-md`(10)、弹窗 `--radius-lg`(16)、胶囊 `--radius-full` |
| 控件尺寸 | 高度 `var(--control-h)` / 小号 `var(--control-h-sm)`，字号 `var(--font-ui)`，不写 px |
| 动效 | `var(--motion-fast)` 120ms / `var(--motion-base)` 200ms + `var(--motion-ease)` |
| 层级 | `--z-sticky` 10 / `--z-dropdown` 100 / `--z-modal` 3000 / `--z-toast` 4000，禁止 9999 |
| 覆盖 | 允许项目内覆盖语义变量；**禁止覆盖组件内部 scoped 样式** |

## 范围

- 进库：基础控件、浮层、反馈/骨架、图标。
- 拆壳进库：有业务依赖的组件只搬「壳」（props + slots），容器（store/api/router）留在项目。
- 不进库：K 线/ECharts 封装、贡献图、终端、轮盘选择器、布局模板、路由与状态。

新增组件四条准入：≥2 个项目会用（或补齐既有原子）／不 import 项目内 store/api/router／只用 token／有 registry 登记 + 测试。

## 可访问性底线

- `focus-visible` 必须有可见环（`outline: 2px solid var(--color-primary)`），不许 `outline: none`。
- 纯图标按钮要 `aria-label`；可点元素必须可 Tab + 回车/空格触发。
- 浮层：ESC 关闭、焦点陷阱、遮罩滚动锁。
- `touch` 档可点区域 ≥ 44×44。
- 不靠颜色单独传达状态（涨跌/成功失败要带符号或文案）。

## 迁移影响（已确认）

| 项目 | 变化 |
| --- | --- |
| GoFundBot | 无视觉变化，仅 import 路径变化 |
| bow | 面板/弹窗圆角 6 → 10，控件保持 6，字号沿用 13（compact 档） |
| exp1 | `rounded-xl`(12) → 10，主色不变，触控尺寸统一为 touch 档 |
