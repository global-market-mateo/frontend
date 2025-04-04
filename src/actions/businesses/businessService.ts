import { UUID } from "crypto";
import { Api } from "../Api";
import { BusinessProductResponse } from "../businessProducts/businessProductsService";
import { Business } from "./businessQueries";

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

export const getBusinessByIdFn = async (
  businessId: UUID
): Promise<BusinessResponse> => {
  const response = await Api.get(`/businesses/${businessId}`);
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

interface BusinessDto {
  id: string;
  paymentMethods?: string[];
  deliveryMethods?: string[];
  wppNumber?: string;
}
export const updateBusinessFn = async (business: BusinessDto) => {
  const token = localStorage.getItem("token");
  const bererToken = `Bearer ${token}`;
  return (
    await Api.patch(
      `/businesses/${business.id}`,
      {
        paymentMethods: business.paymentMethods,
        deliveryMethods: business.deliveryMethods,
        wppNumber: business.wppNumber,
      },
      { headers: { Authorization: bererToken } }
    )
  ).data as Business;
};
