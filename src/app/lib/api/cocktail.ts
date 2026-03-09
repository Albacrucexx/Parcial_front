import { api } from "./axios";
import type { Cocktail } from "../../types";

export const searchCocktailByName = async (name: string) => {
  const response = await api.get<{ drinks: Cocktail[] }>(
    `/search.php?s=${name}`
  );

  return response.data.drinks;
};

export const getCocktailById = async (id: number) => {
  const response = await api.get<{ drinks: Cocktail[] }>(
    `/lookup.php?i=${id}`
  );

  return response.data.drinks[0];
};

export const getRandomCocktail = async () => {
  const response = await api.get<{ drinks: Cocktail[] }>(
    `/random.php`
  );

  return response.data.drinks[0];
};