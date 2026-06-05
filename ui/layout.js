export function renderLayout() {

  createContainerIfMissing(
    "summary-container"
  );

  createContainerIfMissing(
    "tableau-container"
  );

  createContainerIfMissing(
    "dictionary-container"
  );

  createContainerIfMissing(
    "graph-container"
  );

  createContainerIfMissing(
    "steps-container"
  );
}

function createContainerIfMissing(
  id
) {

  if (
    document.getElementById(id)
  ) {

    return;
  }

  const div =
    document.createElement("div");

  div.id = id;

  div.className =
    "ui-section";

  document.body.appendChild(div);
}