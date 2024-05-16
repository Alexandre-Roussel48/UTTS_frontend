<script>
import Tutorial from '@/components/home/tutorial.vue'
import Leaderboard from '@/components/home/leaderboard.vue'

export default {
  name: 'home',
  components: {Tutorial, Leaderboard}
}

</script>

<template>
  <main>
    <Tutorial v-if="this.$store.getters.is_first_time" />
    <Leaderboard v-else />
  </main>
</template>