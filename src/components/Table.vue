<template>
    <div class="contents">
        <div class="svg-wrapper">
            <svg  width="640" :height="hourRange * dim" :viewBox="viewBox">
                <text  v-for="n in dayNum" :x="(dim * n - 1) - (dim / 2) - 5" y ="30" style="font-size: 20px">{{days[n - 1]}}</text>
                <g transform="translate(0,50)">
                    <line v-for="n in dayNum" :x1="dim * n" y1="0" :x2="dim * n" :y2="hourRange * dim" stroke="black" stroke-width="2" />
                    <line v-for="n in hourRange" :x1="10" :y1="dim * (n - 1)" x2="640" :y2="dim * (n - 1)" stroke="black" stroke-width="2" />
                </g>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    name: 'table',
    data () {
        return {
            days: ["月", "火", "水", "木", "金", "土", "日"],
            dayNum: 6,
            startHour: 8,
            endHour: 12,
        }
    },
    computed: {
        viewBox: function () {
            return "0 0 640 " + this.dim * this.hourRange
        },
        hourRange: function() {
            return this.endHour - this.startHour
        },
        dim: function() {
            return 640 / this.dayNum
        }
    },
    methods: {
        getX1: function(n) {
            return 10 * n
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
    padding-top: 100%; /* SVG高さ / SVG幅 * 100 */
}
.svg-wrapper svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

</style>
