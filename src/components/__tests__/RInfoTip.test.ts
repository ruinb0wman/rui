import { describe, it, expect, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import RInfoTip from '../RInfoTip.vue'

/** 气泡 teleport 到 body，所以查 document 而不是 wrapper。 */
const bubble = () => document.body.querySelector('[role="tooltip"]') as HTMLElement | null

afterEach(() => {
  document.body.innerHTML = ''
})

describe('RInfoTip', () => {
  it('starts closed: no bubble in DOM, aria-expanded=false', () => {
    const wrapper = mount(RInfoTip, { props: { text: '20% 分位', label: '机会值' } })
    const trigger = wrapper.find('button')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(trigger.attributes('aria-describedby')).toBeUndefined()
    expect(trigger.attributes('aria-label')).toBe('机会值 说明')
    expect(bubble()).toBeNull()
  })

  it('opens on hover and links the bubble via aria-describedby', async () => {
    const wrapper = mount(RInfoTip, { props: { text: '20% 分位' }, attachTo: document.body })
    await wrapper.trigger('mouseenter')
    await flushPromises()

    expect(bubble()!.textContent).toBe('20% 分位')
    expect(wrapper.find('button').attributes('aria-describedby')).toBe(bubble()!.id)
    wrapper.unmount()
  })

  it('toggles by click (touch) and closes on ESC', async () => {
    const wrapper = mount(RInfoTip, { props: { text: 'x' }, attachTo: document.body })
    await wrapper.find('button').trigger('click')
    await flushPromises()
    expect(bubble()).not.toBeNull()

    await wrapper.trigger('keydown', { key: 'Escape' })
    await flushPromises()
    expect(bubble()).toBeNull()
    wrapper.unmount()
  })

  it('closes on a pointerdown outside the component', async () => {
    const wrapper = mount(RInfoTip, { props: { text: 'x' }, attachTo: document.body })
    await wrapper.find('button').trigger('click')
    await flushPromises()
    expect(bubble()).not.toBeNull()

    document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
    await flushPromises()
    expect(bubble()).toBeNull()
    wrapper.unmount()
  })
})
