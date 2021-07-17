
<template>
  <div id="app">
    <SiteNav v-if="showNav"></SiteNav>
    <router-view/>
    <vue-toastr ref="toastrMessage"></vue-toastr>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SiteNav from '@/components/SiteNav'
import VueToastr from "vue-toastr";

export default {
    components: {
      SiteNav,
    "vue-toastr": VueToastr,
    },

    computed: {
      ...mapState(['userProfile']),
      showNav() {
        return Object.keys(this.userProfile).length > 1
      }
    }
}
</script>