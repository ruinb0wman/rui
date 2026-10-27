import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RDrawer from '../RDrawer.vue'
import RTabBar from '../RTabBar.vue'
import RHamburgerButton from '../RHamburgerButton.vue'
import RAlertBell from '../RAlertBell.vue'

const items = [
  { key: 'a', label: '甲', icon: 'Home' },
  { key: 'b', label: '乙', icon: 'Search' },
]

afterEach(() => {
  document.body.innerHTML = ''
  document.body.style.overflow = ''
})

describe('RDrawer', () => {
  it('渲染导航项并按 activeKey 标出当前项', async () => {
    const w = mount(RDrawer, { props: { visible: true, items, activeKey: 'b' }, attachTo: document.body })
    await w.vm.$nextTick()
    const rows = [...document.body.querySelectorAll<HTMLElement>('.r-drawer-item')]
    expect(rows).toHaveLength(2)
    expect(rows[1].className).toContain('r-drawer-item--active')
    expect(rows[1].getAttribute('aria-current')).toBe('page')
    w.unmount()
  })

  it('点击导航项 emit select(key)，关闭按钮 emit close', async () => {
    const w = mount(RDrawer, { props: { visible: true, items }, attachTo: document.body })
    await w.vm.$nextTick()
    ;(document.body.querySelectorAll<HTMLElement>('.r-drawer-item')[0] as HTMLElement).click()
    await w.vm.$nextTick()
    expect(w.emitted('select')?.[0]).toEqual(['a'])
    ;(document.body.querySelector('.r-drawer-header button') as HTMLElement).click()
    await w.vm.$nextTick()
    expect(w.emitted('close')).toHaveLength(1)
    w.unmount()
  })

  it('打开时锁滚动，ESC 关闭', async () => {
    const w = mount(RDrawer, { props: { visible: true, items }, attachTo: document.body })
    expect(document.body.style.overflow).toBe('hidden')
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(w.emitted('close')).toHaveLength(1)
    w.unmount()
  })
})

describe('RTabBar', () => {
  it('渲染 tab 并标出选中项', () => {
    const w = mount(RTabBar, { props: { items, activeKey: 'a' } })
    const tabs = w.findAll('[role="tab"]')
    expect(tabs).toHaveLength(2)
    expect(tabs[0].attributes('aria-selected')).toBe('true')
    expect(tabs[1].attributes('aria-selected')).toBe('false')
  })

  it('点击 emit select', async () => {
    const w = mount(RTabBar, { props: { items } })
    await w.findAll('[role="tab"]')[1].trigger('click')
    expect(w.emitted('select')?.[0]).toEqual(['b'])
  })
})

describe('RHamburgerButton', () => {
  it('open 时加类并同步 aria-expanded', () => {
    const closed = mount(RHamburgerButton)
    expect(closed.attributes('aria-expanded')).toBe('false')
    expect(closed.classes()).not.toContain('r-hamburger--open')

    const open = mount(RHamburgerButton, { props: { open: true } })
    expect(open.attributes('aria-expanded')).toBe('true')
    expect(open.classes()).toContain('r-hamburger--open')
    expect(open.attributes('aria-label')).toBe('关闭菜单')
  })

  it('点击 emit toggle', async () => {
    const w = mount(RHamburgerButton)
    await w.trigger('click')
    expect(w.emitted('toggle')).toHaveLength(1)
  })
})

describe('RAlertBell', () => {
  const bellItems = [
    { id: 1, title: '000961', badge: { text: '涨超', tone: 'danger' as const }, note: '5%', enabled: true },
    { id: 2, title: '023461', enabled: false },
  ]

  it('未读数显示在徽标里，展开后列出规则', async () => {
    const w = mount(RAlertBell, { props: { items: bellItems, unreadCount: 3 }, attachTo: document.body })
    expect(w.find('.r-bell-badge').text()).toBe('3')
    await w.find('.r-bell-trigger').trigger('click')
    expect(w.findAll('.r-bell-row')).toHaveLength(2)
    expect(w.emitted('update:open')?.[0]).toEqual([true])
  })

  it('>99 显示 99+，无未读不显示徽标', async () => {
    const many = mount(RAlertBell, { props: { items: bellItems, unreadCount: 120 } })
    expect(many.find('.r-bell-badge').text()).toBe('99+')
    const none = mount(RAlertBell, { props: { items: bellItems } })
    expect(none.find('.r-bell-badge').exists()).toBe(false)
  })

  it('空列表显示空态', async () => {
    const w = mount(RAlertBell, { props: { items: [] } })
    await w.find('.r-bell-trigger').trigger('click')
    expect(w.find('.r-bell-empty').text()).toContain('暂无告警规则')
  })

  it('切换规则 emit toggle(id, enabled)', async () => {
    const w = mount(RAlertBell, { props: { items: bellItems }, attachTo: document.body })
    await w.find('.r-bell-trigger').trigger('click')
    await w.findAll('.r-bell-row')[1].find('.r-switch').trigger('click')
    expect(w.emitted('toggle')?.[0]).toEqual([2, true])
    w.unmount()
  })

  it('点击外部关闭面板', async () => {
    const w = mount(RAlertBell, { props: { items: bellItems }, attachTo: document.body })
    await w.find('.r-bell-trigger').trigger('click')
    expect(w.find('.r-bell-panel').exists()).toBe(true)
    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    await w.vm.$nextTick()
    expect(w.find('.r-bell-panel').exists()).toBe(false)
    w.unmount()
  })
})
