import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import RBadge from '../RBadge.vue'
import RFormRow from '../RFormRow.vue'
import RSelect from '../RSelect.vue'
import RSettingsNav from '../RSettingsNav.vue'

describe('RBadge', () => {
  it('默认 muted + 方块，dot 渲染圆点', () => {
    const w = mount(RBadge, { slots: { default: () => '在跑' }, props: { dot: true } })
    expect(w.classes()).toContain('r-badge--muted')
    expect(w.find('.r-badge-dot').exists()).toBe(true)
  })

  it('只有 dot 没有文案时是纯状态灯；pulse 加动画类', () => {
    const w = mount(RBadge, { props: { dot: true, pulse: true, type: 'primary' } })
    expect(w.classes()).toContain('r-badge--dot-only')
    expect(w.find('.r-badge-dot--pulse').exists()).toBe(true)
  })
})

describe('RFormRow', () => {
  it('渲染 label / 控件 / hint', () => {
    const w = mount(RFormRow, {
      props: { label: '主页', hint: '启动时打开' },
      slots: { default: () => h('input', { id: 'x' }) },
    })
    expect(w.find('.r-form-row-label').text()).toBe('主页')
    expect(w.find('.r-form-row-hint').text()).toBe('启动时打开')
    expect(w.find('.r-form-row-body input').exists()).toBe(true)
  })

  it('无 label 时走单列；labelWidth 数字补 px、字符串原样', () => {
    expect(mount(RFormRow).classes()).toContain('r-form-row--no-label')
    const num = mount(RFormRow, { props: { label: 'a', labelWidth: 120 } })
    expect(num.attributes('style')).toContain('--r-form-row-label: 120px')
    const str = mount(RFormRow, { props: { label: 'a', labelWidth: '8rem' } })
    expect(str.attributes('style')).toContain('--r-form-row-label: 8rem')
  })

  it('align=start 用于多行控件', () => {
    expect(mount(RFormRow, { props: { align: 'start' } }).classes()).toContain('r-form-row--start')
  })
})

describe('RSelect', () => {
  it('透传 slot 里的 option 并 emit 两个事件', async () => {
    const w = mount(RSelect, {
      props: { modelValue: 'a', ariaLabel: '引擎' },
      slots: { default: () => [h('option', { value: 'a' }, 'A'), h('option', { value: 'b' }, 'B')] },
    })
    const select = w.find('select')
    expect(select.attributes('aria-label')).toBe('引擎')
    expect(w.findAll('option')).toHaveLength(2)
    await select.setValue('b')
    expect(w.emitted('update:modelValue')?.[0]).toEqual(['b'])
    expect(w.emitted('change')?.[0]).toEqual(['b'])
  })

  it('disabled 落到原生 select 上', () => {
    const w = mount(RSelect, { props: { disabled: true } })
    expect(w.find('select').attributes('disabled')).toBeDefined()
    expect(w.classes()).toContain('r-select--disabled')
  })
})

describe('RSettingsNav', () => {
  const items = [
    { id: 'general', label: '常规' },
    { id: 'plugins', label: '插件管理' },
    { id: 'bookmarks', label: '书签', badge: '核心', group: '插件设置' },
  ]

  it('渲染项、分组标题与角标，选中项标 aria-current', () => {
    const w = mount(RSettingsNav, { props: { items, modelValue: 'bookmarks' } })
    expect(w.findAll('.r-settings-nav-item')).toHaveLength(3)
    expect(w.findAll('.r-settings-nav-group')).toHaveLength(1)
    expect(w.find('.r-settings-nav-badge').text()).toBe('核心')
    const active = w.findAll('.r-settings-nav-item')[2]
    expect(active.classes()).toContain('r-settings-nav-item--active')
    expect(active.attributes('aria-current')).toBe('page')
  })

  it('点击 switch 项：emit update:modelValue + select，点当前项不 emit', async () => {
    const w = mount(RSettingsNav, { props: { items, modelValue: 'general' } })
    await w.findAll('.r-settings-nav-item')[1].trigger('click')
    expect(w.emitted('update:modelValue')?.[0]).toEqual(['plugins'])
    expect(w.emitted('select')?.[0]).toEqual(['plugins'])
    await w.findAll('.r-settings-nav-item')[0].trigger('click')
    expect(w.emitted('update:modelValue')).toHaveLength(1)
  })

  it('受控用法：v-model 反向更新选中态', async () => {
    const w = mount(RSettingsNav, { props: { items, modelValue: 'general', 'onUpdate:modelValue': (v: string) => w.setProps({ modelValue: v }) } })
    await w.findAll('.r-settings-nav-item')[1].trigger('click')
    expect(w.findAll('.r-settings-nav-item')[1].classes()).toContain('r-settings-nav-item--active')
  })

  it('width 数字补 px', () => {
    const w = mount(RSettingsNav, { props: { items, modelValue: 'general', width: 200 } })
    expect(w.attributes('style')).toContain('width: 200px')
  })
})
