<template>
    <g :transform="itemTransform">
        <rect x=0 y=0 width=80 height=200 rx=5 ry=5 fill="#2CEFBA" stroke="black" stroke-width="2" />
        <rect x=0 y=0 width=80 height=30 rx=5 ry=5 fill="#ffffff" stroke="black" stroke-width="2" />
        <text y=15 x=40 style="font-size:10px" text-anchor="middle" dominant-baseline="middle">{{startHour}}:{{startMinutes}} ~ {{endHour}}:{{endMinutes}}</text>
        <clipPath id="clip1">
            <rect y=90 x=5 width=70 height=20 fill="#2CEFBA" stroke=black stroke-width=2 />
        </clipPath>
        <text y=100 x=5 style="font-size:9px" width="70" text-overflow="clip" text-anchor="left" dominant-baseline="middle" clip-path="url(#clip1)">{{name}}</text>
        <rect y=150 x=10 width=60 height=20 fill="#ffffff" stroke=black stroke-width=2 />
        <text y=160 x=40 style="font-size:10px" text-anchor="middle" dominant-baseline="middle">{{place}}</text>        
    </g>
</template>

<script>
import {mapGetters} from 'vuex'
import Datas from './Datas'
export default {
    props: [
        'day',
        'name',
        'place',
        'startHour',
        'startMinutes',
        'endHour',
        'endMinutes'
    ],
    data () {
        return {

        }
    },
    computed: {
        itemTransform: function () {
            const dim = Datas.tableWidth / this.$store.getters.dayNum
            let hourPos = dim * (this.startHour - this.$store.getters.startHour)
            let minPos = dim / 60 * this.startMinutes
            let y = hourPos + minPos
            let x            
            Datas.days.forEach( (val, index) => {
                if(val === this.day) {
                    console.log(`translate(${(dim * index) + (dim / 2)}, 0)`)
                    x = (dim * index) + (dim / 2) - 40
                } 
            })
            return `translate(${x}, ${y})`
        },
        test: function() {
            return "translate(50, 0)"
        }
    },
    methods: {
        goTo (url) {
        const newWindow = window.open(url, '_blank')
        newWindow.opener = null
        newWindow.location = url
        }
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
