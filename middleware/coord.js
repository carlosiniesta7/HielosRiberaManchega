export default function({ store, redirect, route }) {
  const home = "/home";
  const access = "/access";
  //Si no tiene rol redirigimos a /access
  if (store.getters.getRol === null) {
    redirect(access);
  } else {
    //Si tiene rol vemos si es el correcto para acceder
    if (store.getters.getRol !== "Administrador") {
      if (store.getters.getRol !== "Coordinador") {
        alert(
          "A esta página sólo pueden acceder los Coordinadores y Administradores"
        );
        redirect(home);
      }
    }
  }
}
