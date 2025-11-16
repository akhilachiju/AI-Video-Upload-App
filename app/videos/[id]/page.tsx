// app/videos/[id]/page.tsx
import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import VideoPlayer from "@/app/components/VideoPlayer";
import { notFound } from "next/navigation";

interface VideoPageProps {
  params: { id: string };
}

export default async function VideoPage({ params }: VideoPageProps) {
  // If params is a promise, await it
  const resolvedParams = await params; 
  const { id } = resolvedParams;

  await connectToDatabase();
  const video = await Video.findById(id).lean();

  if (!video) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <VideoPlayer 
          src={video.videoUrl} 
          title={video.title}
          autoPlay={true}
        />
        <div className="mt-4 text-white">
          <h1 className="text-xl font-bold">{video.title}</h1>
          <p className="text-gray-400 mt-2">{video.description}</p>
        </div>
      </div>
    </div>
  );
}
