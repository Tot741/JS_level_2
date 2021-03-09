<template>
  <div class="card">
      <img :src="item.img" alt="pics">
      {{item.name}}
      {{item.price}}
  </div>
</template>

<script>
export default {
  props: {
        item: Object
    }
}
</script>

<style>

</style>