const EPS = 1e-9;

export function chooseEnteringVariable(
  tableau
) {

  const lastRow =
    tableau[tableau.length - 1];

  let minValue = 0;

  let pivotCol = -1;

  for (
    let j = 0;
    j < lastRow.length - 1;
    j++
  ) {

    if (
      lastRow[j] <
      minValue - EPS
    ) {

      minValue =
        lastRow[j];

      pivotCol = j;
    }
  }

  return pivotCol;
}

export function performPivot(
  tableau,
  pivotRow,
  pivotCol
) {

  const pivot =
    tableau[pivotRow][pivotCol];

  if (
    Math.abs(pivot) < EPS
  ) {

    throw new Error(
      "Pivot gần bằng 0."
    );
  }

  const rows =
    tableau.length;

  const cols =
    tableau[0].length;

  // =====================
  // Chuẩn hóa dòng pivot
  // =====================

  for (
    let j = 0;
    j < cols;
    j++
  ) {

    tableau[pivotRow][j] /=
      pivot;

    if (
      Math.abs(
        tableau[pivotRow][j]
      ) < EPS
    ) {

      tableau[pivotRow][j] = 0;
    }
  }

  // =====================
  // Khử cột pivot
  // =====================

  for (
    let i = 0;
    i < rows;
    i++
  ) {

    if (
      i === pivotRow
    ) continue;

    const factor =
      tableau[i][pivotCol];

    if (
      Math.abs(factor)
      < EPS
    ) {

      continue;
    }

    for (
      let j = 0;
      j < cols;
      j++
    ) {

      tableau[i][j] -=
        factor *
        tableau[pivotRow][j];

      if (
        Math.abs(
          tableau[i][j]
        ) < EPS
      ) {

        tableau[i][j] = 0;
      }
    }
  }
}