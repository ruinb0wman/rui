# UI 规范（@ruinb0w/ui）

> 这份文件是**判据**，不是介绍。写代码前查这里；`tokens/tokens.json` 是数值真源，
> 本文件的表格若与它冲突，以 `tokens.json` 为准（`bun run gen:all` 会重算文档与 AI 清单）。

适用项目：GoFundBot（桌面/浏览器，浅色为主）、bow（Electron 深色 chrome）、exp1（Tauri 移动端深色）。
**三个项目共用同一套视觉尺度**，颜色靠主题切换区分。

## 1. 范围

| 类别 | 处理 |
| --- | --- |
| 基础控件（表单、按钮、浮层、反馈、骨架、图标） | 抽进本库，本库维护 |
| 移动端专属基础件（`Mobile*`：底部弹出、滚轮、日历面板、标题栏、横屏 rail） | 抽进本库；桌面端没有对应物或形态必须不同时才收 |
| 有业务依赖的组件（导航、任务卡、弹窗内的业务表单） | 拆成「壳在本库 + 容器在项目」，壳只收 props 与 slots |
| 领域可视化（K 线、ECharts 封装、贡献图、终端、轮盘选择器） | **不进本库**，各项目自己维护，但颜色/间距仍读本库 token |
| 布局模板、路由、状态管理 | 不进本库 |

新增组件准入（四条全满足才进）：① 至少 2 个项目会用，或明确是本库既有的原子补齐；② 不 import 任何项目内的 store / api / router；③ 只用 token，无裸色值与裸尺寸；④ 有 `src/ai/registry.ts` 登记 + 至少一个测试。

**命名与并存**：通用原子用 `B*` / `Base*`，移动端专属用 `Mobile*`。同一功能但形态不同时**并存不合并**，两边 `notFor` 互相点名：

| 桌面/通用 | 移动端 | 差别 |
| --- | --- | --- |
| `BDatePicker`（原生 input） | `MobileDatePicker`（日历面板 + 底部弹层） | 形态完全不同 |
| `BTimePicker`（原生 time） | `MobileTimePicker`（双滚轮） | 形态完全不同 |
| `BaseModal`（居中/任意方向） | `MobilePopup` 不再存在 | 已合并进 `BaseModal` 的 `direction` |
| `BDrawer`（导航项列表） | `BaseModal direction="left"`（任意内容） | 内容是导航项时用 BDrawer |

## 2. 尺度（全项目固定，任何主题都不得改）

| 类别 | 允许值 |
| --- | --- |
| 间距 | `2 / 4 / 8 / 12 / 16 / 24 / 32 / 48` → `--space-05 … --space-7` |
| 圆角 | `6`（控件）`10`（卡片/浮层）`16`（弹窗/抽屉）`999`（胶囊）→ `--radius-sm/md/lg/full` |
| 字号 | `12 / 13 / 14 / 15 / 18 / 24` → `--font-xs/sm/base/md/lg/xl`；正文行高 1.6，紧凑 1.4 |
| 阴影 | 3 档 `--shadow-sm/md/lg`，**阴影属于主题**（深色主题里更接近黑色、更重） |
| 动效 | `--motion-fast` 120ms（hover/focus）、`--motion-base` 200ms（进出场）、`--motion-ease` |
| 层级 | `--z-sticky` 10 / `--z-dropdown` 100 / `--z-modal` 3000 / `--z-toast` 4000 |

没有列出的值就是不允许。需要新档位 → 改 `tokens.json` + 本表，一次改完三个项目。

## 3. 颜色契约

两层，组件**只准读语义层**：

1. **primitives**：色板（明/暗两套灰阶 + 品牌色）——只出现在 `tokens.json` 的主题里，组件不直接引用十六进制值。
2. **语义别名**（组件唯一入口）：

