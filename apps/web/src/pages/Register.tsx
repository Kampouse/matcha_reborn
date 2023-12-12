import { Headless } from "../components/Headless";
import {  registerFormSchema } from "../utils/schemas";
import { trpc, Fetch } from "../utils/trpc";
import { faker } from '@faker-js/faker';
import type z from "zod";
export default function Register() {
  const Validation = (formData: FormData) => {
    const result = registerFormSchema.safeParse(formData);
    if( result.success) 
    {
       return result.data
    }
    console.log(result)
    return  null

  };
  //onClientSubmit(validatedContent) ? onServerSubmit(validatedContent) : console.log("fall back to error state here") }
  const handleSubmit = (e: Event) => {
    const form = e.target as HTMLFormElement;
    e.preventDefault();
     
    const formData = new FormData(form);
     console.log(formData);
    const validatedContent = Validation(formData);
    if (validatedContent === null || validatedContent === undefined) {
      console.log("error state");
      return null;
    }
    Fetch("/register", {
      method: "POST",
      body: JSON.stringify({
        email: validatedContent.email,
        password: validatedContent.password,
      }),
      headers: {
        credentials: "include",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    });
  };

  const mockFn = (name: string) => {
    const field = {
      
      email:  faker.internet.email(),
      username : faker.internet.userName(),
      password: faker.internet.password(),
    } as { [key: string]: string };
    return field[name];
  };
 const   pass = mockFn("password") + "!123"

   
  return (
    <Headless>
      <div
        class=" flex flex-col items-center justify-center 
       border border-1 border-gray-900 rounded-lg  my-[100px] p-[2em]"
      >
        <h1> Register to this shit fest </h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div
            class={
              "flex flex-col items-center justify-center    w-96 h-[25rem] border-1  "
            }
          >
            <div class="flex flex-col items-center justify-center    w-96 h-[25rem] border-1  ">
              <input
                name="email"
                type="text"
                placeholder="email"
                value={mockFn("email")}
                class="bg-transparent border border-1 border-gray-900 text-center text-slate-50"
              />
              <input
                name="username"
                type="text"
                placeholder="username"
                value={mockFn("username")}
                class="bg-transparent border border-1 border-gray-900 text-center text-slate-50"
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                value={pass}
                class="bg-transparent border border-1 border-gray-900 text-slate-50 text-center"
              />
              <input
                 name="re_password"
                type="password"
                placeholder="retype password"
                value={pass}
                class="bg-transparent border border-1 border-gray-900 text-slate-50 text-center"
              >
              </input>
              <button class="mt-6" type="submit">
                {" "}
                submit
                {" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Headless>
  );
}