import { describe, it, expect }
  from "vitest";

import {
  sensitivityAnalysis
}
from "../simplex/sensitivity.js";

describe(
  "Sensitivity Analysis",
  () => {

    it(
      "computes reduced costs",
      () => {

        const tableau = [

          [1, 0, 4],

          [0, 1, 6],

          [-3, -5, 0]
        ];

        const basis = [0, 1];

        const variables =
          ["x1", "x2"];

        const result =
          sensitivityAnalysis(
            tableau,
            basis,
            variables
          );

        expect(
          result.reducedCosts.length
        ).toBe(2);
      }
    );
  }
);