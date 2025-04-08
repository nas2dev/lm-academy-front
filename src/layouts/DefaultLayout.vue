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
    <div class="wrapper min-h-[80vh]">
      <router-view />
    </div>
    <!-- end content -->
    <!-- footer -->
    <FooterDefault />
    <!-- end footer -->
  </main>
</template>
