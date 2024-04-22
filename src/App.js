import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const api = {
  key: process.env.REACT_APP_API,
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };


  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated && (
          <div>
            <h1>Hello {user.name}</h1>
            <h3>Weather App</h3>

            <div>
              <input
                type="text"
                placeholder="Enter city/town..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={searchPressed}>Search</button>
            </div>

            {typeof weather.main !== "undefined" ? (
              <div>
                {/* Location  */}
                <p>{weather.name}</p>

                {/* Temperature Celsius  */}
                <p>{weather.main.temp}°C</p>

                {/* Condition (Sunny ) */}
                <p>{weather.weather[0].main}</p>
                <p>({weather.weather[0].description})</p>
              </div>
            ) : (
              ""
            )}
          </div>
        )}

        {isAuthenticated ? (
          <button className="btn" onClick={(e) => logout()}>
            Logout
          </button>
        ) : (
          <button className="btn" onClick={(e) => loginWithRedirect()}>
            Login with redirect
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
