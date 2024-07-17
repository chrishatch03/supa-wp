import { createClient } from "@/utils/supabase/server";
import { NavBar } from "@/components/NavBar";
import { ContextProvider } from "@/contexts/Context";
export default async function Index() {
  // const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return ( 
    <ContextProvider initialUser={user}>
      <div
        className="w-full h-full min-h-screen p-4 gap-4
          grid 
          grid-cols-1
          md:grid-cols-3 md:grid-rows-4
          lg:grid-cols-4 lg:grid-rows-3
          dark:bg-primary"
      >
        {/* Navigation Bar */}
        <NavBar />
        {/* Checklist */}
        <div
          className="w-full h-full ring-2 rounded-3xl flex flex-col items-center justify-start sm:justify-center lg:justify-start text-center
              min-h-empty md:row-span-2
              dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick bg-adventure6 dark:bg-adventure6-dark bg-cover"
              
        >
          <h1 className="text-6xl mt-6 font-medium lg:text-4xl tracking-tight text-gray-700 dark:text-gray-100">
            Weekly Planner
          </h1>
        </div>
        {/* Roles and Goals */}
        <div
          className="w-full h-full ring-2 rounded-3xl p-8
              min-h-empty
              dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick bg-adventure2 dark:bg-adventure2-dark bg-cover"
        >
          <p className="bg-slate-50 bg-opacity-50 rounded-3xl h-full w-full text-gray-700 dark:text-gray-100 text-center flex flex-col justify-center p-8">"By failing to prepare, you are preparing to fail." - Benjamin Franklin</p>
        </div>
        {/* Vision Board */}
        <div
          className="w-full h-full ring-2 rounded-3xl hidden md:block
              min-h-empty
              dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick bg-adventure8 dark:bg-adventure8-dark bg-cover"
        >
          {/* Vision Board */}
        </div>
        {/* Scripture Study */}
        <div
          className="w-full h-full ring-2 rounded-3xl hidden md:block
              min-h-empty md:row-span-2
              dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick bg-adventure4 dark:bg-adventure4-dark bg-cover"
        >
          {/* Scripture Study */}
        </div>
        {/* Mission Statement */}
        <div
          className="w-full h-full ring-2 rounded-3xl flex flex-col items-center justify-center
              min-h-empty md:col-span-2 md:col-start-2 md:row-span-2 md:row-start-2
              dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick bg-adventure3 dark:bg-adventure3-dark bg-cover"
        >
          <div className="w-full h-full flex flex-col justify-center items-center" slot="Island3">
              <h1 className="text-3xl mt-6 font-medium lg:text-5xl tracking-tight text-gray-700 dark:text-gray-100">
                  Plan your Adventure!
              </h1>
              <div className="h-3/4 flex flex-col items-center justify-center">
                <a href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</a>
              </div>
          </div>
        </div>
        {/* #6 */}
        <div
          className="w-full h-full ring-2 rounded-3xl p-8
              min-h-empty
              dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick bg-adventure12 dark:bg-adventure12-dark bg-cover"
        >
          <p className="bg-slate-50 bg-opacity-50 rounded-3xl h-full w-full text-gray-700 dark:text-gray-100 text-center flex flex-col justify-center p-8">"Good fortune is what happens when opportunity meets with planning." - Thomas Edison</p>
        </div>
        {/* #7 */}
        <div
          className="w-full h-full ring-2 rounded-3xl p-8
              min-h-empty
              
              dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick bg-adventure10 dark:bg-adventure10-dark bg-cover"
        >
                <p className="bg-slate-50 bg-opacity-40 rounded-3xl h-full w-full text-gray-700 dark:text-gray-100 text-center flex flex-col justify-center p-8">"Planning is bringing the future into the present so that you can do something about it now." - Alan Lakein</p>
        </div>
      </div>
    </ContextProvider>
  );
}
