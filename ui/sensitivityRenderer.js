export function renderSensitivity(
  containerId,
  analysis
) {

  const container =
    document.getElementById(containerId);

  if (!container) return;

  let html = `
    <div class="sensitivity-card">

      <h3>
        Sensitivity Analysis
      </h3>
  `;

  html += `
    <h4>
      Reduced Costs
    </h4>

    <table class="simplex-table">
      <tr>
        <th>Biến</th>
        <th>Reduced Cost</th>
      </tr>
  `;

  analysis.reducedCosts.forEach(
    item => {

      html += `
        <tr>
          <td>
            ${item.variable}
          </td>

          <td>
            ${formatNumber(
              item.reducedCost
            )}
          </td>
        </tr>
      `;
    }
  );

  html += `
    </table>
  `;

  html += `
    <h4>
      Shadow Prices
    </h4>

    <table class="simplex-table">
      <tr>
        <th>Biến cơ sở</th>
        <th>Giá trị</th>
      </tr>
  `;

  analysis.shadowPrices.forEach(
    item => {

      html += `
        <tr>
          <td>
            ${item.basicVariable}
          </td>

          <td>
            ${formatNumber(item.value)}
          </td>
        </tr>
      `;
    }
  );

  html += `
      </table>
    </div>
  `;

  container.innerHTML = html;
}

function formatNumber(value) {

  return Number(value)
    .toFixed(6);
}