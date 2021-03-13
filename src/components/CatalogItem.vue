<template>
  <div :class="[$style.card]">
    <div @click="addToCart(id)" class="card">
      <img :class="[$style.card_img]" :src="getItemData.img" alt="pics" />
      <br />
      {{ getItemData.name }}
      <br />
      Цена: {{ getItemData.price }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    id: Number,
  },
  methods: {
    ...mapActions(["addToCart"]),
  },
  computed: {
    ...mapGetters(["getData"]),
    getItemData() {
      return this.getData[this.id];
    },
  },
};
</script>

<style module>
.card {
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 5px 20px 50px rgba(16, 112, 177, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  margin: 20px 10px;
}
.card_img {
  width: 100px;
}
</style>