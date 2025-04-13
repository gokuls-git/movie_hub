import "./App.css";
import Search from "./components/Search/Search";
import "./index.css";

function App() {
  return (
    <>
      <main>
        <div className="pattern" />
        <div className="wrapper">
          <header className="Hero_Section">
            <img src="/public/hero.png" />
            <h1>
              Find <span className="text-gradient">Movies</span>, You Will Love
              Without Any Hassle!
            </h1>
            <Search />
          </header>
        </div>
      </main>
    </>
  );
}

export default App;
