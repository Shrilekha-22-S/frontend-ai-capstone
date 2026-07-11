const STORAGE_KEY = "userSettings";

// --- Validation rules ---

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Returns an error message if the name is empty, otherwise an empty string.
 */
function validateName(value) {
  if (!value.trim()) {
    return "Name is required.";
  }
  return "";
}

/**
 * Returns an error message if the email format is invalid, otherwise an empty string.
 */
function validateEmail(value) {
  if (!value.trim()) {
    return "Email is required.";
  }
  if (!EMAIL_PATTERN.test(value.trim())) {
    return "Enter a valid email address.";
  }
  return "";
}

// --- DOM references ---

const form = document.getElementById("settings-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const themeSelect = document.getElementById("theme");
const saveBtn = document.getElementById("save-btn");
const statusEl = document.getElementById("status");

const fields = [
  { input: nameInput, errorId: "name-error", validate: validateName },
  { input: emailInput, errorId: "email-error", validate: validateEmail },
];

// Track whether a field has been interacted with (for showing errors on blur)
const touched = new Map(fields.map(({ input }) => [input, false]));

// --- UI helpers ---

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function setFieldError(input, errorId, message) {
  const errorEl = document.getElementById(errorId);
  errorEl.textContent = message;
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

function updateFieldState({ input, errorId, validate }) {
  const message = validate(input.value);
  const showError = touched.get(input) && message;
  setFieldError(input, errorId, showError ? message : "");
  return message;
}

function isFormValid() {
  return fields.every(({ validate, input }) => !validate(input.value));
}

function updateFormState() {
  fields.forEach(updateFieldState);
  saveBtn.disabled = !isFormValid();
}

// --- Persistence ---

function loadSettings() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  const settings = JSON.parse(saved);
  nameInput.value = settings.name ?? "";
  emailInput.value = settings.email ?? "";
  themeSelect.value = settings.theme ?? "light";
  applyTheme(themeSelect.value);
}

function saveSettings() {
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

// --- Event handlers ---

function handleBlur(field) {
  touched.set(field.input, true);
  updateFormState();
}

function handleSubmit(event) {
  event.preventDefault();

  // Mark all fields as touched so errors appear on submit attempt
  fields.forEach(({ input }) => touched.set(input, true));
  updateFormState();

  if (!isFormValid()) return;

  saveSettings();
}

// --- Initialise ---

fields.forEach((field) => {
  field.input.addEventListener("input", updateFormState);
  field.input.addEventListener("blur", () => handleBlur(field));
});

themeSelect.addEventListener("change", () => {
  applyTheme(themeSelect.value);
});

form.addEventListener("submit", handleSubmit);

loadSettings();
updateFormState();
