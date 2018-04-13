<template>
    <div class="contents">
        <div class="svg-wrapper">
            <svg :viewBox="viewBox">
                <g :transform="timeTransform">
                    <text  v-for="n in hourRange" :x="tableWidth * (1 - tableScale)" :y ="dim * (n - 1) + tablePaddingTop" text-anchor="end" dominant-baseline="middle" style="font-size:15px">{{(n + startHour - 1) + ":00"}}</text>                                        
                </g>
                <g :transform="daysAndTableTransform">
                    <text  v-for="n in dayNum" :x="(dim * n - 1) - (dim / 2)" y ="30" text-anchor="middle" style="font-size: 20px">{{days[n - 1]}}</text>                    
                    <g :transform="tableTransform" >
                        <line id="verticalLine"v-for="n in dayNum" :x1="dim * n" y1="0" :x2="dim * n" :y2="(hourRange - 1) * dim" stroke="black" stroke-width="2" />
                        <line id="horizontalLine" v-for="n in hourRange" x1="0" :y1="dim * (n - 1)" x2="640" :y2="dim * (n - 1)" stroke="black" stroke-width="2" />
                        <TableItem v-for="tableItem in tableItems"
                            :key="tableItem.id" :day="tableItem.day" :name="tableItem.name" :place="tableItem.place"
                            :startHour="tableItem.startHour" :startMinutes="tableItem.startMinutes"
                            :endHour="tableItem.endHour" :endMinutes="tableItem.endMinutes"
                        />                    
                    </g>
                </g>
            </svg>
        </div>
    </div>
</template>

<script>
import TableItem from './TableItem'
import {mapGetters} from 'vuex'
import Datas from './Datas'
export default {
    data () {
        return {
            tablePaddingTop: Datas.tablePaddingTop,
            days: Datas.days,
            tableScale: Datas.tableScale,
            tableWidth: Datas.tableWidth
        }
    },
    computed: {
        ...mapGetters([
            'tableItems',
            'dayNum',
            'startHour',
            'endHour'
        ]),
        viewBox: function () {
            return "0 0 " + this.tableWidth + " " + this.dim * this.hourRange
        },
        hourRange: function() {
            return this.endHour - this.startHour + 1
        },
        dim: function() {
            return this.tableWidth / this.dayNum
        },
        tableTransform: function () {
            return `translate(0, ${this.tablePaddingTop})`
        },

        daysAndTableTransform: function () {
            return `translate(${this.tableWidth * ( 1 - this.tableScale)}, 0), 
                        scale(${this.tableScale}, ${this.tableScale})`

        },
        timeTransform: function () {
            return `translate(0, 0), scale(${this.tableScale}, ${this.tableScale})`
        },
    },

    methods: {
        itemPosX: function (day) {
            const dim = this.tableWidth / this.dayNum
            console.log(dim)
            this.days.forEach( function (val, index) {
                if(day === val) {
                    return (dim * index - 1) - (dim / 2)
                }
            })
        },
        goTo (url) {
        const newWindow = window.open(url, '_blank')
        newWindow.opener = null
        newWindow.location = url
        }
    },
    
    created () {
        this.$store.dispatch('getAllTableItems')
    },

    components: {
        TableItem
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contents {
    max-width: 640px;
    margin: auto;
}
.svg-wrapper {
    position: relative;
    width: 100%;
    padding-top: 100%;
}
.svg-wrapper svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

</style>
