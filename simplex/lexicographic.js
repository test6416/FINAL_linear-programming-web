export function lexicographicCompare(
  rowA,
  rowB
) {

  const length =
    Math.min(
      rowA.length,
      rowB.length
    );

  for (let i = 0; i < length; i++) {

    if (rowA[i] < rowB[i]) {
      return -1;
    }

    if (rowA[i] > rowB[i]) {
      return 1;
    }
  }

  return 0;
}

export function lexicographicRatioTest(
  tableau,
  enteringCol
) {

  const candidates = [];

  for (
    let i = 0;
    i < tableau.length - 1;
    i++
  ) {

    const coeff =
      tableau[i][enteringCol];

    if (coeff > 0) {

      const normalized =
        tableau[i].map(
          v => v / coeff
        );

      candidates.push({
        row: i,
        vector: normalized
      });
    }
  }

  if (candidates.length === 0) {
    return -1;
  }

  let best =
    candidates[0];

  for (
    let i = 1;
    i < candidates.length;
    i++
  ) {

    const cmp =
      lexicographicCompare(
        candidates[i].vector,
        best.vector
      );

    if (cmp < 0) {

      best = candidates[i];
    }
  }

  return best.row;
}