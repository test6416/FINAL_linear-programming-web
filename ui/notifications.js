export function showNotification(
  message,
  type = "info",
  duration = 3000
) {

  const notification =
    document.createElement("div");

  notification.className =
    `notification ${type}`;

  notification.innerText =
    message;

  document.body.appendChild(
    notification
  );

  setTimeout(() => {

    notification.classList.add(
      "show"
    );

  }, 10);

  setTimeout(() => {

    notification.classList.remove(
      "show"
    );

    setTimeout(() => {

      notification.remove();

    }, 300);

  }, duration);
}

export function success(
  message
) {

  showNotification(
    message,
    "success"
  );
}

export function error(
  message
) {

  showNotification(
    message,
    "error"
  );
}

export function warning(
  message
) {

  showNotification(
    message,
    "warning"
  );
}

export function info(
  message
) {

  showNotification(
    message,
    "info"
  );
}