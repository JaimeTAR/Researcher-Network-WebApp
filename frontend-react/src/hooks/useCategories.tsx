import { createContext, useContext } from "react";
import { AuthCategoriesType } from "../utils/interfaces";

export const CategoriesContext = createContext<AuthCategoriesType | undefined>(
  undefined,
);

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within an CategoriesProvider");
  }
  return context;
};
