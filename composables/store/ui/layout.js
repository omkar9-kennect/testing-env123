import { defineStore, acceptHMRUpdate } from 'pinia';

export const useLayoutStore = defineStore('layout-store', {
  state: () => {
    return {
      navItemList: [
        {
          title: 'Explore',
          icon: mdiCompassOutline,
          to: '/',
        },
        {
          title: 'Data Storage and Management',
          icon: mdiDatabaseOutline,
          to: '/dsm',
        },
        // {
        //   title: 'CMF',
        //   icon: mdiFormatListGroup,
        //   to: '/cmf',
        // },
        // {
        //   title:'KPI',
        //   icon:mdiWrenchOutline,
        //   to:'/kpi'
        // },
         {
          title: 'Home',
          icon: mdiHomeVariantOutline,
          to: '/',
        },
      ],
      isNavAndAppBarVisible: true,
    };
  },

  getters: {},

  actions: {
    toggleFullScreenView() {
      this.isNavAndAppBarVisible = !this.isNavAndAppBarVisible;
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot));
}