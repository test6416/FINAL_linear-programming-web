const THEMES = {

  light: {
    "--bg": "#f4f5f7",
    "--card": "#ffffff",
    "--text": "#1c1c1c",
    "--border": "#dddddd"
  },

  dark: {
    "--bg": "#1e1f24",
    "--card": "#2a2d35",
    "--text": "#f5f5f5",
    "--border": "#444444"
  }
};

export function applyTheme(
  themeName = "light"
) {

  const theme =
    THEMES[themeName];

  if (!theme) {

    throw new Error(
      "Theme không tồn tại."
    );
  }

  Object.entries(theme).forEach(
    ([key, value]) => {

      document.documentElement
        .style
        .setProperty(
          key,
          value
        );
    }
  );

  localStorage.setItem(
    "lp-theme",
    themeName
  );
}

export function toggleTheme() {

  const current =
    localStorage.getItem(
      "lp-theme"
    ) || "light";

  const next =
    current === "light"
      ? "dark"
      : "light";

  applyTheme(next);
}

export function loadSavedTheme() {

  const saved =
    localStorage.getItem(
      "lp-theme"
    ) || "light";

  applyTheme(saved);
}