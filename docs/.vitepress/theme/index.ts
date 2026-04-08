import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import { nextTick, onMounted, watch } from 'vue';
import { useRoute } from 'vitepress';
import mediumZoom from 'medium-zoom';
import PDF from './components/PDF.vue';

import './style/global.css';
import './style/markdown.css';
import './style/serach.css';

export default {
  extends: DefaultTheme,
  Layout,
  setup() {
    const route = useRoute();
    let zoom: any = null;

    const initZoom = () => {
      if (zoom) {
        zoom.detach();
      }
      
      const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0));
      
      // 提供点击预览功能
      zoom = mediumZoom('.vp-doc img', { 
        background: 'var(--vp-c-bg)',
        scrollOffset: isTouchDevice ? 10000000 : 40
      });
    };

    onMounted(() => {
      initZoom();
    });

    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
  enhanceApp({ app, router, siteData }) {
    // any custom app enhancements
    app.component('PDF', PDF);
  }
};
