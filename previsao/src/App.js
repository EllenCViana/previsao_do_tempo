import { useState } from "react"

function App() {
  const [city, setCity] = useState("Oriximina");
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=78bfb2bc031c4936bea173544243101&q=${city}&lang=pt`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.location && data.current) {
        console.log(data);
        setWeatherForecast(data);
        setError(null);
      } else {
        throw new Error("Dados inválidos recebidos da API");
      }
    })

    .catch((error) => {
      console.error("Erro ao buscar dados meteorológicos:", error.message);
      setError("Erro ao buscar dados meteorológicos. Verifique a acentuação, a conexão com a internet ou se o nome da cidade é válido.");
    });
};

  return (
    <div className="App">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="navbar-brand text-white">
          <h3>Benny's Previsão do Tempo</h3>
          <a>{city.name}</a>
        </div>
      </nav>

      <main className="container">
        <div className="jumbotron">
          <h1>Verifique agora a previsão do tempo da sua cidade.</h1>
          <p className="lead">Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar</p>
          <p>(Sem acentos)</p>

          <div className="row mb-4">
            <div className="col-md-6">
              <input
                onChange={handleChange}
                className="form-control"
                value={city}
              />
            </div>
          </div>

          <button onClick={handleSearch} className="btn btn-primary btn-lg">
            Pesquisar
          </button>
          {error ? (
            <div className="mt-4 alert-danger">
              {error}
              </div>
          ) : null}

          {weatherForecast ? (
            <div className="mt-4">
              <div >
                <img src={weatherForecast.current.condition.icon} alt="Condição do tempo" />{weatherForecast.current.temp_c}°C               
              </div>
              <div>
                <p>{weatherForecast.location.name}, {weatherForecast.location.region}.</p>
                
                <h3>Hoje o dia está: {weatherForecast.current.condition.text}</h3>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;