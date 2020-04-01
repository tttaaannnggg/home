import React from "react";
import { getWeightedRandomItem } from "../utils/weightedRandom.js";

function About() {
  return (
    <p>
      {" "}
      i'm{" "}
      {getWeightedRandomItem(
        ["tang", "sad", "angry", "confused", "absurd", "fucked"],
        0.25
      )}
    </p>
  );
}

export default About;
