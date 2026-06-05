export function exportToMarkdown(
  result,
  filename = "solution.md"
) {

  let md = "";

  md +=
    "# Linear Programming Solution\n\n";

  md +=
    `**Status:** ${result.status}\n\n`;

  md +=
    `**Optimal Value:** ${result.optimalValue}\n\n`;

  md +=
    "## Solution\n\n";

  result.solution.forEach(
    (value, index) => {

      md +=
        `- x${index + 1} = ${value}\n`;
    }
  );

  if (
    result.steps &&
    result.steps.length > 0
  ) {

    md +=
      "\n## Simplex Steps\n\n";

    result.steps.forEach(
      (step, index) => {

        md +=
          `### Step ${index + 1}\n\n`;

        md +=
          "```text\n";

        md +=
          `${step}\n`;

        md +=
          "```\n\n";
      }
    );
  }

  downloadFile(
    md,
    filename,
    "text/markdown"
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