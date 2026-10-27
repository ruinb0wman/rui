import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import RLucideIcon from '../RLucideIcon.vue'
import { registerIcons, resolveIcon } from '../../icons'

describe('RLucideIcon', () => {
  it('内置图标（Loader）无需登记即可渲染', () => {
    expect(resolveIcon('Loader')).toBeTruthy()
    const w = mount(RLucideIcon, { props: { name: 'Loader' } })
    expect(w.find('svg').exists()).toBe(true)
    expect(w.text()).toBe('')
  })

  it('registerIcons 登记的图标按名字渲染', () => {
    registerIcons({ FakeIcon: { render: () => h('i', { class: 'fake-icon' }) } })
    const w = mount(RLucideIcon, { props: { name: 'FakeIcon' } })
    expect(w.find('.fake-icon').exists()).toBe(true)
  })

  it('未登记的名字：不抛错，显示原名（并 warn 一次）', () => {
    const w = mount(RLucideIcon, { props: { name: 'NoSuchIconXyz' } })
    expect(w.text()).toBe('NoSuchIconXyz')
    expect(w.find('svg').exists()).toBe(false)
  })
})
