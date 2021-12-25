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
@import "../../../src/global.sass"

#challenges
  padding: 0px 2em
  margin-top: 1em
  height: 70vh
  overflow-y: auto
  &:deep(b)
    display: block
    font-weight: bold
    margin-top: 1em
    margin-bottom: 0.5em
    &:first-of-type
      margin-top: 0
  &:deep(a)
    display: block
    margin-top: 1em
    color: black
</style>
