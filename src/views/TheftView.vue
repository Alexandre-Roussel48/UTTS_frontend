<script>

export default {
  name: 'theft',
  data () {
    return {
      timer : -1,
      card : {},
      victim: ""
    }
  },
  methods: {
    async theft() {
      const data = await fetch(`${this.$url_prefix}/api/user/theft`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type':'application/json'
        }
      });

      const theft_data = await data.json();

      if ('theft' in theft_data) {
        this.card = theft_data['theft'];
        this.victim = theft_data['victim'];
        this.$store.commit('set_next_theft', {next_theft: theft_data['next_theft']});
        this.timer = this.$store.getters.next_theft;
      }
    },
    reset () {
      this.card = {};
    },
    getImageSource(cardName) {
      return `cards/${cardName}.png`;
    }
  },
  watch: {
    timer: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timer--;
          }, 1000);
        }
      },
      immediate: true
    }
  },
  mounted () {
    this.timer = this.$store.getters.next_theft;
  }
}

</script>

<template>
  <main>
    <div class="header_long">
      <img src="@/assets/theft.svg">
    </div>
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <div class="box">
          <div class="columns is-multiline">
            <div class="column is-12">
              <h3 class="title" v-if="timer > 0">Next theft in {{Math.trunc(timer/60)}}:{{timer-Math.trunc(timer/60)*60}} ! 🥷</h3>
              <h3 class="title" v-else>Next theft NOW ! 🥷</h3>
            </div>
            <div class="column is-12 header_long">
              <button class="button is-large is-success" v-if="timer == 0" v-on:click.prevent="theft()">THEFT</button>
              <button class="button is-large is-success" disabled v-else>THEFT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal is-active card-modal" v-if="Object.keys(this.card).length !== 0">
      <div class="modal-background"></div>
      <div class="modal-content drop_card_content" v-on:click.prevent="reset()">
        <div class="card drop_card">
          <div class="card-header">
            <p class="card-header-title">Victim : {{this.victim}}</p>
          </div>
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