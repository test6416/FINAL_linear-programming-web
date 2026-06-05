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

const EPS = 1e-9;

export function solveDualSimplex(
  problem
) {

  const standardProblem =
  toStandardForm(problem);

  const {
    tableau,
    basis,
    variableNames
  } =
    buildTableau(
      standardProblem
    );

  if (
    !isDualFeasible(
      tableau
    )
  ) {

    throw new Error(
      "Bảng hiện tại không thỏa điều kiện áp dụng Dual Simplex."
    );
  }

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

      `BƯỚC ${iteration}\n\n` +

      tableauToDictionary(
        tableau,
        basisNames,
        variableNames
      )
    );

    const pivotRow =
      chooseLeavingRow(
        tableau
      );

    if (
      pivotRow === -1
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
        problem.type === "min"
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

    const pivotCol =
      chooseEnteringColumn(
        tableau,
        pivotRow
      );

    if (
      pivotCol === -1
    ) {

      return {

        status:
          "Bài toán vô nghiệm.",

        optimalValue:
          null,

        solution: {},

        steps
      };
    }

    const leavingVariable =
      variableNames[
        basis[pivotRow]
      ];

    const enteringVariable =
      variableNames[
        pivotCol
      ];

    steps.push(
`PIVOT

Biến vào:
${enteringVariable}

Biến ra:
${leavingVariable}

Dòng pivot:
${pivotRow + 1}

Cột pivot:
${pivotCol + 1}

Giá trị pivot:
${formatNumber(
  tableau[
    pivotRow
  ][
    pivotCol
  ]
)}
`
    );

    basis[
      pivotRow
    ] =
      pivotCol;

    performPivot(
      tableau,
      pivotRow,
      pivotCol
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

function isDualFeasible(
  tableau
) {

  const objectiveRow =
    tableau[
      tableau.length - 1
    ];

  for (
    let j = 0;
    j < objectiveRow.length - 1;
    j++
  ) {

    if (
      objectiveRow[j]
      < -EPS
    ) {

      return false;
    }
  }

  return true;
}

function chooseLeavingRow(
  tableau
) {

  const rhsCol =
    tableau[0].length - 1;

  let row = -1;

  let mostNegative =
    -EPS;

  for (
    let i = 0;
    i < tableau.length - 1;
    i++
  ) {

    const rhs =
      tableau[i][rhsCol];

    if (
      rhs < mostNegative
    ) {

      mostNegative =
        rhs;

      row = i;
    }
  }

  return row;
}

function chooseEnteringColumn(
  tableau,
  pivotRow
) {

  const objectiveRow =
    tableau[
      tableau.length - 1
    ];

  let bestCol = -1;

  let bestRatio =
    Infinity;

  for (
    let j = 0;
    j < objectiveRow.length - 1;
    j++
  ) {

    const aij =
      tableau[
        pivotRow
      ][j];

    if (
      aij >= -EPS
    ) {

      continue;
    }

    const cj =
      objectiveRow[j];

    const ratio =
      cj / (-aij);

    if (
      ratio < bestRatio
    ) {

      bestRatio =
        ratio;

      bestCol =
        j;
    }
  }

  return bestCol;
}

