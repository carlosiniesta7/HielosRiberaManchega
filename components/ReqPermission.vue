  <template>
  <v-container>
    <h2>Si desea recibir una notificación cuando sus compañeros de ruta publiquen un nuevo informe de ruta haga click aquí:</h2>
    <br>
    <v-tooltip bottom>
      <v-btn @click="requestPermission()" slot="activator" color="green" dark>
        <v-icon>notifications</v-icon>&nbsp;Aceptar Notificaciones
      </v-btn>
      <span>Aceptar Notificaciones</span>
    </v-tooltip>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/messaging";

export default {
  created() {
    /* firebase
      .messaging()
      .usePublicVapidKey(
        "BJ26bm4G2Fkl5O3lj_P4eWQIdX2Q5IvYD9-w2WClYJ4Si92C6oqrowm56AkUXZjce3TW-1dJtl6vTm3jdJR6n_g"
      );*/
  },
  methods: {
    requestPermission() {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(registration => {
          firebase.messaging().useServiceWorker(registration);
          firebase
            .messaging()
            .requestPermission()
            .then(function() {
              firebase
                .messaging()
                .getToken()
                .then(function(currentToken) {
                  console.warn.log(" token: ", currentToken);
                  if (currentToken) {
                    this.saveToken(currentToken);
                  }
                })
                .catch(function(err) {
                  console.log(
                    "An error occurred while retrieving token. ",
                    err
                  );
                });
            })
            .catch(function(err) {
              console.log("No se ha recibido permiso / token: ", err);
            });
        });
    },
    saveToken(token) {
      firebase
        .database()
        .ref("/tokens")
        .push({
          token: this.token
        })
        .then(data => {
          console.log("TOKEN GUARDADO");
        });
    }
  }
};
</script>