import fetcher from "@/lib/fetcher";

export const register = async (data) => {
  const response = await fetcher.post("/auth/register", data);
  return response;
};

export const login = async (data) => {
  const response = await fetcher.post("/auth/login", data);
  return response;
};
