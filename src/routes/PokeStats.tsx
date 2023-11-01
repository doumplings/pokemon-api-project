import { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

export async function loader({ params, request }: any) {
  const url = new URL(request.url);
  const pokeSearch = url.searchParams.get("search");
  const pokeFetch = () => {
    if (pokeSearch === null) {
      return fetch("https://pokeapi.co/api/v2/pokemon/" + params.PokemonName);
    } else {
      return fetch("https://pokeapi.co/api/v2/pokemon/" + pokeSearch);
    }
  };
  const pokeData = await pokeFetch();
  if (!pokeData) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return pokeData.json();
}

export default function PokeStats() {
  const [posts, setPosts] = useState<any>([]);
  const pokeData: any = useLoaderData();
  const navigation = useNavigation();

  useEffect(() => {
    setPosts(pokeData);
    console.log("fetched", pokeData);
  }, [pokeData]);

  return (
    <>
      <div className="poke-card">
        <div
          id="poke-body"
          className={navigation.state === "loading" ? "loading" : ""}
        >
          <div className="poke-text">
            <h2>Name: {posts.name}</h2>
            <p>Height: {posts.height} inches</p>
            <p>Weight: {posts.weight} lbs</p>
            {posts.types === undefined ? null : (
              <div className="type">
                Type:
                {posts.types.map((item: any) => {
                  return <span key={item.type.name}> {item.type.name}</span>;
                })}
              </div>
            )}
            {posts.abilities === undefined ? null : (
              <div className="abilities">
                Abilities:
                {posts.abilities.map((item: any) => {
                  return (
                    <span key={item.ability.name}> {item.ability.name};</span>
                  );
                })}
              </div>
            )}
          </div>
          {posts.sprites === undefined ? null : (
            <img
              className="poke-img"
              src={posts.sprites.front_default}
              alt="A picture of the Pokemon"
            />
          )}
        </div>
      </div>
    </>
  );
}
