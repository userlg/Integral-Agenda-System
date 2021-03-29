<template>
    <div class="site-logo">
        <router-link to="/">
          <img :src="appLogo3" alt="site logo" width="200" height="30%" v-if="sidebarSelectedFilter.class == 'sidebar-overlay-light'">
          <img :src="appLogo3" alt="site logo" width="200" height="30%" v-else>
        </router-link>
    </div>
</template>

<script>
import AppConfig from "Constants/AppConfig";
import { mapGetters } from "vuex";

export default {
   computed: {
      ...mapGetters(["sidebarSelectedFilter"])
   },
   data() {
      return {
          appLogo3: AppConfig.appLogo3,
          appLogo: AppConfig.appLogo,
          darkLogo: AppConfig.darkLogo
      }
   }
}
</script>
