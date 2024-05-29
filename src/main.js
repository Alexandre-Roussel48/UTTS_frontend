import "../sass/uselessthingstosteal.scss"
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faLock, faCaretLeft, faCaretRight, faToolbox, faHammer, faCube, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faLock, faCaretLeft, faCaretRight, faToolbox, faHammer, faCube, faTrash)


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

if (process.env.SECURE) {
  app.config.globalProperties.$url_prefix = `https://${process.env.URL_BASE}:${process.env.PORT}`
  app.config.globalProperties.$ws_prefix = `wss://${process.env.URL_BASE}:${process.env.PORT}`
} else {
  app.config.globalProperties.$url_prefix = `http://${process.env.URL_BASE}:${process.env.PORT}`
  app.config.globalProperties.$ws_prefix = `ws://${process.env.URL_BASE}:${process.env.PORT}`
}

const store = createStore({
  state () {
    return {
      username: "",
      connection_count: -1,
      is_admin: false,
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
      state.is_admin = payload.is_admin;
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
      const setupWebSocket = () => {
        state.ws = new WebSocket(`${app.config.globalProperties.$ws_prefix}/api/socket`);
        state.ws.onmessage = (event) => {
          const thefts = JSON.parse(event.data);
          state.thefts = thefts;
        };
        state.ws.onclose = async (event) => {
          if (!event.wasClean) {
            setupWebSocket();
          }
        };
      };

      setupWebSocket();
    }
  },
  getters: {
    is_connected (state) {
      return state.username != "";
    },
    is_admin (state) {
      return state.is_admin;
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