<template>
  <div>
      <Catalog />
      <br>
      <Cart />
  </div>
</template>

<script>
import Catalog from './components/Catalog.vue'
import Cart from './components/Cart.vue'
export default {
  components: {
    Catalog,
    Cart,
  }
}
</script>

<style>

</style>