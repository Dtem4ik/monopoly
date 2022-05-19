<template>
  <div class="container">
    <h1 class="text-center pt-2">МОНОПОЛИЯ</h1>

    <UserBlock :money="money" />

    <b-button class="w-100 mt-3 mb-3" v-b-modal.modal-1>Сканировать QR</b-button>

    <div class="row">
      <div class="col">
        <card :setZalog="setZalog" :item="card" v-for="card in mycards" :key="`${card.id}-monopoly`" class="mr-lg-3 mb-3" />
      </div>
    </div>

    <b-modal id="modal-1" title="Сканируй QR карточки">
      <qrcode-stream :track="paintOutline" @decode="onDecode"></qrcode-stream>
    </b-modal>


  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import { QrcodeStream } from '';
const yourModuleName = require('vue-qrcode-reader');
const { QrcodeStream } = yourModuleName

import { card } from '~/interfaces/monopoly_card';

export default Vue.extend({
  components: {
    QrcodeStream
  },
  async mounted () {
    try {
      const data = await this.$axios.$get('https://monopoly-tem4ik-default-rtdb.firebaseio.com/cards.json')
      this.mycards = data
    } catch (error) {
      console.log(error);
    }
    
  },
  data() {
    const mycards: card[] = []
    const cards: card[] = [
      {
        id: 1,
        name: 'Новосибирск',
        pay: '240k',
        group: 'yellow',
        pays: [
          {name: 'С 1 домом', price: '1,2m'},
          {name: 'С 2 домом', price: '3,6m'},
          {name: 'С 3 домом', price: '8,5m'},
          {name: 'С 4 домом', price: '10,25m'},
          {name: 'С ОТЕЛЕМ', price: '12m'}
        ],
        price: 2800000,
        sell: '1,4m',
        house: '1,5m',
        zalog: true
      },
      {
        id: 2,
        name: 'Сыктывкар',
        pay: '160k',
        group: 'orange',
        pays: [
          {name: 'С 1 домом', price: '800k'},
          {name: 'С 2 домом', price: '2,2m'},
          {name: 'С 3 домом', price: '6m'},
          {name: 'С 4 домом', price: '8m'},
          {name: 'С ОТЕЛЕМ', price: '10m'}
        ],
        price: 2000000,
        sell: '1m',
        house: '1m',
        zalog: false
      },
      {
        id: 3,
        name: 'Екатеринбург',
        pay: '500k',
        group: 'blue',
        pays: [
          {name: 'С 1 домом', price: '2m'},
          {name: 'С 2 домом', price: '6m'},
          {name: 'С 3 домом', price: '14m'},
          {name: 'С 4 домом', price: '17m'},
          {name: 'С ОТЕЛЕМ', price: '20m'}
        ],
        price: 4000000,
        sell: '2m',
        house: '2m',
        zalog: false
      }
    ]
    const money: number = 15000000
    return {
      mycards,
      cards,
      money
    };
  },
  methods: {
    setZalog(card: any): void {
      card.zalog = !card.zalog
    },
    onDecode (decodedString: string): void {
      // console.log(this.cards.find(el => (el.id).toString() == decodedString));
      const item = this.cards.find(el => (el.id).toString() == decodedString)
      if (item) {
        this.money = this.money - item.price
        this.mycards.push(item)
      }
      (this as any).$bvModal.hide('modal-1');
    },
    paintOutline (detectedCodes: any, ctx: any) {
      for (const detectedCode of detectedCodes) {
        const [ firstPoint, ...otherPoints ] = detectedCode.cornerPoints

        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },
  }
})
</script>

<style lang="scss">
  .modal {
    padding: 0 !important; // override inline padding-right added from js
  }
  .modal .modal-dialog {
    width: 100%;
    max-width: none;
    height: 100%;
    margin: 0;
  }
  .modal .modal-content {
    height: 100%;
    border: 0;
    border-radius: 0;
  }
  .modal .modal-body {
    overflow-y: auto;
  }
</style>
