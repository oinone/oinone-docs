import { Globals } from '../../../constants';
import { useTranslate } from '../../../plugins';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useData } from 'vitepress';

export const useNavbar = () => {
  const { theme, lang } = useData();
  const { t: $t } = useTranslate();

  const scrolled = ref(false);
  const isMobile = ref(false);
  const isMoreOpen = ref(false);

  const localePath = (uri: string) => {
    return `${Globals.WELCOME_WEBSITE_URL}${uri}`;
  };

  const docUrl = computed(() =>
    lang.value === 'zh' || lang.value === 'zh-cn'
      ? `${Globals.GUIDE_WEBSITE_URL}/zh/DevManual/README.html`
      : `${Globals.GUIDE_WEBSITE_URL}/en/DevManual/README.html`
  );

  const onScroll = () => {
    scrolled.value = window.scrollY > 10;
  };

  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 960;
    if (!isMobile.value) {
      isMoreOpen.value = false;
    }
  };

  const closeMoreDropdown = (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.mobile-more-wrap')) {
      isMoreOpen.value = false;
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', checkMobile);
    document.addEventListener('click', closeMoreDropdown);
    checkMobile();
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', checkMobile);
    document.removeEventListener('click', closeMoreDropdown);
  });

  return {
    $t,
    scrolled,
    isMobile,
    isMoreOpen,
    theme,
    localePath,
    docUrl
  };
};