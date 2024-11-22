import { toast } from "react-toastify";
import api from "../api";

export const createComment = async function (commentContent, id) {
  try {
    let createCommentRes = await api.post(
      `/comments/create`,
      { commentContent, postId: id },
      { withCredentials: true }
    );
    return createCommentRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      toast.error("Error Creating Comment");
    }
  }
};

export const readComments = async function (id) {
  try {
    let readCommentsRes = await api.get(`/comments/all/${id}`, {
      withCredentials: true,
    });
    return readCommentsRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      toast.error("Error fetching comments");
    }
  }
};

export const deleteComment = async function (commentId, postId) {
  try {
    let deleteCommentRes = await api.delete(
        `/comments/delete/${postId}/${commentId}`,
        { withCredentials: true }
      );
      return deleteCommentRes;
  } catch (error) {
    if(error.response && error.response.status === 500) {
        toast.error("Error deleting comment")
    }
  }
};
