import database from '@/api/database'
import DB from '@/db/db'

const state = {
    tableItems: [],
    dayNum: "",
    startHour: "",
    endHour: "",
    vertical: "",
    horizontal: ""
}

const getters = {
    tableItems: state => state.tableItems,
    dayNum: state => state.dayNum,
    startHour: state => state.startHour,
    endHour: state => state.endHour,
    vertical: state => state.vertical,
    horizontal: state => state.horizontal,
    tableItem: (state) => (id) => {
        console.log(state.tableItems)
        return state.tableItems[0]
    }
}
const actions = {
    getAllTableItems ({ commit }){
        // DB.initSettings()
        // DB.addSettings()
        // DB.addLesson({"day": "月", "name": "プログラミング基礎", "classRoom": "E231", "teacher": "tanaka", "startHour": 8, "startMinutes": 50, "endHour": 9, "endMinutes": 30})
        DB.getAllLesson(tableItems => {
            commit('setTableItems', tableItems)
        })
    },
    getSettings({commit}){
        DB.getSettings(settings => {
            commit('setSettings', settings)
        })
    }
}
const mutations = {
    setTableItems (state, tableItems) {
        state.tableItems = tableItems
    },
    setStartHour (state, startHour) {
        state.startHour = startHour
    },
    setEndHour (state, endtHour) {
        state.endHour = endtHour
    },
    setDayNum (state, num) {
        state.dayNum = num
    },
    setVertical (state) {
        state.vertical = !state.vertical
    },
    setHorizontal (state) {
        state.horizontal = !state.horizontal
    },
    updateItem (state, data) {
        state.tableItems[data.id] = data.data
        DB.updateLesson(data.id, data.data)
    } ,
    setSettings(state, settings) {
        state.dayNum = settings.dayNum
        state.startHour = settings.startHour
        state.endHour = settings.endHour
        state.vertical = settings.vertical
        state.horizontal = settings.horizontal
        console.log(state)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
