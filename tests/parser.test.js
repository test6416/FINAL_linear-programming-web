import { describe, it, expect }
  from "vitest";

import { parseLinearProgram }
  from "../simplex/parser.js";

describe(
  "Parser",
  () => {

    it(
      "parses LP text",
      () => {

        const input = `
          max z = 3x1 + 5x2

          x1 + x2 <= 4

          2x1 + 3x2 <= 12
        `;

        const result =
          parseLinearProgram(input);

        expect(
          result.objective.length
        ).toBe(2);
      }
    );
  }
);