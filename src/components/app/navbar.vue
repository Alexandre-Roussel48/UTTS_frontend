<script>

export default {
  name: 'app_navbar',
  methods: {
    async logout() {
      await fetch(`${this.$url_prefix}/api/logout`, {
        method: 'POST',
        credentials: "include",
      });
      this.$store.commit('set_user_data', {
        username: "",
        connection_count: -1,
        is_admin: false
      });
      this.$store.commit('set_next_card', {
        next_card: ""
      });
      this.$store.commit('set_next_theft', {
        next_theft: ""
      });
      this.$store.commit('set_thefts', {
        thefts: []
      });
      if (this.$store.getters.get_ws != null) {await this.$store.getters.get_ws.close();}
      this.$router.push('/');
    }
  }
}

</script>

<template>
  <nav class="navbar has-background-primary" role="navigation" aria-label="main navigation" v-if="this.$store.getters.is_connected">
    <div class="navbar-brand">
      <RouterLink to="/" class="navbar-item">
        <img class="header_logo" src="@/assets/favicon.svg">
      </RouterLink>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <RouterLink to="/inventory" class="navbar-item">
          <img class="header_category" src="@/assets/inventory.svg">
        </RouterLink>
        <RouterLink to="/vault" class="navbar-item">
          <img class="header_category" src="@/assets/vault.svg">
        </RouterLink>
        <RouterLink to="/forge" class="navbar-item">
          <img class="header_category" src="@/assets/forge.svg">
        </RouterLink>
      </div>
      <div class="navbar-end">
        <RouterLink to="/admin" class="navbar-item" v-if="this.$store.getters.is_admin">
          <img class="header_category" src="@/assets/admin.svg">
        </RouterLink>
        <RouterLink to="/theft" class="navbar-item">
          <img class="header_category" src="@/assets/theft.svg">
        </RouterLink>
        <RouterLink to="/drop" class="navbar-item">
          <img class="header_category" src="@/assets/drop.svg">
        </RouterLink>
        <RouterLink to="/me" class="navbar-item">
          <img class="header_category" src="@/assets/me.svg">
        </RouterLink>
        <div class="navbar-item">
          <button class="button is-success" v-on:click.prevent="logout()">
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
  <nav class="header_long has-background-primary" v-else>
    <img src="@/assets/long.svg">
  </nav>
</template>