import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [firstGet, setFirstGet] = useState(true);

  function handleClick() {
    getData();
    
    if (firstGet) {
      delPokemonDb();
    } // del entries of db after retrieval
  }

  async function getData() {
    const data = await (await fetch("/api/get-pokemon")).json();
    setPokemon(data);
  }

  async function getPokemonFromApi() {
    await fetch("/api/fetch-pokemon-to-db");
  }

  async function delPokemonDb() {
    await fetch("/api/empty-pokemon-db");
    setFirstGet(false);
  }

  useEffect(() => {
    getPokemonFromApi();
  }, []);

  return (
    <div>
      <button type="button" onClick={handleClick}>
        load data
      </button>
      <ul>
        {pokemon?.map((pokemon: any) => (
          <li>
            <h2>
              <span>{pokemon.id}</span>
              <span> {pokemon.name}</span>
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
