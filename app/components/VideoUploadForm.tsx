"use client";

import React, { useState } from "react";
import FileUpload from "./FileUpload";
import { useNotification } from "./Notification";
import { Type, FileText, Upload, CheckCircle } from "lucide-react";

export default function VideoUploadForm() {
  const { showNotification } = useNotification();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description || !videoUrl) {
      showNotification("Please fill all fields and upload a video", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, 
          description, 
          videoUrl,
          thumbnailUrl: thumbnailUrl || videoUrl
        }),
      });

      if (!res.ok) throw new Error("Failed to upload video");

      showNotification("Video uploaded successfully", "success");
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setThumbnailUrl("");
      setUploadingProgress(0);
    } catch (err) {
      showNotification(err instanceof Error ? err.message : "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 space-y-6">
      
      {/* Title Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <Type className="w-4 h-4 text-purple-400" />
          Video Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your video a catchy title..."
          className="bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 w-full"
          maxLength={100}
        />
        <div className="text-xs text-gray-500 text-right">
          {title.length}/100
        </div>
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-400" />
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your video..."
          rows={4}
          className="input-field w-full resize-none bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          maxLength={500}
        />
        <div className="text-xs text-gray-500 text-right">
          {description.length}/500
        </div>
      </div>

      {/* Video Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <Upload className="w-4 h-4 text-purple-400" />
          Upload Video
        </label>
        
        <div className="bg-white/5 backdrop-blur-xl border-white/10 rounded-xl p-6 border-2 border-dashed hover:border-purple-500 transition-colors">
          <FileUpload
            fileType="video"
            onProgress={(progress) => setUploadingProgress(progress)}
            onSuccess={(res) => {
              console.log("📹 Video upload complete:", res);
              console.log("🖼️ Thumbnail URL:", res.thumbnailUrl);
              setVideoUrl(res.url || "");
              setThumbnailUrl(res.thumbnailUrl || res.url || "");
            }}
          />
          
          {/* Upload Progress */}
          {uploadingProgress > 0 && uploadingProgress < 100 && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>Uploading...</span>
                <span>{uploadingProgress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-linear-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadingProgress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Upload Success */}
          {videoUrl && (
            <div className="mt-4 flex items-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">Video uploaded successfully!</span>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !videoUrl}
        className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Publishing...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            Publish Video
          </>
        )}
      </button>
    </form>
  );
}
