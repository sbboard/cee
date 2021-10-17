<template>
  <div id="topic" v-if="currentPage == null">
    <blockquote>"{{ json[currentIndex].quote }}"</blockquote>
    <figcaption v-html="json[currentIndex].citation"></figcaption>
    <div @click="changePage('more')">More</div>
  </div>
  <div id="moreBtn" v-if="currentPage == 'more'">
    {{ json[currentIndex].more }}
    <div @click="changePage(null)">Back</div>
  </div>
</template>

<script>
export default {
  name: "topic",
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
#topic
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  blockquote
    font-size: 2em
    width: 75%
  figcaption
    text-align: right
    width: 75%;
    margin-top: 1em
  #moreBtn
    position: absolute
    bottom: 0
    right: 0
</style>
