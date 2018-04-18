import database from '@/api/database'


const state = {
    tableItems: [],
    dayNum: 5,
    startHour: 8,
    endHour: 18,
    vertical: true,
    horizontal: true
}

const getters = {
    tableItems: state => state.tableItems,
    dayNum: state => state.dayNum,
    startHour: state => state.startHour,
    endHour: state => state.endHour,
    vertical: state => state.vertical,
    horizontal: state => state.horizontal
}
const actions = {
    getAllTableItems ({ commit }){
        database.getAllTableItems(tableItems => {
            commit('setTableItems', tableItems)
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
}

export default {
    state,
    getters,
    actions,
    mutations
}
