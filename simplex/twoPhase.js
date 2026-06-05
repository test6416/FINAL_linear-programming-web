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

import { toStandardForm }
  from "./standardForm.js";

const EPS = 1e-9;

function chooseEnteringPhaseOne(
  tableau
) {

  const lastRow =
    tableau[
      tableau.length - 1
    ];

  let entering = -1;

  let maxPositive = 0;

  for (
    let j = 0;
    j < lastRow.length - 1;
    j++
  ) {

    if (
      lastRow[j] >
      maxPositive + EPS
    ) {

      maxPositive =
        lastRow[j];

      entering =
        j;
    }
  }

  return entering;
}

export function solveTwoPhase(
  problem
) {

  const originalType =
    problem.type;

  const standardProblem =
    toStandardForm(problem);

  const {
    tableau,
    basis,
    variableNames,
    artificialColumns
  } =
    buildPhaseOne(
      standardProblem
    );

  const steps = [];

  // =====================
  // PHASE I
  // =====================
  
  console.log(
    "PHASE I TABLEAU",
    tableau
  );

  console.log(
    "PHASE I BASIS",
    basis
  );

  console.log(
    "PHASE I VARIABLES",
    variableNames
  );

  console.table(
    tableau
  );

  console.log(
    "BASIS",
    basis
  );

  simplexLoop(
    tableau,
    basis,
    variableNames,
    steps,
    "PHA I"
  );

  const phaseOneValue =
    tableau[
      tableau.length - 1
    ][
      tableau[0].length - 1
    ];

  if (
    Math.abs(
      phaseOneValue
    ) > EPS
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

  // =====================
  // Remove Artificial
  // =====================

  removeArtificialColumns(
    tableau,
    variableNames,
    basis,
    artificialColumns
  );

  // =====================
  // PHASE II
  // =====================

  rebuildObjective(
    tableau,
    basis,
    standardProblem.objective
  );

  console.table(
    tableau
  );

  console.log(
    "BASIS",
    basis
  );

  simplexLoop(
    tableau,
    basis,
    variableNames,
    steps,
    "PHA II"
  );

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

function buildPhaseOne(
  problem
) {

  const numVars =
    problem.objective.length;

  const tableau = [];

  const basis = [];

  const variableNames =
    [...(problem.variableNames || [])];

  const artificialColumns =
    [];

  let currentCol =
    numVars;

  problem.constraints.forEach(
    (
      constraint,
      rowIndex
    ) => {

      const row =
        [...constraint.coefficients];

      while (
        row.length <
        currentCol
      ) {

        row.push(0);
      }

      if (
          constraint.sign === "<="
        ) {

          while (
            row.length <= currentCol
          ) {
            row.push(0);
          }

          row[currentCol] =
            1;

        variableNames.push(
          `w${rowIndex + 1}`
        );

        basis.push(
          currentCol
        );

        currentCol++;
      }

      else if (
        constraint.sign === ">="
      ) {

        while (
            row.length <= currentCol
          ) {
            row.push(0);
          }

          row[currentCol] =
            -1;

          variableNames.push(
            `e${rowIndex + 1}`
          );

        currentCol++;

        while (
            row.length <= currentCol
          ) {
            row.push(0);
          }

          row[currentCol] =
            1;

          variableNames.push(
            `a${rowIndex + 1}`
          );

        basis.push(
          currentCol
        );

        artificialColumns.push(
          currentCol
        );

        currentCol++;
      }

      else {

        while (
            row.length <= currentCol
          ) {
            row.push(0);
          }

          row[currentCol] =
            1;

          variableNames.push(
            `a${rowIndex + 1}`
          );

        basis.push(
          currentCol
        );

        artificialColumns.push(
          currentCol
        );

        currentCol++;
      }

      while (
          row.length < currentCol
        ) {
          row.push(0);
        }

        row.push(
          Number(
            constraint.rhs
          )
        );

      tableau.push(
        row
      );
    }
  );

  const totalCols =
    currentCol;

  tableau.forEach(
    row => {

      while (
        row.length <
        totalCols + 1
      ) {

        row.splice(
          row.length - 1,
          0,
          0
        );
      }
    }
  );

  const objectiveRow =
    new Array(
      totalCols + 1
    ).fill(0);

  artificialColumns.forEach(
    col => {

      objectiveRow[col] =
        -1;
    }
  );

  tableau.push(
    objectiveRow
  );

  artificialColumns.forEach(
    col => {

      const rowIndex =
        basis.findIndex(
          b => b === col
        );

      if (
        rowIndex >= 0
      ) {

        for (
          let j = 0;
          j < objectiveRow.length;
          j++
        ) {

          tableau[
            tableau.length - 1
          ][j]
          +=
          tableau[
            rowIndex
          ][j];
        }
      }
    }
  );

  return {

    tableau,

    basis,

    variableNames,

    artificialColumns
  };
}

function simplexLoop(
  tableau,
  basis,
  variableNames,
  steps,
  title
) {

  let iteration = 0;

  while (true) {

    iteration++;

    const basisNames =
      basis.map(
        b =>
          variableNames[b]
      );

    steps.push(

      `${title}\n\n` +

      tableauToDictionary(
        tableau,
        basisNames,
        variableNames
      )
    );

    let entering;

      if (
        title === "PHA I"
      ) {

        entering =
          chooseEnteringPhaseOne(
            tableau
          );
      }

      else {

        entering =
          chooseEnteringVariable(
            tableau
          );
      }
    
    console.log(
      "PHASE",
      title
    );

    console.log(
      "ENTERING",
      entering
    );

    if (
      entering >= 0
    ) {

      console.log(
        "COLUMN",
        tableau.map(
          row =>
            row[entering]
        )
      );
    }

    if (
      entering === -1
    ) {

      break;
    }

    const leaving =
      ratioTest(
        tableau,
        entering
      );

    if (
      leaving === -1
    ) {

      console.log(
        "===== UNBOUNDED DEBUG ====="
      );

      console.table(tableau);

      console.log(
        "TITLE =",
        title
      );

      console.log(
        "ENTERING =",
        entering
      );

      console.log(
        "COLUMN =",
        tableau.map(
          row => row[entering]
        )
      );

      console.log(
        "BASIS =",
        basis
      );

      console.log(
        "VARIABLES =",
        variableNames
      );

      throw new Error(
        "Bài toán không bị chặn."
      );
    }

    if (
      leaving === -1
    ) {

      throw new Error(
        "Bài toán không bị chặn."
      );
    }

    basis[leaving] =
      entering;

    performPivot(
      tableau,
      leaving,
      entering
    );

    if (
      iteration > 1000
    ) {

      throw new Error(
        "Thuật toán vượt quá số vòng lặp."
      );
    }
  }
}

function removeArtificialColumns(
  tableau,
  variableNames,
  basis,
  artificialColumns
) {

  artificialColumns
    .sort(
      (a, b) => b - a
    )
    .forEach(
      col => {

        tableau.forEach(
          row =>
            row.splice(
              col,
              1
            )
        );

        variableNames.splice(
          col,
          1
        );

        for (
          let i = 0;
          i < basis.length;
          i++
        ) {

          if (
            basis[i] === col
          ) {

            basis[i] = -1;
          }

          else if (
            basis[i] > col
          ) {

            basis[i]--;
          }
        }
      }
    );
}

function rebuildObjective(
  tableau,
  basis,
  objective
) {

  const lastRow =
    tableau[
      tableau.length - 1
    ];

  lastRow.fill(0);

  for (
    let i = 0;
    i < objective.length;
    i++
  ) {

    lastRow[i] =
      -objective[i];
  }

  for (
    let row = 0;
    row < basis.length;
    row++
  ) {

    const basic =
      basis[row];

    if (
      basic < 0
    ) continue;

    const cost =
      lastRow[basic];

    if (
      Math.abs(cost)
      < EPS
    ) continue;

    for (
      let j = 0;
      j < lastRow.length;
      j++
    ) {

      lastRow[j]
      -=
      cost *
      tableau[row][j];
    }
  }
}

