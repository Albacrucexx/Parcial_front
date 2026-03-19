"use client";

import { useState, useEffect } from "react";
import { searchCocktailByName, getRandomCocktail } from "./lib/api/cocktail";
import type { Cocktail } from "./types";
import CocktailCard from "./components/cocktail";
import { useRouter } from "next/navigation";

const Home = () => {
  const [search, setSearch] = useState("");
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const router = useRouter();

  // CARGAR MARGARITAS AL INICIO
  useEffect(() => {
    const loadCocktails = async () => {
      const data = await searchCocktailByName("margarita");
      setCocktails(data || []);
    };

    loadCocktails();
  }, []);

  const handleSearch = async () => {
    const data = await searchCocktailByName(search);
    setCocktails(data || []);
  };

  const handleRandom = async () => {
    const cocktail = await getRandomCocktail();
    router.push(`/${cocktail.idDrink}`);
  };

  return (
    <div>
      <h1>Buscador de Cocktails</h1>

      <div className="searchContainer">
        <div className="searchBox">
          <input
            type="text"
            placeholder="Buscar cocktail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="searchBtn" onClick={handleSearch}>
            Buscar
          </button>
        </div>

        <button className="randomBtn" onClick={handleRandom}>
          Dime algo bonito
        </button>
      </div>

      <div className="cocktailGrid">
        {cocktails.map((cocktail) => (
          <CocktailCard
            key={cocktail.idDrink}
            cocktail={cocktail}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;