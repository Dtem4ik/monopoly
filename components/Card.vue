<template>
    <div @click="setZalog(item)" v-if="item.zalog" class="mcard mcard-zalog">
        <div class="mcard-wrap">
            <div class="mcard__head">
                <span class="mcard__head-name">{{ item.name }}</span>
            </div>

            <span class="mcard-pay mcard-pay-lg font-weight-bold">В ЗАЛОГЕ ЗА <br> &#128176;{{ item.sell }}</span>

            <div class="d-flex justify-content-center mt-3">
                <p class="mcard-text">При залоге недвижимости переверните карточку этой стророной вверх</p>
            </div>
        </div>
    </div>
    <div @click="setZalog(item)" v-else class="mcard">
        <div  class="mcard-wrap">
            <div v-if="item.group == 'airport' || item.group == 'other'" class="mcard__head__other">
                <img src="/plane.png" class="mcard__head__other-img" />
                <span class="mcard__head__other-name">{{ item.name }}</span>
            </div>
            <div v-else class="mcard__head" :style="`background: ${item.group}`">
                <span class="mcard__head-title">Карточка собственика</span>
                <span class="mcard__head-name">{{ item.name }}</span>
            </div>

            <span v-if="item.group != 'airport' && item.group != 'other'" class="mcard-pay mcard-pay-lg font-weight-bold">Рента с участка &#128176;{{ item.pay }}</span>

            <div class="mcard__payblock">
                <div v-for="(pay ,i) in item.pays" :key="`pay-${i}`" class="mcard__payblock-item">
                    <span class="mcard__payblock-title">{{ pay.name }}</span>
                    <span class="mcard__payblock-price">&#128176;{{ pay.price }}</span>
                </div>
            </div>

            <span class="mcard-pay font-weight-bold mt-0">Залог участка &#128176;{{ item.sell }}</span>
            <span v-if="item.group != 'airport' && item.group != 'other'" class="mcard-pay mt-0">Цена домов &#128176;{{ item.house }}</span>
            <span v-if="item.group != 'airport' && item.group != 'other'" class="mcard-pay mt-0">Цена отелей &#128176;{{ item.house }}<br>плюс 4 дома</span>

            <div v-if="item.group != 'airport' && item.group != 'other'" class="d-flex justify-content-center mt-3">
                <p class="mcard-text">Если игрок владеет <b>всеми</b> участками одного цвета, рента с <b>незастроенных</b> участков этого цвета <b>удваивается</b></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: ['item', 'setZalog']
})
</script>

<style lang="scss" scoped>
    .mcard {
        font-family: 'Montserrat', sans-serif;
        font-style: normal;
        border-radius: 0;
        border: none;
        padding: 16px;
        box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
        max-width: 345px;
        min-width: 345px;
        width: 345px;
        min-height: 506px;
        max-height: 506px;
        height: 506px;
        &-wrap {
            border: 1px solid #666;
            padding: 8px;
            height: 100%;
        }

        &__head {
            width: 100%;
            padding: 10px 16px;
            border: 2px solid #000;
            display: flex;
            flex-direction: column;
            align-items: center;
            &-title {
                font-weight: bold;
                text-transform: uppercase;
                font-size: 16px;
                margin-bottom: 8px;
            }
            &-name {
                font-weight: 900;
                text-transform: uppercase;
                font-size: 24px;
                margin-bottom: 8px;
            }
            &__other {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 8px 8px;
                padding-top: 18px;
                &-img {
                    width: 135px;
                    object-fit: scale-down;
                    margin-bottom: 12px;
                }
                &-name {
                    font-weight: 900;
                    text-transform: uppercase;
                    font-size: 24px;
                }
            }
        }

        &-pay {
            font-size: 16px;
            width: 100%;
            display: inline-flex;
            justify-content: center;
            text-align: center;
            margin-top: 8px;
            &-lg {
                font-size: 18px;
            }
        }

        &__payblock {
            display: flex;
            flex-direction: column;
            margin-top: 8px;
            margin-bottom: 8px;
            &-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 4px;
            }
            &-title {
                max-width: 50%;
            }
            &-price {
                display: inline-flex;
                align-items: flex-end;
            }
        }

        &-text {
            text-align: center;
            font-size: 10px;
            width: 70%;
            margin-bottom: 8px;
        }

        &-zalog {
            padding: 28px;
            color: #fff;
            .mcard-wrap {
                border: none;
                padding: 8px;
                height: 100%;
                background-image: url('/zalog.png');
                background-repeat: no-repeat;
                background-size: cover;
                border: 1px solid #500000;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 60px 8px;
            }
            .mcard__head {
                background: none;
                border: none;
                padding: 0;
                margin: 0;
                &-name {
                    margin: 0;
                    font-weight: 600;
                    font-size: 21px;
                }
            }
            .mcard-pay {
                margin: 0;
                font-weight: 800;
                font-size: 23px;
            }
            .mcard-text {
                margin-bottom: 12px;
            }
        }
    }
</style>