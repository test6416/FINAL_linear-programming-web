export function create2DAxes(
  xTitle = "x1",
  yTitle = "x2"
) {

  return {

    xaxis: {
      title: xTitle,
      zeroline: true,
      showgrid: true,
      gridcolor: "#dddddd",
      range: [0, 20]
    },

    yaxis: {
      title: yTitle,
      zeroline: true,
      showgrid: true,
      gridcolor: "#dddddd",
      range: [0, 20]
    }
  };
}

export function create3DAxes(
  xTitle = "x1",
  yTitle = "x2",
  zTitle = "x3"
) {

  return {

    scene: {

      xaxis: {
        title: xTitle
      },

      yaxis: {
        title: yTitle
      },

      zaxis: {
        title: zTitle
      }
    }
  };
}