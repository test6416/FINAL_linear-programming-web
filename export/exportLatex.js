export function exportToLatex(
  result,
  filename = "solution.tex"
) {

  let tex = "";

  tex +=
`\\documentclass{article}

\\usepackage{amsmath}

\\begin{document}

\\section*{Linear Programming Solution}

`;

  tex +=
`\\textbf{Status:}
${result.status}

\\\\[10pt]
`;

  tex +=
`\\textbf{Optimal Value:}
${result.optimalValue}

\\\\[10pt]
`;

  tex +=
`\\textbf{Solution:}

\\[
`;

  result.solution.forEach(
    (value, index) => {

      tex +=
        `x_${index + 1} = ${value} \\\\ \n`;
    }
  );

  tex +=
`\\]

`;

  if (
    result.steps &&
    result.steps.length > 0
  ) {

    tex +=
`\\section*{Simplex Steps}

`;

    result.steps.forEach(
      (step, index) => {

        tex +=
`\\subsection*{Step ${index + 1}}

\\begin{verbatim}
${step}
\\end{verbatim}

`;
      }
    );
  }

  tex +=
`\\end{document}`;

  downloadFile(
    tex,
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