import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      themes: {
        light: {
          colors: {
            globalGray: '#F5F5F5',
            globalPrimary: '#00696C',
            globalSecondary: '#CCE8E8',
            globalTertiary: '#D3E3FF',
            errorPrimary: '#BA1B1B',
            errorSecondary: '#FFDAD4',
            successPrimary: '#158858',
            successSecondary: '#D4FFE5',
            tooltip: '#051C36',
            topBarText:'#5b5f5f'
          },
        },
      },
    },

    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
