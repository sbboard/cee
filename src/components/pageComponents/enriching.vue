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
        {{ i.text }}
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
#enrich
  padding: 0 3em
  margin-top: 3em
  height: calc(100vh - 22em)
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
  li
    margin-top: 0.5em
    .moreDrop
      width: 2em
      text-align: center
    .moreArrow
      width: 25%
      display: inline-flex
      height: 1em
      font-size: 0.5em
      line-height: 0
      position: relative
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
      &:hover
        .moreArrow
          .dash
            width: 100%
          i
            left: calc(100% - .5em)
            
</style>
