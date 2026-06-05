const EPS = 1e-9;

export function ratioTest(
  tableau,
  enteringCol
) {

  let minRatio =
    Infinity;

  let pivotRow =
    -1;

  const rhsCol =
    tableau[0].length - 1;

  for (
    let i = 0;
    i < tableau.length - 1;
    i++
  ) {

    const coeff =
      tableau[i][enteringCol];

    if (
      coeff <= EPS
    ) {

      continue;
    }

    let rhs =
      tableau[i][rhsCol];

    if (
      Math.abs(rhs)
      < EPS
    ) {

      rhs = 0;
    }

    const ratio =
      rhs / coeff;

    if (
      ratio <
      minRatio - EPS
    ) {

      minRatio =
        ratio;

      pivotRow =
        i;
    }

    // Tie-break:
    // chọn dòng có chỉ số nhỏ hơn

    else if (

      Math.abs(
        ratio - minRatio
      ) < EPS &&

      (
        pivotRow === -1 ||
        i < pivotRow
      )

    ) {

      pivotRow =
        i;
    }
  }

  return pivotRow;
}