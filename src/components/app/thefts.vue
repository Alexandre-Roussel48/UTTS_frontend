<script>

import Notification from '@/components/app/notification.vue'

export default {
  name: 'home_thefts',
  components: { Notification },
  data () {
    return {
      num : 0,
      thefts : []
    }
  },
  methods: {
    increment() {
      fetch(`${this.$url_prefix}/api/user/notification`, {
        method: 'DELETE',
        credentials: "include",
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({ id: this.thefts[this.num].id }),
      });
      this.num += 1;
      if (this.num == this.thefts.length) {
        this.$store.commit('set_thefts', {thefts: []});
      }
    },
    getImageSource(cardName) {
      return `cards/${cardName}.png`;
    }
  },
  async mounted () {
    this.thefts = this.$store.getters.get_thefts;
  }
}

</script>

<template>
  <div class="thefts-notifications">
    <Notification v-if="thefts.length > 0 && num < thefts.length" :notificationData="this.thefts[this.num]" @done="increment"/>
  </div>
</template>