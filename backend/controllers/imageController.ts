import { Request, Response, NextFunction } from "express";
import Image, { IImage } from "../models/Image";
import ErrorHandler from "../utils/errorHandler";

const isError = (error: unknown): error is Error => {
  return (error as Error).message !== undefined;
};

export const uploadImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, images } = req.body;

    if (!images || !Array.isArray(images)) {
      return next(new ErrorHandler("Invalid images array", 400));
    }

    const uploadedImages = await Image.insertMany(
      images.map((img: { title: string; url: string }) => ({
        ...img,
        userId: user,
      }))
    );

    res.status(201).json(uploadedImages);
  } catch (error: unknown) {
    if (isError(error)) {
      next(new ErrorHandler(error.message || "Image upload failed", 500));
    } else {
      next(new ErrorHandler("Image upload failed", 500));
    }
  }
};

export const editImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedImage: IImage | null = await Image.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!updatedImage) {
      return next(new ErrorHandler("Image not found", 404));
    }

    res.status(200).json(updatedImage);
  } catch (error: unknown) {
    if (isError(error)) {
      next(new ErrorHandler(error.message || "Image edit failed", 500));
    } else {
      next(new ErrorHandler("Image edit failed", 500));
    }
  }
};

export const deleteImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deletedImage = await Image.findByIdAndDelete(id);
    if (!deletedImage) {
      return next(new ErrorHandler("Image not found", 404));
    }

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
    const { user, order } = req.body;

    if (!order || !Array.isArray(order)) {
      return next(new ErrorHandler("Invalid order array", 400));
    }

    for (const image of order) {
      await Image.findByIdAndUpdate(image.id, { order: image.order });
    }

    res.status(200).json({ message: "Images rearranged" });
  } catch (error: unknown) {
    if (isError(error)) {
      next(
        new ErrorHandler(error.message || "Image rearrangement failed", 500)
      );
    } else {
      next(new ErrorHandler("Image rearrangement failed", 500));
    }
  }
};
