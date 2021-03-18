import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      data: {},
      itemsOnPage:[],
      itemsInCart:{},

  },
  getters: {
    getData: state => state.data,
    getItemsOnPage: state => state.itemsOnPage,
    getItemsInCart: state => state.itemsInCart,
    
  },
  mutations: {
    setData (state, payload) {
        state.data = { ...state.data, ...payload.newData };
        state.itemsOnPage.push(...Object.keys(payload.newData));
    },
    setItemsInCart (state, payload){
      state.itemsInCart = { ... state.itemsInCart, ...payload.newData}
    }
  },
  actions: {
    requestData ({ commit }, page) {
      fetch(`/itemslist/${page}`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        commit('setData', { newData: res })
      })
    },
    addToCart ({}, data) {
      fetch('/itemsincart', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res)
      })
    },
    requestBasket ({ commit }) {
      fetch('/cartlist')
      .then(res => {
        return res.json();
      })
      .then(res => {
        commit('setItemsInCart', { newData: res })
      })
    },
  }
});

