<script>

export default {
  name: 'home_leaderboard',
  data () {
    return {
      leaderboard: []
    }
  },
  computed: {
    getFirstSlice() {
      const firstSlice = this.leaderboard.slice(3);
      return firstSlice.slice(0, firstSlice.length / 2);
    },
    getSecondSlice() {
      const secondSlice = this.leaderboard.slice(3);
      return secondSlice.slice(secondSlice.length / 2 + 1);
    }
  },
  methods: {
    async get_leaderboard() {
      let response = await fetch(`${this.$url_prefix}/api/leaderboard`, {
        method: 'GET',
        credentials: "include",
        headers: {
          'Content-Type':'application/json'
        }
      });
      this.leaderboard = await response.json();
    }
  },
  async mounted () {
    await this.get_leaderboard();
  }
}

</script>

<template>
  <main>
    <div class="header_long">
      <img src="@/assets/leaderboard.svg">
    </div>
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <div class="columns">
          <div class="column is-4 podium-column" v-if="leaderboard[1]">
            <div class="box second">
              <span class="icon-text">
                <span class="icon">
                  <img src="@/assets/second.svg">
                </span>
                <span>{{leaderboard[1].username}}</span>
                <span class="icon">
                  <font-awesome-icon :icon="['fas', 'arrow-right']" />
                </span>
                <span>{{leaderboard[1].cards}}/45 cards</span>
              </span>
            </div>
          </div>
          <div class="column is-4 podium-column" v-if="leaderboard[0]">
            <div class="box first">
              <span class="icon-text">
                <span class="icon">
                  <img src="@/assets/first.svg">
                </span>
                <span>{{leaderboard[0].username}}</span>
                <span class="icon">
                  <font-awesome-icon :icon="['fas', 'arrow-right']" />
                </span>
                <span>{{leaderboard[0].cards}}/45 cards</span>
              </span>
            </div>
          </div>
          <div class="column is-4 podium-column" v-if="leaderboard[2]">
            <div class="box third">
              <span class="icon-text">
                <span class="icon">
                  <img src="@/assets/third.svg">
                </span>
                <span>{{leaderboard[2].username}}</span>
                <span class="icon">
                  <font-awesome-icon :icon="['fas', 'arrow-right']" />
                </span>
                <span>{{leaderboard[2].cards}}/45 cards</span>
              </span>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-6">
            <div class="box" v-for="(user, index) in getFirstSlice">
              <span class="icon-text">
                <span>{{index + 4}} {{user.username}}</span>
                <span class="icon">
                  <font-awesome-icon :icon="['fas', 'arrow-right']" />
                </span>
                <span>{{user.cards}}/45 cards</span>
              </span>
            </div>
          </div>
          <div class="column is-6">
            <div class="box" v-for="(user, index) in getSecondSlice">
              <span class="icon-text">
                <span>{{index + 4 + getFirstSlice.length}} {{user.username}}</span>
                <span class="icon">
                  <font-awesome-icon :icon="['fas', 'arrow-right']" />
                </span>
                <span>{{user.cards}}/45 cards</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>