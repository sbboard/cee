<template>
  <div id="enrich">
    <h2>What should I keep in mind?</h2>
    <p>{{ json[currentIndex].enrich.intro }}</p>
    <ul>
      <li v-for="i in json[currentIndex].enrich.list" :key="i.text">
        {{ i.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Enriching",
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
