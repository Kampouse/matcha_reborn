import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

import AboutData from "./pages/about.data";
import { Headless } from "./components/Layout";
export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("./pages/index")),
  },
  {
    path: "/about",
    component: lazy(() => import("./pages/about")),
    data: AboutData,
  },
  {
    path: "/login",
    component: lazy(() => import("./pages/login")),
  },
  {
    path: "/me",
    component: lazy(() => import("./pages/Profile")),
  },

  {
    path: "/register",

    component: lazy(() => import("./pages/register")),
  },
  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
];
