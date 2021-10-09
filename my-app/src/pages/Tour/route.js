import { lazy } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  path: "/tour/:slug",
  exact: true,
  public: true,
  component: lazy(() => import(".")),
};
