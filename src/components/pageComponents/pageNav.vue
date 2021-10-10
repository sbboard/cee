<template>
  <div id="pageNav">
    <div @click="changePage('example')">eye</div>
    <div @click="changePage('enrich')">enrich</div>
    <div @click="changePage('lense')">magnifying glass</div>
    <div @click="changePage('challenges')">arrow</div>
  </div>
</template>

<script>
export default {
  name: "pageNav",
  methods: {
    changePage(newPage) {
      this.$store.commit("setPage", newPage);
    },
  },
  computed: {
    json() {
      return this.$store.getters.getJSON;
    },
    currentIndex() {
      return this.$store.getters.getIndex;
    },
    currentPage() {
      return this.$store.getters.getPage;
    },
  },
};
</script>

<style lang="sass" scoped>
#pageNav
    position: absolute
    bottom: 0
    margin: 0 auto
    left: 0
    right: 0
    text-align: center
    display: block
    padding: 1em
    border-top-left-radius: 2em
    border-top-right-radius: 2em
    width: 81%
    background-color: rgba(0,0,0,.2)
</style>