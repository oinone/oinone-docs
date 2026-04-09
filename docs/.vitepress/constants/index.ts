import { ref } from 'vue';

const RUNTIME_CONFIG_RESOLVE = 'runtimeConfigResolve';

export const SITE_DOMAIN = ref('oinone.top');

function loadRuntimeConfig() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  if (Reflect.get(window, RUNTIME_CONFIG_RESOLVE)) {
    return;
  }
  Reflect.set(window, RUNTIME_CONFIG_RESOLVE, (value: Record<string, any>) => {
    if (value && value.SITE_DOMAIN) {
      SITE_DOMAIN.value = value.SITE_DOMAIN;
    }
    Reflect.deleteProperty(window, RUNTIME_CONFIG_RESOLVE);
  });

  const script = document.createElement('script');

  script.src = `/config/manifest.js`;

  const ep = () => {
    Reflect.deleteProperty(window, RUNTIME_CONFIG_RESOLVE);
  };
  script.onload = ep;
  script.onerror = ep;
  document.body.appendChild(script);
}

loadRuntimeConfig();

export const Globals = {
  get isInternal() {
    return SITE_DOMAIN.value === 'oinone.ai';
  },
  get WELCOME_WEBSITE_URL() {
    return `https://www.${SITE_DOMAIN.value}`;
  },
  get GUIDE_WEBSITE_URL() {
    return `https://guide.${SITE_DOMAIN.value}`;
  },
  get OSS_URL() {
    if (Globals.isInternal) {
      return 'https://oinone-oversea.oss-ap-southeast-1.aliyuncs.com';
    }
    return 'https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com';
  }
};
