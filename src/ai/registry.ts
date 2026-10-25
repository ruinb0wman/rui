/**
 * 组件注册表 —— 文档页（docs/components/*.md）与 AI 清单（ai/manifest.json、AI.md）的唯一真源。
 * 加组件：先写组件，再在 entries/ 对应分组里加一条，然后 `bun run gen:all`
 * （漂移测试会拦「有 .vue 但没登记」的情况）。
 *
 * 字段约定：
 * - summary：一句话，写给 AI 挑组件时判断用
 * - when / notFor：AI 最需要的两个字段（该用 / 别用）
 * - props：只列人话说明，类型以 .vue 的 defineProps 为准
 * - demo：会原样嵌进 VitePress 页面（ClientOnly 包裹），components 里的名字自动 import
 */
import type { ComponentSpec } from './types'
import { forms } from './entries/forms'
import { overlay } from './entries/overlay'
import { nav } from './entries/nav'
import { data } from './entries/data'
import { mobile } from './entries/mobile'

export type { ComponentSpec, DemoSpec } from './types'

/** 分组即文档侧边栏（gen-docs 直接用它，别再维护第二份组件名单） */
export const componentGroups: Array<{ title: string; items: ComponentSpec[] }> = [
  { title: '表单控件', items: forms },
  { title: '浮层', items: overlay },
  { title: '导航与通知', items: nav },
  { title: '展示与反馈', items: data },
  { title: '移动端', items: mobile },
]

export const components: ComponentSpec[] = componentGroups.flatMap((g) => g.items)

/** 非组件但属于公共面：composable / token 常量 */
export const extras = [
  { name: 'useOnlineStatus', summary: '返回 { isOnline }，监听 window online/offline（SSR 安全）。' },
  { name: 'lightTokens / darkTokens / getTokens(mode)', summary: '与 CSS 变量同源的 TS 常量，供 ECharts 等 JS 侧读取。' },
  { name: 'themeNames', summary: '全部合法主题名：gofund-light / gofund-dark / bow-dark / exp1-dark。' },
  { name: 'useOverlayLayer({ visible, container, onEscape })', summary: '浮层行为内核：返回 { zIndex, isTop }。ESC 只关最上层、焦点进层并在 Tab 间循环、关闭后回到原触发元素、body 滚动按层计数加锁、z-index = --z-modal + 层号。自建浮层（抽屉/popover/右键菜单）复用它，别各写一份。' },
]
