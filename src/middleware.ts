import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Update session
  const response = await updateSession(request)

  // Basic route protection
  const { pathname } = request.nextUrl
  
  // You might want to implement a more robust check here by actually 
  // verifying the session with Supabase. For simplicity in middleware:
  const hasSession = request.cookies.has('sb-xxx-auth-token') // This would need the actual project ID, or we can check via supabase client inside updateSession

  // For this app, let's keep it simple: the actual auth check will happen in server components or route handlers.
  // We just want to make sure the session is updated for all routes.

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
