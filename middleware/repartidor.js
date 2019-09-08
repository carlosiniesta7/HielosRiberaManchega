export default function({ store, redirect, route }) {
  const home = "/home";
  const access = "/access";
  //Si no tiene rol redirigimos a /access
  if (store.getters.getRol === null) {
    redirect(access);
  } else {
    //Si tiene rol vemos si es el correcto para acceder
    if (store.getters.getRol !== "Administrador") {
      if (store.getters.getRol !== "Voluntario") {
        alert(
          "Es necesario tener un rol asignado para acceder a esta funcionalidad"
        );
        redirect(home);
      }
    }
  }
}
