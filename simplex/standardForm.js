export function toStandardForm(
  problem
) {

  let {
    type,
    objective,
    constraints,
    variableSigns
  } = problem;

  objective =
    [...objective];

  constraints =
    constraints.map(
      c => ({

        coefficients:
          [...c.coefficients],

        sign: c.sign,

        rhs:
          Number(c.rhs)
      })
    );

  // =====================
  // MIN → MAX
  // =====================

  if (type === "min") {

    objective =
      objective.map(
        x => -Number(x)
      );

    type = "max";
  }

  const newObjective = [];

  const variableNames = [];

  const originalVariables =
    [];

  const newConstraints =
    constraints.map(
      c => ({

        coefficients: [],

        sign: c.sign,

        rhs:
          Number(c.rhs)
      })
    );

  // =====================
  // Xử lý dấu biến
  // =====================

  for (
    let i = 0;
    i < objective.length;
    i++
  ) {

    const sign =
      variableSigns[i] ||
      "nneg";

    // x >= 0

    if (
      sign === "nneg"
    ) {

      newObjective.push(
        Number(
          objective[i]
        )
      );

      variableNames.push(
        `x${i + 1}`
      );

      originalVariables.push({
        original: `x${i + 1}`,
        type: "normal",
        name: `x${i + 1}`
      });

      constraints.forEach(
        (c, row) => {

          newConstraints[
            row
          ].coefficients.push(
            Number(
              c.coefficients[i]
            )
          );
        }
      );
    }

    // x <= 0

    else if (
      sign === "npos"
    ) {

      newObjective.push(
        -Number(
          objective[i]
        )
      );

      variableNames.push(
        `x${i + 1}`
      );

      originalVariables.push({
        original: `x${i + 1}`,
        type: "negative",
        name: `x${i + 1}`
      });

      constraints.forEach(
        (c, row) => {

          newConstraints[
            row
          ].coefficients.push(
            -Number(
              c.coefficients[i]
            )
          );
        }
      );
    }

    // x tự do

    else if (
      sign === "free"
    ) {

      const plusIndex =
        newObjective.length;

      const minusIndex =
        plusIndex + 1;

      newObjective.push(
        Number(
          objective[i]
        )
      );

      newObjective.push(
        -Number(
          objective[i]
        )
      );

      variableNames.push(
        `x${i + 1}+`
      );

      variableNames.push(
        `x${i + 1}-`
      );

      originalVariables.push({
        original: `x${i + 1}`,
        type: "free",
        plus: `x${i + 1}+`,
        minus: `x${i + 1}-`
      });

      constraints.forEach(
        (c, row) => {

          newConstraints[
            row
          ].coefficients.push(
            Number(
              c.coefficients[i]
            )
          );

          newConstraints[
            row
          ].coefficients.push(
            -Number(
              c.coefficients[i]
            )
          );
        }
      );
    }
  }

  // =====================
  // RHS âm
  // =====================

  newConstraints.forEach(
    c => {

      if (
        c.rhs < 0
      ) {

        c.coefficients =
          c.coefficients.map(
            value =>
              -value
          );

        c.rhs =
          -c.rhs;

        if (
          c.sign === "<="
        ) {

          c.sign =
            ">=";
        }

        else if (
          c.sign === ">="
        ) {

          c.sign =
            "<=";
        }
      }
    }
  );

  return {

    type,

    objective:
      newObjective,

    constraints:
      newConstraints,

    variableNames,

    originalVariables
  };
}