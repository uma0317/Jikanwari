<template>
    <g :transform="translate">
        <text v-for="n in textNum" :y="n * fontSize" x=0 :style="style" width="72" text-anchor="middle" dominant-baseline="middle" >{{name.substr((n-1)*textLength, textLength)}}</text>  
    </g>
</template>

<script>
export default {
    props: [
        "name",
        "x",
        "y"
    ],
    data () {
        return {
            fontSize: 20,
            textLength: 4,
        }
    },
    computed: {
        textNum: function () {
           return Math.ceil(this.name.length / this.textLength)
        },
        translate: function () {
            return `translate(${this.x}, ${this.y - (this.fontSize * (this.textNum + 1)) + (this.fontSize / 2 * (this.textNum + 1 % 2))})`
        },
        style: function() {
            return `font-size:${this.fontSize}px`
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
        }
    }
}
</script>

<style scoped>

</style>
