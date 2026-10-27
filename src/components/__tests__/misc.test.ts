import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BSwitch from '../BSwitch.vue'
import BCard from '../BCard.vue'
import SkeletonCard from '../SkeletonCard.vue'

describe('BSwitch', () => {
  it('renders with aria-checked state', async () => {
    const wrapper = mount(BSwitch, { props: { modelValue: true } })
    expect(wrapper.classes()).toContain('b-switch--checked')
    expect(wrapper.attributes('aria-checked')).toBe('true')
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(BSwitch)
    await wrapper.trigger('click')
    const events = wrapper.emitted('update:modelValue')!
    expect(events[events.length - 1]).toEqual([true])
  })

  it('does not toggle when disabled', async () => {
    const wrapper = mount(BSwitch, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})

describe('BCard', () => {
  it('renders header and default slot', () => {
    const wrapper = mount(BCard, {
      props: { header: '标题' },
      slots: { default: '内容' },
    })
    expect(wrapper.find('.b-card-header').text()).toContain('标题')
    expect(wrapper.find('.b-card-body').text()).toContain('内容')
  })

  it('applies shadow mode class', () => {
    const wrapper = mount(BCard, { props: { shadow: 'hover' } })
    expect(wrapper.classes()).toContain('b-card--shadow-hover')
  })
})

describe('SkeletonCard', () => {
  it('renders requested number of lines', () => {
    const wrapper = mount(SkeletonCard, { props: { lines: 4 } })
    expect(wrapper.findAll('.skeleton-line').length).toBe(4)
  })
})

describe('BCalendar', () => {
  it('固定 42 格（6 行），换月不抖高', async () => {
    const { default: BCalendar } = await import('../BCalendar.vue')
    const w = mount(BCalendar, {
      props: { defaultMonth: new Date(2026, 9, 1) },
      attachTo: document.body,
    })
    // 2026-10 从周四开始：上月 4 格 + 当月 31 格 + 下月 7 格
    expect(w.findAll('.b-cal-cell')).toHaveLength(42)
    expect(w.findAll('.b-cal-weekday')).toHaveLength(7)
    expect(w.text()).toContain('October 2026')
    w.unmount()
  })

  it('点某天 emit Date（单选），禁用日不响应', async () => {
    const { default: BCalendar } = await import('../BCalendar.vue')
    const w = mount(BCalendar, {
      props: { defaultMonth: new Date(2026, 9, 1), minDate: new Date(2026, 9, 10) },
    })
    const cells = w.findAll('.b-cal-cell')
    // 2026-10-01 落在第 5 格，所以「第 10 格」= 10-07（被 minDate 挡住），"第 17 格" = 10-14
    await cells[10].trigger('click')
    expect(w.emitted('change')).toBeUndefined()
    await cells[17].trigger('click')
    const [value] = w.emitted('change')![0] as [Date]
    expect(value.getDate()).toBe(14)
    w.unmount()
  })
})
