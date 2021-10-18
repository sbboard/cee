<template>
  <div id="home">
    <header>
      <div id="logo">cee</div>
      <div id="sectionName" class="topRight" :class="`${json[currentIndex].colorScheme}Color`" v-if="currentPage == null">
        {{ json[currentIndex].title }}
      </div>
      <div class="topRight" v-else>
        {{ pageName }}
        {{ json[currentIndex].title }}
        <div id="pageNav">filler</div>
      </div>
    </header>
    <div id="bottomPt">
      <nav>
        <ul>
          <template v-for="i in json" :key="i.index">
            <li
              v-if="i.index != null"
              :class="[{ head: i.type == 'topic' }, `${i.colorScheme}Color`]"
              @click="changeIndex(i.index)"
            >
              {{ i.title }}
            </li>
          </template>
        </ul>
      </nav>
      <main :class="`${json[currentIndex].colorScheme}Color`">
        <!-- topic -->
        <template v-if="json[currentIndex].type == 'topic'">
          <topic></topic>
        </template>

        <!-- pages -->
        <template v-if="json[currentIndex].type == 'page'">
          <page></page>
        </template>
      </main>
    </div>
  </div>
</template>

<script>
import jsonFile from "./app.json";
import topic from "./components/topic.vue";
import page from "./components/page.vue";

export default {
  components: { topic, page },
  name: "CEE Homepage",
  methods: {
    changeIndex(index) {
      this.$store.commit("setIndex", index);
      this.$store.commit("setPage", null);
    },
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
    pageName() {
      switch (this.currentPage) {
        case "example":
          return "Example Video";
        case "enrich":
          return "Enriching Your Ecosystem";
        case "lense":
          return "Interconnection Lenses";
        case "challenges":
          return "Common Challenges";
        default:
          return "Uh...";
      }
    },
  },
  beforeMount() {
    this.$store.commit("loadJson", JSON.stringify(jsonFile));
  },
};
</script>

<style lang="sass">
$mobileWidth: 1000px

//color schemes
$red: rgb(250,221,218)
$darkRed: rgb(222,69,37)
$green: rgb(207,254,224)
$darkGreen: rgb(2,227,69)
$purple: rgb(245,231,248)
$darkPurple: rgb(161,86,199)
$blue: rgb(222,243,252)
$darkBlue: rgb(59,173,228)
$yellow: rgb(255,253,220)
$darkYellow: rgb(243,195,0)

@mixin mobile
    @media (max-width: #{$mobileWidth})
        @content

html
  background: #202020
  height: 100%
  body
    height: 100%
    #app
      height: 100%
#home
  position: relative
  min-height: calc(100vh - 10px)
  max-width: 1000px
  display: block
  margin: 0 auto
  height: 100%
  box-shadow: 0px 20px 37px 10px #000, 0px -20px 37px 10px #000
  header
    width: 100%
    height: 7em
    #logo
      font-family: sans-serif
      color: white
      background-color: grey
      border-right: 2px solid black
      border-bottom: 1px solid black
      width: 6rem
      text-align: center
      font-size: 3em
      padding: 2rem
      display: inline-block
      @include mobile
        border-bottom: 0
    #sectionName
      &.redColor
        background-color: $darkRed
    .topRight
      border-bottom: 1px solid red
      width: calc(100% - 14rem - 2px)
      font-size: 3em
      padding: 2rem
      display: inline-block
      #pageNav
        display: inline-block
        float: right
  #bottomPt
    position: relative
    height: calc(100% - 9em)
    nav
      width: 10em
      border-right: 2px solid black
      display: block
      float: left
      height: calc(100% + 2em)
      background-color: white
      @include mobile
        display: none
      li
        cursor: pointer
        padding: .5em 0
        padding-left: 1.5em
        &.redColor
          &:hover
            background-color: $red
      li.head
        font-weight: bold
        display: block
        font-size: 1.25em
        padding-left: 1em
        &.redColor
          border-bottom: 4px solid $darkRed
    main
      margin-left: calc(10em + 2px);
      width: calc(100% - 12em + -2px);
      background-color: pink
      padding: 1em
      height: 100%
      position: relative
      &.redColor
        background-color: $red
      @include mobile
        width: calc(100% - 2em)
        margin-left: 0
</style>
