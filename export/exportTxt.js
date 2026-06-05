export function exportToTxt(
  result,
  filename = "solution.txt"
) {

  let text = "";

  text +=
    "LINEAR PROGRAMMING SOLUTION\n\n";

  text +=
    `Status: ${result.status}\n`;

  text +=
    `Optimal Value: ${result.optimalValue}\n\n`;

  text += "Solution:\n";

  result.solution.forEach(
    (value, index) => {

      text +=
        `x${index + 1} = ${value}\n`;
    }
  );

  if (
    result.steps &&
    result.steps.length > 0
  ) {

    text +=
      "\n===== SIMPLEX STEPS =====\n\n";

    result.steps.forEach(
      (step, index) => {

        text +=
          `STEP ${index + 1}\n`;

        text +=
          `${step}\n\n`;
      }
    );
  }

  downloadFile(
    text,
    filename,
    "text/plain"
  );
}

function downloadFile(
  content,
  filename,
  type
) {

  const blob =
    new Blob(
      [content],
      { type }
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