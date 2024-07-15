'use client';
import { createClient } from "@/utils/supabase/client";

// Create Supabase client
const supabase = createClient();

// Upload file using standard upload
export async function uploadFile(file, user) {
    console.log(file)
    const filePath = `${user.id}/${file.name}`;
  const { data, error } = await supabase.storage
    .from("visionBoard")
    .upload(filePath, file);
  if (error) {
    // Handle error
    console.log(`Error uploading file: ${error.message}`)
  } else {
    // Handle success
    console.log(data.fullPath)
  }
}
