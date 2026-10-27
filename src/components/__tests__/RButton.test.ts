import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RButton from '../RButton.vue'

describe('RButton', () => {
  it('renders default button with label', () => {
    const wrapper = mount(RButton, { slots: { default: '提交' } })
    expect(wrapper.classes()).toContain('r-btn')
    expect(wrapper.classes()).toContain('r-btn--default')
    expect(wrapper.text()).toContain('提交')
  })

  it('applies type and size classes', () => {
    const wrapper = mount(RButton, { props: { type: 'primary', size: 'large' } })
    expect(wrapper.classes()).toContain('r-btn--primary')
    expect(wrapper.classes()).toContain('r-btn--large')
  })

  it('emits click when not disabled', async () => {
    const wrapper = mount(RButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(RButton, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('renders plain / round / circle variant classes', () => {
    const wrapper = mount(RButton, { props: { plain: true, round: true } })
    expect(wrapper.classes()).toContain('r-btn--plain')
    expect(wrapper.classes()).toContain('r-btn--round')
  })

  it('uses nativeType prop', () => {
    const wrapper = mount(RButton, { props: { nativeType: 'submit' } })
    expect(wrapper.attributes('type')).toBe('submit')
  })
})
