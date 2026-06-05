const EPSILON = 1e-10;

export function presolve(
  problem
) {

  const cleaned =
    JSON.parse(
      JSON.stringify(
        problem
      )
    );

  validateProblem(
    cleaned
  );

  normalizeCoefficients(
    cleaned
  );

  removeZeroConstraints(
    cleaned
  );

  normalizeRHS(
    cleaned
  );

  removeUnusedVariables(
    cleaned
  );

  return cleaned;
}

/**
 * Kiểm tra dữ liệu đầu vào
 */
function validateProblem(
  problem
) {

  if (
    !problem.objective
    ||
    !Array.isArray(
      problem.objective
    )
  ) {

    throw new Error(
      "Thiếu hàm mục tiêu."
    );
  }

  if (
    !problem.constraints
    ||
    !Array.isArray(
      problem.constraints
    )
  ) {

    throw new Error(
      "Thiếu ràng buộc."
    );
  }

  const n =
    problem.objective.length;

  problem.constraints.forEach(
    (
      constraint,
      index
    ) => {

      if (
        constraint
          .coefficients
          .length !== n
      ) {

        throw new Error(

          `Ràng buộc ${
            index + 1
          } có số biến không khớp.`
        );
      }
    }
  );
}

/**
 * Chuẩn hóa số gần 0
 */
function normalizeCoefficients(
  problem
) {

  problem.objective =
    problem.objective.map(
      value =>

        Math.abs(value)
        < EPSILON

          ? 0

          : value
    );

  problem.constraints.forEach(
    constraint => {

      constraint.coefficients =
        constraint.coefficients.map(
          value =>

            Math.abs(value)
            < EPSILON

              ? 0

              : value
        );

      if (
        Math.abs(
          constraint.rhs
        ) < EPSILON
      ) {

        constraint.rhs = 0;
      }
    }
  );
}

/**
 * Loại bỏ ràng buộc toàn 0
 */
function removeZeroConstraints(
  problem
) {

  problem.constraints =
    problem.constraints.filter(
      constraint => {

        const allZero =
          constraint.coefficients.every(
            value =>
              Math.abs(
                value
              ) < EPSILON
          );

        if (
          !allZero
        ) {

          return true;
        }

        const rhs =
          constraint.rhs;

        // 0 = 0

        if (
          constraint.sign === "="
          &&
          Math.abs(rhs)
          < EPSILON
        ) {

          return false;
        }

        // 0 <= 0

        if (
          constraint.sign === "<="
          &&
          rhs >= 0
        ) {

          return false;
        }

        // 0 >= 0

        if (
          constraint.sign === ">="
          &&
          rhs <= 0
        ) {

          return false;
        }

        throw new Error(
          "Phát hiện ràng buộc vô nghiệm."
        );
      }
    );
}

/**
 * Chuẩn hóa RHS >= 0
 */
function normalizeRHS(
  problem
) {

  problem.constraints.forEach(
    constraint => {

      if (
        constraint.rhs >= 0
      ) {

        return;
      }

      constraint.coefficients =
        constraint.coefficients.map(
          value =>
            -value
        );

      constraint.rhs =
        -constraint.rhs;

      if (
        constraint.sign
        === "<="
      ) {

        constraint.sign =
          ">=";
      }

      else if (
        constraint.sign
        === ">="
      ) {

        constraint.sign =
          "<=";
      }
    }
  );
}

/**
 * Loại bỏ biến không xuất hiện
 */
function removeUnusedVariables(
  problem
) {

  const n =
    problem.objective.length;

  const used =
    new Array(n)
      .fill(false);

  problem.constraints.forEach(
    constraint => {

      constraint.coefficients.forEach(
        (
          value,
          index
        ) => {

          if (
            Math.abs(value)
            > EPSILON
          ) {

            used[index] =
              true;
          }
        }
      );
    }
  );

  const mapping = [];

  for (
    let i = 0;
    i < n;
    i++
  ) {

    if (
      used[i]
    ) {

      mapping.push(i);
    }
  }

  if (
    mapping.length === n
  ) {

    return;
  }

  problem.objective =
    mapping.map(
      i =>
        problem.objective[i]
    );

  problem.constraints.forEach(
    constraint => {

      constraint.coefficients =
        mapping.map(
          i =>
            constraint
              .coefficients[i]
        );
    }
  );

  if (
    problem.variableSigns
  ) {

    problem.variableSigns =
      mapping.map(
        i =>
          problem
            .variableSigns[i]
      );
  }
}