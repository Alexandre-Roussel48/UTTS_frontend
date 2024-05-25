<script>

export default {
  name: 'admin_user',
  props: ['user'],
  methods: {
    async delete_user() {
      await fetch(`${this.$url_prefix}/api/user`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          'user_id':this.user.id
        })
      }).then(response => {
        this.$emit('rerender');
      });
    }
  }
}

</script>

<template>
  <tr>
    <td>{{user.username}}</td>
    <td>
      <button class="button" v-on:click.prevent="delete_user()">
        <span class="icon">
          <font-awesome-icon :icon="['fas', 'trash']" />
        </span>
      </button>
    </td>
  </tr>
</template>