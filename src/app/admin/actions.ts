'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateAspirationStatus(id: string, status: 'approved' | 'rejected') {
  const supabase = await createClient();
  
  // Check if current user is admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return { error: "Hanya admin yang dapat melakukan aksi ini." };
  }

  const { error } = await supabase
    .from('aspirations')
    .update({ status })
    .eq('id', id);

  if (error) {
    return { error: "Gagal memperbarui status." };
  }

  revalidatePath('/admin');
  revalidatePath('/aspirasi');
  revalidatePath('/dashboard');
  
  return { success: true };
}
