<script>

import Display from '@/components/forge/display.vue'

export default {
  name: 'forge',
  components: {Display},
  data () {
    return {
      forge: [],
      card : {}
    }
  },
  methods: {
    async get_cards() {
      let response = await fetch(`${this.$url_prefix}/api/user/forge`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type':'application/json'
        }
      });
      this.forge = await response.json();
    },
    async forge_card() {
      await fetch(`${this.$url_prefix}/api/user/forge`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type':'application/json'
        }
      })
      .then(resp => resp.json())
      .then(forge_data => {
        if ('forge' in forge_data) {
          this.card = forge_data['forge'];
        }
      });
      await this.get_cards();
    },
    reset () {
      this.card = {};
    },
    getImageSource(cardName) {
      return `cards/${cardName}.png`;
    }
  },
  async mounted () {
    await this.get_cards();
  }
}

</script>

<template>
  <main>
    <div class="header_long">
      <div v-if="this.forge.length > 0">
        <img class="pulsate" src="@/assets/click.svg">
        <img class="pulsate" src="@/assets/little_arrow_right.svg">
        <button class="forge-button" v-on:click.prevent="forge_card()">
          <img src="@/assets/forge.svg">
        </button>
        <img class="pulsate" src="@/assets/little_arrow_left.svg">
        <img class="pulsate" src="@/assets/click.svg">
      </div>
      <img v-else src="@/assets/forge.svg">
    </div>
    <div class="columns">
      <div class="column is-10 is-offset-1">
        <div class="columns is-multiline">
          <div class="column is-1"></div>
          <div class="column is-2" v-for="card in this.forge">
            <Display :card_data="card" @rerender="get_cards"/>
          </div>
        </div>
      </div>
    </div>
    <div class="modal is-active card-modal" v-if="Object.keys(this.card).length !== 0">
      <div class="modal-background"></div>
      <div class="modal-content drop_card_content" v-on:click.prevent="reset()">
        <div class="card drop_card">
          <div class="card-image">
            <figure class="image">
              <img :src="getImageSource(card.name)" alt="Card image"/>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>