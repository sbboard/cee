<template>
  <div v-if="currentPage == null">
    <blockquote>{{ json[currentIndex].quote }}</blockquote>
    <figcaption v-html="json[currentIndex].citation"></figcaption>
    <div @click="changePage('more')">More</div>
  </div>
  <div v-if="currentPage == 'more'">
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
</style>
