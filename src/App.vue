<template>
 <p>{{ message }}</p>
</template>

<script setup>
import {ref} from "vue"
const message = ref("Almedin");

setTimeout(() => {
  message.value = "Perfundoj kursi per sot!"
}, 5000);
</script>

<style>
p{
  color: red;
}
</style>