<script>

export default {
  name: 'inventory_display',
  props: ['card_data'],
  methods: {
    async inventory() {
      await fetch(`${this.$url_prefix}/api/user/inventory`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          'card':this.card_data,
          'from': 'forge'
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
      <button class="vault-circle" v-on:click.prevent="inventory()">
        <span class="icon has-text-success">
          <font-awesome-icon :icon="['fas', 'cube']" />
        </span>
      </button>
      <div class="count-circle">{{card_data['count']}}</div>
      <figure class="image">
        <img :src="getImageSource(card_data.name)" alt="Card image"/>
      </figure>
    </div>
  </div>
</template>