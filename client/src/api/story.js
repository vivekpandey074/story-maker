import { axiosInstance } from "./axiosInstance";

export const PostStory = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/story/post", payload);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
export const UpdateStory = async (story) => {
  try {
    const response = await axiosInstance.patch("/api/story/update", { story });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const GetHomeFeed = async (filterArray) => {
  try {
    const response = await axiosInstance.post("/api/story/homefeed", {
      filter: filterArray,
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
export const GetCurrentStory = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/story/view/${id}`);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
export const ToggleBookmark = async (id) => {
  try {
    const response = await axiosInstance.patch(
      `/api/story/togglebookmark/${id}`
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
export const ToggleLike = async (id) => {
  try {
    const response = await axiosInstance.patch(`/api/story/togglelike/${id}`);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const GetMyStories = async () => {
  try {
    const response = await axiosInstance.get("/api/story/mystories");
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
export const GetBookmarks = async () => {
  try {
    const response = await axiosInstance.get("/api/story/bookmarks");
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
