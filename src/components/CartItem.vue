<template>
  <tr>
    <td :class="[$style.table]">{{ getCartItem.name }}</td>
    <td :class="[$style.table]">{{ getCartItem.price }}</td>
    <td :class="[$style.table]">{{ this.quant }}</td>
    <td :class="[$style.table]">{{ getCartItem.price * this.quant }}</td>
  </tr>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    id: Number,
    quant: Number,
  },
  computed: {
    ...mapGetters(["getData"]),
    getCartItem() {
      return this.getData[this.id];
    },
  },
};
</script>

<style module>
.table {
  width: 120px;
}
</style>