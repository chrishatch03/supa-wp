// utils/supabase/uploadFile.js
"use client";
import { createClient } from "@/utils/supabase/client";

// Create Supabase client
const supabase = createClient();

// Upload a single file using standard upload
export async function updateFile(begFilePath: any, file: any, user: any) {

const { data, error } = await supabase
  .storage
  .from('visionBoard')
  .remove([begFilePath])

  if (error) {
    console.log(`Error Removing file: ${file.name}, ${error.message}`);
    return { file: file.name, status: "Error", message: error.message };
  } else {
    console.log(`File Removed: ${begFilePath}`);
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
}

export async function updateMetadata(file: any, metadata: any, user: any) {
    const filePath = `${user.id}/${file.name}`;
    console.log('Upserting metadata:', JSON.stringify(metadata));
    const { data: updatedMetadata, error } = await supabase
        .from("image_metadata")
        .update(metadata)
        .eq('id', user.id).eq('file_name', metadata.file_name)
        .select('id, file_name, title, goal_date, notes');
    if (error) {
        console.error('Error upserting metadata:', error);
    } else {
        console.log('Metadata upserting successfully:', updatedMetadata);
    }
}

export async function insertMetadata(file: any, metadata: any, user: any) {
    const filePath = `${user.id}/${file.name}`;
    console.log('Upserting metadata:', JSON.stringify(metadata));
    const { data: insertedMetadata, error } = await supabase
        .from("image_metadata")
        .insert(metadata)
        .eq('id', user.id).eq('file_name', metadata.file_name)
        .select('id, file_name, title, goal_date, notes');
    if (error) {
        console.error('Error upserting metadata:', error);
    } else {
        console.log('Metadata upserting successfully:', insertedMetadata);
    }
}

export async function deleteDream(filePath: any) {
    const { data, error } = await supabase
        .storage
        .from('visionBoard')
        .remove([filePath])
    if (error) {
        console.log(`Error Removing file: ${filePath}, ${error.message}`);
        return { file: filePath, status: "Error", message: error.message };
    } else {
        console.log(`File Removed: ${filePath}`);

        const { error } = await supabase
        .from('image_metadata')
        .delete()
        .eq('file_name', filePath)
        if (error) {
            console.error('Error deleting metadata:', error);
        } else {
            console.log('Metadata deleted successfully');
        }    
    }
}