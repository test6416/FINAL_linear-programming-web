export function buildTableau(
  problem
) {

  const {
    objective,
    constraints,
    variableNames: inputNames
  } = problem;

  const tableau = [];

  const basis = [];

  const variableNames =
    [...inputNames];

  const variableTypes = [];

  for (
    let i = 0;
    i < objective.length;
    i++
  ) {

    variableTypes.push(
      "decision"
    );
  }

  const artificialColumns = [];
  const slackColumns = [];
  const surplusColumns = [];

  let currentCol =
    objective.length;

  constraints.forEach(
    (
      constraint,
      rowIndex
    ) => {

      const row =
        [...constraint.coefficients];

      while (
        row.length < currentCol
      ) {

        row.push(0);
      }

      // <=

      if (
        constraint.sign === "<="
      ) {

        row.push(1);

        variableNames.push(
          `w${rowIndex + 1}`
        );

        variableTypes.push(
          "slack"
        );

        slackColumns.push(
          currentCol
        );

        basis.push(
          currentCol
        );

        currentCol++;
      }

      // >=

      else if (
        constraint.sign === ">="
      ) {

        row.push(-1);

        variableNames.push(
          `e${rowIndex + 1}`
        );

        variableTypes.push(
          "surplus"
        );

        surplusColumns.push(
          currentCol
        );

        currentCol++;

        row.push(1);

        variableNames.push(
          `a${rowIndex + 1}`
        );

        variableTypes.push(
          "artificial"
        );

        artificialColumns.push(
          currentCol
        );

        basis.push(
          currentCol
        );

        currentCol++;
      }

      // =

      else {

        row.push(1);

        variableNames.push(
          `a${rowIndex + 1}`
        );

        variableTypes.push(
          "artificial"
        );

        artificialColumns.push(
          currentCol
        );

        basis.push(
          currentCol
        );

        currentCol++;
      }

      while (
        row.length < currentCol
      ) {

        row.push(0);
      }

      row.push(
        Number(
          constraint.rhs
        )
      );

      tableau.push(
        row
      );
    }
  );

  const totalCols =
    currentCol;

  tableau.forEach(
    row => {

      while (
        row.length <
        totalCols + 1
      ) {

        row.splice(
          row.length - 1,
          0,
          0
        );
      }
    }
  );

  const objectiveRow =
    new Array(
      totalCols + 1
    ).fill(0);

  for (
    let i = 0;
    i < objective.length;
    i++
  ) {

    objectiveRow[i] =
      -Number(
        objective[i]
      );
  }

  tableau.push(
    objectiveRow
  );

  return {

    tableau,

    basis,

    variableNames,

    variableTypes,

    artificialColumns,

    slackColumns,

    surplusColumns
  };
}