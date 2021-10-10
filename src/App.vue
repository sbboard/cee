<template>
  <div id="app">
    <header>
      <div id="logo">cee</div>
      <div id="sectionName">
        {{ json[currentIndex].title }}
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

        </template>
      </main>
    </div>
  </div>
</template>

<script>
import jsonFile from "./app.json";
import topic from "./components/topic.vue";

export default {
  components: { topic },
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
  },
  beforeMount() {
    this.$store.commit("loadJson", JSON.stringify(jsonFile));
  },
};
</script>

<style lang="sass" scoped>
#app
  border: 5px solid black
  position: relative
  min-height: calc(100vh - 10px)
  header
    width: 100%
    div
      display: inline-block
      padding: 2rem
    #logo
      font-family: sans-serif
      color: white
      background-color: grey
      border-right: 2px solid black
      border-bottom: 1px solid black
      width: 5rem
      text-align: center
      font-size: 3em
    #sectionName
      background-color: red
      border-bottom: 1px solid red
      width: calc(100% - 13rem - 2px)
      font-size: 3em
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
