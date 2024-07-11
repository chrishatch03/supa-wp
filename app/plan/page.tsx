import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { MyPlan } from "@/components/planning/MyPlan";
import { RolesAndGoals } from "@/components/planning/RolesAndGoals";
import { MissionStatement } from "@/components/planning/MissionStatement";
import { VisionBoard } from "@/components/planning/VisionBoard";

export default async function PlanPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
    <div className='w-full h-full min-h-screen p-4 gap-4
        grid 
        grid-cols-1
        md:grid-cols-3 md:grid-rows-4
        lg:grid-cols-4 lg:grid-rows-3
        dark:bg-primary'
    >
      <NavBar />
            
        <div className='w-full h-full ring-1 rounded-3xl
            min-h-empty md:row-span-2
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick'
        
        >
          <MyPlan />
        </div>
        <div className='w-full h-full ring-1 rounded-3xl
            min-h-empty
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick'
        
        >
          <RolesAndGoals />
        </div>
        <div className='w-full h-full ring-1 rounded-3xl
            min-h-empty
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick'
        
        ><VisionBoard /></div>
        <div className='w-full h-full ring-1 rounded-3xl
            min-h-empty md:row-span-2
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick'
        
        >
        </div>
        <div className='w-full h-full ring-1 rounded-3xl
            min-h-empty md:col-span-2 md:col-start-2 md:row-span-2 md:row-start-2
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick'
        
        ><MissionStatement /></div>
        <div className='w-full h-full ring-1 rounded-3xl
            min-h-empty
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick'
        
        >6</div>
        <div className='w-full h-full ring-1 rounded-3xl
            min-h-empty
            
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick'
        
        >7</div>
    </div>
    </>
  );
}
