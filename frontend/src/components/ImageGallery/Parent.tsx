import React, { useState } from "react";
import ImageGallery from "./ImageGallery";
import { FiPlus } from "react-icons/fi";

function Parent() {
  const [images, setImages] = useState<any[]>([]);
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(
    null
  );

  console.log("images state : ", images);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedImages = Array.from(e.target.files).map((file, index) => ({
        id: `${images.length + index}`,
        file: URL.createObjectURL(file),
        title: `Image ${images.length + index + 1}`,
        order: images.length + index,
      }));
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedImageIndex(index);
  };

  const handleDrop = (droppedIndex: number) => {
    if (draggedImageIndex === null) return;
    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(draggedImageIndex, 1);
    updatedImages.splice(droppedIndex, 0, draggedImage);

    const reorderedImages = updatedImages.map((img, idx) => ({
      ...img,
      order: idx,
    }));

    setImages(reorderedImages);
    setDraggedImageIndex(null);
  };

  const handleEditImage = (index: number, updatedImage: any) => {
    const updatedImages = [...images];
    updatedImages[index] = updatedImage;
    setImages(updatedImages);
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const reorderedImages = updatedImages.map((img, idx) => ({
      ...img,
      order: idx,
    }));
    setImages(reorderedImages);
  };

  return (
    <div className=" bg-gray-100 py-10">
      <div className="flex justify-center mb-10">
        <label className="cursor-pointer flex items-center">
          <FiPlus className="text-4xl text-blue-500" />
          <span className="ml-2 text-xl text-blue-500">Upload Images</span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      <ImageGallery
        images={images}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        onEditImage={handleEditImage}
        onDeleteImage={handleDeleteImage}
      />
    </div>
  );
}

export default Parent;
