export function isUnbounded(
  tableau,
  enteringCol
) {

  for (
    let i = 0;
    i < tableau.length - 1;
    i++
  ) {

    if (
      tableau[i][enteringCol] > 0
    ) {

      return false;
    }
  }

  return true;
}

export function unboundedMessage() {

  return (
    "Bài toán không bị chặn."
  );
}