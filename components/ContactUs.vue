<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-card>
        <br />
        <img width="100%" src="/Tarjeta.jpg" />
        <br />
        <br />
        <!--<div class="contact">
          <v-card-text>
            <v-toolbar>
              <v-flex text-xs-center>
                <h2>
                  <i>
                    <v-icon>email</v-icon>&nbsp;E-mail:
                    <br />
                  </i>
                  RiberaManchega@gmail.es
                </h2>
              </v-flex>
            </v-toolbar>
            <br />

            <v-toolbar>
              <v-flex text-xs-center>
                <h2>
                  <i>
                    <v-icon>map</v-icon>&nbsp;Dirección:
                    <br />
                  </i>
                  Pol. Ind "Pozo de las Nieves" P.60 - Almadén
                </h2>
              </v-flex>
            </v-toolbar>

            <br />
            <v-toolbar>
              <v-flex text-xs-center>
                <h2>
                  <i>
                    <v-icon>phone</v-icon>&nbsp;Teléfono:
                    <br />
                  </i>
                  649 411 569
                </h2>
              </v-flex>
            </v-toolbar>
          </v-card-text>
          <!--<div>
            <v-flex xs12 sm6 offset-sm3>
              <v-card>
                <v-img src="/SeBuscanVoluntarios.png" aspect-ratio="2.5"></v-img>
                <div align="left">
                  <v-card-title primary-title>
                    <h3 class="headline mb-0">Lunes 19.00h Reunión Informativa</h3>
                    <div>{{ card_text }}</div>
                    <br />
                    <b>c/ Donoso Cortés, 63 4ª planta (Metro: Islas Filipinas y Moncloa)</b>
                  </v-card-title>
                </div>
                <v-card-actions>
                  <v-flex text-xs-center>
                    <v-btn
                      flat
                      href="http://www.solidarios.org.es/colabora/quiero-ser-voluntario/"
                      color="blue"
                    >IR A LA WEB PARA APUNTARME</v-btn>
                  </v-flex>
                </v-card-actions>
              </v-card>
            </v-flex>
          </div>
          <br />
          <v-btn href="http://www.solidarios.org.es/que-hacemos/personas-sin-hogar/">
            <b>
              <v-icon color="blue">web</v-icon>Pagina Web de Solidarios
            </b>
          </v-btn>
          <v-btn href="http://www.solidarios.org.es/colabora/quiero-ser-voluntario/">
            <b>
              <v-icon color="blue">favorite</v-icon>Quiero ser voluntario
            </b>
            <br />
          </v-btn>
          <br />
          <br />
        </div>-->
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style scoped>
div.contact {
  size: 20px;
  position: relative;
  align-content: left;
}
</style>

<script>
export default {
  data() {
    return {
      card_text:
        "¡Animáte! Todos los Lunes realizamos una reunión informativa donde os contamos la labor que realizamos y como puedes formar parte."
    };
  },
  middleware: "public"
};
</script>
