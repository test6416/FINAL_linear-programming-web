export function createMatrix(
  rows,
  cols,
  fill = 0
) {

  return Array.from(
    { length: rows },
    () => Array(cols).fill(fill)
  );
}

export function cloneMatrix(matrix) {

  return matrix.map(row => [...row]);
}

export function identityMatrix(n) {

  const I =
    createMatrix(n, n);

  for (let i = 0; i < n; i++) {

    I[i][i] = 1;
  }

  return I;
}

export function transpose(matrix) {

  return matrix[0].map(
    (_, col) =>
      matrix.map(row => row[col])
  );
}

export function multiplyMatrices(
  A,
  B
) {

  const rowsA = A.length;
  const colsA = A[0].length;

  const rowsB = B.length;
  const colsB = B[0].length;

  if (colsA !== rowsB) {

    throw new Error(
      "Không thể nhân ma trận."
    );
  }

  const result =
    createMatrix(rowsA, colsB);

  for (let i = 0; i < rowsA; i++) {

    for (let j = 0; j < colsB; j++) {

      let sum = 0;

      for (let k = 0; k < colsA; k++) {

        sum +=
          A[i][k] * B[k][j];
      }

      result[i][j] = sum;
    }
  }

  return result;
}

export function multiplyMatrixVector(
  A,
  v
) {

  return A.map(row =>
    row.reduce(
      (sum, value, index) =>
        sum + value * v[index],
      0
    )
  );
}

export function determinant(matrix) {

  const n = matrix.length;

  if (n !== matrix[0].length) {

    throw new Error(
      "Ma trận phải vuông."
    );
  }

  if (n === 1) {
    return matrix[0][0];
  }

  if (n === 2) {

    return (
      matrix[0][0] *
      matrix[1][1] -
      matrix[0][1] *
      matrix[1][0]
    );
  }

  let det = 0;

  for (let j = 0; j < n; j++) {

    const subMatrix =
      matrix
        .slice(1)
        .map(row =>
          row.filter(
            (_, index) => index !== j
          )
        );

    det +=
      ((j % 2 === 0) ? 1 : -1) *
      matrix[0][j] *
      determinant(subMatrix);
  }

  return det;
}