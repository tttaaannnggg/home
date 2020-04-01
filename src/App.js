import React, { useState, useEffect } from "react";
import Landing from "./landing/Landing.js";
import Next from "./next/Next.js";
import "./App.css";
import { getWeightedRandomItem } from "./utils/weightedRandom.js";

const views = { Landing, Next };

function App() {
  const [view, setView] = useState(0);
  const viewList = Object.keys(views);
  const viewName = Object.keys(views)[view];
  function switchView() {
    return setView(state => (state + 1) % viewList.length);
  }
  useEffect(() => {
    setTimeout(switchView, 1200);
  });
  return (
    <div className="App">
      <header className="App-header">
        {views[viewName]()}
      </header>
    </div>
  );
}

export default App;
