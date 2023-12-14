import { For } from "solid-js";
import { Link } from "@solidjs/router";
export const Nav = () => {
  const pages = [
    { name: "swipe", href: "/Swipe", current: true },
    { name: "me", href: "/Me", current: false },
    { name: "login", href: "/Login", current: false },
    { name: "register", href: "/Register", current: false },
    { name: "error", href: "/error", current: false },
  ];

  return (
    <nav class="bg-pink-200 text-gray-900 px-4">
      <ul class="flex items-center">
        <For each={pages}>
          {(page) => (
            <li class="py-2 px-4">
              <Link href={page.href} class="no-underline hover:underline">
                {page.name}
              </Link>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
};
