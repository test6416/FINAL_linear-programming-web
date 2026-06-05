export function createVertexLabels(
  vertices
) {

  return {

    x: vertices.map(v => v.x),

    y: vertices.map(v => v.y),

    mode: "markers+text",

    type: "scatter",

    text:
      vertices.map(
        v =>
          `(${v.x.toFixed(2)}, ${v.y.toFixed(2)})`
      ),

    textposition: "top center",

    marker: {
      size: 8
    },

    name: "Đỉnh"
  };
}

export function createConstraintLabel(
  x,
  y,
  text
) {

  return {

    x: [x],

    y: [y],

    mode: "text",

    type: "scatter",

    text: [text],

    textposition: "middle center",

    showlegend: false
  };
}

export function createOptimalPointLabel(
  x,
  y,
  value
) {

  return {

    x: [x],

    y: [y],

    mode: "markers+text",

    type: "scatter",

    text: [
      `Tối ưu\nZ=${value}`
    ],

    textposition: "bottom center",

    marker: {
      size: 12
    },

    name: "Nghiệm tối ưu"
  };
}