import mongoose, { Document, Schema } from "mongoose";

export interface IImage extends Document {
  title: string;
  url: string;
  userId: mongoose.Types.ObjectId;
  order: number;
}

const imageSchema = new mongoose.Schema<IImage>(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Image = mongoose.model<IImage>("Image", imageSchema);
export default Image;
