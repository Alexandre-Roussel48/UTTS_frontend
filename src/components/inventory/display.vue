<script>

export default {
  name: 'inventory_display',
  props: ['card_data'],
  methods: {
    async vault() {
      await fetch(`${this.$url_prefix}/api/user/vault`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          'card':this.card_data
        })
      })
      .then(response => {
        this.$emit('rerender');
      });
    },
    async forge() {
      await fetch(`${this.$url_prefix}/api/user/forge`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          'card':this.card_data
        })
      })
      .then(response => {
        this.$emit('rerender');
      });
    },
    getImageSource(cardName) {
      return `cards/${cardName}.png`;
    }
  }
}

</script>

<template>
  <div class="card">
    <div class="card-image">
      <button class="vault-circle" v-on:click.prevent="vault()">
        <span class="icon has-text-success">
          <font-awesome-icon :icon="['fas', 'toolbox']" />
        </span>
      </button>
      <button class="forge-circle" v-on:click.prevent="forge()">
        <span class="icon has-text-success">
          <font-awesome-icon :icon="['fas', 'hammer']" />
        </span>
      </button>
      <div class="count-circle">{{card_data['count']}}</div>
      <figure class="image">
        <img :src="getImageSource(card_data.name)" alt="Card image"/>
      </figure>
    </div>
  </div>
</template>