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
import DB from '@/db/db'
import HomePage from './pages/HomePage'
import Settings from './pages/Settings'
import Detail from './pages/Detail'
var db = new DB()
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
          icon: 'fa-bell',
          label: 'News',
          page: Detail,
          badge: 7,
          key: "newsPage"
        },
        {
          icon: 'fa-sliders',
          label: 'Settings',
          page: Settings,
          key: "settingsPage"
        }
      ]
    };
  },
  methods: {
    md() {
      return this.$ons.platform.isAndroid();
    }
  },
  computed: {
    title() {
      return this.tabs[this.activeIndex].label;
    }
  },
  components: {
    HomePage,
    Settings,
    Detail
  }
}
</script>

<style>
</style>
