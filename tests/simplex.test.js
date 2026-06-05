import { describe, it, expect }
  from "vitest";

import { primalSimplex }
  from "../simplex/primalSimplex.js";

describe(
  "Simplex Solver",
  () => {

    it(
      "solves basic LP",
      () => {

        const problem = {

          type: "max",

          objective: [3, 5],

          constraints: [

            {
              coefficients: [1, 0],
              sign: "<=",
              rhs: 4
            },

            {
              coefficients: [0, 2],
              sign: "<=",
              rhs: 12
            },

            {
              coefficients: [3, 2],
              sign: "<=",
              rhs: 18
            }
          ]
        };

        const result =
          primalSimplex(problem);

        expect(
          result.status
        ).toBe(
          "Tìm được nghiệm tối ưu."
        );
      }
    );
  }
);