import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Exemplo: Checar um cookie da sessão
  if (!request.cookies.has("sessionCartId")) {
    const sessionCartId = crypto.randomUUID();
    const response = NextResponse.next();
    response.cookies.set("sessionCartId", sessionCartId);
    console.log("Criando um novo carrinho de compras", sessionCartId);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*", // Aplica o middleware a todas as rotas
};

