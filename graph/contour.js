export function createObjectiveContours(
  objective,
  levels = [10, 20, 30, 40]
) {

  const traces = [];

  levels.forEach(level => {

    traces.push(
      createContourLine(
        objective,
        level
      )
    );
  });

  return traces;
}

function createContourLine(
  objective,
  level
) {

  const a = objective[0];
  const b = objective[1];

  const x = [];
  const y = [];

  for (
    let xi = 0;
    xi <= 20;
    xi += 0.5
  ) {

    x.push(xi);

    if (Math.abs(b) > 1e-10) {

      y.push(
        (level - a * xi) / b
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

    opacity: 0.5,

    line: {
      width: 1
    },

    name:
      `Contour Z=${level}`
  };
}