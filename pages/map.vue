<template>
  <v-layout column justify-center align-center>
    <v-flex text-xs-center xs6 md6>
      <img width="25%" src="/favicon.png">
      <h1 font-size="24">MAPA PSH: (Próximamente...)</h1>
      <br>
      <v-toolbar>
        <v-select
          :items="['Mapa de todas las Rutas', 'Princesa','Quevedo-Recoletos','Atocha', 'Preciados', 'Callao', 'Principe Pio']"
          label="Ver Chinchetas por Ruta"
        ></v-select>
      </v-toolbar>
      <br>
      <img width="50%" src="/Map.jpg">
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  middleware: "coord"
};
</script>



