const STORAGE_KEY = "userSettings";

const form = document.getElementById("settings-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const themeSelect = document.getElementById("theme");
const statusEl = document.getElementById("status");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function loadSettings() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  const settings = JSON.parse(saved);
  nameInput.value = settings.name ?? "";
  emailInput.value = settings.email ?? "";
  themeSelect.value = settings.theme ?? "light";
  applyTheme(themeSelect.value);
}

function saveSettings(event) {
  event.preventDefault();

  const settings = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    theme: themeSelect.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  applyTheme(settings.theme);

  statusEl.textContent = "Settings saved!";
  setTimeout(() => {
    statusEl.textContent = "";
  }, 3000);
}

themeSelect.addEventListener("change", () => {
  applyTheme(themeSelect.value);
});

form.addEventListener("submit", saveSettings);
loadSettings();