```
背景   --bg-page --bg-primary --bg-card --bg-elevated --bg-hover --bg-subtle --bg-overlay --bg-gradient
文字   --text-primary --text-secondary --text-tertiary --text-disabled --text-inverse
描边   --border-default --border-subtle --border-strong
品牌   --color-primary(-hover/-bg/-border)
状态   --color-success|danger|warning|info (+ -bg / -border)
图表   --chart-1…10 --chart-bg --chart-grid --chart-axis-label
```

- 主题 = 只重新赋值这组语义变量，**不得新增/删除键**（`gen-tokens` 会校验四套主题键集合一致，缺键直接报错）。
- 项目内允许覆盖语义变量（例如某个页面要强调色），**禁止覆盖组件内部 scoped 样式**。真要改行为，回来改组件。
- 金融语义：A 股「红涨绿跌」在展示层映射，不要把 `--color-danger` 当"跌"写进组件。
- **不用 CSS 框架**：本库与所有接入项目一律手写 CSS + 语义变量。不引入 Tailwind/UnoCSS，不写 `@apply`，也不生成 Tailwind `@theme` 适配层 —— 已有的框架用法按组件迁移逐步拆掉，不为兼容它加任何中间层。

### 浮层方向与返回键

`BaseModal` 一个组件覆盖 5 种方向：`center`（默认）/ `bottom` / `top` / `left` / `right`。
底部/顶部自动带拖动条与安全区内距；左右是全高抽屉。

浮层层栈同时服务 **ESC** 与 **宿主返回手势**（Android 返回键、Electron 返回）：
宿主在入口注册一次 `setBackButtonAdapter((onBack) => 退订函数)`，库内所有浮层与
`useBackButtonHandler` 共用同一个栈，返回键与 ESC 关掉的永远是同一层。栈空立刻注销监听
（否则宿主的系统返回会被永久吞掉）。

### 现有主题

| 主题名 | 用途 | 主色 |
| --- | --- | --- |
| `gofund-light`（默认） | GoFundBot 浅色 | `#1677ff` |
| `gofund-dark` | GoFundBot 深色 / VitePress 暗色（`html.dark`） | `#a8b1ff` |
| `bow-dark` | bow 浏览器 chrome | `#4a8ef7` |
| `exp1-dark` | exp1 移动端 | `#f56565` |

切换：`document.documentElement.dataset.theme = 'bow-dark'`。

## 4. 密度（解决三项目尺寸差异）

| 档位 | 控件高 `--control-h` | 小号 `--control-h-sm` | 水平内距 `--control-px` | UI 字号 `--font-ui` | 谁用 |
| --- | --- | --- | --- | --- | --- |
| `compact` | 28px | 24px | 12px | 13px | bow |
| `default` | 36px | 28px | 16px | 14px | GoFundBot（**就是它现有的值，换档才变**） |
| `touch` | 44px | 36px | 20px | 15px | exp1（触控最小 44） |

组件**不设 `size` 以外的尺寸分支**：`size="default"` → `height: var(--control-h)`、`size="small"` → `--control-h-sm`、
`size="large"` → `calc(var(--control-h) + var(--space-2))`；水平内距读 `--control-px`，字读 `--font-ui`。
三档只是同一组语义变量的不同取值，所以换档不需要改组件。

> `default` 取 36px 而不是 32px 是刻意的：36 是 B 系列组件与 GoFundBot 的既有尺寸，选它换来「接入零视觉变化」。
> 想要更紧凑的应用把根节点设成 `data-density="compact"` 即可，别改组件。

## 5. 交互与可访问性底线

- 焦点：`focus-visible` 用 `outline: 2px solid var(--color-primary); outline-offset: 2px`，不许 `outline: none`。
- 键盘：所有可点元素必须可 Tab 到、可回车/空格触发；纯图标按钮要 `aria-label`。
- 浮层：ESC 关闭 + 焦点陷阱 + 遮罩滚动锁 + 层级走 `--z-*`（M2 补齐，见 `BaseModal` 的 a11y 说明）。
- `touch` 档下可点区域不小于 44×44。
- 禁止仅靠颜色传达状态（涨跌/成功失败要有符号或文案）。

