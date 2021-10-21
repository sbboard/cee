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
#challenges
  padding: 0 3em
  margin-top: 3em
  height: calc(100vh - 22em)
  overflow-y: auto
::v-deep b
  display: block
  font-weight: bold
  margin-top: 1em
  &:first-of-type
    margin-top: 0
</style>
