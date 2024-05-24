<script>

export default {
  name: 'home_login',
  data () {
    return {
      username: "",
      password: "",
      remember: false,
      status: ""
    }
  },
  methods: {
    async login() {
      await fetch(`${this.$url_prefix}/api/login`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          'username':this.username,
          'password':this.password,
          'remember':this.remember
        })
      })
      .then(resp => resp.json())
      .then(data => {
        if ('user_data' in data) {
          this.$store.commit('set_user_data', {
            username: this.username,
            connection_count: data['user_data']['connection_count'],
            is_admin: data['user_data']['is_admin']
          });
          this.$store.commit('set_next_card', {next_card: data['user_data']['next_card']});
          this.$store.commit('set_next_theft', {next_theft: data['user_data']['next_theft']});
          this.$store.commit('set_thefts', {thefts: data['user_data']['thefts']});
          this.$store.commit('set_websocket');
        } else {
          this.status = data['status'];
        }
      });
    }
  },
  computed: {
    can_login () {
      return this.password != "" && this.username != "";
    }
  }
}

</script>

<template>
  <div class="box">
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="Username" v-model="username">
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'user']" />
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="password" placeholder="Password" v-model="password">
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'lock']" />
        </span>
      </p>
    </div>
    <div class="field">
      <label class="checkbox">
        <input type="checkbox" v-model="remember"/>
        Remember me
      </label>
    </div>
    <div class="field">
      <small v-if="this.status != ''">{{this.status}}</small>
      <p class="control">
        <button class="button is-success" v-if="can_login" v-on:click.prevent="login()">
          <span>Login</span>
        </button>
        <button class="button is-success" disabled v-else>
          <span>Login</span>
        </button>
      </p>
    </div>
  </div>
</template>