import React from 'react'
export const VisionBoard = () => {

  return (
    <div className="bg-pbbgIR bg-cover  flex flex-col justify-between items-center rounded-3xl p-8 overflow-hidden text-center lg:text-left">
          <div>
            <p
              className="ext-xl tracking-tight font-medium text-primary dark:text-white md:text-6xl"
            >
              VISION BOARD
            </p>
            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          <div className="grid grid-cols-3 grid-rows-2 gap-4 md:grid-cols-3 md:grid-rows-2 lg:grid-cols-2 lg:grid-rows-3 xl:grid-cols-3 xl:grid-rows-2">
            <div className="ring-1 dark:ring-white/10 ring-primary/5 flex flex-col h-full justify-center items-center rounded-3xl overflow-hidden relative bg-white dark:bg-secondary shadow-xl dark:shadow-thick">
              <img src="/images/marathon.jpeg" alt="" className="h-full w-full rectangle-full rounded-3xl vision-photos" />
            </div>
            <div className="ring-1 dark:ring-white/10 ring-primary/5 flex flex-col h-full justify-center items-center rounded-3xl overflow-hidden relative bg-white dark:bg-secondary shadow-xl dark:shadow-thick">
              <img src="/images/pianist.jpeg" alt="" className="h-full w-full rectangle-full rounded-3xl vision-photos" />
            </div>
            <div className="ring-1 dark:ring-white/10 ring-primary/5 flex flex-col h-full justify-center items-center rounded-3xl overflow-hidden relative bg-white dark:bg-secondary shadow-xl dark:shadow-thick">
              <img src="/images/mixing.jpg" alt="" className="h-full w-full rectangle-full rounded-3xl vision-photos" />
            </div>
            <div className="ring-1 dark:ring-white/10 ring-primary/5 flex flex-col h-full justify-center items-center rounded-3xl overflow-hidden relative bg-white dark:bg-secondary shadow-xl dark:shadow-thick">
              <img src="/images/finance.png" alt="" className="h-full w-full rectangle-full rounded-3xl vision-photos" />
            </div>
            <div className="ring-1 dark:ring-white/10 ring-primary/5 flex flex-col h-full justify-center items-center rounded-3xl overflow-hidden relative bg-white dark:bg-secondary shadow-xl dark:shadow-thick">
              <img src="/images/library.jpg" alt="" className="h-full w-full rectangle-full rounded-3xl vision-photos" />
            </div>
            <div className="ring-1 dark:ring-white/10 ring-primary/5 flex flex-col h-full justify-center items-center rounded-3xl overflow-hidden relative bg-white dark:bg-secondary shadow-xl dark:shadow-thick">
              <img src="/images/byu.png" alt="" className="h-full w-full rectangle-full rounded-3xl vision-photos" />
            </div>
          </div>
              <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                Begin with the end in mind. Shape your own destiny. Remember that the development of your career, your family, and your faith in God is your individual responsibility—for which you alone will be held accountable.
              </p>
              <p className="mt-4 text-sm text-zinc-400 dark:text-zinc-300">
                Elder Russell M. Nelson - Sept 1984
              </p>
            </p>
          </div>
          
        </div>
  )
}
