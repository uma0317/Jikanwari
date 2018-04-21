<template id="detail">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>戻る</v-ons-back-button>
      </div>
      <div class="center">科目追加</div>
    </v-ons-toolbar>
   <v-ons-list>
        <v-ons-list-item>
            <label class="left">
                教科名
            </label>
            <div class="right"
                <v-ons-input style="width:80%;" placeholder="Input Subject Name" float
                v-model="datas.name"
                >
                </v-ons-input>
            </div>
        </v-ons-list-item>
        <v-ons-list-item>
            <label class="left">
                教室
            </label>
            <div class="right"
                <v-ons-input style="width:80%;" placeholder="Input ClassRoom Name" float
                v-model="datas.classRoom"
                >
                </v-ons-input>
            </div>
        </v-ons-list-item>
        <v-ons-list-item>
            <label class="left">
                教師
            </label>
            <div class="right"
                <v-ons-input style="width:80%;" placeholder="Input Teacher Name" float
                v-model="datas.teacher"
                >
                </v-ons-input>
            </div>
        </v-ons-list-item>
        <v-ons-list-item>
            <label class="left">
                曜日
            </label>
            <div class="right"
              <v-ons-select 
                v-model="datas.day"
                class="right"
              >
                <option v-for="item in wdays" :value="item.value">
                  {{ item.text }}
                </option>
              </v-ons-select>
            </div>
        </v-ons-list-item>
        <v-ons-list-item>
          <label class="center">
            開始時刻
          </label>
          <div class="right">
            <v-ons-select 
              v-model="datas.startHour"
              class="center"
            >
              <option v-for="item in hours" :value="item.value">
                {{ item.text }}
              </option>
            </v-ons-select>
            　:　
            <v-ons-select 
              v-model="datas.startMinutes"
              class="center"
            >
              <option v-for="item in minutes" :value="item.value">
                {{ item.text }}
              </option>
            </v-ons-select>
          </div>
        </v-ons-list-item>
        <v-ons-list-item>
          <label class="center">
            開始時刻
          </label>
          <div class="right">
            <v-ons-select 
              v-model="datas.endHour"
              class="center"
            >
              <option v-for="item in hours" :value="item.value">
                {{ item.text }}
              </option>
            </v-ons-select>
            　:　
            <v-ons-select 
              v-model="datas.endMinutes"
              class="center"
            >
              <option v-for="item in minutes" :value="item.value">
                {{ item.text }}
              </option>
            </v-ons-select>
          </div>
        </v-ons-list-item>
      <div class="center" style="text-align:center">
        <v-ons-button style="margin: 6px 0">Normal</v-ons-button>
      </div>
    </v-ons-list>

  </v-ons-page>
</template>

<script>
import DB from '@/db/db'
import Datas from '@/components/Datas'
export default {

  data () {
      return {
        datas: {
            day: "",
            classRoom: "",
            startHour: "",
            startMinutes: "",
            endHour: "",
            endMinutes: "",
            name: "",
        },
        hours: this.range(24),
        minutes: this.range(60),
      }
  },
  computed: {
    wdays: function() {
      let array = []
      for(let val of Datas.days) {
          array.push({text: val, value: val})
      }
      return array
    }
  },
  methods: {
    range (num) {
        let array = []
        for(let i = 0; i < num; i++) {
            array.push({text: i, value: i})
        }
        return array
    },
  },
  watch: {
  },
  created () {
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