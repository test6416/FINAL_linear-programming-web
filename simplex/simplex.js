import { toStandardForm }
  from "./standardForm.js";

import { buildTableau }
  from "./tableau.js";

import {
  chooseEnteringVariable,
  performPivot
} from "./pivot.js";

import {
  ratioTest
} from "./ratioTest.js";

import {
  extractSolution
} from "./basis.js";

import {
  tableauToDictionary
} from "./dictionary.js";

import {
  formatNumber
} from "./formatNumber.js";

const EPS = 1e-9;

export function solveSimplex(
  problem
) {

  const originalType =
    problem.type;

  const standardProblem =
    toStandardForm(
      problem
    );

  const {
    tableau,
    basis,
    variableNames
  } =
    buildTableau(
      standardProblem
    );

  const {
    originalVariables
  } =
    standardProblem;

  const steps = [];

  let iteration = 0;

  while (true) {

    iteration++;

    const basisNames =
      basis.map(
        index =>
          variableNames[index]
      );

    steps.push(

      `Bước ${iteration}\n\n` +

      tableauToDictionary(
        tableau,
        basisNames,
        variableNames
      )
    );

    const enteringCol =
      chooseEnteringVariable(
        tableau
      );

    if (
      enteringCol === -1
    ) {

    const solution =
    extractSolution(
      tableau,
      basis,
      variableNames,
      standardProblem.originalVariables
    );

      let optimalValue =
        tableau[
          tableau.length - 1
        ][
          tableau[0].length - 1
        ];

      if (
        originalType === "min"
      ) {

        optimalValue =
          -optimalValue;
      }

      let finalStep =
        "NGHIỆM TỐI ƯU\n\n";

      Object.entries(
        solution
      )
        .filter(
          ([name]) =>
            /^x\d+$/.test(
              name
            )
        )
        .forEach(
          ([name, value]) => {

            finalStep +=
              `${name} = ${formatNumber(
                value
              )}\n`;
          }
        );

      finalStep +=
        `\nz = ${formatNumber(
          optimalValue
        )}`;

      steps.push(
        finalStep
      );

      return {

        status:
          "Tìm được nghiệm tối ưu.",

        optimalValue,

        solution,

        steps
      };
    }

    const leavingRow =
      ratioTest(
        tableau,
        enteringCol
      );

    if (
      leavingRow === -1
    ) {

      steps.push(
        "Bài toán không bị chặn."
      );

      return {

        status:
          "Bài toán không bị chặn.",

        optimalValue:
          Infinity,

        solution: {},

        steps
      };
    }

    const enteringVariable =
      variableNames[
        enteringCol
      ];

    const leavingVariable =
      variableNames[
        basis[
          leavingRow
        ]
      ];

    steps.push(
`PIVOT

Biến vào:
${enteringVariable}

Biến ra:
${leavingVariable}

Dòng pivot:
${leavingRow + 1}

Cột pivot:
${enteringCol + 1}

Pivot value:
${formatNumber(
  tableau[
    leavingRow
  ][
    enteringCol
  ]
)}
`
    );

    basis[
      leavingRow
    ] =
      enteringCol;

    performPivot(
      tableau,
      leavingRow,
      enteringCol
    );

    if (
      iteration > 1000
    ) {

      throw new Error(
        "Thuật toán vượt quá 1000 vòng lặp."
      );
    }
  }
}

