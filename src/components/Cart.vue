<template>
  <main>
    <h2>Корзина</h2>
    <table>
      <tr>
        <th :class="[$style.table]">Наименование</th>
        <th :class="[$style.table]">Цена</th>
        <th :class="[$style.table]">Количество</th>
        <th :class="[$style.table]">Сумма</th>
      </tr>
    </table>
    <table v-for="item in getItemsInCart" :key="item.id">
      <CartItem :id="item.id" :quantity="item.quantity" />
    </table>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import CartItem from "./CartItem.vue";

export default {
  computed: {
    ...mapGetters(["getItemsInCart"]),
  },
  components: {
    CartItem,
  },
};
</script>

<style module>
.table {
  width: 100px;
}
</style>