<template>
  <div class="card">
      {{item.name}}
      {{item.price}}
      {{item.quantity}}
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