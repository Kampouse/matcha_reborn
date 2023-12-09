import { Headless } from "../components/Headless";
import { loginFormSchema } from "../utils/schemas";
import { trpc, Fetch } from "../utils/trpc";
import type z from 'zod';
export default function Login() {

  type loginFormSchema = z.infer<typeof loginFormSchema> | z.ZodIssue[]



  const Validation = (formData: FormData) => {




    const result = loginFormSchema.safeParse(formData);

    return result.success ? result.data : null
  }
  const onClientSubmit = (data: loginFormSchema | z.ZodIssue[]) => {
    if (Array.isArray(data)) {
      const issues = data.map((issue) => { return { path: issue.path, message: issue.message } })
      console.log(issues)
      return false
    }
    else {
      return true

    }
  }

  //onClientSubmit(validatedContent) ? onServerSubmit(validatedContent) : console.log("fall back to error state here") }

  const handleSubmit = (e: Event) => {
    const form = e.target as HTMLFormElement;
    e.preventDefault();
    const formData = new FormData(form);
    console.log(formData)

    const validatedContent = Validation(formData)
    if (validatedContent === null) {
      console.log("error state")
      return null
    }
    Fetch("/login", {
      method: "POST",
      body: JSON.stringify({ email: validatedContent.email, password: validatedContent.password }),
      headers: {
        'credentials': 'include',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      }

    }
    )












    // onServerSubmit(validatedContent)
  }

  const mockFn = (name: string) => {
    const field = {
      email: "jpmartel98@gmail.com",
      password: "HelloWord!123",
    } as { [key: string]: string }
    return field[name]
  }

  return (
    <Headless>
      <div class=" flex flex-col items-center justify-center 
       border border-1 border-gray-900 rounded-lg  my-[100px] p-[2em]"  >
        <h1> Register to this shit fest </h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div class={"flex flex-col items-center justify-center    w-96 h-[25rem] border-1  "}>

            <div class="flex flex-col items-center justify-center    w-96 h-[25rem] border-1  ">
              <input name="email" type="text" placeholder="email" value={mockFn("email")} class="bg-transparent border border-1 border-gray-900 text-center text-slate-50" />
              <input name="password" type="password" placeholder="password" value={mockFn("password")} class="bg-transparent border border-1 border-gray-900 text-slate-50 text-center" />

              <button class="mt-6" type="submit" > hello </button>
            </div>


          </div>

        </form>

      </div>









    </Headless>
  );
}
