import { stat } from "fs";
import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  console.log("del api called");
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
       const db = client.db("sample_pokemon");
       const col = db.collection("pokemon");

       pokemonArray.forEach((pokemon) => {
        addPokemonToDb(pokemon);
      });

      async function addPokemonToDb(pokemon) {
        await col.deleteOne(pokemon);
      }

    res.status(200);
  } catch (e) {
    console.error(e);
  }
};
