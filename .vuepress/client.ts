import {defineClientConfig} from "vuepress/client";
import {ref, provide} from "vue";

let currentApp;
const WELCOME_WEBSITE_URL = "https://www.oinone.top";

function providerOS() {
  if (!__VUEPRESS_SSR__) {
    const os = ref("pc");
    const OS = (function () {
      var a = navigator.userAgent,
        b = /(?:Android)/.test(a),
        d = /(?:Firefox)/.test(a),
        e = /(?:Mobile)/.test(a),
        f = b && e,
        g = b && !f,
        c = /(?:iPad.*OS)/.test(a),
        h = !c && /(?:iPhone\sOS)/.test(a),
        k = c || g || /(?:PlayBook)/.test(a) || (d && /(?:Tablet)/.test(a)),
        a =
          !k &&
          (b ||
            h ||
            /(?:(webOS|hpwOS)[\s\/]|BlackBerry.*Version\/|BB10.*Version\/|CriOS\/)/.test(
              a
            ) ||
            (d && e));
      return {
        android: b,
        androidPad: g,
        androidPhone: f,
        ipad: c,
        iphone: h,
        tablet: k,
        phone: a,
      };
    })();
    if (OS.phone) {
      os.value = "phone";
    } else if (OS.ipad) {
      os.value = "ipad";
    }
    provide("os", os);
  } else {
    provide("os", ref("pc"));
  }
}

export default defineClientConfig({
  enhance({app, router, siteData}) {
    currentApp = app;
    router.beforeEach((to, from, next) => {
      next();
      if (!__VUEPRESS_SSR__) {
        if (
          !to.fullPath.startsWith("/en") &&
          !to.fullPath.startsWith("/zh-cn")
        ) {
          if (to.fullPath === "" || to.fullPath === "/") {
            window.location.href = WELCOME_WEBSITE_URL + "/document";
          }
        } else {
          const indexPathArr = ["/en/", "/zh-cn/", "/en", "/zh-cn"];
          if (indexPathArr.includes(to.fullPath)) {
            window.location.href = WELCOME_WEBSITE_URL + "/document";
          } else {
            next();
          }
        }
      } else {
        next();
      }
    });
  },
  setup() {
    provide("app", currentApp);
    providerOS();
  },
  layouts: {},
  rootComponents: [],
});
