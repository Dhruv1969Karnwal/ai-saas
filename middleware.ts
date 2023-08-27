export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard", "/code", "/conversation", "/image", "/music", "/settings", "/video"] }


export const authMiddleware = {publicRoutes: ["/api/webhook"] }