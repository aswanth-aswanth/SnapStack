import { Request, Response, NextFunction } from "express";
import ImageBatch, { IImageBatch, IImageDetails } from "../models/Image";
import path from "path";
import ErrorHandler from "../utils/errorHandler";
import mongoose from "mongoose";

const isError = (error: unknown): error is Error => {
  return (error as Error).message !== undefined;
};

export const uploadImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as any;
    const images = req.files as Express.Multer.File[];
    const { titles } = req.body;

    if (!images || images.length === 0 || !titles || titles.length === 0) {
      return next(new ErrorHandler("No images or titles provided", 400));
    }

    const imageDetails: IImageDetails[] = images.map((file, index) => ({
      title: Array.isArray(titles) ? titles[index] : titles,
      url: path.basename(file.path),
      order: index,
    }));

    const newImageBatch: IImageBatch = await ImageBatch.create({
      userId: user,
      images: imageDetails,
    });

    res.status(201).json(newImageBatch);
  } catch (error: unknown) {
    if (isError(error)) {
      next(new ErrorHandler(error.message || "Image upload failed", 500));
    } else {
      next(new ErrorHandler("Image upload failed", 500));
    }
  }
};

export const editImageInBatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { batchId, imageId } = req.params;
    const updatedData = req.body;

    const imageBatch: IImageBatch | null = await ImageBatch.findById(batchId);
    if (!imageBatch) {
      return next(new ErrorHandler("Image batch not found", 404));
    }

    const image = imageBatch.images.find((img) => img._id?.equals(imageId));
    if (!image) {
      return next(new ErrorHandler("Image not found in this batch", 404));
    }

    image.title = updatedData.title || image.title;
    image.url = updatedData.url || image.url;

    await imageBatch.save();

    res.status(200).json(image);
  } catch (error: unknown) {
    if (isError(error)) {
      next(new ErrorHandler(error.message || "Image edit failed", 500));
    } else {
      next(new ErrorHandler("Image edit failed", 500));
    }
  }
};

export const deleteImageInBatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { batchId, imageId } = req.params;

    const imageBatch: IImageBatch | null = await ImageBatch.findById(batchId);
    if (!imageBatch) {
      return next(new ErrorHandler("Image batch not found", 404));
    }

    const imageIndex = imageBatch.images.findIndex((img) =>
      img._id?.equals(imageId)
    );
    if (imageIndex === -1) {
      return next(new ErrorHandler("Image not found", 404));
    }

    imageBatch.images.splice(imageIndex, 1);
    await imageBatch.save();

    res.status(200).json({ message: "Image deleted" });
  } catch (error: unknown) {
    if (isError(error)) {
      next(new ErrorHandler(error.message || "Image deletion failed", 500));
    } else {
      next(new ErrorHandler("Image deletion failed", 500));
    }
  }
};

export const rearrangeImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { batchId } = req.params;
    const { order } = req.body;

    if (!order || !Array.isArray(order)) {
      return next(new ErrorHandler("Invalid order array", 400));
    }

    const imageBatch: IImageBatch | null = await ImageBatch.findById(batchId);
    if (!imageBatch) {
      return next(new ErrorHandler("Image batch not found", 404));
    }

    for (const reorderedImage of order) {
      const image = imageBatch.images.find((img) =>
        img._id?.equals(reorderedImage.imageId)
      );
      if (!image) {
        return next(new ErrorHandler("Image not found for rearrangement", 404));
      }
      image.order = reorderedImage.order;
    }

    await imageBatch.save();

    res.status(200).json({ message: "Images rearranged" });
  } catch (error: unknown) {
    if (isError(error)) {
      next(new ErrorHandler(error.message || "Image rearrangement failed", 500));
    } else {
      next(new ErrorHandler("Image rearrangement failed", 500));
    }
  }
};
