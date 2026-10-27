/**
 * 数字输入的文本层工具（RInputNumber 用）。
 *
 * 为什么需要它：`<input type="text">` 在聚焦期间只能由我们控制显示什么，
 * 若放行非法字符就得等失焦才纠正 —— 用户会先看到 `12a` 再看到它变回 `12`。
 * 这里提供「该不该让这个字符进输入框」的判断，配合把 DOM 回滚到上一次合法文本。
 *
 * 与「数值钳制」分开：钳制是 clampValue 的事（min/max/step/precision），
 * 这里只管字符。
 */

/** 小数模式保留的位数 */
export const DECIMAL_PLACES = 2

export function roundTo(value: number, places: number = DECIMAL_PLACES): number {
  const factor = 10 ** places
  return Math.round(value * factor) / factor
}

/** 该文本是否可接受（拒绝非法字符；放行 ""、"-"、"1." 这类中间态） */
export function isTextAllowed(
  text: string,
  allowDecimal: boolean,
  allowNegative: boolean,
): boolean {
  if (text === '') return true
  const pattern = allowDecimal
    ? allowNegative
      ? /^-\d*\.?\d*$/
      : /^\d*\.?\d*$/
    : allowNegative
      ? /^-\d*$/
      : /^\d*$/
  return pattern.test(text)
}

/** 文本 → 数字；"" / "-" / "." / "-." 这类中间态返回 null（此时不写回父组件） */
export function textToNumber(text: string, allowDecimal: boolean): number | null {
  if (text === '' || text === '-' || text === '.' || text === '-.') return null
  const num = allowDecimal ? parseFloat(text) : parseInt(text, 10)
  return Number.isFinite(num) ? num : null
}
