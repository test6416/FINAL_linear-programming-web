const EPS = 1e-8;

export function computeVertices(problem) {

  if (
    !problem ||
    !problem.constraints ||
    problem.objective.length !== 2
  ) {
    return [];
  }

  const constraints =
    problem.constraints;

  const vertices = [];

  // ===================================
  // Giao điểm giữa mọi cặp ràng buộc
  // ===================================

  for (
    let i = 0;
    i < constraints.length;
    i++
  ) {

    for (
      let j = i + 1;
      j < constraints.length;
      j++
    ) {

      const point =
        intersection(
          constraints[i],
          constraints[j]
        );

      if (
        point &&
        isFinite(point.x) &&
        isFinite(point.y)
      ) {

        vertices.push(point);
      }
    }
  }

  // ===================================
  // Giao với Ox
  // ===================================

  constraints.forEach(
    constraint => {

      const a =
        constraint.coefficients[0];

      const rhs =
        constraint.rhs;

      if (
        Math.abs(a) > EPS
      ) {

        vertices.push({
          x: rhs / a,
          y: 0
        });
      }
    }
  );

  // ===================================
  // Giao với Oy
  // ===================================

  constraints.forEach(
    constraint => {

      const b =
        constraint.coefficients[1];

      const rhs =
        constraint.rhs;

      if (
        Math.abs(b) > EPS
      ) {

        vertices.push({
          x: 0,
          y: rhs / b
        });
      }
    }
  );

  // ===================================
  // Gốc tọa độ
  // ===================================

  vertices.push({
    x: 0,
    y: 0
  });

  // ===================================
  // Chỉ giữ đỉnh khả thi
  // ===================================

  const feasibleVertices =
    vertices.filter(
      point =>
        satisfiesAllConstraints(
          point,
          constraints
        )
    );

  return removeDuplicates(
    feasibleVertices
  );
}

/* ===================================
   Giao điểm 2 đường thẳng
=================================== */

function intersection(
  c1,
  c2
) {

  const a1 =
    c1.coefficients[0];

  const b1 =
    c1.coefficients[1];

  const r1 =
    c1.rhs;

  const a2 =
    c2.coefficients[0];

  const b2 =
    c2.coefficients[1];

  const r2 =
    c2.rhs;

  const det =
    a1 * b2 -
    a2 * b1;

  if (
    Math.abs(det) < EPS
  ) {

    return null;
  }

  const x =
    (
      r1 * b2 -
      r2 * b1
    ) / det;

  const y =
    (
      a1 * r2 -
      a2 * r1
    ) / det;

  return {
    x,
    y
  };
}

/* ===================================
   Kiểm tra khả thi
=================================== */

function satisfiesAllConstraints(
  point,
  constraints
) {

  for (
    const c
    of constraints
  ) {

    const lhs =
      c.coefficients[0] *
      point.x +

      c.coefficients[1] *
      point.y;

    if (
      c.sign === "<=" &&
      lhs > c.rhs + EPS
    ) {
      return false;
    }

    if (
      c.sign === ">=" &&
      lhs < c.rhs - EPS
    ) {
      return false;
    }

    if (
      c.sign === "=" &&
      Math.abs(
        lhs - c.rhs
      ) > EPS
    ) {
      return false;
    }
  }

  return true;
}

/* ===================================
   Loại bỏ điểm trùng
=================================== */

function removeDuplicates(
  points
) {

  const unique = [];

  for (
    const p of points
  ) {

    const exists =
      unique.some(
        q =>

          Math.abs(
            p.x - q.x
          ) < EPS &&

          Math.abs(
            p.y - q.y
          ) < EPS
      );

    if (!exists) {

      unique.push({
        x:
          Math.abs(p.x) < EPS
            ? 0
            : p.x,

        y:
          Math.abs(p.y) < EPS
            ? 0
            : p.y
      });
    }
  }

  return unique;
}