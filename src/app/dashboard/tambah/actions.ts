'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitAspiration(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  if (!title || !content) {
    return { error: 'Judul dan konten wajib diisi.' };
  }

  const { error } = await supabase
    .from('aspirations')
    .insert([
      {
        user_id: user.id,
        title,
        content,
        status: 'pending',
      },
    ]);

  if (error) {
    console.error('Error submitting aspiration:', error);
    return { error: 'Gagal mengirim aspirasi. Silakan coba lagi.' };
  }

  revalidatePath('/dashboard');
  revalidatePath('/aspirasi');
  redirect('/dashboard?message=Aspirasi berhasil dikirim!');
}
