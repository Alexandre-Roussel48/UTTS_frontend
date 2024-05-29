<script>
import { EventEmitter } from 'events';
import Notification from '@/components/app/notification.vue';

const eventEmitter = new EventEmitter();

export default {
  name: 'home_thefts',
  components: { Notification },
  data() {
    return {
      thefts: [],
      visibleThefts: []
    };
  },
  methods: {
    async processNotifications() {
      for (let i = 0; i < this.thefts.length; i++) {
        this.visibleThefts.push(this.thefts[i]);
        await this.waitForNotification(i);
        fetch(`${this.$url_prefix}/api/user/notification`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: this.thefts[i].id })
        });
      }
      this.$store.commit('set_thefts', { thefts: [] });
    },
    waitForNotification(index) {
      return new Promise((resolve) => {
        eventEmitter.once(`notification-done-${index}`, resolve);
      });
    },
    handleDone(index) {
      eventEmitter.emit(`notification-done-${index}`);
    },
    getImageSource(cardName) {
      return `cards/${cardName}.png`;
    }
  },
  mounted() {
    this.thefts = this.$store.getters.get_thefts;
    this.processNotifications();
  }
};
</script>

<template>
  <div class="thefts-notifications">
    <Notification
      v-if="thefts.length > 0"
      v-for="(theft, index) in visibleThefts"
      :key="theft.id"
      :notificationData="theft"
      @done="handleDone(index)"
    />
  </div>
</template>
