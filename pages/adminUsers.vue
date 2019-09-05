<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-app id="inspire">
        <v-tabs centered color="green" dark icons-and-text>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab href="#tab-1" @click="flat=true">
            Peticiones de Alta
            <v-icon>assignment_ind</v-icon>
          </v-tab>

          <v-tab href="#tab-2" @click="flat=false">
            Administrar Usuarios
            <v-icon>group</v-icon>
          </v-tab>

          <v-tab-item v-for="i in 2" :key="i" :value="'tab-' + i">
            <br>
            <div v-if="flat">
              <br>
              <h1 class="headline">PETICIONES DE ALTA:</h1>
              <br>
              <Pets></Pets>
            </div>
            <div v-else>
              <br>
              <h1 class="headline">USUARIOS DE LA APLICACIÓN:</h1>
              <br>
              <Users></Users>
            </div>
          </v-tab-item>
        </v-tabs>
      </v-app>
    </v-flex>
  </v-layout>
</template>

<script>
import Pets from "../components/Pets";
import Users from "../components/Users";

export default {
  components: {
    Users,
    Pets
  },
  middleware: "admin",
  data() {
    return {
      flat: true
    };
  },
  computed: {
    filtrarUsers() {
      return this.usuarios.filter(usuarios => {
        return usuarios.name.includes(this.busqueda);
      });
    }
  }
};
</script>

<style scoped>
</style>
