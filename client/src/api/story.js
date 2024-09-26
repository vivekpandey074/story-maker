import { axiosInstance } from "./axiosInstance";

export const PostStory = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/story/post", payload);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
