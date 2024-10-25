import { NextResponse } from 'next/server';
import { withAuth, NextRequestWithAuth, NextAuthMiddlewareOptions } from 'next-auth/middleware';

const middleware = (request: NextRequestWithAuth) => {
  const { token } = request.nextauth;

  
  console.log('[MIDDLEWARE_NEXTAUTH_TOKEN]:', token);

  const isLoginPage = request.nextUrl.pathname === '/portal/login';
  const isRegisterPage = request.nextUrl.pathname === '/portal/cadastro'; 
  const isPrivateRoutes = request.nextUrl.pathname.startsWith('/private');
  const isAdminUser = token?.cargo === 'Administrador';

  
  if ((isLoginPage || isRegisterPage) && token) {
    console.log('Usuário autenticado tentando acessar página de login ou cadastro, redirecionando...');
    return NextResponse.redirect(new URL('/', request.url)); 
  }

  
  if (isPrivateRoutes && !isAdminUser) {
    console.log('Usuário sem permissão de administrador tentando acessar rota privada, redirecionando...');
    return NextResponse.rewrite(new URL('/denied', request.url)); 
  }

  return NextResponse.next(); 
};

const callbackOptions: NextAuthMiddlewareOptions = {};

export default withAuth(middleware, callbackOptions);

export const config = {
  matcher: ['/portal/login', '/portal/cadastro', '/private'], 
};
