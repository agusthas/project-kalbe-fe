import fetcher from "@/lib/fetcher";

export const getUser = async (id) => {
  const response = await fetcher.get(`/users/${id}`);
  return response;
};

export const getMe = async (token) => {
  const response = await fetcher.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const updateMe = async (data, token) => {
  const response = await fetcher.put("/users/me", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
