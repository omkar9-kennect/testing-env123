
  <template>
  <v-app>
    <v-navigation-drawer
      v-if="isNavAndAppBarVisible"
      rail
      rail-width="78"
      permanent
      elevation="4"
      color="#FFF"
    >
      <v-list nav>
        <v-list-item
          v-for="navItem in navItemList"
          :key="navItem.title"
          :to="navItem.to"
          @click="appBartitle = navItem.title"
          class="side-bar-nav-list-item"
          color="globalPrimary"
        >
          <template v-slot:prepend>
            <v-icon class="ma-1" size="x-large" :icon="navItem.icon"></v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar v-if="isNavAndAppBarVisible" class="top-bar-border" color="#FFF" flat>
      <v-app-bar-title class="font-weight-bold mx-10 text-h5 text-topBarText" >
        {{ getappbarTitle }}
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <nuxt-page :keepalive="true"></nuxt-page>
    </v-main>
  </v-app>
</template>


<script>
import { mapState } from "pinia";
export default {
  data() {
    return {
       appbarTitle: "",
    };
  },
  computed: {
    ...mapState(useLayoutStore, ["navItemList", "isNavAndAppBarVisible"]),
    getappbarTitle() {
      if (this.appbarTitle === "") {
        const navitem = this.navItemList.find(
          (item) => item.to === this.$route.path
        );
        return navitem?.title || "Title";
      }
      return this.appBartitle;
    },
  },
};
</script>

<style scoped>
.side-bar-nav-list-item {
  border-radius: 14px !important;
  margin: 10px 0 !important;
  width: 56px;
  height: 53px;
}
.side-bar-nav-list-item:last-child {
  position: fixed;
  bottom: 2px;
}
.top-bar-border{
 border-bottom: 1px solid #e1e3e2 !important;
}
</style>