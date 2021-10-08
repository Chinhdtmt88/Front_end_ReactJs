import { lazy } from "react";

const Alltour = lazy(() => import("./Alltour/Alltour"));

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/",
    exact: true,
    public: true,
    component: Alltour,
  },
];
