<template>
  <div :class="[$style.center]">
    <button :class="[$style.btn]" @click="$emit('clicked')">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style module>
.center {
  display: flex;
  justify-content: center;
}
.btn {
  margin: 10px 0;
  padding: 5px 5px;
  border-radius: 5px;
  background-color: silver;
}
</style>