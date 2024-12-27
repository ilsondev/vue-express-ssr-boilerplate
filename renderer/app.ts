import { createSSRApp, defineComponent, h } from 'vue'
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '../src/assets/styles.scss';
import '../src/assets/tailwind.css';

import PageShell from './PageShell.vue'
import { setPageContext } from './usePageContext'
import type { Component, PageContext, PageProps } from './types'



export { createApp }

function createApp(Page: Component, pageProps: PageProps | undefined, pageContext: PageContext) {
  const PageWithLayout = defineComponent({
    render() {
      return h(
        PageShell,
        {},
        {
          default() {
            return h(Page, pageProps || {})
          }
        }
      )
    }
  })

  const app = createSSRApp(PageWithLayout)

  app.use(PrimeVue, {
      theme: {
          preset: Aura,
          options: {
              darkModeSelector: '.app-dark'
          }
      }
  });
  app.use(ToastService);
  app.use(ConfirmationService);

  // Make pageContext available from any Vue component
  setPageContext(app, pageContext)

  return app
}
