import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define the public routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook",
  "/question/:id",
  "/tags/",
  "/tags/:id",
  "/profile/:id",
  "/community",
  "/jobs",
]);

// Define the ignored routes
const isIgnoredRoute = createRouteMatcher(["/api/webhook", "/api/chatgpt"]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
