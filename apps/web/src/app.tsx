import { Component, Show, ErrorBoundary } from "solid-js";
import { Link, useRoutes, useLocation } from "@solidjs/router";
import { Nav } from "./components/Nav";
import { routes } from "./routes";
import Error from "./components/Error";
import Home from "./pages";
const showNav = (value) => {
  const RouteNoNav = ["/login", "/register", "/error", "/"];
  return RouteNoNav.includes(value.pathname) ? false : true;
}


const App: Component = () => {
  const location = useLocation();
  const Router = useRoutes(routes);
  return (
    <ErrorBoundary
      fallback={(err) => (
        <Error err={err} />
      )}
    >
      <Show when={showNav(location)}>
        <Nav />
      </Show>
        <main>
          <Router />
        </main>
    </ErrorBoundary>
  );
};

export default App;
