export function buildObjectiveLine(
  objective,
  zValue,
  xRange = [0, 20]
) {

  const a = objective[0];
  const b = objective[1];

  const x = [];
  const y = [];

  for (
    let xi = xRange[0];
    xi <= xRange[1];
    xi += 0.5
  ) {

    x.push(xi);

    if (Math.abs(b) > 1e-10) {

      y.push(
        (zValue - a * xi) / b
      );

    } else {

      y.push(null);
    }
  }

  return {

    x,
    y,

    mode: "lines",

    type: "scatter",

    line: {
      dash: "dash"
    },

    name:
      `Hàm mục tiêu Z=${zValue}`
  };
}

export function objectiveValueAtPoint(
  objective,
  point
) {

  let value = 0;

  for (
    let i = 0;
    i < objective.length;
    i++
  ) {

    value +=
      objective[i] * point[i];
  }

  return value;
}