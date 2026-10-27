import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RSwitch from '../RSwitch.vue'
import RCard from '../RCard.vue'
import RSkeletonCard from '../RSkeletonCard.vue'

describe('RSwitch', () => {
  it('renders with aria-checked state', async () => {
    const wrapper = mount(RSwitch, { props: { modelValue: true } })
    expect(wrapper.classes()).toContain('r-switch--checked')
    expect(wrapper.attributes('aria-checked')).toBe('true')
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(RSwitch)
    await wrapper.trigger('click')
    const events = wrapper.emitted('update:modelValue')!
    expect(events[events.length - 1]).toEqual([true])
  })

  it('does not toggle when disabled', async () => {
    const wrapper = mount(RSwitch, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})

describe('RCard', () => {
  it('renders header and default slot', () => {
    const wrapper = mount(RCard, {
      props: { header: '标题' },
      slots: { default: '内容' },
    })
    expect(wrapper.find('.r-card-header').text()).toContain('标题')
    expect(wrapper.find('.r-card-body').text()).toContain('内容')
  })

  it('applies shadow mode class', () => {
    const wrapper = mount(RCard, { props: { shadow: 'hover' } })
    expect(wrapper.classes()).toContain('r-card--shadow-hover')
  })
})

describe('RSkeletonCard', () => {
  it('renders requested number of lines', () => {
    const wrapper = mount(RSkeletonCard, { props: { lines: 4 } })
    expect(wrapper.findAll('.skeleton-line').length).toBe(4)
  })
})

describe('RCalendar', () => {
  it('固定 42 格（6 行），换月不抖高', async () => {
    const { default: RCalendar } = await import('../RCalendar.vue')
    const w = mount(RCalendar, {
      props: { defaultMonth: new Date(2026, 9, 1) },
      attachTo: document.body,
    })
    // 2026-10 从周四开始：上月 4 格 + 当月 31 格 + 下月 7 格
    expect(w.findAll('.r-cal-cell')).toHaveLength(42)
    expect(w.findAll('.r-cal-weekday')).toHaveLength(7)
    expect(w.text()).toContain('October 2026')
    w.unmount()
  })

  it('点某天 emit Date（单选），禁用日不响应', async () => {
    const { default: RCalendar } = await import('../RCalendar.vue')
    const w = mount(RCalendar, {
      props: { defaultMonth: new Date(2026, 9, 1), minDate: new Date(2026, 9, 10) },
    })
    const cells = w.findAll('.r-cal-cell')
    // 2026-10-01 落在第 5 格，所以「第 10 格」= 10-07（被 minDate 挡住），"第 17 格" = 10-14
    await cells[10].trigger('click')
    expect(w.emitted('change')).toBeUndefined()
    await cells[17].trigger('click')
    const [value] = w.emitted('change')![0] as [Date]
    expect(value.getDate()).toBe(14)
    w.unmount()
  })
})
