import mongoose, { Document, Schema } from "mongoose";

export interface IImageDetails {
  _id?: mongoose.Types.ObjectId;
  title: string;
  url: string;
  order: number;
}

export interface IImageBatch extends Document {
  userId: mongoose.Types.ObjectId;
  images: IImageDetails[];
}

const imageDetailsSchema = new Schema<IImageDetails>({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const imageBatchSchema = new Schema<IImageBatch>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [imageDetailsSchema],
  },
  { timestamps: true }
);

const ImageBatch = mongoose.model<IImageBatch>("ImageBatch", imageBatchSchema);
export default ImageBatch;
