import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const PROTECTED_ROUTES = [
  /\/shipping-address/,
  /\/payment-method/,
  /\/place-order/,
  /\/profile/,
  /\/user\/(.*)/,
  /\/order\/(.*)/,
  /\/admin/,
]

export function middleware(request: NextRequest) {
  // add pathname to the response headers
  const response = NextResponse.next();
  response.headers.set('x-pathname', request.nextUrl.pathname);

  // Exemplo: Checar um cookie da sessão
  if (!request.cookies.has("sessionCartId")) {
    const sessionCartId = crypto.randomUUID();
    response.cookies.set("sessionCartId", sessionCartId);
    console.log("Criando um novo carrinho de compras", sessionCartId);
  }

  if (!request.cookies.has('authjs.session-token') && PROTECTED_ROUTES.some((route) => route.test(request.nextUrl.pathname))) {
    // Se não houver um token de sessão e a rota for protegida, redireciona para a página de login
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: "/:path*", // Aplica o middleware a todas as rotas
};

