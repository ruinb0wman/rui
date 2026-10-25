import { describe, expect, it } from 'vitest'
import { isTextAllowed, roundTo, textToNumber } from '../number'

describe('isTextAllowed', () => {
  it('数字模式下拒绝小数点、字母与科学计数法', () => {
    expect(isTextAllowed('12', false, false)).toBe(true)
    expect(isTextAllowed('1.2', false, false)).toBe(false)
    expect(isTextAllowed('12a', false, false)).toBe(false)
    expect(isTextAllowed('1e3', false, false)).toBe(false)
  })

  it('小数模式放行小数点与中间态', () => {
    expect(isTextAllowed('1.25', true, false)).toBe(true)
    expect(isTextAllowed('.', true, false)).toBe(true)
    expect(isTextAllowed('1.', true, false)).toBe(true)
    expect(isTextAllowed('1.2.3', true, false)).toBe(false)
  })

  it('负数仅在该字段允许时放行', () => {
    expect(isTextAllowed('-5', false, true)).toBe(true)
    expect(isTextAllowed('-', false, true)).toBe(true)
    expect(isTextAllowed('-5', false, false)).toBe(false)
    expect(isTextAllowed('-', false, false)).toBe(false)
  })

  it('空串始终可接受（聚焦时可删空）', () => {
    expect(isTextAllowed('', false, false)).toBe(true)
    expect(isTextAllowed('', true, true)).toBe(true)
  })
})

describe('textToNumber', () => {
  it('空串与中间态返回 null（不写回父组件）', () => {
    expect(textToNumber('', false)).toBeNull()
    expect(textToNumber('-', false)).toBeNull()
    expect(textToNumber('.', true)).toBeNull()
    expect(textToNumber('-.', true)).toBeNull()
  })

  it('可解析文本返回数字', () => {
    expect(textToNumber('12', false)).toBe(12)
    expect(textToNumber('1.', true)).toBe(1)
    expect(textToNumber('1.25', true)).toBe(1.25)
  })
})

describe('roundTo', () => {
  it('默认保留 2 位', () => {
    expect(roundTo(1.234)).toBe(1.23)
    expect(roundTo(1.239)).toBe(1.24)
    expect(roundTo(1.234, 1)).toBe(1.2)
  })
})
