import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      data: {},
      itemsOnPage:[],
      itemsInCart:[],

  },
  getters: {
    getData: state => state.data,
    getItemsOnPage: state => state.itemsOnPage,
    getItemsInCart: state => {
      const result = []
      const itemsInCart = state.itemsInCart.reduce((acc, rec, index) => {
        return (typeof acc[rec] !== 'undefined') 
          ? { ...acc, [rec]: acc[rec] + 1 } 
          : { ...acc, [rec]: 1 }
        }, {});
      for (let item in itemsInCart) 
        result.push({"id": item, "quantity": itemsInCart[item]});
  
      return result
    }
  },
  mutations: {
    setData (state, payload){
        state.data = payload.newData;
        state.itemsOnPage = Object.keys(payload.newData)
    },
    setItemsInCart (state, payload){
      state.itemsInCart.push(payload)
    }
  },
  actions: {
    requestData ({ commit }, page) {
      fetch(`/database/items${page}.json`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        commit('setData', { newData: res })
      })
    },
    addToCart ({ commit }, id) {
      commit ('setItemsInCart', id)
    }
  }
});

