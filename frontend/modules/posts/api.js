import fetcher from "@/lib/fetcher";

export const getPosts = async () => {
  const response = await fetcher.get("/posts");
  return response;
};

export const getPost = async (id) => {
  const response = await fetcher.get(`/posts/${id}`);
  return response;
};

// Need to pass token to create, update, and delete post
export const createPost = async (data, token) => {
  const response = await fetcher.post("/posts", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const updatePost = async (id, data, token) => {
  const response = await fetcher.put(`/posts/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deletePost = async (id, token) => {
  const response = await fetcher.delete(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
