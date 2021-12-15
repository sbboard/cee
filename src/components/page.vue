<template>
  <div v-if="currentPage == null" id="defPage">
    <div id="sidePart">
      <div
        id="iris"
        :class="[
          `${json[currentIndex].colorScheme}Color`,
          buttonSteps[miniNav],
        ]"
      ></div>
      <span
        v-if="json[currentIndex].definition"
        :class="{ active: miniNav === 0 }"
        @click="() => (miniNav = 0)"
        >definition</span
      >
      <span
        v-if="json[currentIndex].benefits"
        :class="{ active: miniNav === 1 }"
        @click="() => (miniNav = 1)"
        >benefits</span
      >
      <span
        v-if="json[currentIndex].examples"
        :class="{ active: miniNav === 2 }"
        @click="() => (miniNav = 2)"
        >examples</span
      >
    </div>
    <div id="textWindow">
      <template v-if="miniNav === 0"
        ><p v-html="json[currentIndex].definition"></p
      ></template>
      <template v-if="miniNav === 1"
        ><p v-html="json[currentIndex].benefits"></p
      ></template>
      <template v-if="miniNav === 2"
        ><p v-html="json[currentIndex].examples"></p
      ></template>
    </div>
  </div>
  <div v-else-if="currentPage == 'example'">
    <Vid :page="'example'"></Vid>
  </div>
  <div v-else-if="currentPage == 'lense'">
    <Vid :page="'lense'"></Vid>
  </div>
  <div v-else-if="currentPage == 'enrich'">
    <Enriching></Enriching>
  </div>
  <div v-else-if="currentPage == 'challenges'">
    <Challenges></Challenges>
  </div>
  <Page-nav v-if="currentPage == null"></Page-nav>
  <div
    v-else-if="currentPage != 'enrich'"
    id="moreBtn"
    @click="changePage(null)"
  >
    Back
  </div>
</template>

<script>
import Challenges from "./pageComponents/challenges.vue";
import Enriching from "./pageComponents/enriching.vue";
import PageNav from "./pageComponents/pageNav.vue";
import Vid from "./pageComponents/vid.vue";

export default {
  name: "page",
  components: { PageNav, Vid, Enriching, Challenges },
  data() {
    return {
      miniNav: 0,
      buttonSteps: ["top", "middle", "bottom"],
    };
  },
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

#defPage
  width: 80%
  margin: 0 auto
  display: flex
  justify-content: center
  height: 86%
  margin-top: 1em
  align-items: flex-start
  @include mobile
    flex-direction: column
  #sidePart
    width: fit-content
    display: block
    padding-right: 1em
    border-right: 1px solid black
    display: flex
    flex-direction: column
    float: left
    margin-right: 1em
    font-size: 1.25em
    position: relative
    @include mobile
      width: fit-content
      height: 100%
      flex-direction: column
      align-self: baseline
      transform: rotateZ(90deg)
      -moz-osx-font-smoothing: grayscale
      -webkit-font-smoothing: antialiased !important
      -moz-font-smoothing: antialiased !important
      text-rendering: optimizelegibility !important
      letter-spacing: .03em
    #iris
      height: .6em
      width: .6em
      border-radius: 100%
      position: absolute
      right: -.3em
      transition: top 250ms
      &.top
        top: 15%
      &.middle
        top: 47%
      &.bottom
        top: 82%
      &.redColor
        background-color: $darkRed
      &.purpleColor
        background-color: $darkPurple
      &.greenColor
        background-color: $darkGreen
      &.blueColor
        background-color: $darkBlue
      &.yellowColor
        background-color: $darkYellow
    span
      text-align: right
      text-decoration: underline
      height: 2em
      justify-content: flex-end
      align-items: center
      display: flex
      opacity: .5
      cursor: pointer
      transition: opacity 250ms
      &:hover
        opacity: 1
      &.active
        opacity: 1
#textWindow
  @include mobile
    margin-top: 1em
</style>
