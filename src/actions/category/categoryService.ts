import { Api } from "../Api";
import { UUID } from "crypto";
import { getBearerToken } from "../apiHelper";

export interface Category {
  id: UUID;
  name: string;
}

export const getCategoriesFn = async (): Promise<Category[]> => {
  const bearerToken = getBearerToken();
  const response = await Api.get("/businesses/category/all", {
    headers: { Authorization: bearerToken },
  });
  return response.data;
};

export const createCategoryFn = async (name: string) => {
  const bearerToken = getBearerToken();
  const response = await Api.post(
    "/businesses/category",
    { name },
    { headers: { Authorization: bearerToken } }
  );
  return response.data;
};

export const deleteCategoryFn = async ({ id }: { id: UUID }) => {
  const bearerToken = getBearerToken();
  const response = await Api.delete(`/businesses/category/${id}`, {
    headers: { Authorization: bearerToken },
  });
  return response.data;
};

export const updateCategoryFn = async ({
  id,
  name,
}: {
  id: UUID;
  name: string;
}) => {
  const bearerToken = getBearerToken();
  const response = await Api.patch(
    `/businesses/category/${id}`,
    { name },
    { headers: { Authorization: bearerToken } }
  );
  return response.data;
};
