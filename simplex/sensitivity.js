export function sensitivityAnalysis(
  tableau,
  basis,
  variableNames
) {

  const lastRow =
    tableau[tableau.length - 1];

  const reducedCosts = [];

  for (
    let j = 0;
    j < lastRow.length - 1;
    j++
  ) {

    reducedCosts.push({
      variable:
        variableNames[j],
      reducedCost:
        Number(lastRow[j].toFixed(6))
    });
  }

  const shadowPrices = [];

  basis.forEach((b, i) => {

    shadowPrices.push({
      basicVariable:
        variableNames[b],
      value:
        Number(
          tableau[i][
            tableau[i].length - 1
          ].toFixed(6)
        )
    });
  });

  return {
    reducedCosts,
    shadowPrices
  };
}