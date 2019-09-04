import React, { useState } from "react";
import "./App.css";

function App() {
  const [dogPic, setDogPic] = useState(null);
  const [dogBreeds, setDogBreeds] = useState(null);
  const [showBreedInfo, setShowBreedInfo] = useState(false);

  const getDogPic = () => {
    fetch("https://api.thedogapi.com/v1/images/search", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "2f6fbd8c-350b-42fb-b93b-cf8a95c6712f"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log("json: ", myJson);
        setDogPic(myJson[0].url);
      });
  };

  const getDogBreeds = () => {
    fetch("https://api.thedogapi.com/v1/breeds", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "2f6fbd8c-350b-42fb-b93b-cf8a95c6712f"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log("json: ", myJson);
        setDogBreeds(myJson);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>All About Dogs</h2>
        {dogPic && <img src={dogPic} width={300} />}
        <button
          style={{
            backgroundColor: "#add8e6",
            color: "#282c34",
            padding: "1rem",
            borderRadius: "3px",
            border: "none",
            cursor: "pointer",
            fontSize: "1.2rem",
            fontWeight: "500",
            margin: "1rem"
          }}
          onClick={getDogPic}
        >
          {dogPic ? "Get Another Dog Picture" : "Get Dog Picture"}
        </button>

        {dogBreeds &&
          dogBreeds.map((breed, i) => (
            <div key={i}>
              <p>{breed.name}</p>
              <button onClick={() => setShowBreedInfo(!showBreedInfo)}>
                More Info
              </button>
              {showBreedInfo && (
                <table style={{ width: "100%" }}>
                  <tbody style={{ display: "flex", flexDirection: "column" }}>
                    <tr style={{ display: "flex" }}>
                      <th style={{ flex: 1 }}>Temperament</th>
                      <th style={{ flex: 1 }}>Bred For</th>
                      <th style={{ flex: 1 }}>Breed Type</th>
                      <th style={{ flex: 1 }}>Life Span</th>
                    </tr>
                    <tr style={{ display: "flex" }}>
                      <td style={{ flex: 1 }}>{breed.temperament}</td>
                      <td style={{ flex: 1 }}>{breed.bred_for}</td>
                      <td style={{ flex: 1 }}>{breed.breed_group}</td>
                      <td style={{ flex: 1 }}>{breed.life_span}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          ))}
        <button onClick={getDogBreeds}>Get Dog Breeds</button>
      </header>
    </div>
  );
}

export default App;
