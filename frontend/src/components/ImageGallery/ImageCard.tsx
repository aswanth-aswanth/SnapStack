import React, { useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";

interface ImageCardProps {
  image: any;
  index: number;
  onDragStart: () => void;
  onDrop: () => void;
  onEditImage: (updatedImage: any) => void;
  onDelete: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  onDragStart,
  onDrop,
  onEditImage,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(image.title);
  const [editedImage, setEditedImage] = useState(image.file);

  const handleEditSubmit = () => {
    setIsEditing(false);
    onEditImage({
      ...image,
      title: editedTitle,
      file: editedImage,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div
      className="relative bg-white shadow-md p-4 rounded-lg cursor-pointer"
      draggable
      onDragStart={onDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <button
            onClick={handleEditSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <img
            src={image.file}
            alt={image.title}
            className="w-full h-48 object-cover rounded-md mb-2"
          />
          <p className="text-lg font-bold">{image.title}</p>
          <div className="absolute top-2 right-2 flex gap-2">
            <FiEdit2
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
            <FiTrash2
              className="text-red-500 cursor-pointer"
              onClick={onDelete}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCard;
