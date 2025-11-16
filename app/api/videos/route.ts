import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    const videos = await Video.find({})
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return NextResponse.json(videos);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown server error";
    console.error("GET /api/videos error:", message);
    return NextResponse.json(
      { error: "Failed to fetch videos", details: message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();

    if (!body.title?.trim() || !body.description?.trim() || !body.videoUrl) {
      return NextResponse.json(
        { error: "title, description, and videoUrl are required." },
        { status: 400 }
      );
    }

    // Use provided thumbnail or fallback to video URL without transformation
    const thumbnailUrl = body.thumbnailUrl?.trim() || body.videoUrl;

    const newVideo = await Video.create({
      title: body.title,
      description: body.description,
      videoUrl: body.videoUrl,
      thumbnailUrl,
      controls: body.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      },
      userId: body.userId || undefined,
    });

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown server error";
    console.error("POST /api/videos error:", message);
    return NextResponse.json(
      { error: "Failed to create video", details: message },
      { status: 500 }
    );
  }
}
