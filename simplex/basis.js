/**
 * Tạo danh sách tên biến
 */
export function buildVariableNames(
  decisionCount,
  slackCount = 0,
  artificialCount = 0
) {

  const names = [];

  for (let i = 1; i <= decisionCount; i++) {
    names.push(`x${i}`);
  }

  for (let i = 1; i <= slackCount; i++) {
    names.push(`w${i}`);
  }

  for (let i = 1; i <= artificialCount; i++) {
    names.push(`a${i}`);
  }

  return names;
}

/**
 * Tạo cơ sở ban đầu
 */
export function buildInitialBasis(
  decisionCount,
  slackCount,
  artificialCount = 0
) {

  const basis = [];

  for (let i = 0; i < slackCount; i++) {
    basis.push(decisionCount + i);
  }

  for (let i = 0; i < artificialCount; i++) {
    basis.push(
      decisionCount +
      slackCount +
      i
    );
  }

  return basis;
}

/**
 * Cập nhật cơ sở sau pivot
 */
export function updateBasis(
  basis,
  pivotRow,
  enteringColumn
) {

  basis[pivotRow] =
    enteringColumn;

  return basis;
}

/**
 * Lấy nghiệm từ tableau
 */
export function extractSolution(
  tableau,
  basis,
  variableNames,
  originalVariables = null
) {

  const rhsCol =
    tableau[0].length - 1;

  const values = {};

  // khởi tạo tất cả = 0

  for (
    let i = 0;
    i < variableNames.length;
    i++
  ) {

    values[
      variableNames[i]
    ] = 0;
  }

  // đọc các biến cơ sở

  for (
    let row = 0;
    row < basis.length;
    row++
  ) {

    const variableIndex =
      basis[row];

    if (
      variableIndex < 0 ||
      variableIndex >= variableNames.length
    ) {

      continue;
    }

    let value =
      tableau[row][rhsCol];

    if (
      Math.abs(value)
      < 1e-10
    ) {

      value = 0;
    }

    values[
      variableNames[
        variableIndex
      ]
    ] = value;
  }

  // không cần khôi phục

  if (!originalVariables) {

    return values;
  }

  // khôi phục nghiệm gốc

  const solution = {};

  originalVariables.forEach(
    variable => {

      if (
        variable.type ===
        "normal"
      ) {

        solution[
          variable.original
        ] =
          values[
            variable.name
          ] || 0;
      }

      else if (
        variable.type ===
        "negative"
      ) {

        solution[
          variable.original
        ] =
          -(
            values[
              variable.name
            ] || 0
          );
      }

      else if (
        variable.type ===
        "free"
      ) {

        const plus =
          values[
            variable.plus
          ] || 0;

        const minus =
          values[
            variable.minus
          ] || 0;

        solution[
          variable.original
        ] =
          plus - minus;
      }
    }
  );

  return solution;
}

/**
 * Tên biến cơ sở
 */
export function getBasisNames(
  basis,
  variableNames
) {

  return basis.map(
    index =>
      variableNames[index]
  );
}

/**
 * Kiểm tra biến cơ sở
 */
export function isBasicVariable(
  variableIndex,
  basis
) {

  return basis.includes(
    variableIndex
  );
}

/**
 * Danh sách biến không cơ sở
 */
export function getNonBasicVariables(
  basis,
  variableNames
) {

  const result = [];

  for (
    let i = 0;
    i < variableNames.length;
    i++
  ) {

    if (
      !basis.includes(i)
    ) {

      result.push({
        index: i,
        name:
          variableNames[i]
      });
    }
  }

  return result;
}