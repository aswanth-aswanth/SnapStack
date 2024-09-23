import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageGallery from "./ImageGallery";
import { FiPlus } from "react-icons/fi";
import apiClient from "../../api/apiClient";
import { useAuth } from "../../hooks/useAuth";

function Parent() {
  const [images, setImages] = useState<any[]>([]);
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  console.log("images state : ", images);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedImages = Array.from(e.target.files).map((file, index) => ({
        id: `${images.length + index}`,
        file: URL.createObjectURL(file),
        title: `Image ${images.length + index + 1}`,
        order: images.length + index,
        rawFile: file,
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

  const handleSubmitImages = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (images.some((img) => img.title.trim() === "")) {
      alert("Please ensure all images have titles before uploading.");
      return;
    }

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image.rawFile);
      formData.append("titles", image.title);
    });

    try {
      setLoading(true);
      await apiClient.post("/api/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Uploaded successfully");
      setImages([]);
    } catch (error) {
      console.error("Image upload failed", error);
      alert("Failed to upload images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 py-10">
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

      {images.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmitImages}
            className={`bg-blue-500 text-white px-6 py-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Images"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Parent;
