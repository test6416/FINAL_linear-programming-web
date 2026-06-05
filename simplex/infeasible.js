export function isInfeasible(
  phaseOneValue,
  tolerance = 1e-8
) {

  return Math.abs(
    phaseOneValue
  ) > tolerance;
}

export function infeasibleMessage() {

  return (
    "Bài toán vô nghiệm " +
    "(miền khả thi rỗng)."
  );
}