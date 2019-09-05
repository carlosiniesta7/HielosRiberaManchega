<template>
  <v-footer dark height="auto">
    <v-card class="flex" flat tile>
      <v-card-title class="teal">
        <strong class="subheading">No dudes en contactar con nosotros!</strong>
        <v-spacer></v-spacer>
        <div>
          <v-btn class="mx-3" dark icon nuxt to="/contactUs">
            <v-icon size="24px">email</v-icon>
          </v-btn>
          <v-btn
            class="mx-3"
            dark
            icon
            href="http://hielos-la-ribera-manchega.telefonosynegocios.com/"
          >
            <v-icon size="24px">web</v-icon>
          </v-btn>
          <v-btn class="mx-3" dark icon nuxt to="/contactUs">
            <v-icon size="24px">phone</v-icon>
          </v-btn>
        </div>
      </v-card-title>

      <v-card-actions class="grey darken-3 justify-center">&copy;2019 — Hielos La Ribera Manchega</v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["email", "web", "phone"]
  })
};
</script>