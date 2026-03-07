import {defineClientConfig} from "vuepress/client";
import {provide, ref} from "vue";

let currentApp;

function providerOS() {
    if (__VUEPRESS_SSR__) {
        provide("os", ref("pc"));
        return;
    }

    const userAgent = navigator.userAgent;
    const isAndroid = /Android/.test(userAgent);
    const isMobile = /Mobile/.test(userAgent);
    const isIpad = /iPad.*OS/.test(userAgent);
    const isIphone = !isIpad && /iPhone\sOS/.test(userAgent);
    const isTablet = isIpad || (isAndroid && !isMobile) || /PlayBook/.test(userAgent) || (/Firefox/.test(userAgent) && /Tablet/.test(userAgent));
    const isPhone = !isTablet && (isAndroid || isIphone || /(webOS|hpwOS)[\s\/]|BlackBerry.*Version\/|BB10.*Version\/|CriOS\//.test(userAgent) || (/Firefox/.test(userAgent) && isMobile));

    let device = "pc";
    if (isPhone) {
        device = "phone";
    } else if (isTablet) {
        device = "ipad"; // Assuming tablet should be treated as ipad
    }

    provide("os", ref(device));
}

export default defineClientConfig({
    enhance({app, router}) {
        currentApp = app;
        if (!__VUEPRESS_SSR__) {
            router.isReady().then(() => {
                const {path} = router.currentRoute.value;
                if (path === '/') {
                    const lang = navigator.language;
                    if (lang.toLowerCase().startsWith('zh')) {
                        router.replace('/zh-cn/DevManual/');
                    } else {
                        router.replace('/en/DevManual/');
                    }
                }
            });
        }
    },
    setup() {
        provide("app", currentApp);
        providerOS();
    },
    layouts: {},
    rootComponents: [],
});
