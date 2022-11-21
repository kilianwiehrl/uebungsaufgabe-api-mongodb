import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("sample_pokemon");

    const pokemon = await db
      .collection("pokemon")
      .find({})
      .sort({ id: 1 })
      .limit(10)
      .toArray();

    res.json(pokemon);
  } catch (e) {
    console.error(e);
  }
};
