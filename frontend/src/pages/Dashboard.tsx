import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface Image {
  _id: string;
  title: string;
  url: string;
  order: number;
}

interface ImageBatch {
  _id: string;
  userId: string;
  images: Image[];
  createdAt: string;
  updatedAt: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [imageBatches, setImageBatches] = useState<ImageBatch[]>([]);
  const [editingBatches, setEditingBatches] = useState<{
    [key: string]: boolean;
  }>({});
  const [draggedImageInfo, setDraggedImageInfo] = useState<{
    batchId: string;
    imageId: string;
  } | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await apiClient.get("/api/images/user");
      setImageBatches(response.data);
    } catch (error) {
      console.error("Failed to fetch images", error);
    }
  };

  const toggleEditMode = (batchId: string) => {
    setEditingBatches((prev) => ({ ...prev, [batchId]: !prev[batchId] }));
  };

  const handleDragStart = (batchId: string, imageId: string) => {
    setDraggedImageInfo({ batchId, imageId });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (targetBatchId: string, targetIndex: number) => {
    if (!draggedImageInfo) return;

    setImageBatches((prevBatches) => {
      const newBatches = [...prevBatches];
      const sourceBatchIndex = newBatches.findIndex(
        (batch) => batch._id === draggedImageInfo.batchId
      );
      const targetBatchIndex = newBatches.findIndex(
        (batch) => batch._id === targetBatchId
      );

      const sourceBatch = newBatches[sourceBatchIndex];
      const targetBatch = newBatches[targetBatchIndex];

      const [draggedImage] = sourceBatch.images.splice(
        sourceBatch.images.findIndex(
          (img) => img._id === draggedImageInfo.imageId
        ),
        1
      );

      targetBatch.images.splice(targetIndex, 0, draggedImage);

      sourceBatch.images = sourceBatch.images.map((img, idx) => ({
        ...img,
        order: idx,
      }));
      targetBatch.images = targetBatch.images.map((img, idx) => ({
        ...img,
        order: idx,
      }));

      return newBatches;
    });

    setDraggedImageInfo(null);
  };

  const handleEditImage = (
    batchId: string,
    imageId: string,
    newTitle: string
  ) => {
    setImageBatches((prevBatches) => {
      return prevBatches.map((batch) => {
        if (batch._id === batchId) {
          return {
            ...batch,
            images: batch.images.map((img) =>
              img._id === imageId ? { ...img, title: newTitle } : img
            ),
          };
        }
        return batch;
      });
    });
  };

  const handleDeleteImage = (batchId: string, imageId: string) => {
    setImageBatches((prevBatches) => {
      return prevBatches.map((batch) => {
        if (batch._id === batchId) {
          return {
            ...batch,
            images: batch.images.filter((img) => img._id !== imageId),
          };
        }
        return batch;
      });
    });
  };

  const handleSaveChanges = async (batchId: string) => {
    const batchToUpdate = imageBatches.find((batch) => batch._id === batchId);
    if (!batchToUpdate) return;

    console.log("batchUpdate : ", batchToUpdate);
    try {
      await apiClient.put(`/api/images/batch/${batchId}`, {
        images: batchToUpdate.images,
      });
      fetchImages();
      toggleEditMode(batchId);
    } catch (error) {
      console.error("Failed to update batch", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
      <p className="text-lg mb-4 text-center">Welcome buddy!</p>
      {imageBatches.map((batch) => (
        <div key={batch._id} className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Batch ID: {batch._id}</h2>
            <button
              onClick={() => toggleEditMode(batch._id)}
              className={`px-4 py-2 rounded-md ${
                editingBatches[batch._id]
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {editingBatches[batch._id] ? "Cancel" : "Update"}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6 p-6">
            {batch.images.map((image, imageIndex) => (
              <div
                key={image._id}
                className={`relative bg-white shadow-md p-4 rounded-lg ${
                  editingBatches[batch._id] ? "cursor-move" : ""
                }`}
                draggable={editingBatches[batch._id]}
                onDragStart={() =>
                  editingBatches[batch._id] &&
                  handleDragStart(batch._id, image._id)
                }
                onDragOver={handleDragOver}
                onDrop={() =>
                  editingBatches[batch._id] && handleDrop(batch._id, imageIndex)
                }
              >
                <img
                  src={`http://localhost:5000/uploads/${image.url}`}
                  alt={image.title}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <p className="text-lg font-bold">{image.title}</p>
                {editingBatches[batch._id] && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <FiEdit2
                      className="text-blue-500 cursor-pointer"
                      onClick={() => {
                        const newTitle = prompt("Enter new title", image.title);
                        if (newTitle) {
                          handleEditImage(batch._id, image._id, newTitle);
                        }
                      }}
                    />
                    <FiTrash2
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDeleteImage(batch._id, image._id)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          {editingBatches[batch._id] && (
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleSaveChanges(batch._id)}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => navigate("/")}
        className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4 flex mx-auto"
      >
        Go Home
      </button>
    </div>
  );
};

export default Dashboard;
