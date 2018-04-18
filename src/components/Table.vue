<template>
    <v-ons-page>
        <v-ons-toolbar class="home-toolbar">
            <div class="center">HOME</div>
        </v-ons-toolbar>
        <div class="contents">
            <div class="svg-wrapper">
                <svg :viewBox="`0 0 ${this.tableWidth} ${this.cellHeight * this.hourRange + 35}`">
                    <g :transform="timeTransform">
                        <text  v-for="n in 24" v-if="n-1 <= endHour && n-1 >= startHour" :x="tableWidth * (1 - tableScale)" :y ="cellHeight * (n - 1) + tablePaddingTop - cellHeight * startHour" text-anchor="end" dominant-baseline="middle" style="font-size:15px">{{n-1 + ":00"}}</text>                                        
                    </g>
                    <g :transform="daysAndTableTransform">
                        <text  v-for="(day, n) in days" v-if="n <= dayNum - 1" :x="dim * (n + 1 - 1/2)" y ="30" text-anchor="middle" style="font-size: 20px">{{day}}</text>                    
                        <!-- <text  v-for="n in dayNum" :x="(dim * n - 1) - (dim / 2)" y ="30" text-anchor="middle" style="font-size: 20px">{{days[n - 1]}}</text>                     -->
                        <g :transform="tableTransform" >
                            <line id="verticalLine" v-if="vertical && n < dayNum && n != 0" v-for="(day, n) in days" :x1="dim * n" y1="0" :x2="dim * n" :y2="hourRange * cellHeight" stroke="black" stroke-width="1" />
                            <line id="horizontalLine" v-if="horizontal" v-for="n in hourRange + 1" x1="0" :y1="cellHeight * (n - 1)" x2="640" :y2="cellHeight * (n - 1)" stroke="black" stroke-width="1" />
                            <TableItem v-for="tableItem in tableItems"
                                :key="tableItem.id" :id="tableItem.id" :day="tableItem.day" :name="tableItem.name" :classRoom="tableItem.classRoom"
                                :startHour="tableItem.startHour" :startMinutes="tableItem.startMinutes"
                                :endHour="tableItem.endHour" :endMinutes="tableItem.endMinutes"
                                @recive="push(tableItem.id); header=true"
                            />                    
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    </v-ons-page>
</template>

<script>
import TableItem from './TableItem'
import {mapGetters} from 'vuex'
import Datas from './Datas'
import Detail from '@/pages/Detail'
export default {
    data () {
        return {
            tablePaddingTop: Datas.tablePaddingTop,
            days: Datas.days,
            tableScale: Datas.tableScale,
            tableWidth: Datas.tableWidth,
            cellHeight: Datas.cellHeight,
        }
    },
    computed: {
        ...mapGetters([
            'tableItems',
            'dayNum',
            'startHour',
            'endHour',
            'vertical',
            'horizontal'
        ]),
        viewBox: function () {
            // return "0 0 " + this.tableWidth + " " + this.dim * this.hourRange
            return `0 0 ${this.tableWidth} ${this.cellHeight * this.hourRange}`
        },
        hourRange: function() {
            return this.endHour - this.startHour
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
        push (id) {
            console.log(id)
            this.$emit('push-page', {
                extends: Detail,
                data () {
                    return {
                        id: id

                    }
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
