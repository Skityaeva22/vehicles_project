import { ROUTER_NAMES } from "@/shared/router/routes";

const routes = [
  {
    path: "/",
    name: ROUTER_NAMES.MAIN,
    redirect: "/vehicles",
    component: () => import('@/pages/Main'),
    children: [
      {
        path: "vehicles",
        name: ROUTER_NAMES.VEHICLES,
        component: () => import('@/pages/Vehicles'),
        meta: {
          title: "Vehicles",
        },
      },
    ],
  },
];

export default routes;
