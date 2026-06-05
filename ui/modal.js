export function createModal(
  title,
  content
) {

  removeModal();

  const overlay =
    document.createElement("div");

  overlay.className =
    "modal-overlay";

  overlay.id = "app-modal";

  const modal =
    document.createElement("div");

  modal.className =
    "modal";

  modal.innerHTML = `
    <div class="modal-header">

      <h3>
        ${title}
      </h3>

      <button
        class="modal-close"
        id="modal-close-btn"
      >
        ×
      </button>

    </div>

    <div class="modal-content">
      ${content}
    </div>
  `;

  overlay.appendChild(modal);

  document.body.appendChild(
    overlay
  );

  document
    .getElementById(
      "modal-close-btn"
    )
    .addEventListener(
      "click",
      removeModal
    );

  overlay.addEventListener(
    "click",
    e => {

      if (e.target === overlay) {

        removeModal();
      }
    }
  );
}

export function removeModal() {

  const existing =
    document.getElementById(
      "app-modal"
    );

  if (existing) {

    existing.remove();
  }
}

export function showErrorModal(
  message
) {

  createModal(
    "Lỗi",
    `
      <p>
        ${message}
      </p>
    `
  );
}

export function showInfoModal(
  title,
  message
) {

  createModal(
    title,
    `
      <p>
        ${message}
      </p>
    `
  );
}