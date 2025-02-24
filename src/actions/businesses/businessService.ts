import { Api } from "../Api";
import { BusinessProductResponse } from "../businessProducts/businessProductsService";

interface BusinessResponse {
  id: string;
  name: string;
  ownerId: string;
}
export interface getPublicProductsBusinessFnInterface {
  businessName: string;
  category?: string;
  limit?: number;
  page?: number;
  brand?: string;
  tipo?: string;
}

export const getBusinessFn = async (): Promise<BusinessResponse[]> => {
  const response = await Api.get("/businesses");
  return response.data;
};
export const getCategriesBusinessFn = async (
  businessName: string
): Promise<{ name: string; id: string }[]> => {
  const response = await Api.get(`/${businessName}/categories`);
  return response.data;
};

export const getPublicProductsBusinessFn = async ({
  businessName,
  category,
}: getPublicProductsBusinessFnInterface): Promise<BusinessProductResponse> => {
  const response = await Api.get(
    `/${businessName}/products/${category ? category : ""}`
  );
  return response.data;
};
