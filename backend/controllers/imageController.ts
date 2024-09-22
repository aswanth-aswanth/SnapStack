import { Request, Response, NextFunction } from "express";
import ImageBatch, { IImageBatch, IImageDetails } from "../models/Image";
import path from "path";
import ErrorHandler from "../utils/errorHandler";
import mongoose from "mongoose";
import fs from "fs/promises";

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

export const fetchImagesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as any;

    const imageBatches = await ImageBatch.find({ userId: user });
    if (!imageBatches || imageBatches.length === 0) {
      return next(new ErrorHandler("No images found for this user", 404));
    }

    res.status(200).json(imageBatches);
  } catch (error: unknown) {
    if (isError(error)) {
      next(new ErrorHandler(error.message || "Failed to fetch images", 500));
    } else {
      next(new ErrorHandler("Failed to fetch images", 500));
    }
  }
};

export const updateImageBatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { batchId } = req.params;
    const { user } = req as any;
    const { images: updatedImages } = req.body;
    const newFiles = req.files as Express.Multer.File[];

    const imageBatch = await ImageBatch.findOne({
      _id: batchId,
      userId: user,
    });
    if (!imageBatch) {
      return next(new ErrorHandler("Image batch not found", 404));
    }
    const uploadDir = path.join(__dirname, "..", "..", "uploads");

    const imagesToKeep = new Set(updatedImages.map((img: any) => img._id));
    for (const oldImage of imageBatch.images) {
      if (oldImage._id && !imagesToKeep.has(oldImage._id.toString())) {
        await fs.unlink(path.join(uploadDir, oldImage.url)); // Remove the image file
      }
    }

    const updatedImageDetails: IImageDetails[] = await Promise.all(
      updatedImages.map(async (image: any, index: number) => {
        if (image._id) {
          const existingImage = imageBatch.images.find(
            (img) => img._id?.toString() === image._id
          );
          if (existingImage) {
            existingImage.title = image.title;
            existingImage.order = index;
            return existingImage;
          }
        }

        const newFile = newFiles.find(
          (file) => file.originalname === image.file
        );
        if (newFile) {
          return {
            title: image.title,
            url: path.basename(newFile.path),
            order: index,
          };
        }
        throw new Error("New image file not found");
      })
    );

    imageBatch.images = updatedImageDetails;

    if (imageBatch.images.length === 0) {
      await ImageBatch.deleteOne({ _id: batchId });
      return res.status(200).json({ message: "Image batch deleted successfully" });
    }

    await imageBatch.save();
    res.status(200).json(imageBatch);
  } catch (error: unknown) {
    if (isError(error)) {
      next(new ErrorHandler(error.message || "Failed to update image batch", 500));
    } else {
      next(new ErrorHandler("Failed to update image batch", 500));
    }
  }
};
