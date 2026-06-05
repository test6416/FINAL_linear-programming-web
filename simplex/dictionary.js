import { formatNumber }
  from "./formatNumber.js";

const EPS = 1e-9;

export function tableauToDictionary(
  tableau,
  basisNames,
  variableNames
) {

  const lastRow =
    tableau.length - 1;

  const lastCol =
    tableau[0].length - 1;

  let result = "";

  // =====================
  // Objective
  // =====================

  result += "z = ";

  result += formatNumber(
    tableau[lastRow][lastCol]
  );

  for (
    let col = 0;
    col < lastCol;
    col++
  ) {

    const coeff =
      tableau[lastRow][col];

    if (
      Math.abs(coeff) < EPS
    ) {
      continue;
    }

    result += buildTerm(
      coeff,
      variableNames[col]
    );
  }

  result += "\n\n";

  // =====================
  // Constraints
  // =====================

  for (
    let row = 0;
    row < lastRow;
    row++
  ) {

    const basicVar =
      basisNames[row];

    result +=
      `${basicVar} = `;

    result += formatNumber(
      tableau[row][lastCol]
    );

    for (
      let col = 0;
      col < lastCol;
      col++
    ) {

      if (
        variableNames[col] ===
        basicVar
      ) {
        continue;
      }

      const coeff =
        tableau[row][col];

      if (
        Math.abs(coeff) < EPS
      ) {
        continue;
      }

      result += buildTerm(
        coeff,
        variableNames[col]
      );
    }

    result += "\n";
  }

  return result;
}

function buildTerm(
  coeff,
  variable
) {

  const value =
    -coeff;

  const sign =
    value >= 0
      ? " + "
      : " - ";

  const absValue =
    Math.abs(value);

  if (
    Math.abs(
      absValue - 1
    ) < EPS
  ) {

    return (
      sign +
      variable
    );
  }

  return (
    sign +
    formatNumber(
      absValue
    ) +
    variable
  );
}