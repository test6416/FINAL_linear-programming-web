import {
  computeVertices
} from "./vertices.js";

const EPS = 1e-8;

export function computeFeasibleRegion(
  problem
) {

  if (
    problem.objective.length !== 2
  ) {

    return [];
  }

  const vertices =
    computeVertices(problem);

  if (
    !vertices ||
    vertices.length === 0
  ) {

    return [];
  }

  // =====================
  // Lọc điểm khả thi
  // =====================

  const feasible =
    vertices.filter(
      point =>
        satisfiesAllConstraints(
          point,
          problem.constraints
        )
    );

  if (
    feasible.length === 0
  ) {

    return [];
  }

  // =====================
  // Loại bỏ đỉnh trùng
  // =====================

  const unique = [];

  feasible.forEach(point => {

    const existed =
      unique.some(
        p =>
          Math.abs(
            p.x - point.x
          ) < EPS
          &&
          Math.abs(
            p.y - point.y
          ) < EPS
      );

    if (!existed) {

      unique.push(point);
    }
  });

  if (
    unique.length <= 2
  ) {

    return unique;
  }

  // =====================
  // Tâm đa giác
  // =====================

  const centerX =
    unique.reduce(
      (sum, p) =>
        sum + p.x,
      0
    ) / unique.length;

  const centerY =
    unique.reduce(
      (sum, p) =>
        sum + p.y,
      0
    ) / unique.length;

  // =====================
  // Sắp xếp theo góc
  // =====================

  unique.sort(
    (a, b) => {

      const angleA =
        Math.atan2(
          a.y - centerY,
          a.x - centerX
        );

      const angleB =
        Math.atan2(
          b.y - centerY,
          b.x - centerX
        );

      return angleA - angleB;
    }
  );

  return unique;
}

function satisfiesAllConstraints(
  point,
  constraints
) {

  for (
    const c of constraints
  ) {

    const lhs =
      c.coefficients[0] * point.x +
      c.coefficients[1] * point.y;

    switch (c.sign) {

      case "<=":

        if (
          lhs > c.rhs + EPS
        ) {
          return false;
        }

        break;

      case ">=":

        if (
          lhs < c.rhs - EPS
        ) {
          return false;
        }

        break;

      case "=":

        if (
          Math.abs(
            lhs - c.rhs
          ) > EPS
        ) {
          return false;
        }

        break;
    }
  }

  return true;
}