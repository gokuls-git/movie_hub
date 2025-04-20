import { useEffect, useState, useRef } from "react";
import "./App.css";
import "./index.css";
import Search from "./components/Search/Search";
import Card from "./components/Card/Card";
import Spinner from "./components/Spinner/Spinner";

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

  useEffect(() => {
    const handler = setTimeout(() => {
      const fetchMovies = async (query = "") => {
        setIsLoading(true);
        try {
          const endPoint = query
            ? `${API_BASE_URL}search/movie?query=${encodeURIComponent(query)}`
            : `${API_BASE_URL}discover/movie?sort_by=popularity.desc`;

          const response = await fetch(endPoint, API_OPTIONS);

          if (!response.ok) {
            throw new Error(response.statusText);
          }

          const data = await response.json();

          if (!data.results || data.results.length === 0) {
            setSearchError("No results found");
          } else {
            setSearchError(null); // Clear error if results exist
          }

          setSearchResults(data.results);
        } catch (error) {
          console.error(error);
          setSearchError("Error fetching movies, Please try again!");
        } finally {
          setIsLoading(false);
        }
      };

      fetchMovies(searchTerm);
    }, 400); // debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return (
    <>
      <main>
        <div className="pattern" />
        <div className="wrapper">
          <header className="Hero_Section">
            <img src="/hero.png" alt="Hero" />
            <h1>
              Find <span className="text-gradient">Movies</span>, You Will Love
              Without Any Hassle!
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section>
            <h1 className="mb-7 mt-7 text-center">All Popular Movies</h1>
            {isLoading ? (
              <div className="flex items-center">
                <Spinner />
              </div>
            ) : searchError ? (
              <p className="text-red-500">{searchError}</p>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {searchResults.map((movie, i) => (
                  <Card key={i} movie={movie} />
                ))}
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
