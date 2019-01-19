import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/profile",
            name: "profile",
            // component:
        },
        {
            path: "/appointments",
            name: "appointments",
            component: (() => import("@/views/v_Appointments.vue"))
        },
        {
            path: "/clients",
            name: "clients",
            component: (() => import("@/views/v_Clients.vue"))
        },
        {
            path: "/services",
            name: "services",
            component: (() => import("@/views/v_Services.vue"))
        },
        {
            path: "/employees",
            name: "employees",
            component: (() => import("@/views/v_Employees.vue"))
        },
        {
            path: "/reports",
            name: "reports",
            // component:
        },
        {
            path: "/options",
            name: "options",
            // component:
        },
        {
            path: "*",
            name: "404 - Page Not Found",
            component: (() => import("@/views/v_PageNotFound.vue"))
        }
    ]
});