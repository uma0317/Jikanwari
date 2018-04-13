import database from '@/api/database'
const state = {
    tableItems: [],
    dayNum: 5,
    startHour: 8,
    endHour: 18,
}

const getters = {
    tableItems: state => state.tableItems,
    dayNum: state => state.dayNum,
    startHour: state => state.startHour,
    endHour: state => state.endHour,
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
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
