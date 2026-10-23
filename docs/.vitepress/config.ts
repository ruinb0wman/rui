import { defineConfig } from 'vitepress'
import sidebar from './sidebar.generated.json'

export default defineConfig({
  title: '@ruinb0w/ui',
  description: '跨项目 Vue 3 组件库 —— 单一视觉尺度、可切换主题、AI 可读清单',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: '组件', link: '/components/' },
      { text: '规范', link: '/design/' },
      { text: '接入', link: '/getting-started' },
    ],
    sidebar: {
      '/components/': [{ text: '组件总览', link: '/components/' }, ...sidebar],
      '/design/': [
        { text: '规范', link: '/design/' },
        { text: 'Token 一览', link: '/design/tokens' },
      ],
    },
    outline: { level: [2, 3] },
    search: { provider: 'local' },
  },
})
