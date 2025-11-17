Video Upload App
A modern full-stack video platform built with Next.js 13, TypeScript, MongoDB, and ImageKit.
Users can register, sign in, upload vertical videos, auto-generate thumbnails, and browse a smooth video feed with playback. 

Features
Authentication
-User registration & login with NextAuth Credentials Provider
-Secure password hashing with bcrypt
-JWT-based session handling

Video Uploading
-Client-side drag-and-drop upload
-Upload videos to ImageKit
-Auto-generated thumbnails using server utilities
-Upload progress & error handling
-Vertical video support
Video Feed & Player

-Smooth video scrolling feed
-Auto-play on video page
-View video stats (views, likes)
-Responsive UI built with Tailwind CSS
-Lucide icons for clean UI visuals 

Database: MongoDB with Mongoose 
models:
-User
-Video

Architecture
-Next.js App Router (server & client components)
-API routes for video upload, fetch, auth, and user creation
-TypeScript types across frontend & backend

| Category     | Technology                                 |
| ------------ | ------------------------------------------ |
| Frontend     | Next.js 13 (App Router), React, TypeScript |
| Backend      | Next.js Server Actions & API Routes        |
| Database     | MongoDB + Mongoose                         |
| Auth         | NextAuth.js (JWT session)                  |
| File Storage | ImageKit (videos & thumbnails)             |
| Styling      | Tailwind CSS                               |
| Icons        | Lucide React                               |
| Others       | bcryptjs, ESLint, Zod                      |


Future Improvements
*User profile pages
*Likes, comments, and social interactions
*Search & categories
*Better CDN optimization & streaming


