import { createClient } from "@/utils/supabase/server";
import { NavBar } from "@/components/NavBar";
import { ContextProvider } from "@/contexts/Context";
export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return ( 
    <ContextProvider>   
      <div
        className="w-full h-full min-h-screen p-4 gap-4
          grid 
          grid-cols-1
          md:grid-cols-3 md:grid-rows-4
          lg:grid-cols-4 lg:grid-rows-3
          dark:bg-primary"
      >
        {/* Navigation Bar */}
        <NavBar user={user}/>
        {/* Checklist */}
        <div
          className="w-full h-full ring-2 rounded-3xl
              min-h-empty md:row-span-2
              dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
        >
          Checklist
        </div>
        {/* Roles and Goals */}
        <div
          className="w-full h-full ring-2 rounded-3xl
              min-h-empty
              dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
        >
          Roles and Goals
        </div>
        {/* Vision Board */}
        <div
          className="w-full h-full ring-2 rounded-3xl
              min-h-empty
              dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
        >
          Vision Board
        </div>
        {/* Scripture Study */}
        <div
          className="w-full h-full ring-2 rounded-3xl
              min-h-empty md:row-span-2
              dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
        >
          Scripture Study
        </div>
        {/* Mission Statement */}
        <div
          className="w-full h-full ring-2 rounded-3xl
              min-h-empty md:col-span-2 md:col-start-2 md:row-span-2 md:row-start-2
              dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
        >
          Mission Statement
        </div>
        {/* #6 */}
        <div
          className="w-full h-full ring-2 rounded-3xl
              min-h-empty
              dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
        >
          6
        </div>
        {/* #7 */}
        <div
          className="w-full h-full ring-2 rounded-3xl
              min-h-empty
              
              dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
        >
          7
        </div>
      </div>
    </ContextProvider>
  );
}
