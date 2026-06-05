export function addVectors(a, b) {

  validateDimensions(a, b);

  return a.map(
    (v, i) => v + b[i]
  );
}

export function subtractVectors(a, b) {

  validateDimensions(a, b);

  return a.map(
    (v, i) => v - b[i]
  );
}

export function scalarMultiply(
  scalar,
  vector
) {

  return vector.map(
    v => scalar * v
  );
}

export function dotProduct(a, b) {

  validateDimensions(a, b);

  return a.reduce(
    (sum, v, i) =>
      sum + v * b[i],
    0
  );
}

export function norm(vector) {

  return Math.sqrt(
    dotProduct(vector, vector)
  );
}

export function normalize(vector) {

  const length = norm(vector);

  if (length === 0) {

    throw new Error(
      "Không thể chuẩn hóa vector 0."
    );
  }

  return scalarMultiply(
    1 / length,
    vector
  );
}

function validateDimensions(a, b) {

  if (a.length !== b.length) {

    throw new Error(
      "Vector không cùng kích thước."
    );
  }
}