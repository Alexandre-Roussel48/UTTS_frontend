<script>
export default {
  name: 'TimedNotification',
  props: {
    notificationData: {
      type: Object,
      required: true
    },
    duration: {
      type: Number,
      default: 5000
    }
  },
  data() {
    return {
      progress: 0,
      isVisible: true,
      intervalId: null
    };
  },
  mounted() {
    this.startProgressBar();
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    startProgressBar() {
      const interval = 100;
      const increment = (interval / this.duration) * 100;

      this.intervalId = setInterval(() => {
        this.progress += increment;
        if (this.progress >= 100) {
          clearInterval(this.intervalId);
          this.isVisible = false;
          this.$emit('done');
        }
      }, interval);
    },
    closeNotification() {
      this.isVisible = false;
      clearInterval(this.intervalId);
      this.$emit('done');
    },
    getImageSource(cardName) {
      return `cards/${cardName}.png`;
    }
  }
};
</script>

<template>
  <div v-if="isVisible" class="notification is-primary theft-notification">
    <button class="delete" @click="closeNotification"></button>
    <p>{{ notificationData.thief }} stole your card</p>
    <img :src="getImageSource(notificationData.card.name)" alt="Card image"/>
    <progress class="progress is-small is-success" :value="progress" max="100"></progress>
  </div>
</template>