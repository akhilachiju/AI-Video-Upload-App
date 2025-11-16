"use client";

import { Video } from "@imagekit/next";
import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  title: string;
  autoPlay?: boolean;
}

export default function VideoPlayer({ src, title, autoPlay = false }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative group">
      <Video
        ref={videoRef}
        src={src}
        transformation={[{ height: "1920", width: "1080", quality: "80" }]}
        className="w-full h-full object-cover rounded-2xl"
        autoPlay={autoPlay}
        muted={isMuted}
        loop
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {/* Controls Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={togglePlay}
          className="bg-black/50 rounded-full p-3 hover:bg-black/70 transition"
        >
          {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
      </button>
    </div>
  );
}
