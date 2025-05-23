import { useQuery } from "@tanstack/react-query";
import {
  getBusinessProductsFn,
  SearchBusinessProductsFn,
} from "./businessProductsService";
import { BusinessProductskey } from "./businessProductsMutations";

export const useBusinessProducts = () =>
  useQuery({
    queryKey: BusinessProductskey,
    queryFn: getBusinessProductsFn,
  });

export const useSearchBusinessProducts = (search: string) =>
  useQuery({
    queryKey: [BusinessProductskey, search],
    queryFn: () => SearchBusinessProductsFn(search),
  });
