import { useQuery } from "@tanstack/react-query";
import {
  getBusinessByIdFn,
  getBusinessFn,
  getCategriesBusinessFn,
  getPublicProductsBusinessFn,
  getPublicProductsBusinessFnInterface,
} from "./businessService";
import { UUID } from "crypto";
export const BusinessesKey = "businesses";

export const useBusinesses = () =>
  useQuery({
    queryKey: [BusinessesKey],
    queryFn: getBusinessFn,
  });

export const getBusinessById = (businessId: UUID) =>
  useQuery({
    queryKey: [businessId, BusinessesKey],
    queryFn: () => getBusinessByIdFn(businessId),
  });

export const useCategoriesBusiness = (businessName: string) =>
  useQuery({
    queryKey: [businessName, "categories"],
    queryFn: () => getCategriesBusinessFn(businessName),
  });

export const getPublicProductsBusiness = ({
  businessName,
  category,
  brand,
  limit,
  page,
  tipo,
}: getPublicProductsBusinessFnInterface) =>
  useQuery({
    queryKey: ["products", businessName, category, brand, limit, page, tipo],
    queryFn: () => getPublicProductsBusinessFn({ businessName, category }),
    staleTime: 60 * 60 * 1000, // 1 hs
  });
