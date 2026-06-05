export function enableZoom(
  containerId
) {

  const container =
    document.getElementById(containerId);

  if (!container) {

    throw new Error(
      "Không tìm thấy container."
    );
  }

  const config = {

    scrollZoom: true,

    displayModeBar: true,

    responsive: true
  };

  return config;
}

export function resetZoom(
  containerId
) {

  const container =
    document.getElementById(containerId);

  if (!container) return;

  Plotly.relayout(
    container,
    {
      "xaxis.autorange": true,
      "yaxis.autorange": true
    }
  );
}

export function setZoomRange(
  containerId,
  xRange,
  yRange
) {

  const container =
    document.getElementById(containerId);

  if (!container) return;

  Plotly.relayout(
    container,
    {
      "xaxis.range": xRange,
      "yaxis.range": yRange
    }
  );
}