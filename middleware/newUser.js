export default function({ store, redirect, route }) {
  const home = "/home";
  //Si no tiene rol redirigimos a /access
  if (store.getters.getRol != "Anonimo") {
    redirect(home);
  }
}
