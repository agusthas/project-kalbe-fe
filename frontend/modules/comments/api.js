import fetcher from "@/lib/fetcher";

export const createComment = async (postId, data, token) => {
  const response = await fetcher.post(`/posts/${postId}/comments`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deleteComment = async (postId, commentId, token) => {
  const response = await fetcher.delete(
    `/posts/${postId}/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
