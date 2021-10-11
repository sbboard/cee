<template>
  <div id="challenges">
    <p v-html="json[currentIndex].challenges.theText"></p>
  </div>
</template>

<script>
export default {
  name: "Challenges",
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