## 6. 迁移影响（已确认接受）

| 项目 | 变化 |
| --- | --- |
| GoFundBot | 无视觉变化（尺度本来就取自这里）；只是 import 路径从 `packages/ui` 换到本仓 |
| bow | 面板/弹窗圆角 6 → 10（控件保持 6）；字号沿用 13（`compact`） |
| exp1 | `rounded-xl`(12) → 10；主色/背景保持不变；触控尺寸由 `touch` 档统一 |

### 组件重写（Stage 1，2026-10-24 完成：裸值 97 → 0）

存量组件的裸 px 已全部换成 token。凡是原值不在尺度档上的，**向上/就近吸附到最近档**，可见变化如下（最大 2px）：

| 原值 | 现档位 | 影响面 |
| --- | --- | --- |
| `gap: 6px` | 8px（`--space-2`） | 按钮/勾选/单选/开关的图标与文字间距，略松 |
| `padding: 0 18px` | 16px（`--space-4`） | 默认尺寸按钮左右内距，略窄 |
| `padding: 10px` / `10px 14px` | 12px / 12+16（`--space-3/4`） | 卡片头与卡片体，略宽松 |
| `padding: 20/22px` | 24px（`--space-5`） | 弹窗头/底内距 |
| `font-size: 10px` | 12px（`--font-xs`） | 数字输入框的单位后缀 |
| `font-size: 16px` | 15px（`--font-md`） | 输入框字号 |
| `border-radius: 4px` | 6px（`--radius-sm`） | 勾选框方块 |
| `height: 36/28/44px` | `--control-h` / `--control-h-sm` / `calc(--control-h + --space-2)` | 全部控件；default 档下数值不变（36/28/44），换档才变 |
| `transition: 0.25s / 0.3s` | 200ms（`--motion-base`） | 开关/弹窗过渡略快 |

### 浮层与密度（Stage 2–3，2026-10-24 完成）

- `BaseModal` / `BDialog` 共用 `useOverlayLayer`：ESC 只关最上层、焦点进层 + Tab 循环、关闭回原触发元素、
  body 滚动按层计数加锁、`z-index = --z-modal + 层号`，`to` 可指定 teleport 目标。
- 控件高度/内距/字号全部接密度档（见 §4），三档实测 28 / 36 / 44。

仍未 token 化：裸色值（6 个文件里的 `#fff`/`rgba()` 兜底）留给后续按主题重刷。


### 已知代价：`LucideIcon` 会把整包图标打进去

`LucideIcon` 用 `import * as icons from '@lucide/vue'` 按名字取图标，Rollup 无法摇树 ——
**只要有一个组件用到它，产物里就有全部 ~1500 个图标**（实测 exp1：JS 547kB → 1.27MB）。

exp1 现在（`BTabBar` 的 items、`MobileIconPicker` 的候选表）必须按名字渲染图标，所以吃下了这份体积。
修法（未做）：把 `LucideIcon` 改成「先查注册表，注册表为空才回落到整包」，并让两个消费方
（GoFundBot / exp1）在入口 `registerIcons({ ... })` 只登记真正需要的名字。动之前要确认
GoFundBot 里 `:name="cond ? 'A' : 'B'"` 这类运行期拼出来的名字都登记到了，否则图标会静默消失。

## 7. AI 工作流

新增或使用组件时：

```bash
bun run gen:all      # tokens → CSS/TS + docs 页面 + ai/manifest.json + AI.md（含漂移检查）
bun run check        # lint + typecheck + test + docs build
bun run lint:style   # 报告裸值数量（重写进度）
```

- 文档页（`docs/components/*.md`）与 AI 清单都是**生成物**，改文档 = 改 `src/ai/registry.ts`。
- 漂移检查：`src/components/*.vue` 与 registry 必须一一对应，否则 `gen:ai` 失败。
- 给模型读的入口是仓库根的 `AI.md`（≤ 15KB，先读它，再按需看单页 docs）。
