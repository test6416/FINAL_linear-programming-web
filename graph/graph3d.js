const EPS = 1e-10;

export function drawGraph3D(
  containerId,
  problem,
  solution = null
) {

  const container =
    document.getElementById(
      containerId
    );

  if (!container) {

    throw new Error(
      "Không tìm thấy vùng hiển thị đồ thị."
    );
  }

  if (
    problem.objective.length !== 3
  ) {

    container.innerHTML =
      "Chỉ hỗ trợ bài toán 3 biến.";

    return;
  }

  const traces = [];

  const maxValue =
    estimateAxisLimit(problem);

  problem.constraints.forEach(
    (constraint, index) => {

      const surface =
        buildPlaneTrace(
          constraint,
          index,
          maxValue
        );

      if (surface) {
        traces.push(surface);
      }
    }
  );

  if (
    solution &&
    solution.length >= 3
  ) {

    traces.push({

      x: [solution[0]],

      y: [solution[1]],

      z: [solution[2]],

      type: "scatter3d",

      mode: "markers+text",

      text: ["Tối ưu"],

      textposition:
        "top center",

      marker: {
        size: 6
      },

      name:
        "Nghiệm tối ưu"
    });
  }

  const layout = {

    title:
      "Miền nghiệm khả thi 3D",

    scene: {

      xaxis: {
        title: "x1",
        range: [0, maxValue]
      },

      yaxis: {
        title: "x2",
        range: [0, maxValue]
      },

      zaxis: {
        title: "x3",
        range: [0, maxValue]
      }
    },

    showlegend: true
  };

  Plotly.newPlot(
    container,
    traces,
    layout,
    {
      responsive: true
    }
  );
}

function buildPlaneTrace(
  constraint,
  index,
  limit
) {

  const a =
    constraint.coefficients[0];

  const b =
    constraint.coefficients[1];

  const c =
    constraint.coefficients[2];

  const rhs =
    constraint.rhs;

  if (
    Math.abs(c) < EPS
  ) {

    return null;
  }

  const x = [];
  const y = [];
  const z = [];

  const grid = 20;

  for (
    let i = 0;
    i <= grid;
    i++
  ) {

    x[i] = [];
    y[i] = [];
    z[i] = [];

    for (
      let j = 0;
      j <= grid;
      j++
    ) {

      const xi =
        limit * i / grid;

      const yi =
        limit * j / grid;

      const zi =
        (
          rhs
          - a * xi
          - b * yi
        ) / c;

      x[i][j] = xi;
      y[i][j] = yi;

      z[i][j] =
        zi >= 0
          ? zi
          : null;
    }
  }

  return {

    x,
    y,
    z,

    type: "surface",

    opacity: 0.5,

    showscale: false,

    name:
      `Ràng buộc ${index + 1}`
  };
}

function estimateAxisLimit(
  problem
) {

  let maxValue = 10;

  problem.constraints.forEach(
    constraint => {

      maxValue =
        Math.max(
          maxValue,
          Math.abs(
            constraint.rhs
          )
        );
    }
  );

  return maxValue * 1.2;
}