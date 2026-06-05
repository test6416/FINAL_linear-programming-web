import * as math from "mathjs";

export function revisedSimplex(
  A,
  b,
  c,
  basis
) {

  const m = A.length;

  const n = A[0].length;

  const steps = [];

  while (true) {

    const B =
      basis.map(col =>
        A.map(row => row[col])
      );

    const Binv =
      math.inv(
        math.transpose(B)
      );

    const cb =
      basis.map(i => c[i]);

    const lambda =
      math.multiply(cb, Binv);

    let entering = -1;

    let minReduced = 0;

    for (let j = 0; j < n; j++) {

      if (basis.includes(j)) continue;

      const Aj =
        A.map(r => r[j]);

      const reduced =
        c[j] -
        math.multiply(lambda, Aj);

      if (reduced < minReduced) {

        minReduced = reduced;

        entering = j;
      }
    }

    if (entering === -1) {

      return {
        status:
          "Tối ưu",
        basis,
        steps
      };
    }

    const xb =
      math.multiply(Binv, b);

    const direction =
      math.multiply(
        Binv,
        A.map(r => r[entering])
      );

    let theta = Infinity;

    let leavingIndex = -1;

    for (let i = 0; i < m; i++) {

      if (direction[i] > 0) {

        const ratio =
          xb[i] / direction[i];

        if (ratio < theta) {

          theta = ratio;

          leavingIndex = i;
        }
      }
    }

    if (leavingIndex === -1) {

      throw new Error(
        "Bài toán không bị chặn."
      );
    }

    basis[leavingIndex] =
      entering;

    steps.push(
      `Biến vào x${entering + 1}, ` +
      `biến ra vị trí ${leavingIndex}`
    );
  }
}