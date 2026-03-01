// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// // Define role-specific route mappings
// const ROLE_ROUTES = {
//   teacher: '/etutor',
//   student: '/studentdashboard',
//   parent: '/adminparent'
// } as const;

// type UserRole = keyof typeof ROLE_ROUTES;

// // Check if a path is a protected route
// const isProtectedRoute = (path: string): boolean => {
//   return Object.values(ROLE_ROUTES).some(route =>
//     path.startsWith(route)
//   );
// };

// export default withAuth(
//   function middleware(req) {
//     const token = req.nextauth.token;
//     const path = req.nextUrl.pathname;

//     // If not logged in, redirect to signin for any protected route
//     if (!token && isProtectedRoute(path)) {
//       return NextResponse.redirect(new URL('/signin', req.url));
//     }

//     // If logged in, enforce strict role-based access
//     if (token?.role) {
//       const userRole = token.role as UserRole;
//       const allowedPath = ROLE_ROUTES[userRole];

//       // If current path is not the user's allowed path, redirect to their allowed path
//       if (path === '/' || !path.startsWith(allowedPath)) {
//         return NextResponse.redirect(new URL(allowedPath, req.url));
//       }
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ req, token }) => {
//         const path = req.nextUrl.pathname;

//         // Allow access to signin and non-protected routes
//         if (path === '/signin' || !isProtectedRoute(path)) {
//           return true;
//         }

//         if (!token) {
//           return false;
//         }

//         // For protected routes, strictly check role permissions
//         const userRole = token.role as UserRole;
//         const allowedPath = ROLE_ROUTES[userRole];

//         // Only allow access if the path matches the user's role
//         return path.startsWith(allowedPath);
//       },
//     },
//     pages: {
//       signIn: '/signin',
//     },
//   }
// );

// // Define protected routes in the matcher
// export const config = {
//   matcher: [
//     /*
//       * Match all request paths except for:
//       * - _next/static (static files)
//       * - _next/image (image optimization files)
//       * - favicon.ico (favicon file)
//       * - public folder
//       */
//     '/((?!_next/static|_next/image|favicon.ico|public).*)',
//   ]
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle admin routes
  if (pathname.startsWith('/admin')) {
    // Skip middleware for admin signin page and API routes
    if (pathname === '/admin/signin' || pathname.startsWith('/api/')) {
      return NextResponse.next();
    }

    // Check for admin authentication
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // If no token or not admin role, redirect to signin
    if (!token || token.role !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/signin';
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/((?!_next/static|_next/image|favicon.ico|public).*)'],
};
