const nodeExternals = require("webpack-node-externals");
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
  /*
   ** Headers of the page
   */
  mode: "spa",
  modules: ["@nuxtjs/pwa"],
  head: {
    title: "ribera-manchega",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Aplicacion para Solidarios para el Desarrollo"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
    //script: process.env.BUILDCORDOVA ? [{ src: "cordova.js" }] : []
  },
  plugins: ["~/plugins/vuetify.js", "~/plugins/fireauth", "~/plugins/calendar"],
  css: ["~/assets/style/app.styl", "~/assets/style.css"],
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  generate: {
    fallback: true, // if you want to use '404.html' instead of the default '200.html'
    fallback: "/contactUs" // if your hosting needs a custom location
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^vuetify/],
    plugins: [new VuetifyLoaderPlugin()],
    extractCSS: true,
    //sourceMap: false,
    //minify: false,
    extend(config, ctx) {
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ];
      }
    }
  }
  //Cordova
  //router: {
  //mode: process.env.BUILDCORDOVA ? "hash" : "history" //Por defecto es history
  //},
  //generate: {
  //dir: process.env.BUILDCORDOVA || "dist" //Por defecto es dist
  //},
  //env: {
  //isCordova: process.env.BUILDCORDOVA
  //}
};
