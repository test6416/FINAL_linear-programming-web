export function renderDictionary(
  containerId,
  dictionary
) {

  const container =
    document.getElementById(
      containerId
    );

  if (!container) return;

  container.innerHTML = `

    <div class="dictionary-card">

      <h3>
        Từ điển Simplex
      </h3>

      <pre class="dictionary-content">
${dictionary}
      </pre>

    </div>

  `;
}