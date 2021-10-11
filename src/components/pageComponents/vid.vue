<template>
  <div id="vidPage">
    <h2>
      {{ json[currentIndex].video.title }}
    </h2>
    <div>
      <img :src="`./img/${json[currentIndex].video.thumbnail}`" />
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
</style>
