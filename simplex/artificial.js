/**
 * Xác định các ràng buộc cần biến nhân tạo
 */
export function addArtificialVariables(
  problem
) {

  let artificialCount = 0;

  const artificialVariables = [];

  problem.constraints.forEach(
    (
      constraint,
      constraintIndex
    ) => {

      if (
        constraint.sign === ">="
        ||
        constraint.sign === "="
      ) {

        artificialCount++;

        artificialVariables.push({

          name:
            `a${artificialCount}`,

          constraintIndex,

          column: null
        });
      }
    }
  );

  return {

    count:
      artificialCount,

    variables:
      artificialVariables
  };
}

/**
 * Kiểm tra một ràng buộc
 * có cần biến nhân tạo không
 */
export function needsArtificial(
  constraint
) {

  return (
    constraint.sign === ">="
    ||
    constraint.sign === "="
  );
}

/**
 * Tạo tên biến nhân tạo
 */
export function buildArtificialNames(
  count
) {

  const names = [];

  for (
    let i = 1;
    i <= count;
    i++
  ) {

    names.push(
      `a${i}`
    );
  }

  return names;
}

/**
 * Lấy danh sách chỉ số
 * các cột artificial
 */
export function getArtificialColumns(
  variableNames
) {

  const columns = [];

  variableNames.forEach(
    (
      name,
      index
    ) => {

      if (
        name.startsWith("a")
      ) {

        columns.push(
          index
        );
      }
    }
  );

  return columns;
}

/**
 * Kiểm tra tableau
 * còn biến artificial hay không
 */
export function hasArtificialVariables(
  variableNames
) {

  return variableNames.some(
    name =>
      name.startsWith("a")
  );
}

/**
 * Xóa toàn bộ biến artificial
 * khỏi tableau
 */
export function removeArtificialVariables(
  tableau,
  variableNames,
  basis
) {

  const artificialColumns =
    getArtificialColumns(
      variableNames
    );

  artificialColumns
    .sort(
      (a, b) => b - a
    )
    .forEach(
      column => {

        tableau.forEach(
          row =>
            row.splice(
              column,
              1
            )
        );

        variableNames.splice(
          column,
          1
        );

        for (
          let i = 0;
          i < basis.length;
          i++
        ) {

          if (
            basis[i] > column
          ) {

            basis[i]--;
          }
        }
      }
    );

  return {

    tableau,

    variableNames,

    basis
  };
}