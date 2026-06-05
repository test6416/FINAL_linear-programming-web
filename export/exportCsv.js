export function exportToCsv(
  result,
  filename = "solution.csv"
) {

  let csv =
    "Variable,Value\n";

  result.solution.forEach(
    (value, index) => {

      csv +=
        `x${index + 1},${value}\n`;
    }
  );

  csv +=
    `Optimal Value,${result.optimalValue}\n`;

  const blob =
    new Blob(
      [csv],
      {
        type:
          "text/csv;charset=utf-8;"
      }
    );

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;

  a.download = filename;

  a.click();

  URL.revokeObjectURL(url);
}
