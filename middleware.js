// middleware.js
import { NextRequest, NextResponse } from "next/server";

export async function middleware(NextRequest) {
  // Get the pathname of the current request

  //   const pathname = request.nextUrl.pathname;
  const session = !!NextRequest.cookies.get("next-auth.session-token");

  console.log("sessionUser", session);
  // An array of protected routes
  //   const protectedRoutes = [
  //     "/property/add",
  //     "/profile",
  //     "/properties/saved",
  //     "/message",
  //   ];

  // Check if the requested route is a protected route
  //   if (protectedRoutes.includes(pathname)) {
  //     // Perform authentication check here
  //     // e.g., check if the user is authenticated based on a session token or cookie

  //     const isAuthenticated = false; // Replace with your authentication logic

  //     // If the user is not authenticated, redirect them to the login page
  //     if (!isAuthenticated) {
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }
  //   }

  // If the requested route is not protected or the user is authenticated, continue to the next middleware or route
  //   return NextResponse.next();
}

// Config object to specify the routes to apply the middleware
export const config = {
  matcher: ["/property/add", "/profile", "/properties/saved", "/message"],
};
