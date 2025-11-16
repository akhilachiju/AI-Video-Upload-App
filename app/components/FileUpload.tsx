"use client";

import { upload } from "@imagekit/next";
import { useState, useRef } from "react";
import { Upload, Video, AlertCircle } from "lucide-react";
import { generateVideoThumbnail } from "@/lib/generateThumbnail";

interface FileUploadProps {
  onSuccess: (res: { fileId?: string; name?: string; url?: string; thumbnailUrl?: string }) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file");
        return false;
      }
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
      return false;
    }
    return true;
  };

  const handleFileUpload = async (file: File) => {
    if (!validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();

      // Upload video first
      const videoRes = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC__KEY!,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 70;
            onProgress(Math.round(percent));
          }
        },
      });

      let thumbnailUrl = videoRes.url;

      // Generate thumbnail for videos
      if (fileType === "video") {
        try {
          console.log("🎬 Starting thumbnail generation...");
          const thumbnailBlob = await generateVideoThumbnail(file);
          console.log("✅ Thumbnail generated, size:", thumbnailBlob.size);
          
          const thumbRes = await upload({
            file: thumbnailBlob,
            fileName: `thumb_${Date.now()}.jpg`,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC__KEY!,
            signature: auth.signature,
            expire: auth.expire,
            token: auth.token,
            onProgress: (event) => {
              if (event.lengthComputable && onProgress) {
                const percent = 70 + (event.loaded / event.total) * 30;
                onProgress(Math.round(percent));
              }
            },
          });
          
          console.log("🖼️ Thumbnail uploaded to:", thumbRes.url);
          thumbnailUrl = thumbRes.url;
        } catch (err) {
          console.log("Thumbnail generation failed, using video URL");
        }
      }

      onSuccess({ ...videoRes, thumbnailUrl });
    } catch (error) {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
          dragActive
            ? "border-purple-400 bg-purple-500/10"
            : uploading
            ? "border-gray-600 bg-gray-800/50"
            : "border-gray-600 hover:border-purple-500 hover:bg-purple-500/5"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={fileType === "video" ? "video/*" : "image/*"}
          onChange={handleFileChange}
          className="hidden"
          disabled={uploading}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <p className="text-gray-400">Uploading your video...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-linear-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              {fileType === "video" ? (
                <Video className="w-6 h-6 text-white" />
              ) : (
                <Upload className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <p className="text-white font-medium mb-1">
                {dragActive ? "Drop your video here" : "Click to upload or drag and drop"}
              </p>
              <p className="text-gray-400 text-sm">
                {fileType === "video" ? "MP4, MOV, AVI, WebM up to 100MB" : "PNG, JPG, GIF up to 10MB"}
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
