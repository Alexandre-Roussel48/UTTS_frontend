<script>

import Display from '@/components/forge/display.vue'

export default {
  name: 'forge',
  components: {Display},
  data () {
    return {
      forge: [],
      card : {},
      toggles: [true, false, false, false, false]
    }
  },
  computed: {
    commons() {
      return this.forge.filter((card) => card.rarity == 'common');
    },
    uncommons() {
      return this.forge.filter((card) => card.rarity == 'uncommon');
    },
    rares() {
      return this.forge.filter((card) => card.rarity == 'rare');
    },
    epics() {
      return this.forge.filter((card) => card.rarity == 'epic');
    },
    legendaries() {
      return this.forge.filter((card) => card.rarity == 'legendary');
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
    },
    toggle(index) {
      if (this.toggles[index]) {this.toggles[index] = false;}
      else {
        for (let i = 0; i < 4; i++) {
          if (i != index) {this.toggles[i] = false;}
          else {this.toggles[i] = true;}
        }
      }
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
          <div class="column is-12" v-if="commons.length > 0">
            <div class="box" v-on:click.prevent="toggle(0)">
              <font-awesome-icon :icon="['fas', 'caret-down']" v-if="toggles[0]"/>
              <font-awesome-icon :icon="['fas', 'caret-right']" v-else/>
              Commons
            </div>
          </div>
          <div class="column is-2" v-if="toggles[0]" v-for="card in commons">
            <Display :card_data="card" @rerender="get_cards"/>
          </div>
          <div class="column is-12" v-if="uncommons.length > 0">
            <div class="box" v-on:click.prevent="toggle(1)">
              <font-awesome-icon :icon="['fas', 'caret-down']" v-if="toggles[1]"/>
              <font-awesome-icon :icon="['fas', 'caret-right']" v-else/>
              Uncommons
            </div>
          </div>
          <div class="column is-2" v-if="toggles[1]" v-for="card in uncommons">
            <Display :card_data="card" @rerender="get_cards"/>
          </div>
          <div class="column is-12" v-if="rares.length > 0">
            <div class="box" v-on:click.prevent="toggle(2)">
              <font-awesome-icon :icon="['fas', 'caret-down']" v-if="toggles[2]"/>
              <font-awesome-icon :icon="['fas', 'caret-right']" v-else/>
              Rares
            </div>
          </div>
          <div class="column is-2" v-if="toggles[2]" v-for="card in rares">
            <Display :card_data="card" @rerender="get_cards"/>
          </div>
          <div class="column is-12" v-if="epics.length > 0">
            <div class="box" v-on:click.prevent="toggle(3)">
              Epics
              <font-awesome-icon :icon="['fas', 'caret-down']" v-if="toggles[3]"/>
              <font-awesome-icon :icon="['fas', 'caret-right']" v-else/>
            </div>
          </div>
          <div class="column is-2" v-if="toggles[3]" v-for="card in epics">
            <Display :card_data="card" @rerender="get_cards"/>
          </div>
          <div class="column is-12" v-if="legendaries.length > 0">
            <div class="box" v-on:click.prevent="toggle(4)">
              Legendaries
              <font-awesome-icon :icon="['fas', 'caret-down']" v-if="toggles[4]"/>
              <font-awesome-icon :icon="['fas', 'caret-right']" v-else/>
            </div>
          </div>
          <div class="column is-2" v-if="toggles[4]" v-for="card in legendaries">
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