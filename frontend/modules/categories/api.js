import fetcher from "@/lib/fetcher";

export const getCategories = async () => {
  const response = await fetcher.get("/categories");
  return response;
};

export const getCategory = async (id) => {
  const response = await fetcher.get(`/categories/${id}`);
  return response;
};
