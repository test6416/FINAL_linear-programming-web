import { solveSimplex }
  from "./simplex/simplex.js";

import { solveTwoPhase }
  from "./simplex/twoPhase.js";

import { solveDualSimplex }
  from "./simplex/dualSimplex.js";

import { solveBland }
  from "./simplex/bland.js";
  
import {
  parseProblem
} from "./simplex/parser.js";

import {
  formatNumber
} from "./simplex/formatNumber.js";

import {
  renderGraph
} from "./ui/graphRenderer.js";

const numVarsInput =
  document.getElementById("numVars");

const numConstraintsInput =
  document.getElementById("numConstraints");

const buildBtn =
  document.getElementById("buildBtn");

const solveBtn =
  document.getElementById("solveBtn");

const resetBtn =
  document.getElementById("resetBtn");

const objectiveInputs =
  document.getElementById("objectiveInputs");

const constraintsContainer =
  document.getElementById("constraintsContainer");

const variableConstraints =
  document.getElementById("variableConstraints");

const resultEl =
  document.getElementById("result");

const stepsEl =
  document.getElementById("steps");

const objectivePreview =
  document.getElementById("objectivePreview");

const checkbox =
  document.getElementById(
    "showSteps"
  );

const showSteps =
  checkbox
    ? checkbox.checked
    : true;

let numVars = 2;
let numConstraints = 3;

buildBtn.addEventListener(
  "click",
  buildProblem
);

solveBtn.addEventListener(
  "click",
  solveProblem
);

resetBtn.addEventListener(
  "click",
  resetProblem
);

buildProblem();

function buildProblem() {

  numVars = parseInt(
    numVarsInput.value
  );

  numConstraints = parseInt(
    numConstraintsInput.value
  );

  buildObjective();
  buildVariableConstraints();
  buildConstraints();

  updatePreview();
}

function buildObjective() {

  objectiveInputs.innerHTML = "";

  const row =
    document.createElement("div");

  row.className =
    "constraint-row";

  for (
    let i = 0;
    i < numVars;
    i++
  ) {

    if (
      i > 0
    ) {
      const plus =
        document.createElement("span");

      plus.className =
        "sign";

      plus.textContent =
        "+";

      row.appendChild(plus);
    }

    const input =
      document.createElement("input");

    input.type =
      "number";

    input.value =
      i === 0 ? 3 : 2;

    input.id =
      `obj-${i}`;

    input.className =
      "w-sm";

    input.addEventListener(
      "input",
      updatePreview
    );

    row.appendChild(input);

    const label =
      document.createElement("span");

    label.className =
      "var-badge";

    label.textContent = `x${i + 1}`;

    row.appendChild(label);
  }

  objectiveInputs.appendChild(
    row
  );
}

function buildVariableConstraints() {

  variableConstraints.innerHTML = "";

  const perColumn = 10;
  let column;

  for (let i = 0; i < numVars; i++) {

    if (i % perColumn === 0) {
      column = document.createElement("div");
      column.className = "var-column";
      variableConstraints.appendChild(column);
    }

    const row = document.createElement("div");
    row.className = "constraint-row";

    const badge = document.createElement("span");
    badge.className = "var-badge";
    badge.textContent = `x${i + 1}`;

    const select = document.createElement("select");
    select.id = `var-sign-${i}`;
    select.innerHTML = `
      <option value="nneg">≥ 0</option>
      <option value="npos">≤ 0</option>
      <option value="free">Tự do</option>
    `;

    row.appendChild(badge);
    row.appendChild(select);

    column.appendChild(row);
  }
}

function buildConstraints() {

  constraintsContainer.innerHTML =
    "";

  for (
    let j = 0;
    j < numConstraints;
    j++
  ) {

    const row =
      document.createElement("div");

    row.className =
      "constraint-row";
    
    const rowLabel = document.createElement("span");
    rowLabel.className = "row-label";
    rowLabel.textContent = `${j + 1}.`;
    row.appendChild(rowLabel);
    
    for (
      let i = 0;
      i < numVars;
      i++
    ) {

      const input =
        document.createElement("input");

      input.type = "number";

      input.value = 0;

      input.id =
        `c-${j}-${i}`;

      row.appendChild(input);

      const label =
        document.createElement("span");

      label.className =
        "var-badge";

      label.textContent =
        `x${i + 1}`;

      row.appendChild(label);

      if (
        i < numVars - 1
      ) {

        const plus =
          document.createElement("span");

        plus.textContent =
          "+";

        row.appendChild(plus);
      }
    }

    const sign =
      document.createElement("select");

    sign.id =
      `sign-${j}`;

    sign.innerHTML = `
      <option value="<=">≤</option>
      <option value=">=">≥</option>
      <option value="=">=</option>
    `;

    row.appendChild(sign);

    const rhs =
      document.createElement("input");

    rhs.type = "number";

    rhs.value = 10;

    rhs.id =
      `rhs-${j}`;

    row.appendChild(rhs);

    constraintsContainer.appendChild(
      row
    );
  }
}

