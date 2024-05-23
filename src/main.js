import "../sass/uselessthingstosteal.scss"
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faLock, faCaretLeft, faCaretRight, faToolbox, faHammer, faCube } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faLock, faCaretLeft, faCaretRight, faToolbox, faHammer, faCube)


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.config.globalProperties.$url_prefix = `http://${import.meta.env.VITE_URL_BASE}:${import.meta.env.VITE_PORT}`
app.config.globalProperties.$ws_prefix = `ws://${import.meta.env.VITE_URL_BASE}:${import.meta.env.VITE_WS_PORT}`

const store = createStore({
  state () {
    return {
      username: "",
      connection_count: -1,
      next_card: "",
      next_theft: "",
      thefts: [],
      ws: null
    }
  },
  mutations: {
    set_user_data (state, payload) {
      state.username = payload.username;
      state.connection_count = payload.connection_count;
    },
    set_next_card (state, payload) {
      state.next_card = payload.next_card;
    },
    set_next_theft (state, payload) {
      state.next_theft = payload.next_theft;
    },
    disable_tutorial (state) {
      state.connection_count = -1;
    },
    set_thefts (state, payload) {
      state.thefts = payload.thefts;
    },
    set_websocket(state) {
      state.ws = new WebSocket(`${app.config.globalProperties.$ws_prefix}`);

      state.ws.onmessage = (event) => {
        const jsonData = JSON.parse(event.data);
        const thefts = [];
        thefts.push(jsonData);
        state.thefts = thefts;
      };

      state.ws.onclose = async () => {
        await fetch(`${app.config.globalProperties.$url_prefix}/api/set_last_connection`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type':'application/json',
          }
        });
      };
    }
  },
  getters: {
    is_connected (state) {
      return state.username != "";
    },
    is_first_time (state) {
      return state.connection_count == 0;
    },
    next_card (state) {
      const now = new Date(new Date().toISOString()).getTime();
      const next_card = new Date(state.next_card).getTime();
      return (next_card - now) > 0 ? Math.trunc((next_card - now)/1000) : 0;
    },
    next_theft (state) {
      const now = new Date(new Date().toISOString()).getTime();
      const next_theft = new Date(state.next_theft).getTime();
      return (next_theft - now) > 0 ? Math.trunc((next_theft - now)/1000) : 0;
    },
    has_thefts (state) {
      return state.thefts.length > 0;
    },
    get_thefts (state) {
      return state.thefts;
    },
    get_ws (state) {
      return state.ws;
    }
  }
})

app.use(store)

app.mount('#app')