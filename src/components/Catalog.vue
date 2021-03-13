<template>
  <main :class="[$style.catalog]">
    <div v-for="id in getItemsOnPage" :key="id">
      <CatalogItem :id="id" />
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import CatalogItem from "./CatalogItem.vue";

export default {
  methods: {
    ...mapActions(["requestData"]),
  },
  computed: {
    ...mapGetters(["getItemsOnPage"]),
  },
  created() {
    const currentData = this.requestData(0);
  },
  components: {
    CatalogItem,
  },
};
</script>

<style module>
.catalog {
  display: flex;
  justify-content: space-around;
  max-width: 600px;
  margin: 0 auto;
  padding-left: 50px;
  padding-right: 50px;
  flex-wrap: wrap;
}
</style>