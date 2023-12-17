import { Component, createSignal, onMount } from "solid-js";
import { Link } from "@solidjs/router";
export default function Home(): Component {
  document.title = "Home";  
  const [count, setCount] = createSignal(0);
  return (
    <> 
    <section class="bg-[url('https://images.nightcafe.studio/jobs/EoF98kWG8Jm7TNJOinVz/EoF98kWG8Jm7TNJOinVz--1--28ig0_6.9444x.jpg?tr=w-1600,c-at_max')] bg-cover bg-center
  text-gray-700 p-8 h-screen flex flex-col items-center justify-center">
    <div class="flex flex-row gap-5 bg-lime-200 items-center justify-center    w-96 h-[25rem] border-1  ">
      <Link href="/register">
        <h1 class="text-white text-4xl font-bold">
          Register
        </h1>
      </Link>
      <Link href="/register">
        <h1 class="text-white text-4xl font-bold">
          login
        </h1>
      </Link>
    </div>

      </section>
      
      </> 
      );
}
