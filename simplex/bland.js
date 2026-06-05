import { buildTableau }
  from "./tableau.js";

import { performPivot }
  from "./pivot.js";

import { extractSolution }
  from "./basis.js";

import { tableauToDictionary }
  from "./dictionary.js";

import { formatNumber }
  from "./formatNumber.js";

import { toStandardForm }
  from "./standardForm.js";



const EPS = 1e-10;

export function solveBland(
  problem
) {

  const originalType =
    problem.originalType ||
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

  const steps = [];

  let iteration = 0;

  while (true) {

    iteration++;

    const basisNames =
      basis.map(
        b =>
          variableNames[b]
      );

    steps.push(

      `BƯỚC ${iteration}\n\n` +

      tableauToDictionary(
        tableau,
        basisNames,
        variableNames
      )
    );

    const enteringCol =
      blandEnteringVariable(
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
            name.startsWith("x")
        )
        .forEach(
          ([name, value]) => {

            finalStep +=
              `${name} = ${formatNumber(value)}\n`;
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
      blandLeavingVariable(
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

    const leavingVariable =
      variableNames[
        basis[leavingRow]
      ];

    const enteringVariable =
      variableNames[
        enteringCol
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

Giá trị pivot:
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

/* =====================================
   BLAND ENTERING RULE
===================================== */

export function blandEnteringVariable(
  tableau
) {

  const lastRow =
    tableau[
      tableau.length - 1
    ];

  for (
    let j = 0;
    j < lastRow.length - 1;
    j++
  ) {

    if (
      lastRow[j] < -EPS
    ) {

      return j;
    }
  }

  return -1;
}

/* =====================================
   BLAND LEAVING RULE
===================================== */

export function blandLeavingVariable(
  tableau,
  enteringCol
) {

  let bestRow = -1;

  let minRatio =
    Infinity;

  for (
    let i = 0;
    i < tableau.length - 1;
    i++
  ) {

    const coeff =
      tableau[i][
        enteringCol
      ];

    if (
      coeff <= EPS
    ) {

      continue;
    }

    const rhs =
      tableau[i][
        tableau[i].length - 1
      ];

    const ratio =
      rhs / coeff;

    if (
      ratio <
      minRatio - EPS
    ) {

      minRatio =
        ratio;

      bestRow =
        i;
    }

    else if (

      Math.abs(
        ratio -
        minRatio
      ) < EPS

    ) {

      if (
        bestRow === -1 ||
        i < bestRow
      ) {

        bestRow =
          i;
      }
    }
  }

  return bestRow;
}

/* =====================================
   KHÔI PHỤC BIẾN GỐC
===================================== */

