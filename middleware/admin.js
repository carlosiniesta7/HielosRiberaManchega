export default function({ store, redirect, route }) {
  const home = "/home";
  const access = "/access";
  //Si no tiene rol redirigimos a /access
  if (store.getters.getRol === null) {
    redirect(access);
  }
  //Si tiene rol vemos si es el correcto para acceder
  if (store.getters.getRol !== "Administrador") {
    alert("A esta página sólo pueden acceder los Administradores");
    redirect(home);
  }
}
