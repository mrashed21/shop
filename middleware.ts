// export { auth as middleware } from "./auth"

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const session = await auth();

  // Protect routes (e.g., /dashboard)
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session?.user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Send user data to backend
    try {
      await axios.post("http://your-backend-api/user", {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
      });
    } catch (error) {
      console.error("Error sending user data to backend:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
