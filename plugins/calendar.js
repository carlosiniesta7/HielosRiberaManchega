import Vue from "vue";
import vueCalendar from "vue2-simple-calendar";
import "~/assets/vue2-simple-calendar.css";

var eventBus = new Vue();

Vue.use(vueCalendar, {
  firstDay: 1,
  showLimit: 3,
  locale: "es",
  fullDayNames: false,
  fullMonthNames: true,
  componentName: "vue-calendar",
  languages: {
    es: {
      showMore: "+",
      dayNameShort: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      dayNameLong: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado"
      ],
      monthNameShort: [
        "Ene",
        "Feb",
        "Mar.",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
      ],
      monthNameLong: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ]
    }
  }
});
Vue.config.productionTip = false;
