// utils/supabase/uploadFile.js
'use client';
import { createClient } from "@/utils/supabase/client";

// Create Supabase client
const supabase = createClient();

// Upload a single file using standard upload
export async function uploadFile(file: any, user: any) {
  const filePath = `${user.id}/${file.name}`;
  const { data, error } = await supabase.storage
    .from("visionBoard")
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.log(`Error uploading file: ${file.name}, ${error.message}`);
    return { file: file.name, status: 'Error', message: error.message };
  } else {
    console.log(`File uploaded: ${data.fullPath}`);
    return { file: file.name, status: 'Uploaded', fullPath: data.fullPath };
  }
}

export async function insertMetadata(file: any, metadata: any, user: any) {
    const filePath = `${user.id}/${file.name}`;
    const { data: updatedMetadata, error } = await supabase
        .from("visionBoard")
        .insert(metadata)
        .eq('id', user.id).eq('file_name', filePath)
        .select('id, file_name, title, goal_date, notes');
    if (error) {
        console.error('Error updating metadata:', error);
    } else {
        console.log('Metadata updated successfully:', updatedMetadata);
    }
}