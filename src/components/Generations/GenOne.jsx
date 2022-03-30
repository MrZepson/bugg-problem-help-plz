import { useEffect, useState } from "react";
import Pokemon from "../Pokemon";

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    return (images[item.replace("./", "")] = r(item));
  });
  return images;
};

const images = importAll(require.context("../../img/gen1/", false, /\.png$/));

const GenOne = () => {
  const [pokeApi, setPokeApi] = useState([]);
  const [from, setFrom] = useState(0);

  useEffect(() => fetchPokeApi(from), []);

  useEffect(() => updateStorage, [from]);

  const savedData = JSON.parse(localStorage.getItem("api")) || [];
  localStorage.setItem("api", JSON.stringify(pokeApi));

  function updateStorage() {
    fetchPokeApi(from);
    let savedData1 = JSON.parse(localStorage.getItem("api"));
    const newPokemons = pokeApi;
    console.log(pokeApi);
    let p = [...newPokemons, ...savedData1];
    console.log(p);
    localStorage.setItem("api", JSON.stringify(p));
  }

  async function fetchPokeApi(from) {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${from}`
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
      {savedData.map((poke, i) => (
        <Pokemon
          key={i}
          img={images[`${i + 1}.png`]}
          name={poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
          id={i + 1}
        />
      ))}
      <button onClick={() => setFrom(from + 10)}>button</button>
    </section>
  );
};

export default GenOne;
