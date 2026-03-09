"use client";

import { getCocktailById } from "../lib/api/cocktail";
import type { Cocktail } from "../types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CocktailDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);

  useEffect(() => {
    if (id) {
      getCocktailById(Number(id)).then((res) => {
        setCocktail(res);
      });
    }
  }, [id]);

  if (!cocktail) return null;

  const ingredients = Object.keys(cocktail)
    .filter((key) => key.includes("strIngredient"))
    .map((key) => cocktail[key as keyof Cocktail])
    .filter((ing) => ing);

  return (
    <div className="detailContainer">
      <button onClick={() => router.back()}>
        Volver
      </button>

      <div className="detailCard">
        <img src={cocktail.strDrinkThumb} />

        <div className="detailInfo">
          <h1>{cocktail.strDrink}</h1>

          <p><strong>Categoría:</strong> {cocktail.strCategory}</p>
          <p><strong>Alcohol:</strong> {cocktail.strAlcoholic}</p>
          <p><strong>Vaso:</strong> {cocktail.strGlass}</p>

          <p>{cocktail.strInstructions}</p>

          <h3>Ingredientes</h3>

          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CocktailDetail;