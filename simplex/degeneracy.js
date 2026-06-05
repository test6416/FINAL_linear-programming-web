export function detectDegeneracy(
  tableau,
  basis
) {

  const degenerateRows = [];

  for (
    let i = 0;
    i < basis.length;
    i++
  ) {

    const rhs =
      tableau[i][
        tableau[i].length - 1
      ];

    if (Math.abs(rhs) < 1e-10) {

      degenerateRows.push(i);
    }
  }

  return {
    isDegenerate:
      degenerateRows.length > 0,
    rows: degenerateRows
  };
}