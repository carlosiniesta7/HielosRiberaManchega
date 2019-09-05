<template>
  <v-layout>
    <v-flex text-xs-center>
      <ContactUs></ContactUs>
      <Footer></Footer>
    </v-flex>
  </v-layout>
</template>


<script>
import ContactUs from "~/components/ContactUs.vue";
import Footer from "~/components/Footer.vue";

export default {
  components: {
    ContactUs,
    Footer
  },
  middleware: "public"
};
</script>
