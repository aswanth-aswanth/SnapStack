import axios from "axios";
import { Image } from "../types";

const API_URL = "http://localhost:5000/api";

export const getImages = async (): Promise<Image[]> => {
  const response = await axios.get(`${API_URL}/images`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const uploadImages = async (formData: FormData): Promise<Image[]> => {
  const response = await axios.post(`${API_URL}/images/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const updateImage = async (
  id: string,
  formData: FormData
): Promise<Image> => {
  const response = await axios.put(`${API_URL}/images/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const deleteImage = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/images/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const rearrangeImages = async (imageIds: string[]): Promise<Image[]> => {
  const response = await axios.post(
    `${API_URL}/images/rearrange`,
    { imageIds },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
