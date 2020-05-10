import React, { useState, useEffect } from "react";
import "./reset.css";
import "./App.css";

function App() {
  console.log(process.env.test_var);
  return (
    <div className="App">
        <div className="header">
          <h1>tang</h1>
        </div>
        <article>
          <p>
            hello. I'm tang.
          </p>
        </article>
    </div>
  );
}

export default App;
