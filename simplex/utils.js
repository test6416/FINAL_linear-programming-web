export function round(
  value,
  digits = 6
) {

  return Number(
    value.toFixed(digits)
  );
}

export function nearlyEqual(
  a,
  b,
  epsilon = 1e-9
) {

  return (
    Math.abs(a - b) < epsilon
  );
}

export function deepClone(obj) {

  return JSON.parse(
    JSON.stringify(obj)
  );
}

export function maxIndex(array) {

  let max = array[0];
  let index = 0;

  for (let i = 1; i < array.length; i++) {

    if (array[i] > max) {

      max = array[i];
      index = i;
    }
  }

  return index;
}

export function minIndex(array) {

  let min = array[0];
  let index = 0;

  for (let i = 1; i < array.length; i++) {

    if (array[i] < min) {

      min = array[i];
      index = i;
    }
  }

  return index;
}

export function formatNumber(
  value,
  digits = 6
) {

  if (
    Math.abs(value) < 1e-12
  ) {

    return "0";
  }

  return Number(value)
    .toFixed(digits);
}

export function generateVariableNames(
  prefix,
  count
) {

  return Array.from(
    { length: count },
    (_, i) =>
      `${prefix}${i + 1}`
  );
}