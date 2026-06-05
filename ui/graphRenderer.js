import { drawGraph2D }
  from "../graph/graph2d.js";

import { drawGraph3D }
  from "../graph/graph3d.js";

export function renderGraph(
  containerId,
  problem,
  solution = null
) {

  const numVars =
    problem.objective.length;

  if (numVars === 2) {

    drawGraph2D(
      containerId,
      problem,
      solution
    );

  } else if (numVars === 3) {

    drawGraph3D(
      containerId,
      problem
    );

  } else {

    renderUnsupportedMessage(
      containerId
    );
  }
}

function renderUnsupportedMessage(
  containerId
) {

  const container =
    document.getElementById(containerId);

  if (!container) return;

  container.innerHTML = `
    <div class="graph-message">
      Chỉ hỗ trợ đồ thị 2D hoặc 3D.
    </div>
  `;
}