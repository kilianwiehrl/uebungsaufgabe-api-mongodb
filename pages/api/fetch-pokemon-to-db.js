import { stat } from "fs";
import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    // fetch the first 10 pokemon
    const pokemonArray = [];
    for (let index = 1; index < 11; index++) {
      const pokemon = await (
        await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
      ).json();
      pokemonArray.push({ name: pokemon.name, id: pokemon.id }); // add name and id of pokemon
    }

    const client = await clientPromise;
    const database = client.db("sample_pokemon");
    const col = database.collection("pokemon");

    pokemonArray.forEach((pokemon) => {
      addPokemonToDb(pokemon);
    });

    async function addPokemonToDb(pokemon) {
      await col.insertOne(pokemon);
    }

    res.status(200);
  } catch (e) {
    console.error(e);
  }
};
