export function renderPivotInfo(
  containerId,
  pivotData
) {

  const container =
    document.getElementById(containerId);

  if (!container) return;

  const {
    enteringVariable,
    leavingVariable,
    pivotRow,
    pivotColumn,
    pivotValue
  } = pivotData;

  container.innerHTML = `
    <div class="pivot-card">

      <h3>
        Thông tin Pivot
      </h3>

      <p>
        <strong>Biến vào:</strong>
        ${enteringVariable}
      </p>

      <p>
        <strong>Biến ra:</strong>
        ${leavingVariable}
      </p>

      <p>
        <strong>Dòng pivot:</strong>
        ${pivotRow}
      </p>

      <p>
        <strong>Cột pivot:</strong>
        ${pivotColumn}
      </p>

      <p>
        <strong>Phần tử pivot:</strong>
        ${formatNumber(pivotValue)}
      </p>

    </div>
  `;
}

export function highlightPivotCell(
  tableSelector,
  row,
  col
) {

  const table =
    document.querySelector(tableSelector);

  if (!table) return;

  const rows =
    table.querySelectorAll("tr");

  if (!rows[row]) return;

  const cells =
    rows[row].querySelectorAll("td");

  if (!cells[col]) return;

  cells[col].classList.add(
    "pivot-highlight"
  );
}

function formatNumber(value) {

  return Number(value)
    .toFixed(6);
}