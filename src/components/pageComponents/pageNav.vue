<template>
  <div id="btmPageNav">
    <div @click="changePage('example')">
      <i class="far fa-eye"></i>
      <span>example video</span>
    </div>
    <div @click="changePage('enrich')">
      <i class="fas fa-tint"></i><span>enriching your ecosystem</span>
    </div>
    <div @click="changePage('lense')">
      <i class="fas fa-search"></i><span>interconnection lenses</span>
    </div>
    <div @click="changePage('challenges')">
      <i class="fas fa-arrow-circle-up"></i>
      <span>common challenges</span>
    </div>
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
@import "../../../src/global.sass"

#btmPageNav
  position: absolute
  bottom: 0
  margin: 0 auto
  left: 0
  height: 10vh
  right: 0
  text-align: center
  display: flex
  align-items: center
  justify-content: center
  padding: 1em
  align-items: flex-end
  padding-bottom: 0
  border-top-left-radius: 2em
  border-top-right-radius: 2em
  width: 80%
  background-color: rgba(0, 0, 0, 0.2)
  transition: width 200ms, border-radius 200ms
  @include mobile
    width: calc(100% - 2rem)
    border-radius: 0
    position: fixed
  div
    display: inline-flex
    cursor: pointer
    width: 6rem
    align-items: center
    flex-direction: column
    padding: 2.5rem 0rem 1rem 0rem
    font-size: 7vmin
    transition: padding 200ms linear
    &:hover
      padding: 0rem 0rem 1rem 0rem
      span
        height: 2rem
        opacity: 1
        margin-top: .5rem
  span
    margin: 0
    font-size: 1rem
    height: 0
    opacity: 0
    overflow: hidden
    transition: height 200ms linear, opacity 200ms linear, margin-top 200ms linear
</style>