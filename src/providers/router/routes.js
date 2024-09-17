import Main from "@/pages/Main";
import VehiclesPage from "@/pages/Vehicles";
import { ROUTER_NAMES } from "@/shared/router/routes";

const routes = [
  {
    path: "/",
    name: ROUTER_NAMES.MAIN,
    redirect: "/vehicles",
    component: Main,
    children: [
      {
        path: "vehicles",
        name: ROUTER_NAMES.VEHICLES,
        component: VehiclesPage,
        meta: {
          title: "Vehicles",
        },
      },
    ],
  },
];

export default routes;
