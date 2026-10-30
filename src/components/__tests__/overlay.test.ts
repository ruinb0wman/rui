import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RModal from '../RModal.vue'
import RDialog from '../RDialog.vue'

const overlay = () => document.body.querySelector('.base-modal-overlay') as HTMLElement | null
const activeClass = () => (document.activeElement as HTMLElement | null)?.className ?? ''

afterEach(() => {
  document.body.innerHTML = ''
  document.body.style.overflow = ''
})

function modal(props: { visible: boolean; to?: string; closeOnEscape?: boolean }) {
  return mount(RModal, {
    props: { title: '标题', ...props },
    slots: { default: '<button class="inner-a">A</button><button class="inner-b">B</button>' },
    attachTo: document.body,
  })
}

describe('RModal 浮层行为', () => {
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
    const w = mount(RModal, { props: { visible: true, to: '#modal-host', title: 'x' } })
    await w.vm.$nextTick()
    expect(host.querySelector('.base-modal')).not.toBeNull()
    w.unmount()
  })
})

describe('RDialog 浮层行为', () => {
  const options = [
    { icon: 'download', title: '导出', desc: 'CSV' },
    { icon: 'trash', title: '清空', danger: true },
  ]
  const dialog = (props: { visible: boolean; to?: string }) =>
    mount(RDialog, { props: { options, ...props }, attachTo: document.body })

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

describe('RModal 方向', () => {
  function modalDir(direction: 'center' | 'bottom' | 'top' | 'left' | 'right', extra = {}) {
    return mount(RModal, {
      props: { visible: true, title: 'T', direction, ...extra },
      slots: { default: '<p>body</p>' },
      attachTo: document.body,
    })
  }

  it('方向落到遮罩与面板的 class 上', async () => {
    for (const dir of ['bottom', 'top', 'left', 'right'] as const) {
      const w = modalDir(dir)
      await w.vm.$nextTick()
      expect(document.body.querySelector(`.base-modal-overlay--${dir}`)).not.toBeNull()
      expect(document.body.querySelector(`.base-modal--${dir}`)).not.toBeNull()
      w.unmount()
    }
  })

  it('bottom/top 才有拖动条，hideHandle 可关', async () => {
    const bottom = modalDir('bottom')
    expect(document.body.querySelector('.base-modal-handle')).not.toBeNull()
    bottom.unmount()

    const center = modalDir('center')
    expect(document.body.querySelector('.base-modal-handle')).toBeNull()
    center.unmount()

    const hidden = modalDir('bottom', { hideHandle: true })
    expect(document.body.querySelector('.base-modal-handle')).toBeNull()
    hidden.unmount()
  })

  it('hideOverlay 只藏遮罩样式，滚动锁与 ESC 照旧', async () => {
    const w = modalDir('bottom', { hideOverlay: true })
    expect(document.body.querySelector('.base-modal-overlay--hidden')).not.toBeNull()
    expect(document.body.style.overflow).toBe('hidden')
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(w.emitted('close')).toHaveLength(1)
    w.unmount()
  })

  it('bottom/top 内容撑高并吃 maxHeight，侧边抽屉是满高', async () => {
    const bottom = modalDir('bottom')
    const panel = document.body.querySelector('.base-modal') as HTMLElement
    expect(panel.style.height).toBe('auto')
    expect(panel.style.maxHeight).toBe('85vh')
    bottom.unmount()

    const left = modalDir('left')
    const side = document.body.querySelector('.base-modal') as HTMLElement
    expect(side.style.height).toBe('100%')
    // 侧边不 cap 高度，否则会短一截
    expect(side.style.maxHeight).toBe('')
    left.unmount()
  })

  it('数值 width 会夹到遮罩内宽（手机不能出现 680px 宽弹窗）', async () => {
    const w = mount(RModal, {
      props: { visible: true, title: 'T', width: 680 },
      attachTo: document.body,
    })
    await w.vm.$nextTick()
    const panel = document.body.querySelector('.base-modal') as HTMLElement
    expect(panel.style.width).toBe('680px')
    expect(panel.style.maxWidth).toBe('100%')
    w.unmount()
  })

  it('#header-right 槽渲染在关闭按钮之前', async () => {
    const w = mount(RModal, {
      props: { visible: true, title: 'T' },
      slots: { 'header-right': '<button class="act">act</button>' },
      attachTo: document.body,
    })
    await w.vm.$nextTick()
    const right = document.body.querySelector('.base-modal-header-right')!
    expect(right.querySelector('.act')).not.toBeNull()
    expect(right.querySelector('.base-modal-close')).not.toBeNull()
    w.unmount()
  })
})
