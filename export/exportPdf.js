import { jsPDF } from "jspdf";

export function exportToPdf(
  result,
  filename = "solution.pdf"
) {

  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(18);

  doc.text(
    "LINEAR PROGRAMMING SOLUTION",
    20,
    y
  );

  y += 20;

  doc.setFontSize(12);

  doc.text(
    `Status: ${result.status}`,
    20,
    y
  );

  y += 10;

  doc.text(
    `Optimal Value: ${result.optimalValue}`,
    20,
    y
  );

  y += 15;

  doc.text(
    "Solution:",
    20,
    y
  );

  y += 10;

  result.solution.forEach(
    (value, index) => {

      doc.text(
        `x${index + 1} = ${value}`,
        30,
        y
      );

      y += 10;
    }
  );

  if (
    result.steps &&
    result.steps.length > 0
  ) {

    y += 10;

    doc.text(
      "Simplex Steps:",
      20,
      y
    );

    y += 10;

    result.steps.forEach(
      (step, index) => {

        if (y > 260) {

          doc.addPage();

          y = 20;
        }

        doc.text(
          `Step ${index + 1}`,
          20,
          y
        );

        y += 8;

        const lines =
          doc.splitTextToSize(
            step,
            170
          );

        doc.text(
          lines,
          25,
          y
        );

        y +=
          lines.length * 6 + 10;
      }
    );
  }

  doc.save(filename);
}