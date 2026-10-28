import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import RCollapsible from '../RCollapsible.vue'
import RListCard from '../RListCard.vue'

describe('RCollapsible', () => {
  it('默认展开，点标题收起', async () => {
    const w = mount(RCollapsible, {
      props: { title: 'Carried Over', count: 3 },
      slots: { default: () => '内容' },
    })

    expect(w.find('.r-collapsible-body').attributes('style') ?? '').not.toContain('display: none')
    expect(w.find('.r-collapsible-count').text()).toBe('3')
    expect(w.find('.r-collapsible-toggle').attributes('aria-expanded')).toBe('true')

    await w.find('.r-collapsible-toggle').trigger('click')

    expect(w.find('.r-collapsible-body').attributes('style')).toContain('display: none')
    expect(w.find('.r-collapsible-toggle').attributes('aria-expanded')).toBe('false')
  })

  it('defaultCollapsed 初始收起；collapsible=false 时没有折叠交互', async () => {
    const collapsed = mount(RCollapsible, {
      props: { title: 'X', defaultCollapsed: true },
      slots: { default: () => '内容' },
    })
    expect(collapsed.find('.r-collapsible-body').attributes('style')).toContain('display: none')

    const plain = mount(RCollapsible, {
      props: { title: 'X', collapsible: false },
      slots: { default: () => '内容' },
    })
    expect(plain.find('button').exists()).toBe(false)
    expect(plain.find('.r-collapsible-body').attributes('style') ?? '').not.toContain('display: none')
  })

  it('count 为 null 时不渲染徽标', () => {
    const w = mount(RCollapsible, { props: { title: 'X' } })
    expect(w.find('.r-collapsible-count').exists()).toBe(false)
  })
})

describe('RListCard', () => {
  const base = {
    title: '读 20 页书',
    tone: 'primary' as const,
    badges: [{ text: 'L1', type: 'success' as const }],
    meta: [{ text: 'Due 2d', icon: 'AlertTriangle', tone: 'warning' as const }],
    progress: { percent: 40, label: '8/20', color: 'primary' as const },
    status: { text: 'Pending', tone: 'primary' as const },
  }

  it('渲染标题 / 徽标 / 副信息 / 进度 / 状态', () => {
    const w = mount(RListCard, { props: base })

    expect(w.find('.r-listcard-title').text()).toBe('读 20 页书')
    expect(w.find('.r-badge').text()).toBe('L1')
    expect(w.find('.r-listcard-meta-item').text()).toContain('Due 2d')
    expect(w.find('.r-listcard-meta-item').classes()).toContain('r-text--warning')
    expect(w.find('.r-listcard-progress-label').text()).toBe('8/20')
    expect(w.find('.r-listcard-status').text()).toBe('Pending')
    expect(w.find('.r-listcard-icon').classes()).toContain('r-icon--primary')
  })

  it('点击发 click 事件，disabled 时不发', async () => {
    const w = mount(RListCard, { props: base })
    await w.trigger('click')
    expect(w.emitted('click')).toHaveLength(1)

    const disabled = mount(RListCard, { props: { ...base, disabled: true } })
    await disabled.trigger('click')
    expect(disabled.emitted('click')).toBeUndefined()
  })

  it('#icon 插槽覆盖 icon 名', () => {
    const w = mount(RListCard, {
      props: { title: 'X' },
      slots: { icon: () => h('i', { class: 'custom-icon' }) },
    })
    expect(w.find('.custom-icon').exists()).toBe(true)
  })
})
