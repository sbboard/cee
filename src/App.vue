<template>
  <div id="app">
    <header>
      <div id="logo">cee</div>
      <div id="sectionName" class="topRight" v-if="currentPage == null">
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
              :class="{ head: i.type == 'topic' }"
              @click="changeIndex(i.index)"
            >
              {{ i.title }}
            </li>
          </template>
        </ul>
      </nav>
      <main>
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
#app
  border: 5px solid black
  position: relative
  min-height: calc(100vh - 10px)
  header
    width: 100%
    #logo
      font-family: sans-serif
      color: white
      background-color: grey
      border-right: 2px solid black
      border-bottom: 1px solid black
      width: 5rem
      text-align: center
      font-size: 3em
      padding: 2rem
      display: inline-block
    .topRight
      background-color: red
      border-bottom: 1px solid red
      width: calc(100% - 13rem - 2px)
      font-size: 3em
      padding: 2rem
      display: inline-block
      #pageNav
        display: inline-block
        float: right
  #bottomPt
    position: relative
    height: calc(100vh - 10em + 5px)
    nav
      width: 7em
      border-right: 2px solid black
      display: block
      float: left
      padding: 1em
      height: 100%
      .head
        font-weight: bold
    main
      margin-left: calc(9em + 2px)
      width: calc(100% - 11em + -2px)
      background-color: pink
      padding: 1em
      height: 100%
      position: relative
</style>
