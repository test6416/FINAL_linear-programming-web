export function constraintToString(
  constraint
) {

  let text = "";

  constraint.coefficients.forEach(
    (value, index) => {

      if (
        index > 0 &&
        value >= 0
      ) {

        text += " + ";
      }

      if (value < 0) {

        text += " - ";
      }

      text +=
        `${Math.abs(value)}x${index + 1}`;
    }
  );

  text +=
    ` ${constraint.sign} `;

  text += constraint.rhs;

  return text;
}

export function evaluateConstraint(
  constraint,
  point
) {

  let lhs = 0;

  for (
    let i = 0;
    i < constraint.coefficients.length;
    i++
  ) {

    lhs +=
      constraint.coefficients[i] *
      point[i];
  }

  return lhs;
}

export function satisfiesConstraint(
  constraint,
  point,
  epsilon = 1e-9
) {

  const lhs =
    evaluateConstraint(
      constraint,
      point
    );

  if (constraint.sign === "<=") {

    return lhs <= constraint.rhs + epsilon;
  }

  if (constraint.sign === ">=") {

    return lhs >= constraint.rhs - epsilon;
  }

  if (constraint.sign === "=") {

    return (
      Math.abs(lhs - constraint.rhs) <
      epsilon
    );
  }

  return false;
}