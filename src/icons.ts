/**
 * 图标注册表：让 `RLucideIcon` 按名字渲染而不把整包图标打进产物。
 *
 * 为什么需要：`@lucide/vue` 有 ~1500 个图标，按名字取只能 `import * as icons`，
 * Rollup 摇不掉 → 只要有一个组件用 `RLucideIcon`，消费方产物就多出整包。
 *
 * 用法（消费方入口调一次，传本项目真正用到的图标组件）：
 *   import { registerIcons } from '@ruinb0w/ui'
 *   import { Search, Trash2, X } from '@lucide/vue'
 *   registerIcons({ Search, Trash2, X })
 *
 * 没登记的名字不会白屏：回退显示图标名，并在控制台 warn 一次。
 * **不提供「回落整包」** —— 那是 `import('@lucide/vue')`，Rollup 摇不掉命名空间访问，
 * 会把 ~1500 个图标（1MB）打进消费方产物，而且动态 chunk 会被静态导入方连带拉起来。
 */
import type { Component } from 'vue'
import {
  AlertTriangle,
  Bell,
  BellRing,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Eye,
  EyeOff,
  Info,
  Loader,
  Plus,
  Search,
  WifiOff,
  X,
} from '@lucide/vue'

/** 库内组件写死的图标：静态命名导入，摇树后只有这十几个，不占体积 */
const BUILTIN: Record<string, Component> = {
  AlertTriangle,
  Bell,
  BellRing,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Eye,
  EyeOff,
  Info,
  Loader,
  Plus,
  Search,
  WifiOff,
  X,
}

const registry = new Map<string, Component>(Object.entries(BUILTIN))

/** 登记本项目的图标名（名字必须与 `@lucide/vue` 的导出名一致） */
export function registerIcons(icons: Record<string, Component>): void {
  for (const [name, icon] of Object.entries(icons)) registry.set(name, icon)
}

/** 按名字查表；未登记返回 undefined（由 `RLucideIcon` 回落到懒加载） */
export function resolveIcon(name: string): Component | undefined {
  return registry.get(name)
}
