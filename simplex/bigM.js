export const BIG_M = 1000000;

/**
 * Áp dụng phương pháp Big-M
 *
 * tableau      : bảng đơn hình
 * basis        : cơ sở hiện tại
 * variableNames: tên các biến
 * M            : giá trị Big-M
 */
export function applyBigM(
  tableau,
  basis,
  variableNames,
  M = BIG_M
) {

  const lastRow =
    tableau[
      tableau.length - 1
    ];

  // =====================
  // Đưa hệ số -M vào
  // các biến artificial
  // =====================

  variableNames.forEach(
    (name, col) => {

      if (
        isArtificial(name)
      ) {

        lastRow[col] = -M;
      }
    }
  );

  // =====================
  // Canonical hóa
  //
  // Nếu artificial đang
  // nằm trong basis
  // thì khử khỏi
  // objective row
  // =====================

  for (
    let row = 0;
    row < basis.length;
    row++
  ) {

    const basicCol =
      basis[row];

    const basicName =
      variableNames[
        basicCol
      ];

    if (
      !isArtificial(
        basicName
      )
    ) {

      continue;
    }

    for (
      let col = 0;
      col < lastRow.length;
      col++
    ) {

      lastRow[col] +=
        M *
        tableau[row][col];
    }
  }

  cleanNumericalNoise(
    lastRow
  );

  return tableau;
}

/**
 * Kiểm tra biến artificial
 */
export function isArtificial(
  variableName
) {

  return (
    typeof variableName
    === "string"
    &&
    variableName.startsWith(
      "a"
    )
  );
}

/**
 * Danh sách cột artificial
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
        isArtificial(name)
      ) {

        columns.push(index);
      }
    }
  );

  return columns;
}

/**
 * Có artificial hay không
 */
export function hasArtificialVariables(
  variableNames
) {

  return variableNames.some(
    name =>
      isArtificial(name)
  );
}

/**
 * Khử nhiễu số học
 */
export function cleanNumericalNoise(
  row,
  tolerance = 1e-10
) {

  for (
    let i = 0;
    i < row.length;
    i++
  ) {

    if (
      Math.abs(row[i])
      < tolerance
    ) {

      row[i] = 0;
    }
  }
}

/**
 * Tạo objective row Big-M
 */
export function buildBigMObjective(
  variableNames,
  objective,
  M = BIG_M
) {

  const row =
    new Array(
      variableNames.length + 1
    ).fill(0);

  for (
    let i = 0;
    i < objective.length;
    i++
  ) {

    row[i] =
      -objective[i];
  }

  variableNames.forEach(
    (
      name,
      col
    ) => {

      if (
        isArtificial(name)
      ) {

        row[col] = -M;
      }
    }
  );

  return row;
}