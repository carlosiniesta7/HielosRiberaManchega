export default function({ store, redirect, route }) {
  const access = "/access";
  //Si no tiene rol redirigimos a /access
  if (store.getters.getRol === null) {
    redirect(access);
  }
}
