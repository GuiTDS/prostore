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
    return response;
  }

  return response;
}

export const config = {
  matcher: "/:path*", // Aplica o middleware a todas as rotas
};

