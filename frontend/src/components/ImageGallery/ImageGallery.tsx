import React from "react";
import ImageCard from "./ImageCard";

interface ImageGalleryProps {
  images: any[];
  onDragStart: (index: number) => void;
  onDrop: (index: number) => void;
  onEditImage: (index: number, updatedImage: any) => void;
  onDeleteImage: (index: number) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onDragStart,
  onDrop,
  onEditImage,
  onDeleteImage,
}) => {
  const sortedImages = [...images].sort((a, b) => a.order - b.order);

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {sortedImages.map((image, index) => (
        <ImageCard
          key={image.id}
          image={image}
          index={index}
          onDragStart={() => onDragStart(index)}
          onDrop={() => onDrop(index)}
          onEditImage={(updatedImage) => onEditImage(index, updatedImage)}
          onDelete={() => onDeleteImage(index)}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
