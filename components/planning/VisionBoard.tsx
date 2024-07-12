'use client'
import React from 'react'
import { useMyContext } from "@/contexts/Context";
export const VisionBoard = () => {
  const { visionBoardURLs } = useMyContext();
  const dynamicGrid = (visionBoardURLs: string[]) => {
    const maxColumns = 3; // Maximum number of columns
    const itemCount = visionBoardURLs.length;
    let columns = Math.min(itemCount, maxColumns); // Number of columns is the smaller of item count or maxColumns
    let rows = Math.ceil(itemCount / columns); // Calculate rows needed, rounding up for any partial row
  
    // Special case: For 4 items, use a 2x2 grid instead of 3x2
    if (itemCount === 4) {
      columns = 2;
      rows = 2;
    }
  
    return `grid grid-cols-${columns} grid-rows-${rows}`;
  };
  return (
    <div className="bg-pbbgIR bg-cover  flex flex-col justify-between items-center rounded-3xl p-8 overflow-hidden text-center lg:text-left">
          <div>
            <p
              className="ext-xl tracking-tight font-medium text-primary dark:text-white md:text-6xl"
            >
              VISION BOARD
            </p>
            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          <div className={`${dynamicGrid(visionBoardURLs)} gap-4 w-full h-full`}>
            {visionBoardURLs && visionBoardURLs.map((signedURL: string) => (
              <div className="flex flex-col rounded-3xl overflow-hidden relative shadow-xl dark:shadow-thick hover:scale-105">
                <img src={signedURL} alt="" className="h-full w-full rectangle-full object-cover" />
              </div>
              ))}
            
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
