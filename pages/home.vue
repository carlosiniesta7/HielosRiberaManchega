<template>
  <v-layout column justify-center align-center>
    <v-flex text-xs-center>
      <h1>¡BIENVENIDO A LA APP DE HIELOS LA RIBERA MANCHEGA!</h1>
      <br />
      <v-card>
        <br />
        <img src="favicon.png" width="75%" class="grey lighten-2" />
        <v-card-text>
          <br />
          <hr />
          <hr />
          <br />
          <div>
            <h3 class="headline" align="center">DESDE ESTA APLICACIÓN PUEDE:</h3>
          </div>
          <Bottoms></Bottoms>
          <br />
          <hr />
          <hr />
          <br />
          <h1 class="headline" align="center">AVISOS Y NOVEDADES:</h1>
          <br />
          <Ads></Ads>
          <br />
          <hr />
          <hr />
          <br />
          <!--<h2 class="headline" align="center">ENLACES DE INTERÉS:</h2>
          <br />
          <Links></Links>
          <br />
          <br />
          <hr />
          <hr />-->
        </v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
      <Footer></Footer>
    </v-flex>
  </v-layout>
</template>

<script>
import Footer from "~/components/Footer.vue";
import Ads from "~/components/Ads.vue";
import Bottoms from "~/components/Bottoms.vue";
import Links from "~/components/Links.vue";

export default {
  components: {
    Footer,
    Ads,
    Bottoms,
    Links
  },
  middleware: "public"
};
</script>

<style scoped>
a {
  padding: 3.5em;
}
p {
  font-size: 17pt;
}
div {
  align-content: center;
}
</style>
