import { describe, it, expect }
  from "vitest";

import { pivotOperation }
  from "../simplex/pivot.js";

describe(
  "Pivot Operation",
  () => {

    it(
      "performs Gauss pivot",
      () => {

        const tableau = [

          [2, 1, 18],

          [2, 3, 42],

          [3, 1, 24]
        ];

        const result =
          pivotOperation(
            tableau,
            0,
            0
          );

        expect(
          result[0][0]
        ).toBe(1);
      }
    );
  }
);