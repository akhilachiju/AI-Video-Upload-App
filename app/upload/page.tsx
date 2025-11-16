"use client";

import VideoUploadForm from "../components/VideoUploadForm";

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-200 mb-6 text-center">
          Upload New Reel
        </h1>
        <VideoUploadForm />
      </div>
    </div>
  );
}
