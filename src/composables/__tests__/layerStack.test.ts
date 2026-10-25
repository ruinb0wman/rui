import { describe, expect, it, afterEach } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import {
  backTop,
  isTopLayer,
  pushLayer,
  removeLayer,
  setBackButtonAdapter,
  useBackButtonHandler,
} from '../layerStack'

afterEach(() => {
  setBackButtonAdapter(null)
})

describe('layerStack', () => {
  it('只有最上层拿到返回手势，出栈后交给下一层', () => {
    const calls: string[] = []
    const a = pushLayer(() => calls.push('a'))
    const b = pushLayer(() => calls.push('b'))

    expect(isTopLayer(a.id)).toBe(false)
    expect(isTopLayer(b.id)).toBe(true)
    backTop()
    expect(calls).toEqual(['b'])

    removeLayer(b.id)
    backTop()
    expect(calls).toEqual(['b', 'a'])

    removeLayer(a.id)
    backTop()
    expect(calls).toEqual(['b', 'a']) // 栈空后什么也不做
  })

  it('栈空时注销适配器，非空时重新挂上（不长期吞掉系统返回）', () => {
    let attached = 0
    setBackButtonAdapter((onBack) => {
      attached++
      void onBack
      return () => {
        attached--
      }
    })

    const a = pushLayer(() => {})
    expect(attached).toBe(1)
    removeLayer(a.id)
    expect(attached).toBe(0)

    const b = pushLayer(() => {})
    expect(attached).toBe(1)
    removeLayer(b.id)
  })

  it('useBackButtonHandler 跟随 enabled 入栈/出栈', async () => {
    const calls: string[] = []
    const enabled = ref(false)

    const Comp = defineComponent({
      setup() {
        useBackButtonHandler(enabled, () => calls.push('project'))
        return () => null
      },
    })
    const w = mount(Comp)

    backTop()
    expect(calls).toEqual([])

    enabled.value = true
    await nextTick()
    backTop()
    expect(calls).toEqual(['project'])

    enabled.value = false
    await nextTick()
    backTop()
    expect(calls).toEqual(['project'])

    w.unmount()
  })
})
