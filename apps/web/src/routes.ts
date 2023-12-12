import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

import AboutData from "./pages/about.data";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("./pages/home")),
  },
  {
    path: "/about",
    component: lazy(() => import("./pages/about")),
    data: AboutData,
  },
  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
  {
    path: "/login",
    component: lazy(() => import("./pages/Login")),
  },
  {
    path: "/register",
    component: lazy(() => import("./pages/register")),
  }
];
