'use server';
import { createClient } from "@/utils/supabase/server";

// Create Supabase client
const supabase = createClient();

// Upload multiple files using standard upload
export async function uploadFiles(files: File[], user) {
  const uploadPromises = files.map(file => {
    const filePath = `${user.id}/${file.name}`;
    return supabase.storage
      .from("visionBoard")
      .upload(filePath, file)
      .then(({ data, error }) => {
        if (error) {
          // Handle error
          console.log(`Error uploading file: ${file.name}, ${error.message}`);
          return { file: file.name, status: 'Error', message: error.message };
        } else {
          // Handle success
          console.log(`File uploaded: ${data.fullPath}`);
          return { file: file.name, status: 'Uploaded', fullPath: data.fullPath };
        }
      });
  });

  // Wait for all uploads to complete
  const results = await Promise.all(uploadPromises);
  return results; // This will be an array of results for each file
}