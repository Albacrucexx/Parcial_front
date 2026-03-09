"use client";

import type { Cocktail } from "../types";
import { useRouter } from "next/navigation";

type Props = {
  cocktail: Cocktail;
};

const CocktailCard = ({ cocktail }: Props) => {
  const router = useRouter();

  return (
    <div
      className="card"
      onClick={() => router.push(`/${cocktail.idDrink}`)}
    >
      <img src={cocktail.strDrinkThumb} />
      <h3>{cocktail.strDrink}</h3>
    </div>
  );
};

export default CocktailCard;