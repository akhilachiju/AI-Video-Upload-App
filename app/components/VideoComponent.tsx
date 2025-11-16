import Link from "next/link";
import { IVideo } from "@/models/Video";
import { Play, Eye, Heart } from "lucide-react";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="group relative">
      <Link href={`/videos/${video._id}`} className="block">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-0 shadow-xl hover:shadow-2xl overflow-hidden hover:scale-105 transition-all duration-300">

          {/* Video Container */}
          <div className="relative aspect-9/16 bg-gray-900 rounded-t-2xl overflow-hidden">
            <video
              src={video.videoUrl}
              className="w-full h-full object-cover"
              poster={video.thumbnailUrl}
              muted
              playsInline
              preload="metadata"
            />

            {/* Play Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div className="flex items-center gap-3 text-white text-sm">
                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Eye className="w-3 h-3" />
                  <span>{video.views || 0}</span>
                </div>
                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Heart className="w-3 h-3" />
                  <span>{video.likes || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="p-4 space-y-2">
            <h3 className="text-white font-semibold text-lg line-clamp-2 group-hover:text-purple-400 transition-colors">
              {video.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : 'Recently'}
              </span>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">
                Video
              </span>
            </div>
          </div>

        </div>
      </Link>
    </div>
  );
}
