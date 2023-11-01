import {
  Outlet,
  Link,
  useNavigation,
  Form,
  useLoaderData,
  useSubmit,
} from "react-router-dom";

export async function loader({ request }: any) {
  const url = new URL(request.url);
  const pokeSearch = url.searchParams.get("search");
  return pokeSearch;
}

export default function Root() {
  const navigation = useNavigation();
  const Pokename: any = useLoaderData();
  const submit = useSubmit();

  return (
    <>
      <div id="navbar">
        <h1>
          <img
            id="poketitle"
            src="https://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG3.png"
            alt=""
          />
          <img
            id="pokeball"
            src="https://e7.pngegg.com/pngimages/173/464/png-clipart-pokemon-ball-pokeball-area-wiki-thumbnail.png"
            alt="Image of a PokeBall"
            className={navigation.state === "loading" ? "loading" : "idle"}
          />
        </h1>
        <Form
          id="search-form"
          role="search"
          action={`/ListPokemon/${Pokename}`}
        >
          <input
            id="search-bar"
            type="search"
            name="search"
            placeholder="Choose Your Pokemon"
            defaultValue={Pokename}
            onChange={(e) => {
              const isFirstSearch = Pokename == null;
              submit(e.currentTarget.form, {
                replace: !isFirstSearch,
              });
            }}
          />
        </Form>
        <span id="btn-bar">
          <button id="home">
            <Link to={`/Home`}>Home</Link>
          </button>
          <button id="randomizer">
            <Link to={`/Random`}>Random Pokemon</Link>
          </button>
          <button id="list">
            <Link to={`/ListPokemon`}>All Pokemon</Link>
          </button>
        </span>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
