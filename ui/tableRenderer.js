export function renderTableau(
  containerId,
  tableau
) {

  const container =
    document.getElementById(containerId);

  if (!container) return;

  let html = `
    <div class="table-wrapper">
      <table class="simplex-table">
  `;

  tableau.forEach(row => {

    html += "<tr>";

    row.forEach(value => {

      html += `
        <td>
          ${formatNumber(value)}
        </td>
      `;
    });

    html += "</tr>";
  });

  html += `
      </table>
    </div>
  `;

  container.innerHTML = html;
}

function formatNumber(value) {

  if (
    Math.abs(value) < 1e-10
  ) {

    return "0";
  }

  return Number(value)
    .toFixed(4);
}