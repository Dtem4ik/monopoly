<template>
    <div class="userBlock">
        <span>Игрок: <b>Артем</b></span>
        <span>Баланс: <b>&#128176;{{ money }}</b></span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: ['money']
    
})
</script>

<style lang="scss" scoped>
.userBlock {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
        font-size: 16px;
        b {
            font-size: 18px;
        }
    }
}
</style>