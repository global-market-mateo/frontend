import { useQuery } from "@tanstack/react-query";
import { getCategoriesFn } from "./categoryService";
export const categoryKey = ["Category"];

export const useCategories = () =>
  useQuery({
    queryKey: categoryKey,
    queryFn: getCategoriesFn,
    gcTime: 1000000,
  });
