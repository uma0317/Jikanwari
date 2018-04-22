<template>
  <v-ons-page id="app">
    <v-ons-tabbar swipeable position="auto"
      :tabs="tabs"
      :visible="true"
      :index.sync="activeIndex"
    >
    </v-ons-tabbar>
  </v-ons-page>
</template>

<script>

import HomePage from './pages/HomePage'
import Settings from './pages/Settings'
import Detail from './pages/Detail'


export default {
  data() {
    return {
      activeIndex: 0,
      tabs: [
        {
          icon: 'fa-home',
          label: "Home",
          page: HomePage,
          key: "homePage"
        },

        {
          icon: 'fa-sliders',
          label: 'Settings',
          page: Settings,
          key: "settingsPage"
        }
      ]
    }
  },
  methods: {
    md() {
      return this.$ons.platform.isAndroid()
    }
  },
  computed: {
    title() {
      return this.tabs[this.activeIndex].label
    }
  },
  components: {
    HomePage,
    Settings,
    Detail
  },
  created() {

  }
}
</script>

<style>
#app {
  max-width: 640px;
  margin: 0 auto;
}
</style>
