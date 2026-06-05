import { describe, it, expect }
  from "vitest";

import { dualSimplex }
  from "../simplex/dualSimplex.js";

describe(
  "Dual Simplex",
  () => {

    it(
      "returns result object",
      () => {

        const problem = {

          type: "max",

          objective: [2, 1],

          constraints: [

            {
              coefficients: [1, 1],
              sign: "<=",
              rhs: 4
            }
          ]
        };

        const result =
          dualSimplex(problem);

        expect(result)
          .toBeDefined();
      }
    );
  }
);
