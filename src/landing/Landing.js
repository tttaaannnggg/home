import React from "react";
import { getWeightedRandomItem } from "../utils/weightedRandom.js";

function Landing() {
  return (
      <p>
        here i am you{" "}
        {getWeightedRandomItem(
          [
            "clowns",
            "jokers",
            "animals",
            "jerks",
            "sheep",
            "doofuses",
            "bastards",
            "lovers"
          ],
          0.5
        )}
      </p>
  );
}

export default Landing;
