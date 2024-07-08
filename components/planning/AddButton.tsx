'use client'
import { SubmitButton } from '@/app/login/submit-button'
import React from 'react'

export const AddButton = ({inputValue, handleAddItem, setInputValue}) => {
  return (
    <div className="mt-10 w-full bg-blue-500 rounded-full py-2 px-4 flex flex-row justify-center gap-4">
            <form className="flex flex-row w-full justify-center gap-2 text-primary">
              <input
                className="rounded-full px-4 py-2 border"
                type="text"
                name="addItem"
                placeholder="••••••••"
                value={inputValue} // Control the input with state
                onChange={(e) => setInputValue(e.target.value)}
              />
              <SubmitButton
                formAction={handleAddItem}
                className="border border-blue-900 rounded-md px-4 py-2 text-foreground mb-2"
                pendingText="..."
              >
                +
              </SubmitButton>
            </form>
          </div>
  )
}
