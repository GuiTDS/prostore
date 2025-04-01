// lib/protect-route.ts
import { auth } from "@/auth";
import { PROTECTED_ROUTES } from '@/middleware';
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function protectRoute() {
  const session = await auth();
  const headersList = headers();
  const pathname = (await headersList).get('x-pathname') || '';
  
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => 
    route.test(pathname)
  );

  if (!session && isProtectedRoute) {
    const callbackUrl = encodeURIComponent(pathname);
    redirect(`/sign-in?callbackUrl=${callbackUrl}`);
  }
}