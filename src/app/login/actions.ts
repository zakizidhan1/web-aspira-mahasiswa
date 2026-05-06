'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  let identifier = formData.get('identifier') as string
  const password = formData.get('password') as string

  // Simple validation
  if (!identifier.includes('@')) {
    // If it's NIM, we would need to lookup the email first using a service_role key
    // For this MVP, we enforce Email login unless they set up an RPC or service_role key
    redirect('/login?message=Harap gunakan Email untuk login saat ini.')
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: identifier,
    password: password,
  })

  if (error) {
    redirect('/login?message=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
