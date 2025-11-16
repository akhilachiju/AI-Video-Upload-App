import { Video } from "@imagekit/next"; 
import Link from "next/link";
import { IVideo } from "@/models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Video */}
      <Link href={`/videos/${video._id}`} className="block relative w-full">
        <div className="relative w-full" style={{ aspectRatio: "9/16" }}>
          <Video
            src={video.videoUrl}
            transformation={[{ height: "1920", width: "1080" }]}
            controls={video.controls}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </Link>

      {/* Video Info */}
      <div className="p-4">
        <Link href={`/videos/${video._id}`} className="hover:opacity-80 transition-opacity">
          <h2 className="text-lg text-gray-200 font-semibold">{video.title}</h2>
        </Link>
        <p className="text-sm text-gray-400 line-clamp-2">{video.description}</p>
      </div>
    </div>
  );
}
