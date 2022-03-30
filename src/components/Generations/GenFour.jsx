import { useEffect, useState } from "react";
import Pokemon from "../Pokemon";

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    return (images[item.replace("./", "")] = r(item));
  });
  return images;
};

const images = importAll(require.context("../../img/gen4/", false, /\.png$/));

const GenFour = () => {
  const [pokeApi, setPokeApi] = useState([]);

  useEffect(fetchPokeApi, []);

  async function fetchPokeApi() {
    try {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=106&offset=386"
      );
      const data = await res.json();
      setPokeApi(data.results);
    } catch (err) {
      console.log(
        "Cound not fetch the pokemonlist. Try again in a few minutes."
      );
    }
  }

  return (
    <section>
      {pokeApi.map((poke, i) => (
        <Pokemon
          key={i}
          img={images[`${i + 387}.png`]}
          name={
            poke.name == "wormadam-plant"
              ? "Wormadam"
              : poke.name.charAt(0).toUpperCase() + poke.name.slice(1)
          }
          id={i + 387}
        />
      ))}
    </section>
  );
};

export default GenFour;
