import fetcher from "@/lib/fetcher";

export const getCategories = async () => {
  const response = await fetcher.get("/categories");
  return response;
};
