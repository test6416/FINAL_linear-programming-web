export function gcd(a, b) {

  a = Math.abs(a);
  b = Math.abs(b);

  while (b !== 0) {

    const t = b;

    b = a % b;

    a = t;
  }

  return a;
}

export function decimalToFraction(
  value,
  tolerance = 1e-10
) {

  if (Number.isInteger(value)) {

    return `${value}`;
  }

  let numerator = 1;
  let denominator = 1;

  let error =
    Math.abs(
      value - numerator / denominator
    );

  for (
    let d = 1;
    d <= 10000;
    d++
  ) {

    const n =
      Math.round(value * d);

    const currentError =
      Math.abs(value - n / d);

    if (currentError < error) {

      numerator = n;
      denominator = d;
      error = currentError;
    }

    if (error < tolerance) {
      break;
    }
  }

  const divisor =
    gcd(numerator, denominator);

  numerator /= divisor;
  denominator /= divisor;

  return `${numerator}/${denominator}`;
}

export function fractionToDecimal(
  fraction
) {

  const parts =
    fraction.split("/");

  if (parts.length !== 2) {

    return Number(fraction);
  }

  return (
    Number(parts[0]) /
    Number(parts[1])
  );
}

export function formatFraction(
  value,
  useFraction = false
) {

  if (!useFraction) {

    return Number(value).toFixed(6);
  }

  return decimalToFraction(value);
}