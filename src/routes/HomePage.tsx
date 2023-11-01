import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const Pikachu = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  return Pikachu.json();
}

export default function Home() {
  const [posts, setPosts] = useState<any>([]);
  const Pikachu = useLoaderData();

  useEffect(() => {
    setPosts(Pikachu);
  }, [Pikachu]);

  return (
    <div id="Homebody">
      <img
        className="home-img"
        src={posts.sprites === undefined ? null : posts.sprites.front_default}
        alt="A picture of Pikachu"
      />
    </div>
  );
}
