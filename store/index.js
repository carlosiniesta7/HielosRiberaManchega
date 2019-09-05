export const state = () => ({
  sidebar: true,
  user: null,
  userRol: {
    name: null,
    email: null,
    rol: null
  },
  busqueda: [{ ruta: "", diaRuta: "", date: "" }]
});

export const mutations = {
  toggleSidebar(state) {
    state.sidebar = !state.sidebar;
  },
  addResum(state, resum) {
    state.resum.unshift(resum);
  },
  addAviso(state, aviso) {
    state.aviso.unshift(aviso);
  },
  changeRolName(state, us) {
    state.userRol = {
      name: us.name,
      email: us.email,
      rol: us.rol
    };
  },
  setRol(state, usu) {
    if (usu) {
      state.userRol = {
        name: usu.name,
        email: usu.email,
        rol: usu.rol
      };
    } else {
      state.userRol = null;
    }
  },
  setUser(state, payload) {
    const user =
      payload && payload.hasOwnProperty(user) ? payload.user : payload;
    if (user) {
      state.user = {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid
      };
    } else {
      state.user = null;
    }
  }
};

export const getters = {
  getRol: state => {
    return state.userRol.rol;
  }
};
