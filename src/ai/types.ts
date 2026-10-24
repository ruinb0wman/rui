/** 注册表条目的类型（实现见 entries/，聚合见 registry.ts） */
export interface DemoSpec {
  /** demo 里用到的组件名（从 src/components 自动 import） */
  components: string[]
  /** 需要额外逻辑时写在这里（可用 ref / computed） */
  setup?: string
  template: string
}

export interface ComponentSpec {
  name: string
  file: string
  summary: string
  when: string[]
  notFor: string[]
  props: Record<string, string>
  tokens: string[]
  a11y?: string
  demo?: DemoSpec
}
