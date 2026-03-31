<script lang="ts">
import { defineComponent, h } from 'vue';
import NavbarDropdown from '@theme-hope/modules/navbar/components/NavbarDropdown';
import { I18nIcon } from '@theme-hope/modules/navbar/components/icons/index';
import { useNavbarLanguageDropdown } from './useNavbarLanguageDropdown';

export default defineComponent({
  name: 'LanguageDropdown',
  setup() {
    const dropdown = useNavbarLanguageDropdown();

    return () => {
      if (dropdown.value) {
        return h('div', { class: 'vp-nav-item' }, h(NavbarDropdown, { config: dropdown.value }, {
          title: () => h(I18nIcon, {
            'aria-label': dropdown.value?.ariaLabel,
            style: {
              width: '1rem',
              height: '1rem',
              verticalAlign: 'middle'
            }
          })
        }));
      }
      return null;
    };
  }
});
</script>
