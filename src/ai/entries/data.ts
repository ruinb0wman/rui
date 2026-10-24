/** 展示与反馈 —— 容器、骨架屏、错误边界、图标。 */
import type { ComponentSpec } from '../types'

export const data: ComponentSpec[] = [
  {
    name: 'BCard',
    file: 'BCard.vue',
    summary: '内容卡片容器，shadow 三档 + 可选 header 渐变。',
    when: ['页面内的内容分组', '需要 hover 抬起的可点击卡片（shadow="hover"）'],
    notFor: ['页面级布局（用页面自己的 grid/flex）', '弹窗容器（用 BaseModal）'],
    props: {
      shadow: 'always | hover | never',
      header: '标题文本（也可用 header 插槽）',
      bodyStyle: '正文区内联样式对象',
    },
    tokens: ['--bg-card', '--border-default', '--shadow-sm', '--radius-md'],
    demo: {
      components: ['BCard'],
      template: `<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
  <BCard header="默认卡片"><p style="color:var(--text-secondary)">shadow=always</p></BCard>
  <BCard header="悬浮抬起" shadow="hover"><p style="color:var(--text-secondary)">shadow=hover</p></BCard>
  <BCard shadow="never"><p style="color:var(--text-secondary)">shadow=never</p></BCard>
</div>`,
    },
  },
  {
    name: 'SkeletonCard',
    file: 'SkeletonCard.vue',
    summary: '卡片骨架屏（shimmer 动画），数据未到位时的占位。',
    when: ['列表/卡片首次加载', '轮询刷新时保持布局不跳动'],
    notFor: ['耗时 >3s 且需要说明进度（用进度或文案）'],
    props: {
      lines: '占位行数，默认 3',
      widths: '每行宽度数组（如 ["100%","60%"]）',
      height: '卡片高度，默认 120',
      title: '是否显示标题占位条',
    },
    tokens: ['--bg-subtle', '--border-subtle', '--radius-md'],
    demo: {
      components: ['SkeletonCard'],
      template: `<div style="max-width:320px"><SkeletonCard :lines="3" :widths="['100%','72%','45%']" title /></div>`,
    },
  },
  {
    name: 'SkeletonChart',
    file: 'SkeletonChart.vue',
    summary: '图表骨架屏（虚线走势 + 图例占位）。',
    when: ['K 线/走势图加载中'],
    notFor: ['非图表区域（用 SkeletonCard）'],
    props: {
      height: '高度，默认 300',
      width: '宽度，默认 300',
    },
    tokens: ['--bg-subtle', '--border-subtle', '--radius-md'],
    demo: {
      components: ['SkeletonChart'],
      template: `<div style="max-width:420px"><SkeletonChart :height="180" :width="420" /></div>`,
    },
  },
  {
    name: 'ErrorBoundary',
    file: 'ErrorBoundary.vue',
    summary: '渲染错误捕获，失败时显示提示 + 重试按钮。',
    when: ['包住易崩的第三方图表/富文本区域'],
    notFor: ['包裹整个应用（页面级错误交给路由 onError）', '异步请求失败（那不是渲染错误）'],
    props: { '—': '无 props，默认插槽即受保护内容' },
    tokens: ['--color-warning', '--bg-card'],
    demo: {
      components: ['ErrorBoundary'],
      template: `<ErrorBoundary>
  <p style="color:var(--text-secondary)">这层内容一旦渲染抛错，就会替换成「渲染异常 + 重试」。</p>
</ErrorBoundary>`,
    },
  },
  {
    name: 'OfflineBanner',
    file: 'OfflineBanner.vue',
    summary: '断网提示条（顶栏 sticky，online/offline 事件驱动）。',
    when: ['应用级布局顶部放一条，浏览器离线时自动出现'],
    notFor: ['接口报错提示（那是请求层的事）'],
    props: { '—': '无 props；依赖 useOnlineStatus' },
    tokens: ['--color-warning', '--z-toast'],
    demo: {
      components: ['OfflineBanner'],
      template: `<p style="color:var(--text-secondary);font-size:var(--font-sm)">组件只在 navigator.onLine === false 时渲染；想验证可在 DevTools → Network 里切 Offline。</p>
<OfflineBanner />`,
    },
  },
  {
    name: 'LucideIcon',
    file: 'LucideIcon.vue',
    summary: 'Lucide 图标包装：按名字取图标，缺名时回退显示原名（不会白屏）。',
    when: ['所有图标的地方（统一尺寸与描边）'],
    notFor: ['需要两个图标叠加/自定义 path 的场景'],
    props: {
      name: 'Lucide 图标名（PascalCase，如 "TrendingUp"）',
      size: '尺寸，默认 20',
      color: '颜色，默认 currentColor',
      strokeWidth: '线宽，默认 2',
    },
    tokens: ['--text-secondary'],
    demo: {
      components: ['LucideIcon'],
      template: `<div style="display:flex;gap:16px;align-items:center;color:var(--text-secondary)">
  <LucideIcon name="TrendingUp" :size="20" />
  <LucideIcon name="Wallet" :size="20" />
  <LucideIcon name="Bell" :size="24" />
  <LucideIcon name="NoSuchIcon" :size="16" />
</div>`,
    },
  },
]