document.getElementById("objectiveType")
  .addEventListener("change", updatePreview);

function updatePreview() {

  const type =
    document.getElementById("objectiveType").value;

  let text =
    `${type.toUpperCase()} z = `;

  let first = true;

  for (let i = 0; i < numVars; i++) {

    const input =
      document.getElementById(`obj-${i}`);

    const value =
      parseFloat(input.value);

    const v =
      isNaN(value) ? 0 : value;

    // bỏ luôn nếu = 0
    if (v === 0) continue;

    if (!first) {
      text += v > 0 ? " + " : " - ";
    } else {
      if (v < 0) text += "-";
      first = false;
    }

    text += `${Math.abs(v)}x${i + 1}`;
  }

  // nếu tất cả = 0
  if (first) {
    text += "0";
  }

  objectivePreview.textContent = text;
}

function collectProblem() {

  const type =
    document.getElementById(
      "objectiveType"
    ).value;

  const objective = [];

  for (
    let i = 0;
    i < numVars;
    i++
  ) {

    objective.push(
      Number(
        document.getElementById(
          `obj-${i}`
        ).value
      )
    );
  }

  const constraints = [];

  for (
    let j = 0;
    j < numConstraints;
    j++
  ) {

    const coefficients = [];

    for (
      let i = 0;
      i < numVars;
      i++
    ) {

      coefficients.push(
        Number(
          document.getElementById(
            `c-${j}-${i}`
          ).value
        )
      );
    }

    constraints.push({

      coefficients,

      sign:
        document.getElementById(
          `sign-${j}`
        ).value,

      rhs:
        Number(
          document.getElementById(
            `rhs-${j}`
          ).value
        )
    });
  }

  const variableSigns = [];

  for (
    let i = 0;
    i < numVars;
    i++
  ) {

    variableSigns.push(

      document.getElementById(
        `var-sign-${i}`
      ).value
    );
  }

  return {

    type,

    objective,

    constraints,

    variableSigns
  };
}

function clearOutput() {
  resultEl.textContent = "";
  stepsEl.innerHTML = "";

  const graph =
    document.getElementById("graph");

  if (graph) {
    graph.innerHTML = "";
  }
}

function solveProblem() {

  clearOutput();
  
  try {

    const rawProblem =
      collectProblem();

    const problem =
      parseProblem(
        rawProblem
      );

    const method =
      document.getElementById(
        "method"
      ).value;

    let result;

    switch (method) {

      case "primal":

        result =
          solveSimplex(
            problem
          );

        break;

      case "twoPhase":

        result =
          solveTwoPhase(
            problem
          );

        break;

      case "dual":

        result =
          solveDualSimplex(
            problem
          );

        break;

      case "bland":

        result =
          solveBland(
            problem
          );

        break;

      default:

        result =
          solveSimplex(
            problem
          );
    }

    renderResult(
      result
    );

    renderSolutionGraph(
      problem,
      result
    );

  }

  catch (error) {

    console.error(
      error
    );

    resultEl.textContent =
      "Lỗi:\n\n" +
      error.message;
  }
}

function renderSolutionGraph(
  rawProblem,
  result
) {

  if (
    rawProblem.objective.length !== 2
  ) {

    return;
  }

  let solutionPoint = null;

  if (
    result.solution &&
    result.solution.x1 !== undefined &&
    result.solution.x2 !== undefined
  ) {

    solutionPoint = [

      Number(
        result.solution.x1
      ),

      Number(
        result.solution.x2
      )
    ];
  }

  renderGraph(
    "graph",
    rawProblem,
    solutionPoint
  );
}

function renderResult(result) {

  let text = "";

  text +=
    "═════ KẾT QUẢ ═════\n\n";

  if (
    result.solution &&
    typeof result.solution ===
      "object"
  ) {

    Object.entries(
      result.solution
    )
      .filter(
        ([name]) =>
          name.startsWith("x")
      )
      .forEach(
        ([name, value]) => {

          text +=
            `${name} = ${formatNumber(
              value
            )}\n`;
        }
      );
  }

  text +=
    `\nGiá trị tối ưu = ${formatNumber(
      result.optimalValue
    )}\n`;

  text +=
    `\nTrạng thái: ${result.status}`;

  resultEl.textContent =
    text;

  renderSteps(
    result.steps || []
  );
}

function renderSteps(steps) {

  stepsEl.innerHTML = "";

  if (
    !steps ||
    !steps.length
  ) {

    return;
  }

  steps.forEach(
    (step, index) => {

      const div =
        document.createElement(
          "div"
        );

      div.className =
        "step-item";

      div.innerHTML = `
        <strong>
          Bước ${index + 1}
        </strong>

        <pre>${step}</pre>
      `;

      stepsEl.appendChild(
        div
      );
    }
  );
}

function resetProblem() {

  numVarsInput.value = 2;
  numConstraintsInput.value = 3;

  buildProblem();

  resultEl.textContent = "";
  stepsEl.innerHTML = "";
}