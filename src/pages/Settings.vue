<template id="detail">
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
        <div class="center">Settings</div>
    </v-ons-toolbar>
    <v-ons-list>
        <v-ons-list-item>
            <label class="center">
                曜日数
            </label>
          <v-ons-select style="width: 40%"
            v-model="dayNum"
            class="right"
          >
            <option v-for="item in itemsDay" :value="item.value">
              {{ item.text }}
            </option>
          </v-ons-select>
        </v-ons-list-item>
        <v-ons-list-item>
            <label class="center">
                開始時刻
            </label>
          <v-ons-select style="width: 40%"
            v-model="startHour"
            class="right"
          >
            <option v-for="item in hours" :value="item.value">
              {{ item.text }}
            </option>
          </v-ons-select>
        </v-ons-list-item>
        <v-ons-list-item>
            <label class="center">
                終了時刻
            </label>
          <v-ons-select style="width: 40%"
            v-model="endHour"
            class="right"
          >
            <option v-for="item in hours" :value="item.value">
              {{ item.text }}
            </option>
          </v-ons-select>
        </v-ons-list-item>
        <ons-list-item>
            <label class="center" for="verticalSwitch">縦線</label>
            <div class="right">
                <v-ons-switch input-id="verticalSwitch"
                    v-model="vertical"
                >
                </v-ons-switch>
            </div>
        </ons-list-item>
        <ons-list-item>
            <label class="center" for="horizontalSwitch">横線</label>
            <div class="right">
                <v-ons-switch input-id="horizontalSwitch"
                    v-model="horizontal"
                >
                </v-ons-switch>
            </div>
        </ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import { mapMutations } from 'vuex'
export default {
    props: [
        "id",
        
    ],
    data () {
        return {
            name: "",
            itemsDay: [
                { text: '平日', value: '5' },
                { text: '平日 + 土', value: '6' },
                { text: '平日 + 土日', value: '7' }
            ],
        }
    },
    computed: {
        dayNum: {
            get: function () {
                return this.$store.getters.dayNum
            },
            set: function (val) {
                this.$store.commit('setDayNum', val)
            }
        },
        startHour: {
            get: function () {
                return this.$store.getters.startHour
            },
            set: function (val) {
                this.$store.commit('setStartHour', val)
            }
        },
        endHour: {
            get: function () {
                return this.$store.getters.endHour
            },
            set: function (val) {
                this.$store.commit('setEndHour', val)
            }
        },
        vertical: {
            get: function () {
                return this.$store.getters.vertical
            },
            set: function (val) {
                this.$store.commit('setVertical', val)
            }
        },
        horizontal: {
            get: function () {
                return this.$store.getters.horizontal
            },
            set: function (val) {
                this.$store.commit('setHorizontal', val)
            }
        },
        hours: function () {
            let array = []
            for(let i = 0; i < 24; i++) {
                array.push({text: i, value: i})
            }
            return array
        },

    },

    methods: {
        goTo (url) {
        const newWindow = window.open(url, '_blank')
        newWindow.opener = null
        newWindow.location = url
        },
        ...mapMutations([
        'increment', // `this.increment()` を `this.$store.commit('increment')` にマッピングする

        // mapMutations はペイロードサポートする:
        'incrementBy' // `this.incrementBy(amount)` を `this.$store.commit('incrementBy', amount)` にマッピングする
        ]),
    },
    created() {
        console.log(this)
    }
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
