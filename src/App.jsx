import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search/Search";
import "./index.css";
import Card from "./components/Card/Card";

const API_BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // console.log("Search :", searchTerm);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setSearchError("Error Occured");
      try {
        const endPoint = `${API_BASE_URL}discover/movie?sort_by=popularity.desc`;
        const response = await fetch(endPoint, API_OPTIONS);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
          setSearchError("No results found");
        }

        setSearchError(null); // clear error if data is found

        setSearchResults(data.results);
        console.log("DATA:", data);
      } catch (error) {
        console.log(error);
        setSearchError("Error fetching movies, Please try again!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <main>
        <div className="pattern" />
        <div className="wrapper">
          <header className="Hero_Section">
            <img src="/hero.png" />
            <h1>
              Find <span className="text-gradient">Movies</span>, You Will Love
              Without Any Hassle!
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section>
            <h2 className="mb-5 mt-5 text-center">Popular Movies</h2>
            {isLoading ? (
              <h1>Loading...</h1>
            ) : searchError ? (
              <p className="text-red-500">{searchError}</p>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {searchResults.map((movie, i) => {
                  return <Card key={i} movie={movie} />;
                })}
              </div>
            )}
            <p>{searchError}</p>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
