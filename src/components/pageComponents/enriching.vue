<template>
  <div id="enrich">
    <template v-if="!moreEnabled">
      <h2>What should I keep in mind?</h2>
      <p class="intro">{{ json[currentIndex].enrich.intro }}</p>
      <ul>
        <li
          v-for="i in json[currentIndex].enrich.list"
          :class="[{ noMore: !i.more, more: i.more }]"
          :key="i.text"
          @click="changeMore(i)"
        >
          <template v-if="i.more != null">
            <i class="fas fa-tint moreDrop"></i>
          </template>
          <p>{{ i.text }}</p>
          <div class="moreArrow" v-if="i.more != null">
            <span class="dash"></span>
            <i class="fas fa-angle-right"></i>
          </div>
          <span class="moreText" v-if="i.more != null">more</span>
        </li>
      </ul>
      <div id="moreBtn" @click="changePage(null)">Back</div>
    </template>
    <template v-else>
      <div id="stuffWrap">
        <p class="intro" v-if="moreIntro">{{ moreIntro }}</p>
        <div class="textWrap">
          <img v-if="moreImg != null" :src="`/assets/img/${moreImg}`" />
          <p v-html="moreText"></p>
        </div>
        <div class="textWrap" v-if="moreTextTwo || moreImgTwo">
          <img v-if="moreImgTwo != null" :src="`/assets/img/${moreImgTwo}`" />
          <p v-if="moreTextTwo">{{ moreTextTwo }}</p>
        </div>
      </div>
      <div id="moreBtn" @click="moreEnabled = false">Back</div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Enriching",
  data() {
    return {
      moreEnabled: false,
      moreIntro: null,
      moreText: null,
      moreImg: null,
      moreImgTwo: null,
      moreTextTwo: null,
    };
  },
  methods: {
    changeMore(MI) {
      this.moreEnabled = true;
      this.moreText = MI.more;
      this.moreImg = MI.moreImg;
      this.moreTextTwo = MI.moreTwo;
      this.moreImgTwo = MI.moreImgTwo;
      this.moreIntro = MI.moreIntro;
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
};
</script>

<style lang="sass" scoped>
@import "../../../src/global.sass"

#stuffWrap
  width: 100%
  @include mobile
    text-align: center
  .intro
    margin-bottom: 1em
  .textWrap
    display: inline-block
    margin-bottom: 1em
    width: 100%
  img
    width: 30%
    float: left
    box-shadow: 3px 4px 6px 1px rgba(0, 0, 0, .5)
    filter: brightness(1)
    transition: filter .25s, box-shadow .25s
    margin-right: 1em
    @include mobile
      max-height: 50vh
      max-width: 100%
      width: auto
      margin: 0 auto
      margin-bottom: 1em
      float: none
  p
    display: block
    text-align: left
    &:deep(a)
      color: black
    &:deep(br)
      height: 1em
      content: ''
      display: block
    @include mobile
      margin-left: 0
#enrich
  padding: 0px 2em
  margin-top: 1em
  height: 70vh
  overflow-y: auto
  .intro
    margin: 1.25em 0
  h2
    font-weight: bold
    font-size: 1.25em
    width: fit-content
    border-bottom: 1px solid black
  ul
    margin-left: 1em
    @include mobile
      margin-left: 0
  li
    margin-top: 0.5em
    @include mobile
      margin-top: 1em
    .moreDrop
      width: 2em
      text-align: center
      @include mobile
        float: left
    .moreArrow
      width: 25%
      display: inline-flex
      height: 1em
      font-size: 0.5em
      line-height: 0
      position: relative
      @include mobile
        display: none
      i
        position: absolute
        left: 0
        top: 0
        display: inline-block
        transition: left 500ms
    .moreText
      font-style: italic
      font-weight: bold
      padding-left: .5em
      @include mobile
        font-style: italic
        font-weight: bold
        padding-left: 0.5em
        display: block
        width: 100%
        text-align: right
        &::after
          content: '...'
    .dash
      width: 0%
      margin-bottom: 0.5em
      position: absolute
      height: 0.5em
      border-bottom: 1px solid black
      display: inline-block
      transition: width 500ms
    &.noMore
      margin-left: 2.2em
    &.more
      cursor: pointer
      p
        display: inline-block
        @include mobile
          display: block
          margin-left: 2.2em
      &:hover
        .moreArrow
          .dash
            width: 100%
          i
            left: calc(100% - .5em)
</style>
