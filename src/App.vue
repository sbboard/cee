<template>
  <div id="home">
    <header>
      <div id="logo" @click="mobileNavOpen = !mobileNavOpen">
        <i class="fas fa-bars"></i>
        <span>cee</span>
      </div>
      <div
        id="sectionName"
        class="topRight"
        :class="`${json[currentIndex].colorScheme}Color`"
        v-if="currentPage == null || currentPage == 'more'"
      >
        {{ json[currentIndex].title }}
      </div>
      <div
        id="sectionName"
        class="topRight"
        :class="`${json[currentIndex].colorScheme}Color`"
        v-else
      >
        <span class="pageName">{{ pageName }}</span>
        <span class="title">{{ json[currentIndex].title }}</span>
        <div id="pageNav">
          <div
            @click="changePage('example')"
            :class="{ active: currentPage == 'example' }"
          >
            <i class="far fa-eye"></i>
          </div>
          <div
            @click="changePage('enrich')"
            :class="{ active: currentPage == 'enrich' }"
          >
            <i class="fas fa-tint"></i>
          </div>
          <div
            @click="changePage('lense')"
            :class="{ active: currentPage == 'lense' }"
          >
            <i class="fas fa-search"></i>
          </div>
          <div
            @click="changePage('challenges')"
            :class="{ active: currentPage == 'challenges' }"
          >
            <i class="fas fa-arrow-circle-up"></i>
          </div>
        </div>
      </div>
    </header>
    <div id="bottomPt">
      <nav :class="{ open: mobileNavOpen }">
        <ul>
          <template v-for="i in json" :key="i.index">
            <li
              v-if="i.index != null"
              :class="[
                { head: i.type == 'topic' },
                `${i.colorScheme}Color`,
                { active: i.index == currentIndex },
              ]"
              @click="changeIndex(i.index)"
            >
              {{ firstWord(i.title) }}
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
  data() {
    return {
      mobileNavOpen: false,
    };
  },
  methods: {
    changeIndex(index) {
      this.mobileNavOpen = false;
      this.$store.commit("setIndex", index);
      this.$store.commit("setPage", null);
    },
    changePage(newPage) {
      this.$store.commit("setPage", newPage);
    },
    firstWord(x){
      if(x){
        return x.split(" ")[0]
      }
      else{
        return x
      }
    }
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
@import "../src/global.sass"

html
  background: #202020
  height: 100%
  body
    height: 100%
    overflow-x: hidden
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
    font-size: 1.5vmin
    height: $headerHeight
    z-index: 501
    position: relative
    box-shadow: 0px -5px 20px 0px #000000
    @include mobile
      position: fixed
    #logo
      font-family: sans-serif
      color: white
      background-color: grey
      border-right: 2px solid black
      border-bottom: 1px solid black
      width: 10rem
      text-align: center
      font-size: 4vh
      display: inline-flex
      height: 100%
      justify-content: center
      align-items: center
      i
        display: none
        margin-right: 1rem
        @include mobile
          display: block
      @include mobile
        border-bottom: 0
        cursor: pointer
    #sectionName
      display: inline-flex
      flex-direction: column
      float: right
      height: 100%
      justify-content: center
      align-content: center
      #pageNav
        position: absolute
        right: 0
        width: 5em
        cursor: pointer
        padding-left: 1rem
        color: white
        div
          width: 1.25em
          display: inline-block
          text-align: center
          font-size: 1em
          transition: color 250ms
          &:hover
            color: $red
          &.active
            color: black
        @include mobile
          display: none
      span
        font-size: .5em
        display: block
        @include mobile
          font-size: .75em
      .pageName
        border-bottom: 1px solid black
      .title
        font-size: 1rem
      &.redColor
        background-color: $darkRed
        #pageNav
          background-color: $darkRed
      &.blueColor
        background-color: $darkBlue
        #pageNav
          background-color: $darkBlue
      &.yellowColor
        background-color: $darkYellow
        #pageNav
          background-color: $darkYellow
      &.purpleColor
        background-color: $darkPurple
        #pageNav
          background-color: $darkPurple
      &.greenColor
        background-color: $darkGreen
        #pageNav
          background-color: $darkGreen
    .topRight
      width: calc(100% - 12rem - 2px)
      font-size: 3em
      padding-left: 2rem
      display: inline-block
  #bottomPt
    position: relative
    min-height: 90vh
    @include mobile
      padding-top: 10vh
    nav
      width: 10em
      border-right: 2px solid black
      display: block
      float: left
      height: 90vh
      background-color: white
      &.open
        bottom: 0vh
      @include mobile
        position: fixed
        bottom: 100vh
        z-index: 500
        width: 100%
        display: block
        transition: bottom .5s
      li
        cursor: pointer
        padding: .5em 0
        padding-left: 1.5em
        background-color: white
        transition: background-color 250ms
        &.redColor
          &:hover
            background-color: $red
          &.active
            background-color: $darkRed
        &.yellowColor
          &:hover
            background-color: $yellow
          &.active
            background-color: $darkYellow
        &.blueColor
          &:hover
            background-color: $blue
          &.active
            background-color: $darkBlue
        &.purpleColor
          &:hover
            background-color: $purple
          &.active
            background-color: $darkPurple
        &.greenColor
          &:hover
            background-color: $green
          &.active
            background-color: $darkGreen
      li.head
        font-weight: bold
        display: block
        font-size: 1.25em
        padding-left: 1em
        &.redColor
          border-bottom: 4px solid $darkRed
        &.blueColor
          border-bottom: 4px solid $darkBlue
        &.yellowColor
          border-bottom: 4px solid $darkYellow
        &.purpleColor
          border-bottom: 4px solid $darkPurple
        &.greenColor
          border-bottom: 4px solid $darkGreen
    main
      margin-left: calc(10em + 2px)
      width: calc(100% - 12em + -2px)
      background-color: pink
      padding: 1em
      min-height: calc(90vh - 2em)
      position: relative
      &.redColor
        background-color: $red
        #moreBtn
          background-color: $darkRed
      &.yellowColor
        background-color: $yellow
        #moreBtn
          background-color: $darkYellow
      &.blueColor
        background-color: $blue
        #moreBtn
          background-color: $darkBlue
      &.purpleColor
        background-color: $purple
        #moreBtn
          background-color: $darkPurple
      &.greenColor
        background-color: $green
        #moreBtn
          background-color: $darkGreen
      @include mobile
        width: calc(100% - 2em)
        margin-left: 0
  #moreBtn
    position: absolute
    bottom: 0
    right: 0
    height: 4rem
    font-weight: bold
    width: 4rem
    display: flex
    align-content: center
    cursor: pointer
    font-size: 1rem
    box-shadow: 3px 4px 6px 1px rgba(0, 0, 0, .5)
    align-items: center
    margin: .5rem
    justify-content: center
    border-radius: 100%
    transition: all 250ms
    background-color: #de4525
    font-family: sans-serif
    text-transform: lowercase
    font-style: italic
    &:hover
      background-color: white !important
      box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, .5)
    @include mobile
      margin: 0
      border-radius: 0
      border-right: 0
      border-top-left-radius: 2em
      border-bottom: 0
</style>
