<template>
  <div :class="[$style.card]">
    <img :class="[$style.card_img]" :src="getItemData.img" alt="pics" />
    <br />
    {{ getItemData.name }}
    <br />
    Цена: {{ getItemData.price }}
    <Button @clicked="itemToCart(getItemData.id, 1)">В корзину</Button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Button from "./Button.vue";

export default {
  props: {
    id: String,
  },
  methods: {
    ...mapActions(["addToCart", "requestBasket"]),
    itemToCart(itemId, quant) {
      console.log(itemId, quant);
      const itemToAdd = { id: itemId, quant: quant };
      this.addToCart(itemToAdd);
      this.requestBasket();
    },
  },
  computed: {
    ...mapGetters(["getData"]),
    getItemData() {
      return this.getData[this.id];
    },
  },
  components: {
    Button,
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
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 20px 10px;
}
.card_img {
  width: 150px;
}
</style>