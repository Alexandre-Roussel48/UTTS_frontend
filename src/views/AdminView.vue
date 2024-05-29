<script>

import User from '@/components/admin/user.vue'

export default {
  name: 'admin',
  components: { User },
  data () {
    return {
      users: []
    }
  },
  methods: {
    async get_users() {
      let response = await fetch(`${this.$url_prefix}/api/users`, {
        method: 'GET',
        credentials: "include",
        headers: {
          'Content-Type':'application/json'
        }
      });
      this.users = await response.json();
    }
  },
  async mounted () {
    await this.get_users();
  }
}

</script>

<template>
  <main>
    <div class="header_long">
      <img src="@/assets/admin.svg">
    </div>
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <div class="table-container">
          <table class="table is-bordered is-fullwidth">
            <thead>
              <tr>
                <th>User</th>
                <th>Cards</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>User</th>
                <th>Cards</th>
              </tr>
            </tfoot>
            <tbody>
              <User v-for="user in users" :user="user" @rerender="get_users"/>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>