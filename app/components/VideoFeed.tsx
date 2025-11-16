"use client";

import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function VideoFeed() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("/api/videos");
        
        if (response.ok) {
          const data = await response.json();
          setVideos(Array.isArray(data) ? data : []);
        } else {
          setVideos([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoComponent key={video._id?.toString()} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">No videos yet</h2>
            <p className="text-gray-400 mb-6">Be the first to upload a video!</p>
            <a
              href="/upload"
              className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
            >
              Upload Video
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
