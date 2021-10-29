<template>
  <div id="vidPage">
    <h2 :class="[`${json[currentIndex].colorScheme}Color`]">
      {{ json[currentIndex].video.title }}
      <i class="far fa-eye" data-v-ae914fcc=""></i>
    </h2>
    <div id="stuffWrap">
      <img :src="`/assets/img/${json[currentIndex].video.thumbnail}`" />
      <p>{{ json[currentIndex].video.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "vid",
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

h2
  padding: .5em
  margin-bottom: 1em
  position: relative
  i
    font-size: 2em
    position: absolute
    right: 0.25em
    top: 0em
    color: white
    cursor: pointer
  &.redColor
    background-color: rgba($darkRed, .5)
#stuffWrap
  width: 100%
  @include mobile
    text-align: center
  img
    width: 30%
    float: left
    box-shadow: 3px 4px 6px 1px rgba(0, 0, 0, .5)
    @include mobile
      max-height: 50vh
      max-width: 100%
      width: auto
      margin: 0 auto
      margin-bottom: 1em
      float: none
  p
    display: block
    margin-left: calc(30% + 1em)
    text-align: left
    @include mobile
      margin-left: 0
</style>
