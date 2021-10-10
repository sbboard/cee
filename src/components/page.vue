<template>
  <div v-if="currentPage == null">definition etc etc that stuff</div>
  <div v-else-if="currentPage == 'example'">
    <Vid></Vid>
  </div>
  <div v-else-if="currentPage == 'lense'">
    <Interconnected></Interconnected>
  </div>
  <div v-else-if="currentPage == 'enrich'">
    <Enriching></Enriching>
  </div>
  <div v-else-if="currentPage == 'challenges'">
    <Challenges></Challenges>
  </div>
  <Page-nav></Page-nav>
</template>

<script>
import Challenges from "./pageComponents/challenges.vue";
import Enriching from "./pageComponents/enriching.vue";
import Interconnected from "./pageComponents/interconnected.vue";
import PageNav from "./pageComponents/pageNav.vue";
import Vid from "./pageComponents/vid.vue";

export default {
  name: "page",
  components: { PageNav, Vid, Interconnected, Enriching, Challenges },
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
