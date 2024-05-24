<script>
import Navbar from '@/components/app/navbar.vue'
import Login from '@/components/app/login.vue'
import Register from '@/components/app/register.vue'
import Thefts from '@/components/app/thefts.vue'

export default {
  name: 'app',
  components: { Navbar, Login, Register, Thefts},
  methods: {
    async checkConnection(increment) {
      fetch(`${this.$url_prefix}/api/check_connection`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          'increment':increment
        })
      })
      .then(resp => resp.json())
      .then(async data => {
        if ('user_data' in data) {
          this.$store.commit('set_user_data', {
            username: data['user_data']['username'],
            connection_count: data['user_data']['connection_count'],
            is_admin: data['user_data']['is_admin']
          });
          this.$store.commit('set_next_card', {next_card: data['user_data']['next_card']});
          this.$store.commit('set_next_theft', {next_theft: data['user_data']['next_theft']});
          this.$store.commit('set_thefts', {thefts: data['user_data']['thefts']});
          this.$store.commit('set_websocket');
        } else {
          this.$store.commit('set_user_data', {
            username: "",
            connection_count: -1,
            is_admin: false
          });
          this.$store.commit('set_next_card', {next_card: ""});
          this.$store.commit('set_next_theft', {next_theft: ""});
          this.$store.commit('set_thefts', {thefts: ""});
          if (this.$store.getters.get_ws != null) {await this.$store.getters.get_ws.close();}
        }
      });
    }
  },
  async mounted () {
    await this.checkConnection(true);
    setInterval(() => {
        this.checkConnection(false);
    }, 200000);
  }
}

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="home_height has-background-info is-clipped" v-if="$store.getters.has_thefts">
    <Thefts/>
  </main>
  <main class="home_height has-background-info is-clipped" v-else-if="!$store.getters.is_connected">
    <section class="section">
      <div class="columns">
        <div class="column is-3 is-offset-3">
          <Login />
        </div>
        <div class="column is-3">
          <Register />
        </div>
      </div>
    </section>
  </main>
  <RouterView v-else class="home_height has-background-info is-clipped"/>
</template>