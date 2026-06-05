import * as XLSX from "xlsx";

export function exportToExcel(
  result,
  filename = "solution.xlsx"
) {

  const data = [];

  data.push([
    "Variable",
    "Value"
  ]);

  result.solution.forEach(
    (value, index) => {

      data.push([
        `x${index + 1}`,
        value
      ]);
    }
  );

  data.push([]);

  data.push([
    "Optimal Value",
    result.optimalValue
  ]);

  data.push([
    "Status",
    result.status
  ]);

  const worksheet =
    XLSX.utils.aoa_to_sheet(data);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Solution"
  );

  if (
    result.steps &&
    result.steps.length > 0
  ) {

    const stepData = [];

    stepData.push([
      "Simplex Steps"
    ]);

    result.steps.forEach(
      (step, index) => {

        stepData.push([
          `Step ${index + 1}`
        ]);

        stepData.push([step]);

        stepData.push([]);
      }
    );

    const stepSheet =
      XLSX.utils.aoa_to_sheet(
        stepData
      );

    XLSX.utils.book_append_sheet(
      workbook,
      stepSheet,
      "Steps"
    );
  }

  XLSX.writeFile(
    workbook,
    filename
  );
}