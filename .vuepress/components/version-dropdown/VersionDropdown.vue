<script lang="ts">
import { defineComponent, h } from 'vue';
import NavbarDropdown from 'vuepress-theme-hope/navbar/components/NavbarDropdown.js';
import { useNavbarVersionDropdown } from './useNavbarVersionDropdown';

export default defineComponent({
  name: 'VersionDropdown',
  setup() {
    const dropdown = useNavbarVersionDropdown();

    return () => {
      if (dropdown.value) {
        return h('div', { class: 'vp-nav-item' },
          h(NavbarDropdown, { config: dropdown.value }, {
            title: () => {
              return h('span', { style: { verticalAlign: 'middle' } }, dropdown.value?.text);
            }
          })
        );
      }
      return null;
    };
  }
});
</script>
