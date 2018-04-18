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
export default {
    props: [
        "id",
    ],
    data () {
        return {
            name: "",
            dayNum: state => state.dayNum,
            itemsDay: [
                { text: '平日', value: '5' },
                { text: '平日 + 土', value: '6' },
                { text: '平日 + 土日', value: '7' }
            ],
            startHour: state => state.startHour,
            endHour: state => state.endHour,
            hours: this.range(),
            vertical: state => state.vertical,
            horizontal: state => state.horizontal
        }
    },
    watch: {
        dayNum: function (newVal, oldVal) {
            this.$store.commit('setDayNum', newVal)
        },
        startHour: function (newVal, oldVal) {
            this.$store.commit('setStartHour', newVal)
        },
        endHour: function (newVal, oldVal) {
            this.$store.commit('setEndHour', newVal)
        },
        vertical: function () {
            this.$store.commit('setVertical')
        },
        horizontal: function () {
            this.$store.commit('setHorizontal')
        }
    },
    methods: {
        goTo (url) {
        const newWindow = window.open(url, '_blank')
        newWindow.opener = null
        newWindow.location = url
        },
        range () {
            let array = []
            for(let i = 0; i < 24; i++) {
                array.push({text: i, value: i})
            }
            return array
        }
    },
    created() {
        this.startHour = this.$store.getters.startHour
        this.endHour = this.$store.getters.endHour
        this.dayNum = this.$store.getters.dayNum
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
