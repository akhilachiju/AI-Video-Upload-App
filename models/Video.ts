import mongoose, { Schema, Document, Model } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;

export interface IVideo extends Document {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  userId?: mongoose.Types.ObjectId;
  controls?: boolean;
  views?: number;
  likes?: number;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    controls: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    transformation: {
      height: { type: Number, default: VIDEO_DIMENSIONS.height },
      width: { type: Number, default: VIDEO_DIMENSIONS.width },
      quality: { type: Number, min: 1, max: 100 },
    },
  },
  { timestamps: true }
);

// ✔ Proper Mongoose model with correct type
const Video: Model<IVideo> =
  mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema);

export default Video;
