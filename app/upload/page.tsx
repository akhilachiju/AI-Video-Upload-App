"use client";

import VideoUploadForm from "../components/VideoUploadForm";
import { Upload, Video } from "lucide-react";

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900/10 via-black to-pink-900/10 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl mb-4">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Upload Your Video</h1>
          <p className="text-gray-400">Share your creativity with the world</p>
        </div>

        {/* Upload Form */}
        <VideoUploadForm />

        {/* Tips Section */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 mt-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Video className="w-5 h-5 text-purple-400" />
            Upload Tips
          </h3>
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex shrink-0"></div>
              <p>Use vertical videos (9:16 ratio) for best results</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 shrink-0"></div>
              <p>Keep videos under 100MB for faster uploads</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 shrink-0"></div>
              <p>Add engaging titles and descriptions</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 shrink-0"></div>
              <p>Supported formats: MP4, MOV, AVI, WebM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
