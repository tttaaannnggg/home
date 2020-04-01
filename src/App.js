import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          here i am you{" "}
          {getNouns([
            "clowns",
            "jokers",
            "animals",
            "jerks",
            "sheep",
            "doofuses",
            "bastards",
            "lovers"
          ])}
        </p>
      </header>
    </div>
  );
}

function getNouns(nouns) {
  for (let noun of nouns) {
    if (Math.random() < 0.5) {
      return noun;
    }
  }
  return nouns[nouns.length - 1];
}

export default App;
