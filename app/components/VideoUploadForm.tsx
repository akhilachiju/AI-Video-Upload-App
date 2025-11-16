"use client";

import React, { useState } from "react";
import FileUpload from "./FileUpload";
import { useNotification } from "./Notification";

export default function VideoUploadForm() {
  const { showNotification } = useNotification();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
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
      // Example: POST to your API route to save video info
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, videoUrl }),
      });

      if (!res.ok) throw new Error("Failed to upload video");

      showNotification("Video uploaded successfully", "success");
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setUploadingProgress(0);
    } catch (err) {
      showNotification(err instanceof Error ? err.message : "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg ring-1 ring-white/10"
      >
        <h2 className="text-2xl sm:text-3xl text-center font-bold text-gray-200 mb-6">
          Upload Video
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Video title"
            className="w-full px-3 py-2 rounded-lg bg-black/30 placeholder:text-gray-500 text-gray-200 border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description"
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-black/30 placeholder:text-gray-500 text-gray-200 border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
          />
        </div>

        {/* Video Upload */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Upload Video</label>
          <FileUpload
            fileType="video"
            onProgress={(progress) => setUploadingProgress(progress)}
            onSuccess={(res) => setVideoUrl(res.url || "")}
          />
          {uploadingProgress > 0 && uploadingProgress < 100 && (
            <p className="text-sm text-gray-400 mt-1">Uploading: {uploadingProgress}%</p>
          )}
          {videoUrl && (
            <p className="text-sm text-green-400 mt-1">Uploaded successfully!</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-sm font-medium transition ${
            loading
              ? "bg-gray-700 text-gray-300 cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-700 text-white"
          }`}
        >
          {loading ? "Uploading..." : "Submit Video"}
        </button>
      </form>
    </div>
  );
}
