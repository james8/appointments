import Vue from "vue";
import Router from "vue-router";

import Appointments from "@/views/v_Appointments.vue";
import Clients from "@/views/v_Clients.vue";
import Employees from "@/views/v_Employees.vue";
import PageNotFound from "@/views/v_PageNotFound.vue";
import Profile from "@/views/v_Profile.vue";
import Reports from "@/views/v_Reports.vue";
import Services from "@/views/v_Services.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    // base: process.env.BASE_URL,
    base: "/SG_Appointments_v2/",
    routes: [
        {
            path: "/profile",
            name: "profile",
            component: Profile
        },
        {
            path: "/appointments",
            name: "appointments",
            component: Appointments
        },
        {
            path: "/clients",
            name: "clients",
            component: Clients
        },
        {
            path: "/services",
            name: "services",
            component: Services
        },
        {
            path: "/employees",
            name: "employees",
            component: Employees
        },
        {
            path: "/reports",
            name: "reports",
            component: Reports
        },
        {
            path: "/options",
            name: "options",
            // component:
        },
        // {
        //     path: "*",
        //     name: "404 - Page Not Found",
        //     component: PageNotFound
        // },
    ]
});