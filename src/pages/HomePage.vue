<template id="home">
  <v-ons-page>
    <v-ons-navigator swipeable
      :page-stack="pageStack"
      @push-page="pageStack.push($event)"
      @pop-page="pageStack.pop()"
    ></v-ons-navigator>
  </v-ons-page>
</template>

<script>
import Table from '@/components/Table'
export default {
  data () {
    return {
      pageStack: [Table],
    }
  },
  methods: {

  },
  components: {
    Table
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
}

img {
  max-width: 300px;
}

ons-list-title {
  text-transform: none;
}

ons-list-title:not(:first-of-type) {
  margin-top: 30px;
}

ons-card {
  text-align: center;
}

ons-list-item, ons-card {
  cursor: pointer;
}
</style>
