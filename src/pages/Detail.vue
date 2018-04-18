<template id="detail">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>戻る</v-ons-back-button>
      </div>
      <div class="center">詳細</div>
    </v-ons-toolbar>
   <v-ons-list>
        <v-ons-list-item>
            <label class="left">
                教科名
            </label>
            <div class="right"
                <v-ons-input style="width:80%;" placeholder="Input Subject Name" float
                v-model="subjectName"
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
                v-model="classRoomtName"
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
                v-model="teacherName"
                >
                </v-ons-input>
            </div>
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
    </v-ons-list>
  </v-ons-page>
</template>

<script>
export default {
    data () {
        return {
            id: "heello"
        }
    },
    created () {
        this.$store.dispatch('getAllTableItems')
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