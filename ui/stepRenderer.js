export function renderSteps(
  containerId,
  steps
) {

  const container =
    document.getElementById(
      containerId
    );

  if (!container) return;

  let html = "";

  steps.forEach(
    (step, index) => {

      html += `

      <div class="step-card">

        <h3>
          Bước ${index + 1}
        </h3>

        <pre class="dictionary-step">
${step.dictionary}
        </pre>

      </div>

      `;
    }
  );

  container.innerHTML = html;
}

export function appendStep(
  containerId,
  dictionaryText
) {

  const container =
    document.getElementById(
      containerId
    );

  if (!container) return;

  const div =
    document.createElement("div");

  div.className =
    "step-card";

  div.innerHTML = `

    <pre class="dictionary-step">
${dictionaryText}
    </pre>

  `;

  container.appendChild(div);
}