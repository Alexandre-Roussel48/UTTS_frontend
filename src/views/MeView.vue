<script>

export default {
  name: 'me',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    async get_user_data() {
      let response = await fetch(`${this.$url_prefix}/api/user/get_user_data`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type':'application/json'
        }
      });
      this.user = await response.json();
    }
  },
  async mounted () {
    await this.get_user_data();
  }
}

</script>

<template>
  <main>
    <div>
      <div class="header_long">
        <img src="@/assets/canister.svg" class="image-animation">
        <div class="has-background-info view-cover"></div>
        <img src="@/assets/me.svg">
      </div>
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <div class="box">
            <div class="columns is-multiline">
              <div class="column is-8">
                <div class="box has-background-success">
                  <p>My profile</p>
                </div>
              </div>
              <div class="column is-12">
                <p>Username : {{user.username}}</p>
              </div>
              <div class="column is-8">
                <div class="box has-background-success">
                  <p>My collection</p>
                </div>
              </div>
              <div class="column is-12">
                <p>Number of cards : {{user.cards}}/45</p>
                <p>Common : {{user.common}}/14</p>
                <p>Uncommon : {{user.uncommon}}/14</p>
                <p>Rare : {{user.rare}}/8</p>
                <p>Epic : {{user.epic}}/5</p>
                <p>Legendary : {{user.legendary}}/4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>