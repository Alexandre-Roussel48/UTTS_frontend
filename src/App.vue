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
      const data = await fetch(`${this.$url_prefix}/api/check_connection`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          'increment':increment
        })
      });

      const user_data = await data.json();

      if (data.ok) {
        this.$store.commit('set_user_data', {
          username: user_data['username'],
          connection_count: user_data['connection_count'],
          is_admin: user_data['is_admin']
        });
        this.$store.commit('set_next_card', {next_card: user_data['next_card']});
        this.$store.commit('set_next_theft', {next_theft: user_data['next_theft']});
        this.$store.commit('set_websocket');
        const thefts_data = await fetch(`${this.$url_prefix}/api/user/notification`, {
          method: 'GET',
          credentials: "include",
          headers: {
            'Content-Type':'application/json',
          }
        });
        const thefts = await thefts_data.json();
        this.$store.commit('set_thefts', {thefts : thefts});
      } else {
        this.$store.commit('set_user_data', {
          username: "",
          connection_count: -1,
          is_admin: false
        });
        this.$store.commit('set_next_card', {next_card: ""});
        this.$store.commit('set_next_theft', {next_theft: ""});
        this.$store.commit('set_thefts', {thefts: []});
        if (this.$store.getters.get_ws != null) {await this.$store.getters.get_ws.close();}
      }
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
  <main class="home_height has-background-info is-clipped" v-if="!$store.getters.is_connected">
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
  <div v-else>
    <Thefts v-if="$store.getters.has_thefts"/>
    <RouterView class="home_height has-background-info is-clipped"/>
  </div>
</template>