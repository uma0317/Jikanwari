<template>
    <g :transform="itemTransform" @click="$emit('recive')">
        <rect x=0 y=0 :width="itemWidth" :height="itemHeight" rx=5 ry=5 fill="#2CEFBA" stroke="black" :stroke-width="strokeWidth" />
        <NameGroup v-if="itemHeight > 30" :name="name" :x="itemWidth / 2" :y="itemHeight/2" />
        <g v-if="itemHeight > 30" :transform="`translate(0, ${itemHeight - placeHeight - 10})`">
            <clipPath id="placeClip">
                <rect y=0 x=0 :width="itemWidth" height=20 />
            </clipPath>
            <rect y=0 x=0 :width="itemWidth" :height="placeHeight" fill="#ffffff" stroke=black :stroke-width="strokeWidth" />
            <text :y="placeHeight/2" :x="itemWidth/2" style="font-size:15px" text-anchor="middle" dominant-baseline="middle" clip-path="url(#placeClip)">{{classRoom}}</text>
        </g>
        <g id="time">
            <rect x=0 y=0 :width="itemWidth" height=30 rx=5 ry=5 fill="#ffffff" stroke="black" :stroke-width="strokeWidth" />
            <rect x=0.5 y=3 :width="itemWidth-1" height=27 fill="#ffffff" />
            <line x1=0 y1=30 :x2="itemWidth" y2=30 stroke="black" :stroke-width="strokeWidth" />
            <text y=16 :x="itemWidth/2" style="font-size:15px" text-anchor="middle" dominant-baseline="middle">{{startHour}}:{{startMinutes}} ~ {{endHour}}:{{endMinutes}}</text>
        </g>  
    </g>
</template>

<script>
import {mapGetters} from 'vuex'
import Datas from './Datas'
import NameGroup from './NameGroup'
function getY (hour, minutes, baseHour) {
   
    let hourPos = Datas.cellHeight * (hour - baseHour)
    let minPos = Datas.cellHeight / 60 * minutes
    return hourPos + minPos
}
export default {
    props: [
        'day',
        'name',
        'classRoom',
        'startHour',
        'startMinutes',
        'endHour',
        'endMinutes'
    ],
    data () {
        return {
            placeHeight: 30,
            strokeWidth: 1,
        }
    },
    computed: {
        itemTransform: function () {
            const dim = Datas.tableWidth / this.$store.getters.dayNum
            // let hourPos = dim * (this.startHour - this.$store.getters.startHour)
            // let minPos = dim / 60 * this.startMinutes
            // let y = hourPos + minPos
            let y = getY(this.startHour, this.startMinutes, this.$store.getters.startHour)
            let x            
            Datas.days.forEach( (val, index) => {
                if(val === this.day) {
                    console.log(`translate(${(this.width * index) + (this.width / 2)}, 0)`)
                    x = this.width * index + this.width * 0.05
                } 
            })
            return `translate(${x}, ${y})`
        },
        itemHeight: function () {
            let startPosY = getY(this.startHour, this.startMinutes, this.$store.getters.dayNum, this.$store.getters.startHour)
            let endPosY = getY(this.endHour, this.endMinutes, this.$store.getters.dayNum, this.$store.getters.startHour)
            console.log(startPosY, endPosY)
            return endPosY - startPosY
        },
        width: function() {
            return Datas.tableWidth / this.$store.getters.dayNum
        },
        itemWidth: function () {
            return this.width * 0.9
        }
    },
    methods: {
        startMove(evt) {
            const touch = (evt.type === "touchstart")
            if (!touch && evt.button !== 0) return;
            const events = touch ? {
                move: "touchmove",
                stop: "touchend"
            } : {
                move: "touchend",
                stop: "mouseup"
            }
        },
        push() {
            console.log("cliccke")
        }
    },
    components: {
        NameGroup
    }
}
</script>

<style scoped>

</style>
