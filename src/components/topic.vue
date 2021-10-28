<template>
  <div id="topic" v-if="currentPage == null">
    <blockquote>"{{ json[currentIndex].quote }}"</blockquote>
    <figcaption v-html="json[currentIndex].citation"></figcaption>
    <div id="moreBtn" @click="changePage('more')">More</div>
  </div>
  <div id="more" v-if="currentPage == 'more'">
    {{ json[currentIndex].more }}
    <div id="moreBtn" @click="changePage(null)">Back</div>
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
@import "../../src/global.sass"

#topic
  min-height: 100%
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  padding: 4em 0
  @include mobile
    padding: 1em 0 4rem 0
  blockquote
    font-size: 2em
    width: 75%
  figcaption
    text-align: right
    width: 75%
    margin-top: 1em
#more
  padding: 2rem
  font-size: 1.25rem
</style>
