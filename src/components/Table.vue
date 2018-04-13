<template>
    <div class="contents">
        <div class="svg-wrapper">
            <svg width="400" :height="hourRange * dim">
                <g transform="translate(0,50)">
                    <line v-for="n in dayNum" :x1="dim * n" y1="0" :x2="dim * n" :y2="hourRange * dim" stroke="black" stroke-width="2" />
                    <line v-for="n in hourRange" :x1="10" :y1="dim * (n - 1)" x2="400" :y2="dim * (n - 1)" stroke="black" stroke-width="2" />
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
            dayNum: 5,
            startHour: 8,
            endHour: 18,
        }
    },
    computed: {
        hourRange: function() {
            return this.endHour - this.startHour
        },
        dim: function() {
            return 400 / this.dayNum
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
    max-width: 400px;
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
