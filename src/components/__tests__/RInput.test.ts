import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RInput from '../RInput.vue'

describe('RInput', () => {
  it('renders input with value', () => {
    const wrapper = mount(RInput, { props: { modelValue: 'hello' } })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect((input.element as HTMLInputElement).value).toBe('hello')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(RInput)
    await wrapper.find('input').setValue('foo')
    const events = wrapper.emitted('update:modelValue')!
    expect(events[events.length - 1]).toEqual(['foo'])
  })

  it('renders clear button when clearable and has value', () => {
    const wrapper = mount(RInput, { props: { modelValue: 'abc', clearable: true } })
    expect(wrapper.find('.r-input__clear').exists()).toBe(true)
  })

  it('clears value on clear click', async () => {
    const wrapper = mount(RInput, { props: { modelValue: 'abc', clearable: true } })
    await wrapper.find('.r-input__clear').trigger('click')
    const events = wrapper.emitted('update:modelValue')!
    expect(events[events.length - 1]).toEqual([''])
  })

  it('renders textarea variant', () => {
    const wrapper = mount(RInput, { props: { type: 'textarea' } })
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('appends prefix icon', () => {
    const wrapper = mount(RInput, { props: { prefixIcon: 'Search' } })
    expect(wrapper.find('.r-input__prefix').exists()).toBe(true)
  })
})
