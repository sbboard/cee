<template>
  <div id="vidPage">
    <h2>
      {{ json[currentIndex][directory].title }}
    </h2>
    <div>
      <img :src="`./img/${json[currentIndex][directory].thumbnail}`" />
      <p>{{ json[currentIndex][directory].description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "interconnected",
  data() {
    return {
      directory: "video",
    };
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
    if (this.json[this.currentIndex].lense.sameAsVideo) {
      this.directory == "video";
    } else {
      this.directory == "lense";
    }
  },
};
</script>

<style lang="sass" scoped>
</style>
