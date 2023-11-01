import { useEffect, useState } from "react";
import { Link, Outlet, useLoaderData, useNavigation } from "react-router-dom";

export async function loader() {
  const posts = await fetch("https://pokeapi.co/api/v2/pokemon");
  return posts;
}

export default function ListPoke() {
  const [posts, setPosts] = useState<any>([]);
  const [offset, setOffset] = useState(0);
  const navigation = useNavigation();
  const loader: any = useLoaderData();
  // const [PokeName, setPokeName] = useState("");
  // const [pokeIndex, setPokeIndex] = useState(1);

  const handleNextClick = () => {
    setOffset((prev) => prev + 20);
  };

  const handlePrevClick = () => {
    setOffset((prev) => prev - 20);
  };

  useEffect(() => {
    setPosts(loader.results);
  }, [loader]);

  useEffect(() => {
    fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=" +
        offset.toString() +
        "&limit=20"
    )
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.results);
      })
      .catch((err) => console.log("There is an error", err));

    return setPosts([]);
  }, [offset]);

  return (
    <>
      <div className="list-body">
        <ul className="list-wrapper">
          {posts === undefined
            ? null
            : posts.map((item: any) => {
                const Pokename: string = item.name;
                return (
                  <li id={item.name} key={item.name} className="poke-list-name">
                    <Link to={`/ListPokemon/${Pokename}`} className={item.name}>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
        </ul>
      </div>
      <div
        id="poke-detail"
        className={navigation.state === "loading" ? "loading" : "idle"}
      >
        <Outlet />
      </div>
      <div id="pagination">
        <button id="next-btn" onClick={handleNextClick}>
          Next Page
        </button>
        <button id="prev-btn" onClick={handlePrevClick}>
          Previous Page
        </button>
      </div>
    </>
  );
}
