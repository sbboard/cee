import { createStore } from "vuex";

export const store = createStore({
  state: {
    json: null,
    currentIndex: 0,
    currentPage: null,
  },
  getters: {
    getJSON(state) {
      return state.json;
    },
    getIndex(state) {
      return state.currentIndex;
    },
    getPage(state) {
      return state.currentPage;
    },
  },
  mutations: {
    loadJson(state, info) {
      let convertedJson = JSON.parse(info);
      state.json = convertedJson.pages;
    },
    setPage(state, newPage) {
      state.currentPage = newPage;
    },
    setIndex(state, newIndex) {
      state.currentIndex = newIndex;
    },
  },
});
