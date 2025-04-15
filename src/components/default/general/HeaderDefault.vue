<template>
  <header>
    <div class="flex justify-between items-center border-b-textPrimary border-b-4 py-4">
      <h1 class="logo text-5xl text-textPrimary">LM Academy</h1>
      <nav class="text-3xl flex gap-2">
        <router-link :to="{ name: 'home' }" active-class="border-b-textPrimary border-b-2"
          >Home</router-link
        >
        <span>|</span>
        <router-link :to="{ name: 'AboutUs' }" active-class="border-b-textPrimary border-b-2"
          >About Us</router-link
        >
        <span>|</span>
        <router-link to="/login" active-class="border-b-textPrimary border-b-2">Login</router-link>
      </nav>
    </div>
  </header>
</template>
