import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseModal from '../BaseModal.vue'
import BDialog from '../BDialog.vue'

const overlay = () => document.body.querySelector('.base-modal-overlay') as HTMLElement | null
const activeClass = () => (document.activeElement as HTMLElement | null)?.className ?? ''

afterEach(() => {
  document.body.innerHTML = ''
  document.body.style.overflow = ''
})

function modal(props: { visible: boolean; to?: string; closeOnEscape?: boolean }) {
  return mount(BaseModal, {
    props: { title: '标题', ...props },
    slots: { default: '<button class="inner-a">A</button><button class="inner-b">B</button>' },
    attachTo: document.body,
  })
}

describe('BaseModal 浮层行为', () => {
  it('打开后焦点落在层内，关闭后回到触发元素', async () => {
    const trigger = document.createElement('button')
    trigger.className = 'trigger'
    document.body.appendChild(trigger)
    trigger.focus()

    const w = modal({ visible: false })
    await w.setProps({ visible: true })
    await w.vm.$nextTick()
    expect(overlay()!.contains(document.activeElement)).toBe(true)

    await w.setProps({ visible: false })
    expect(activeClass()).toBe('trigger')
    w.unmount()
  })

  it('ESC 关闭并 emit close', async () => {
    const w = modal({ visible: true })
    await w.vm.$nextTick()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(w.emitted('close')).toHaveLength(1)
    w.unmount()
  })

  it('closeOnEscape=false 时 ESC 不关', async () => {
    const w = modal({ visible: true, closeOnEscape: false })
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(w.emitted('close')).toBeUndefined()
    w.unmount()
  })

  it('Tab 在层内循环：末尾回首个，首个 Shift+Tab 到末尾', async () => {
    const w = modal({ visible: true })
    await w.vm.$nextTick()
    const inner = [...overlay()!.querySelectorAll<HTMLElement>('button')]
    const first = inner[0]
    const last = inner[inner.length - 1]

    last.focus()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', cancelable: true }))
    expect(document.activeElement).toBe(first)

    first.focus()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, cancelable: true }))
    expect(document.activeElement).toBe(last)
    w.unmount()
  })

  it('滚动锁按层计数：两层都关才恢复', async () => {
    const a = modal({ visible: true })
    const b = modal({ visible: true })
    expect(document.body.style.overflow).toBe('hidden')
    await a.setProps({ visible: false })
    expect(document.body.style.overflow).toBe('hidden')
    await b.setProps({ visible: false })
    expect(document.body.style.overflow).toBe('')
    a.unmount()
    b.unmount()
  })

  it('后开的层 z-index 更大，ESC 只关最上层', async () => {
    const a = modal({ visible: true })
    const b = modal({ visible: true })
    await a.vm.$nextTick()
    const zs = [...document.body.querySelectorAll<HTMLElement>('.base-modal-overlay')].map((el) => Number(el.style.zIndex))
    expect(zs[1]).toBeGreaterThan(zs[0])

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(b.emitted('close')).toHaveLength(1)
    expect(a.emitted('close')).toBeUndefined()
    a.unmount()
    b.unmount()
  })

  it('to 可指定 teleport 目标', async () => {
    const host = document.createElement('div')
    host.id = 'modal-host'
    document.body.appendChild(host)
    const w = mount(BaseModal, { props: { visible: true, to: '#modal-host', title: 'x' } })
    await w.vm.$nextTick()
    expect(host.querySelector('.base-modal')).not.toBeNull()
    w.unmount()
  })
})

describe('BDialog 浮层行为', () => {
  const options = [
    { icon: 'download', title: '导出', desc: 'CSV' },
    { icon: 'trash', title: '清空', danger: true },
  ]
  const dialog = (props: { visible: boolean; to?: string }) =>
    mount(BDialog, { props: { options, ...props }, attachTo: document.body })

  it('选项是真按钮，点击 emit select', async () => {
    const w = dialog({ visible: true })
    await w.vm.$nextTick()
    const buttons = [...document.body.querySelectorAll<HTMLElement>('.confirm-option')]
    expect(buttons).toHaveLength(2)
    expect(buttons[0].tagName).toBe('BUTTON')
    buttons[0].click()
    await w.vm.$nextTick()
    expect(w.emitted('select')?.[0]).toEqual([undefined])
    w.unmount()
  })

  it('ESC emit cancel', async () => {
    const w = dialog({ visible: true })
    await w.vm.$nextTick()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(w.emitted('cancel')).toHaveLength(1)
    w.unmount()
  })

  it('打开时锁滚动，关闭后恢复', async () => {
    const w = dialog({ visible: true })
    expect(document.body.style.overflow).toBe('hidden')
    await w.setProps({ visible: false })
    expect(document.body.style.overflow).toBe('')
    w.unmount()
  })
})
