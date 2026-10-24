import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BDrawer from '../BDrawer.vue'
import BTabBar from '../BTabBar.vue'
import BHamburgerButton from '../BHamburgerButton.vue'
import BAlertBell from '../BAlertBell.vue'

const items = [
  { key: 'a', label: '甲', icon: 'Home' },
  { key: 'b', label: '乙', icon: 'Search' },
]

afterEach(() => {
  document.body.innerHTML = ''
  document.body.style.overflow = ''
})

describe('BDrawer', () => {
  it('渲染导航项并按 activeKey 标出当前项', async () => {
    const w = mount(BDrawer, { props: { visible: true, items, activeKey: 'b' }, attachTo: document.body })
    await w.vm.$nextTick()
    const rows = [...document.body.querySelectorAll<HTMLElement>('.b-drawer-item')]
    expect(rows).toHaveLength(2)
    expect(rows[1].className).toContain('b-drawer-item--active')
    expect(rows[1].getAttribute('aria-current')).toBe('page')
    w.unmount()
  })

  it('点击导航项 emit select(key)，关闭按钮 emit close', async () => {
    const w = mount(BDrawer, { props: { visible: true, items }, attachTo: document.body })
    await w.vm.$nextTick()
    ;(document.body.querySelectorAll<HTMLElement>('.b-drawer-item')[0] as HTMLElement).click()
    await w.vm.$nextTick()
    expect(w.emitted('select')?.[0]).toEqual(['a'])
    ;(document.body.querySelector('.b-drawer-header button') as HTMLElement).click()
    await w.vm.$nextTick()
    expect(w.emitted('close')).toHaveLength(1)
    w.unmount()
  })

  it('打开时锁滚动，ESC 关闭', async () => {
    const w = mount(BDrawer, { props: { visible: true, items }, attachTo: document.body })
    expect(document.body.style.overflow).toBe('hidden')
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(w.emitted('close')).toHaveLength(1)
    w.unmount()
  })
})

describe('BTabBar', () => {
  it('渲染 tab 并标出选中项', () => {
    const w = mount(BTabBar, { props: { items, activeKey: 'a' } })
    const tabs = w.findAll('[role="tab"]')
    expect(tabs).toHaveLength(2)
    expect(tabs[0].attributes('aria-selected')).toBe('true')
    expect(tabs[1].attributes('aria-selected')).toBe('false')
  })

  it('点击 emit select', async () => {
    const w = mount(BTabBar, { props: { items } })
    await w.findAll('[role="tab"]')[1].trigger('click')
    expect(w.emitted('select')?.[0]).toEqual(['b'])
  })
})

describe('BHamburgerButton', () => {
  it('open 时加类并同步 aria-expanded', () => {
    const closed = mount(BHamburgerButton)
    expect(closed.attributes('aria-expanded')).toBe('false')
    expect(closed.classes()).not.toContain('b-hamburger--open')

    const open = mount(BHamburgerButton, { props: { open: true } })
    expect(open.attributes('aria-expanded')).toBe('true')
    expect(open.classes()).toContain('b-hamburger--open')
    expect(open.attributes('aria-label')).toBe('关闭菜单')
  })

  it('点击 emit toggle', async () => {
    const w = mount(BHamburgerButton)
    await w.trigger('click')
    expect(w.emitted('toggle')).toHaveLength(1)
  })
})

describe('BAlertBell', () => {
  const bellItems = [
    { id: 1, title: '000961', badge: { text: '涨超', tone: 'danger' as const }, note: '5%', enabled: true },
    { id: 2, title: '023461', enabled: false },
  ]

  it('未读数显示在徽标里，展开后列出规则', async () => {
    const w = mount(BAlertBell, { props: { items: bellItems, unreadCount: 3 }, attachTo: document.body })
    expect(w.find('.b-bell-badge').text()).toBe('3')
    await w.find('.b-bell-trigger').trigger('click')
    expect(w.findAll('.b-bell-row')).toHaveLength(2)
    expect(w.emitted('update:open')?.[0]).toEqual([true])
  })

  it('>99 显示 99+，无未读不显示徽标', async () => {
    const many = mount(BAlertBell, { props: { items: bellItems, unreadCount: 120 } })
    expect(many.find('.b-bell-badge').text()).toBe('99+')
    const none = mount(BAlertBell, { props: { items: bellItems } })
    expect(none.find('.b-bell-badge').exists()).toBe(false)
  })

  it('空列表显示空态', async () => {
    const w = mount(BAlertBell, { props: { items: [] } })
    await w.find('.b-bell-trigger').trigger('click')
    expect(w.find('.b-bell-empty').text()).toContain('暂无告警规则')
  })

  it('切换规则 emit toggle(id, enabled)', async () => {
    const w = mount(BAlertBell, { props: { items: bellItems }, attachTo: document.body })
    await w.find('.b-bell-trigger').trigger('click')
    await w.findAll('.b-bell-row')[1].find('.b-switch').trigger('click')
    expect(w.emitted('toggle')?.[0]).toEqual([2, true])
    w.unmount()
  })

  it('点击外部关闭面板', async () => {
    const w = mount(BAlertBell, { props: { items: bellItems }, attachTo: document.body })
    await w.find('.b-bell-trigger').trigger('click')
    expect(w.find('.b-bell-panel').exists()).toBe(true)
    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    await w.vm.$nextTick()
    expect(w.find('.b-bell-panel').exists()).toBe(false)
    w.unmount()
  })
})
