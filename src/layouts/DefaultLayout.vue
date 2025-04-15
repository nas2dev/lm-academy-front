<script setup>
import FooterDefault from '@/components/default/general/FooterDefault.vue'
import HeaderDefault from '@/components/default/general/HeaderDefault.vue'
</script>

<template>
  <main class="px-4">
    <!-- header -->
    <HeaderDefault />
    <!-- end header -->

    <!-- content -->
    <router-view class="wrapper min-h-[80vh]" />
    <!-- end content -->
    <!-- footer -->
    <FooterDefault />
    <!-- end footer -->
  </main>
</template>
