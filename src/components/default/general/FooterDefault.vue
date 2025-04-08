<template>
  <footer>
    <div class="footer flex justify-between items-center border-t-textPrimary border-t-4 py-4">
      <nav class="flex gap-2 text-xl">
        <router-link :to="{ name: 'PrivacyPolicy' }" active-class="border-b-textPrimary border-b-2"
          >Privacy Policy</router-link
        >
        <span>|</span>
        <router-link :to="{ name: 'TermsOfService' }" active-class="border-b-textPrimary border-b-2"
          >Terms of Service</router-link
        >
        <span>|</span>
        <router-link :to="{ name: 'ContactPage' }" active-class="border-b-textPrimary border-b-2"
          >Contact</router-link
        >
      </nav>

      <p class="text-xl">Copyright &copy; 2025</p>
    </div>
  </footer>
</template>
