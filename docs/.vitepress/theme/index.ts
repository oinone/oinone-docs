import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.css'
import './markdown-style.css'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'

export default {
  extends: DefaultTheme,
  Layout,
  setup() {
    const route = useRoute()
    let zoom: any = null

    const initZoom = () => {
      if (zoom) {
        zoom.detach()
      }
      // 提供点击预览功能
      zoom = mediumZoom('.vp-doc img', { background: 'var(--vp-c-bg)' })
    }

    onMounted(() => {
      initZoom()
    })

    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  },
  enhanceApp({ app, router, siteData }) {
    // any custom app enhancements
  }
}
