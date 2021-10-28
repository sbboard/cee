<template>
  <div id="enrich">
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
  </div>
</template>

<script>
export default {
  name: "Enriching",
  data() {
    return {
      moreEnabled: false,
      moreIndex: 0,
    };
  },
  methods: {
    changeMore(MI) {
      this.moreEnabled = true;
      this.moreIndex = MI;
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
