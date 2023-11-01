import { useEffect, useState } from "react";
import { useLoaderData, Link, useNavigation } from "react-router-dom";

export async function loader() {
  const num = Math.floor(Math.random() * 1000);
  const randPoke = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + num.toString()
  );
  return randPoke.json();
}

// export async function action() {}

function RandomPoke() {
  const [posts, setPosts] = useState<any>([]);
  const randPoke = useLoaderData();
  const navigation = useNavigation();

  useEffect(() => {
    setPosts(randPoke);
  }, [randPoke]);

  return (
    <div className="poke-card">
      <button className="randomizer">
        <Link to={`/Random`}>Who's that Pokemon</Link>
      </button>
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
  );
}

export default RandomPoke;
