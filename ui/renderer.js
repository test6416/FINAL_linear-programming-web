import { renderLayout }
  from "./layout.js";

import { renderTableau }
  from "./tableRenderer.js";

import { renderDictionary }
  from "./dictionaryRenderer.js";

import { renderGraph }
  from "./graphRenderer.js";

import { renderSteps }
  from "./stepRenderer.js";

export function renderAll(
  result,
  problem
) {

  renderLayout();

  if (result.tableau) {

    renderTableau(
      "tableau-container",
      result.tableau
    );
  }

  if (result.dictionary) {

    renderDictionary(
      "dictionary-container",
      result.dictionary
    );
  }

  if (problem) {

    renderGraph(
      "graph-container",
      problem,
      result.solution
    );
  }

  if (result.steps) {

    renderSteps(
      "steps-container",
      result.steps
    );
  }

  renderSummary(result);
}

export function renderSummary(
  result
) {

  const container =
    document.getElementById(
      "summary-container"
    );

  if (!container) return;

  let html = "";

  html += `
    <div class="summary-card">
      <h3>Kết quả</h3>
  `;

  if (result.solution) {

    result.solution.forEach(
      (v, i) => {

        html += `
          <p>
            x${i + 1} = ${v}
          </p>
        `;
      }
    );
  }

  html += `
      <p>
        Giá trị tối ưu:
        <strong>
          ${result.optimalValue}
        </strong>
      </p>

      <p>
        Trạng thái:
        ${result.status}
      </p>
    </div>
  `;

  container.innerHTML = html;
}