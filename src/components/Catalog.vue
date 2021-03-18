<template>
  <div>
    <main :class="[$style.catalog]">
      <div v-for="id in getItemsOnPage" :key="id">
        <CatalogItem :id="id" />
      </div>
    </main>
    <Button @clicked="loadMoreData">Загрузить еще</Button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CatalogItem from "./CatalogItem.vue";
import Button from "./Button.vue";

export default {
  data() {
    return {
      page: 0,
    };
  },
  methods: {
    ...mapActions(["requestData"]),
    loadMoreData() {
      this.page++;
      this.requestData(this.page);
    },
  },
  computed: {
    ...mapGetters(["getItemsOnPage"]),
  },
  created() {
    this.loadMoreData();
  },
  components: {
    CatalogItem,
    Button,
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