import {
  computeFeasibleRegion
} from "./feasibleRegion.js";

import {
  computeVertices
} from "./vertices.js";

export function drawGraph2D(
  containerId,
  problem,
  solution = null
) {

  const container =
    document.getElementById(containerId);

  if (!container) {
    return;
  }

  const range =
    computeRange(problem);

  const feasibleRegion =
    computeFeasibleRegion(problem);

  const vertices =
    computeVertices(problem);

  const traces = [];

  problem.constraints.forEach(
    (constraint, index) => {

      traces.push(
        buildConstraintTrace(
          constraint,
          index,
          range
        )
      );
    }
  );

  if (feasibleRegion.length >= 3) {

    traces.push({
      x: feasibleRegion.map(p => p.x),
      y: feasibleRegion.map(p => p.y),

      fill: "toself",

      type: "scatter",

      mode: "lines",

      name: "Miền nghiệm",

      opacity: 0.3
    });
  }

  traces.push({

    x: vertices.map(v => v.x),

    y: vertices.map(v => v.y),

    mode: "markers",

    type: "scatter",

    name: "Đỉnh"
  });

  if (
    solution &&
    solution.length >= 2
  ) {

    traces.push({

      x: [solution[0]],

      y: [solution[1]],

      mode: "markers+text",

      type: "scatter",

      text: ["OPT"],

      textposition:
        "top center",

      marker: {
        size: 12
      },

      name:
        "Nghiệm tối ưu"
    });
  }

  const layout = {

    title:
      "Miền nghiệm khả thi",

    xaxis: {
      title: "x1",
      zeroline: true
    },

    yaxis: {
      title: "x2",
      zeroline: true
    },

    hovermode:
      "closest",

    showlegend: true
  };

  Plotly.newPlot(
    container,
    traces,
    layout
  );
}

function computeRange(
  problem
) {

  let maxValue = 10;

  problem.constraints.forEach(
    c => {

      maxValue = Math.max(
        maxValue,
        Math.abs(c.rhs)
      );
    }
  );

  return maxValue * 1.5;
}

function buildConstraintTrace(
  constraint,
  index,
  range
) {

  const a =
    constraint.coefficients[0];

  const b =
    constraint.coefficients[1];

  const c =
    constraint.rhs;

  if (
    Math.abs(b)
    < 1e-9
  ) {

    return {

      x: [
        c / a,
        c / a
      ],

      y: [
        -range,
        range
      ],

      mode: "lines",

      type: "scatter",

      name:
        `RB ${index + 1}`
    };
  }

  const x = [];
  const y = [];

  for (
    let xi = -range;
    xi <= range;
    xi += range / 100
  ) {

    x.push(xi);

    y.push(
      (c - a * xi) / b
    );
  }

  return {

    x,
    y,

    mode: "lines",

    type: "scatter",

    name:
      `RB ${index + 1}`
  };
}