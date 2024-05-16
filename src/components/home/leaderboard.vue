<script>

export default {
  name: 'home_leaderboard',
  data () {
    return {
      leaderboard: []
    }
  },
  methods: {
    async get_leaderboard() {
      let response = await fetch(`${this.$url_prefix}/api/get_leaderboard`, {
        method: 'POST',
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
        <div class="table-container">
          <table class="table is-bordered is-fullwidth">
            <thead>
              <tr>
                <th>User</th>
                <th>Number of cards</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>User</th>
                <th>Number of cards</th>
              </tr>
            </tfoot>
            <tbody>
              <tr v-for="user in leaderboard">
                <td>{{user.username}}</td>
                <td>{{user.cards}}/46</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>