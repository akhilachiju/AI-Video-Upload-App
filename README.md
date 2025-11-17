Video Upload App

A modern full-stack video platform built with Next.js 13, TypeScript, MongoDB, and ImageKit.
Users can register, sign in, upload vertical videos, generate thumbnails automatically, and browse a smooth video feed with playback.

The app focuses on:

✔️ Video uploading & management with ImageKit

✔️ User authentication using NextAuth + bcrypt

✔️ MongoDB storage with Mongoose

✔️ Modern React (client & server components)

✔️ Thumbnail generation using native browser APIs (video + canvas)


Features
Authentication

User registration & login using NextAuth Credentials Provider

Secure password hashing with bcrypt

JWT-based session handling

Video Uploading

Drag-and-drop video upload

Uploads stored and optimized with ImageKit

Automatic thumbnail generation (client-side)

Upload progress, validation, and error handling

Full vertical video support (9:16)

Video Feed & Player

Smooth scrolling video feed

Auto-play on the video page

View statistics: views, likes

Responsive UI using Tailwind CSS

Lucide icons for a clean, modern look

Database

MongoDB with Mongoose models:

User

Video

Architecture

Next.js App Router (server & client components)

API routes for:

authentication

video upload

video fetching

user creation

End-to-end TypeScript types


Tech Stack

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

User profile pages with activity history and uploaded videos

Likes, comments, and social interactions for better engagement

Video search & category filtering (title, tags, creator, etc.)

CDN-level streaming optimization for faster playback

AI-powered features, such as:

Automatic video tagging & categorization

AI-generated video titles and descriptions

Speech-to-text captions and transcripts

Video highlight/summarization generation
